import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Users, Home, Clock, MapPin, XCircle, CreditCard } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Reservation {
  id: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  accommodation_type: string;
  total_price: number;
  status: string;
  special_requests?: string;
  created_at: string;
}

const accommodationTypes = {
  villa_luxe: "Villa de Luxe",
  suite_familiale: "Suite Familiale", 
  chambre_vue_mer: "Chambre Vue Mer",
  chambre_standard: "Chambre Standard",
};

const statusColors = {
  pending: "bg-yellow-500",
  confirmed: "bg-green-500", 
  cancelled: "bg-red-500",
};

const statusLabels = {
  pending: "En attente",
  confirmed: "Confirmée",
  cancelled: "Annulée",
};

export default function UserReservations() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  const fetchReservations = async () => {
    if (!user) {
      console.log("Pas d'utilisateur connecté");
      setLoading(false);
      return;
    }

    console.log("Chargement des réservations pour l'utilisateur:", user.id);
    
    try {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      console.log("Réponse Supabase:", { data, error });

      if (error) {
        console.error("Erreur Supabase:", error);
        throw error;
      }
      
      console.log("Réservations trouvées:", data?.length || 0);
      setReservations(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des réservations:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (reservationId: string, reservationStatus: string) => {
    if (reservationStatus === 'confirmed') {
      toast({
        title: "Annulation impossible",
        description: "Les réservations confirmées ne peuvent pas être annulées directement. Contactez-nous.",
        variant: "destructive",
      });
      return;
    }

    setCancelling(reservationId);
    
    try {
      const { error } = await supabase
        .from("reservations")
        .update({ status: 'cancelled' })
        .eq("id", reservationId);

      if (error) throw error;

      toast({
        title: "Réservation annulée",
        description: "Votre réservation a été annulée avec succès.",
      });

      // Refresh the reservations list
      fetchReservations();
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la réservation.",
        variant: "destructive",
      });
    } finally {
      setCancelling(null);
    }
  };

  const handlePayReservation = async (reservationId: string, totalPrice: number, accommodationType: string) => {
    try {
      const accommodationLabel = accommodationTypes[accommodationType as keyof typeof accommodationTypes] || accommodationType;
      const description = `Paiement pour ${accommodationLabel}`;
      
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
        body: {
          totalPrice: totalPrice,
          reservationId: reservationId,
          description: description
        }
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (paymentData?.url) {
        window.open(paymentData.url, '_blank');
        toast({
          title: "Redirection vers le paiement",
          description: "Vous allez être redirigé vers la page de paiement sécurisée.",
        });
      } else {
        throw new Error('Impossible de créer la session de paiement');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de créer la session de paiement.",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mes Réservations</h1>
          <p className="text-muted-foreground">
            Gérez vos réservations au FortJoret Resort
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">Chargement de vos réservations...</div>
        ) : reservations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Aucune réservation</h3>
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore fait de réservation.
              </p>
              <Button onClick={() => navigate("/reservation")}>
                Faire une réservation
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Vos réservations</h2>
                <p className="text-muted-foreground text-sm">
                  {reservations.length} réservation{reservations.length > 1 ? 's' : ''}
                </p>
              </div>
              <Button onClick={() => navigate("/reservation")} className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Nouvelle réservation
              </Button>
            </div>
            {reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        {accommodationTypes[reservation.accommodation_type as keyof typeof accommodationTypes]}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4" />
                        Réservé le {new Date(reservation.created_at).toLocaleDateString('fr-FR')}
                      </CardDescription>
                    </div>
                    <Badge 
                      className={`${statusColors[reservation.status as keyof typeof statusColors]} text-white`}
                    >
                      {statusLabels[reservation.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Arrivée</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(reservation.check_in_date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Départ</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(reservation.check_out_date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Invités</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.guests} personne{reservation.guests > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-lg font-bold text-primary">
                        {reservation.total_price}€
                      </p>
                    </div>
                  </div>

                  {reservation.special_requests && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Demandes spéciales</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.special_requests}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {reservation.status === 'pending' && (
                      <>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handlePayReservation(reservation.id, reservation.total_price, reservation.accommodation_type)}
                          className="flex items-center gap-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          Payer maintenant
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <XCircle className="w-4 h-4" />
                              Annuler
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmer l'annulation</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir annuler cette réservation ? Cette action ne peut pas être annulée.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Retour</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleCancelReservation(reservation.id, reservation.status)}
                                disabled={cancelling === reservation.id}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {cancelling === reservation.id ? "Annulation..." : "Annuler la réservation"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                    
                    {reservation.status === 'confirmed' && (
                      <div className="text-sm text-muted-foreground p-2 bg-green-50 rounded border border-green-200">
                        ✓ Réservation confirmée et payée
                      </div>
                    )}
                    
                    {reservation.status === 'cancelled' && (
                      <div className="text-sm text-muted-foreground p-2 bg-red-50 rounded border border-red-200">
                        ✗ Réservation annulée
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}