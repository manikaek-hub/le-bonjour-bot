import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  Calendar, 
  Users, 
  Euro, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";

interface DashboardStats {
  totalReservations: number;
  confirmedReservations: number;
  pendingReservations: number;
  cancelledReservations: number;
  totalRevenue: number;
  thisMonthRevenue: number;
  totalUsers: number;
}

interface RecentReservation {
  id: string;
  user_email: string;
  accommodation_type: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalReservations: 0,
    confirmedReservations: 0,
    pendingReservations: 0,
    cancelledReservations: 0,
    totalRevenue: 0,
    thisMonthRevenue: 0,
    totalUsers: 0,
  });
  const [recentReservations, setRecentReservations] = useState<RecentReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Récupérer les statistiques des réservations
      const { data: reservations, error: reservationsError } = await supabase
        .from('reservations')
        .select('*');

      if (reservationsError) throw reservationsError;

      // Récupérer les profils avec emails
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id');

      if (profilesError) throw profilesError;

      // Calculer les statistiques
      const totalReservations = reservations?.length || 0;
      const confirmedReservations = reservations?.filter(r => r.status === 'confirmed').length || 0;
      const pendingReservations = reservations?.filter(r => r.status === 'pending').length || 0;
      const cancelledReservations = reservations?.filter(r => r.status === 'cancelled').length || 0;
      
      const totalRevenue = reservations?.reduce((sum, r) => {
        return r.status === 'confirmed' ? sum + (r.total_price || 0) : sum;
      }, 0) || 0;

      const thisMonth = new Date();
      thisMonth.setDate(1);
      const thisMonthRevenue = reservations?.reduce((sum, r) => {
        const createdDate = new Date(r.created_at);
        return r.status === 'confirmed' && createdDate >= thisMonth 
          ? sum + (r.total_price || 0) 
          : sum;
      }, 0) || 0;

      setStats({
        totalReservations,
        confirmedReservations,
        pendingReservations,
        cancelledReservations,
        totalRevenue,
        thisMonthRevenue,
        totalUsers: profiles?.length || 0,
      });

      // Récupérer les réservations récentes avec informations utilisateur
      const recentReservationsWithUsers = await Promise.all(
        (reservations || [])
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
          .map(async (reservation) => {
            const { data: authUser } = await supabase.auth.admin.getUserById(reservation.user_id);
            return {
              ...reservation,
              user_email: authUser.user?.email || 'Email non disponible'
            };
          })
      );

      setRecentReservations(recentReservationsWithUsers);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const getAccommodationLabel = (type: string) => {
    switch (type) {
      case 'maison_70m2':
        return 'Maison 70m²';
      case 'maison_40m2':
        return 'Maison 40m²';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p>Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations totales</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReservations}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                {stats.confirmedReservations} confirmées
              </Badge>
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                {stats.pendingReservations} en attente
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue}€</div>
            <p className="text-xs text-muted-foreground">
              Réservations confirmées uniquement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ce mois</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisMonthRevenue}€</div>
            <p className="text-xs text-muted-foreground">
              Revenus du mois en cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Comptes créés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Réservations récentes */}
      <Card>
        <CardHeader>
          <CardTitle>Réservations récentes</CardTitle>
          <CardDescription>
            Les 5 dernières réservations effectuées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(reservation.status)}
                  <div>
                    <p className="font-medium">{reservation.user_email}</p>
                    <p className="text-sm text-muted-foreground">
                      {getAccommodationLabel(reservation.accommodation_type)} • 
                      Du {new Date(reservation.check_in_date).toLocaleDateString('fr-FR')} au {new Date(reservation.check_out_date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{reservation.total_price}€</p>
                  <Badge variant="outline">
                    {getStatusLabel(reservation.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}