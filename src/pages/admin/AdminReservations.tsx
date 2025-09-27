import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { 
  Calendar, 
  Search, 
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Reservation {
  id: string;
  user_id: string;
  user_email: string;
  accommodation_type: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  total_price: number;
  status: string;
  special_requests: string;
  created_at: string;
  updated_at: string;
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [accommodationFilter, setAccommodationFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    filterReservations();
  }, [reservations, searchTerm, statusFilter, accommodationFilter]);

  const fetchReservations = async () => {
    try {
      const { data: reservationsData, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Récupérer les profils séparément
      const userIds = [...new Set(reservationsData?.map(r => r.user_id) || [])];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name')
        .in('user_id', userIds);

      // Ajouter un email basé sur les profils
      const reservationsWithEmails = reservationsData?.map(reservation => {
        const profile = profiles?.find(p => p.user_id === reservation.user_id);
        return {
          ...reservation,
          user_email: profile 
            ? `${profile.first_name}.${profile.last_name}@example.com`.toLowerCase()
            : 'Email non disponible'
        };
      }) || [];

      setReservations(reservationsWithEmails);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterReservations = () => {
    let filtered = reservations;

    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    // Filtre par type d'hébergement
    if (accommodationFilter !== "all") {
      filtered = filtered.filter(r => r.accommodation_type === accommodationFilter);
    }

    setFilteredReservations(filtered);
  };

  const updateReservationStatus = async (reservationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', reservationId);

      if (error) throw error;

      // Mettre à jour la liste locale
      setReservations(prev => 
        prev.map(r => 
          r.id === reservationId 
            ? { ...r, status: newStatus, updated_at: new Date().toISOString() }
            : r
        )
      );
      
      toast({
        title: "Succès",
        description: `Réservation ${newStatus === 'confirmed' ? 'confirmée' : 'annulée'}`,
      });
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la réservation",
        variant: "destructive",
      });
    }
  };

  const deleteReservation = async (reservationId: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', reservationId);

      if (error) throw error;

      // Mettre à jour la liste locale
      setReservations(prev => prev.filter(r => r.id !== reservationId));
      
      toast({
        title: "Succès",
        description: "Réservation supprimée définitivement",
      });
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la réservation",
        variant: "destructive",
      });
    }
  };

  const deleteOldCancelledReservations = async () => {
    try {
      // Supprimer les réservations annulées de plus de 30 jours
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('status', 'cancelled')
        .lt('updated_at', thirtyDaysAgo.toISOString());

      if (error) throw error;

      // Recharger les données
      await fetchReservations();
      
      toast({
        title: "Succès",
        description: "Réservations annulées anciennes supprimées",
      });
    } catch (error) {
      console.error('Error deleting old reservations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les anciennes réservations",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'cancelled':
        return 'Annulée';
      default:
        return 'Inconnu';
    }
  };

  const getAccommodationLabel = (type: string) => {
    switch (type) {
      case 'studio_35m2':
        return 'Studio 35m² (2 personnes)';
      case 'suite_familiale':
        return 'Suite Familiale (4 personnes)';
      case 'maison_70m2':
        return 'Maison 70m² (5 personnes)';
      case 'villa_luxe':
        return 'Villa de Luxe (8+ personnes)';
      default:
        return type;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'confirmed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p>Chargement des réservations...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des réservations</h1>
          <p className="text-muted-foreground">
            Gérez toutes les réservations de vos hébergements
          </p>
        </div>

        {/* Filtres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Email ou ID de réservation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Statut</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmées</SelectItem>
                    <SelectItem value="cancelled">Annulées</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hébergement</label>
                <Select value={accommodationFilter} onValueChange={setAccommodationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les hébergements" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les hébergements</SelectItem>
                    <SelectItem value="studio_35m2">Studio 35m²</SelectItem>
                    <SelectItem value="suite_familiale">Suite Familiale</SelectItem>
                    <SelectItem value="maison_70m2">Maison 70m²</SelectItem>
                    <SelectItem value="villa_luxe">Villa de Luxe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{filteredReservations.length}</div>
              <p className="text-xs text-muted-foreground">Total affiché</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredReservations.filter(r => r.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground">En attente</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {filteredReservations.filter(r => r.status === 'confirmed').length}
              </div>
              <p className="text-xs text-muted-foreground">Confirmées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">
                {filteredReservations.filter(r => r.status === 'cancelled').length}
              </div>
              <p className="text-xs text-muted-foreground">Annulées</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des réservations */}
        <Card>
          <CardHeader>
            <CardTitle>Réservations</CardTitle>
            <CardDescription className="flex justify-between items-center">
              <span>{filteredReservations.length} réservation(s) trouvée(s)</span>
              <Button
                onClick={deleteOldCancelledReservations}
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Nettoyer l'historique (30j+)
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReservations.map((reservation) => (
                <div key={reservation.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(reservation.status)}
                      <div>
                        <p className="font-medium">{reservation.user_email}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {reservation.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(reservation.status)}>
                      {getStatusLabel(reservation.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Hébergement</p>
                      <p className="text-muted-foreground">
                        {getAccommodationLabel(reservation.accommodation_type)}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Dates</p>
                      <p className="text-muted-foreground">
                        Du {new Date(reservation.check_in_date).toLocaleDateString('fr-FR')} au {new Date(reservation.check_out_date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Invités</p>
                      <p className="text-muted-foreground">{reservation.guests} personne(s)</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-lg">{reservation.total_price}€</p>
                      <p className="text-xs text-muted-foreground">
                        Créée le {new Date(reservation.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {reservation.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Confirmer
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Annuler
                          </Button>
                        </>
                      )}
                      
                      {reservation.status === 'confirmed' && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Annuler
                        </Button>
                      )}
                      
                      {reservation.status === 'cancelled' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Réactiver
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteReservation(reservation.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Supprimer
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {reservation.special_requests && (
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium">Demandes spéciales :</p>
                      <p className="text-sm text-muted-foreground">{reservation.special_requests}</p>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredReservations.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucune réservation trouvée</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}