import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { 
  BarChart3, 
  Users, 
  Calendar,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Euro,
  RefreshCw,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalUsers: number;
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  cancelledReservations: number;
  totalRevenue: number;
  monthlyRevenue: number;
  newUsersThisMonth: number;
  reservationsThisMonth: number;
  popularAccommodation: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Récupérer le nombre d'utilisateurs
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('created_at');
      
      if (usersError) throw usersError;

      // Récupérer toutes les réservations
      const { data: reservations, error: reservationsError } = await supabase
        .from('reservations')
        .select('*');
      
      if (reservationsError) throw reservationsError;

      // Calculer les statistiques
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const totalUsers = users?.length || 0;
      const totalReservations = reservations?.length || 0;
      
      const pendingReservations = reservations?.filter(r => r.status === 'pending').length || 0;
      const confirmedReservations = reservations?.filter(r => r.status === 'confirmed').length || 0;
      const cancelledReservations = reservations?.filter(r => r.status === 'cancelled').length || 0;
      
      const totalRevenue = reservations
        ?.filter(r => r.status === 'confirmed')
        .reduce((sum, r) => sum + (r.total_price || 0), 0) || 0;
      
      const monthlyRevenue = reservations
        ?.filter(r => r.status === 'confirmed' && new Date(r.created_at) >= firstDayOfMonth)
        .reduce((sum, r) => sum + (r.total_price || 0), 0) || 0;
      
      const newUsersThisMonth = users
        ?.filter(u => new Date(u.created_at) >= firstDayOfMonth).length || 0;
      
      const reservationsThisMonth = reservations
        ?.filter(r => new Date(r.created_at) >= firstDayOfMonth).length || 0;
      
      // Trouver l'hébergement le plus populaire
      const accommodationCounts = reservations?.reduce((acc, r) => {
        acc[r.accommodation_type] = (acc[r.accommodation_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};
      
      const popularAccommodation = Object.entries(accommodationCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Aucun';

      setStats({
        totalUsers,
        totalReservations,
        pendingReservations,
        confirmedReservations,
        cancelledReservations,
        totalRevenue,
        monthlyRevenue,
        newUsersThisMonth,
        reservationsThisMonth,
        popularAccommodation: getAccommodationLabel(popularAccommodation)
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getAccommodationLabel = (type: string) => {
    switch (type) {
      case 'studio_35m2':
        return 'Studio 35m²';
      case 'suite_familiale':
        return 'Suite Familiale';
      case 'maison_70m2':
        return 'Maison 70m²';
      case 'villa_luxe':
        return 'Villa de Luxe';
      default:
        return type;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getGrowthPercentage = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p>Chargement du tableau de bord...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Erreur lors du chargement des statistiques</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Vue d'ensemble des performances de votre plateforme
            </p>
          </div>
          <Button onClick={fetchDashboardStats} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.newUsersThisMonth} ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Réservations totales</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReservations}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.reservationsThisMonth} ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(stats.monthlyRevenue)} ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalReservations > 0 
                  ? Math.round((stats.confirmedReservations / stats.totalReservations) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Réservations confirmées
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Statut des réservations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingReservations}</div>
              <p className="text-xs text-muted-foreground">
                Nécessitent une action
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmées</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmedReservations}</div>
              <p className="text-xs text-muted-foreground">
                Générant des revenus
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annulées</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.cancelledReservations}</div>
              <p className="text-xs text-muted-foreground">
                À analyser
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Informations détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performances du mois</CardTitle>
              <CardDescription>
                Comparaison avec le mois précédent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Nouveaux utilisateurs</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{stats.newUsersThisMonth}</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Nouvelles réservations</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{stats.reservationsThisMonth}</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Revenus du mois</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{formatCurrency(stats.monthlyRevenue)}</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insights clés</CardTitle>
              <CardDescription>
                Informations importantes à retenir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Hébergement populaire</span>
                <Badge variant="outline">{stats.popularAccommodation}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Revenus moyens/réservation</span>
                <span className="text-sm font-bold">
                  {stats.confirmedReservations > 0 
                    ? formatCurrency(Math.round(stats.totalRevenue / stats.confirmedReservations))
                    : formatCurrency(0)
                  }
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Taux d'annulation</span>
                <span className="text-sm font-bold text-red-600">
                  {stats.totalReservations > 0 
                    ? Math.round((stats.cancelledReservations / stats.totalReservations) * 100)
                    : 0}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Accès direct aux tâches importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4">
                <Calendar className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Gérer les réservations</div>
                  <div className="text-sm text-muted-foreground">
                    {stats.pendingReservations} en attente
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto p-4">
                <Users className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Gérer les utilisateurs</div>
                  <div className="text-sm text-muted-foreground">
                    {stats.totalUsers} utilisateurs
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto p-4">
                <CreditCard className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Voir les paiements</div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(stats.monthlyRevenue)} ce mois
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}