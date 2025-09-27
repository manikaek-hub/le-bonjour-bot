import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAvailability } from "@/hooks/useAvailability";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { CalendarDays, Users, Home, ArrowLeft, CalendarIcon, Info } from "lucide-react";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

const reservationSchema = z.object({
  checkInDate: z.string().min(1, "Date d'arrivée requise"),
  checkOutDate: z.string().min(1, "Date de départ requise"),
  guests: z.number().min(1, "Nombre d'invités requis").max(5, "Maximum 5 personnes"),
  accommodationType: z.string().min(1, "Type d'hébergement requis"),
  specialRequests: z.string().optional(),
}).refine((data) => new Date(data.checkInDate) >= new Date(new Date().setHours(0, 0, 0, 0)), {
  message: "La date d'arrivée doit être aujourd'hui ou ultérieure",
  path: ["checkInDate"],
}).refine((data) => new Date(data.checkOutDate) > new Date(data.checkInDate), {
  message: "La date de départ doit être après la date d'arrivée",
  path: ["checkOutDate"],
}).refine((data) => {
  const checkIn = new Date(data.checkInDate);
  const checkOut = new Date(data.checkOutDate);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  return nights >= 2;
}, {
  message: "Séjour minimum de 2 nuits requis",
  path: ["checkOutDate"],
});

// Système de tarification saisonnière
const getSeasonalPrice = (date: Date): number => {
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  const day = date.getDate();
  
  // Haute saison: Juillet-Août + vacances de Noël
  if ((month === 7 || month === 8) || (month === 12 && day >= 20) || (month === 1 && day <= 6)) {
    return 230;
  }
  
  // Basse saison: Novembre-Mars (hors vacances de Noël)
  if ((month >= 11 || month <= 3) && !(month === 12 && day >= 20) && !(month === 1 && day <= 6)) {
    return 160;
  }
  
  // Moyenne saison: le reste
  return 200;
};

const getSeasonName = (price: number): string => {
  switch (price) {
    case 230: return "haute saison";
    case 160: return "basse saison";
    default: return "moyenne saison";
  }
};

const accommodationTypes = [
  { value: "maison_70m2", label: "Maison 70m² (5 personnes)", basePrice: 200 },
  { value: "maison_40m2", label: "Maison 40m² (2 adultes + 3 enfants)", basePrice: 200 },
];

export default function Reservation() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { isDateAvailable, validateReservation, loading: availabilityLoading } = useAvailability();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [formData, setFormData] = useState({
    guests: 2,
    accommodationType: "",
    specialRequests: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const validateForm = async () => {
    const newErrors: Record<string, string> = {};
    
    if (!checkInDate) {
      newErrors.checkInDate = "Date d'arrivée requise";
    }
    
    if (!checkOutDate) {
      newErrors.checkOutDate = "Date de départ requise";
    }
    
    // Validation minimum 2 nuits
    if (checkInDate && checkOutDate) {
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      if (nights < 2) {
        newErrors.checkOutDate = "Séjour minimum de 2 nuits requis";
      }
    }
    
    if (!formData.accommodationType) {
      newErrors.accommodationType = "Type d'hébergement requis";
    }
    
    if (formData.guests < 1) {
      newErrors.guests = "Nombre d'invités requis";
    } else if (formData.accommodationType === "maison_70m2" && formData.guests > 5) {
      newErrors.guests = "Maximum 5 personnes pour la maison 70m²";
    } else if (formData.accommodationType === "maison_40m2" && formData.guests > 5) {
      newErrors.guests = "Maximum 5 personnes (2 adultes + 3 enfants) pour la maison 40m²";
    }
    
    // Validation des disponibilités
    if (checkInDate && checkOutDate && formData.accommodationType && !newErrors.checkOutDate) {
      const validation = await validateReservation(
        checkInDate.toISOString().split('T')[0],
        checkOutDate.toISOString().split('T')[0],
        formData.accommodationType
      );
      
      if (!validation.valid) {
        newErrors.availability = validation.message || "Dates non disponibles";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !formData.accommodationType) {
      return 0;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    let totalPrice = 0;
    const current = new Date(checkIn);
    
    // Calculer le prix pour chaque nuit selon la saison
    for (let i = 0; i < nights; i++) {
      const nightPrice = getSeasonalPrice(current);
      totalPrice += nightPrice;
      current.setDate(current.getDate() + 1);
    }
    
    return totalPrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) return;
    if (!user || !checkInDate || !checkOutDate) return;

    setLoading(true);

    try {
      const totalPrice = calculateTotalPrice();

      // Créer la réservation avec statut pending
      const { data: reservation, error } = await supabase
        .from("reservations")
        .insert({
          user_id: user.id,
          check_in_date: checkInDate.toISOString().split('T')[0],
          check_out_date: checkOutDate.toISOString().split('T')[0],
          guests: formData.guests,
          accommodation_type: formData.accommodationType,
          total_price: totalPrice,
          special_requests: formData.specialRequests || null,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la réservation.",
          variant: "destructive",
        });
        return;
      }

      console.log('Reservation created:', reservation);

      // Créer la session de paiement Stripe
      const accommodationLabel = accommodationTypes.find(t => t.value === formData.accommodationType)?.label || formData.accommodationType;
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      const description = `${accommodationLabel} - ${nights} nuit${nights > 1 ? 's' : ''} - ${formData.guests} personne${formData.guests > 1 ? 's' : ''}`;
      
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
        body: {
          totalPrice: totalPrice,
          reservationId: reservation.id,
          description: description
        }
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      // Rediriger vers Stripe Checkout
      if (paymentData?.url) {
        // Récupérer les informations du profil utilisateur pour l'email
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("user_id", user.id)
          .single();

        const userName = profile && (profile.first_name || profile.last_name) 
          ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
          : user.email?.split('@')[0] || 'Client';

        // Envoyer l'email de confirmation après la redirection
        try {
          await supabase.functions.invoke('send-reservation-email', {
            body: {
              userEmail: user.email,
              userName: userName,
              reservationId: reservation.id.substring(0, 8).toUpperCase(),
              checkInDate: checkInDate.toISOString().split('T')[0],
              checkOutDate: checkOutDate.toISOString().split('T')[0],
              guests: formData.guests,
              accommodationType: formData.accommodationType,
              totalPrice: totalPrice,
              specialRequests: formData.specialRequests || undefined,
            },
          });
          
          console.log("Email de confirmation envoyé");
        } catch (emailError) {
          console.error("Erreur lors de l'envoi de l'email:", emailError);
          // Ne pas faire échouer la réservation si l'email échoue
        }

        toast({
          title: "Redirection vers le paiement",
          description: "Vous allez être redirigé vers la page de paiement sécurisée.",
        });

        // Ouvrir Stripe Checkout dans un nouvel onglet
        window.open(paymentData.url, '_blank');
        
        // Rediriger vers la page des réservations
        navigate('/mes-reservations');
      } else {
        throw new Error('Impossible de créer la session de paiement');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Fonction pour désactiver les dates non disponibles
  const getDisabledDates = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Désactiver les dates passées
    if (date < today) return true;
    
    // Si un type d'hébergement est sélectionné, vérifier la disponibilité
    if (formData.accommodationType) {
      return !isDateAvailable(date, formData.accommodationType);
    }
    
    return false;
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!user) {
    return null;
  }

  const totalPrice = calculateTotalPrice();

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

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Nouvelle Réservation
              </CardTitle>
              <CardDescription>
                Réservez votre séjour au FortJoret Resort • Séjour minimum 2 nuits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.availability && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-700">
                      <Info className="w-4 h-4" />
                      <p className="text-sm font-medium">{errors.availability}</p>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Date d'arrivée</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkInDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "dd/MM/yyyy") : "Sélectionner une date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          disabled={getDisabledDates}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.checkInDate && (
                      <p className="text-sm text-destructive mt-1">{errors.checkInDate}</p>
                    )}
                  </div>

                  <div>
                    <Label>Date de départ</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOutDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "Sélectionner une date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          disabled={(date) => {
                            if (getDisabledDates(date)) return true;
                            if (checkInDate && date <= checkInDate) return true;
                            return false;
                          }}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.checkOutDate && (
                      <p className="text-sm text-destructive mt-1">{errors.checkOutDate}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Nombre d'invités
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.guests}
                    onChange={(e) => handleInputChange("guests", parseInt(e.target.value) || 1)}
                  />
                  {formData.accommodationType && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.accommodationType === "maison_70m2" ? "Maximum 5 personnes" : "Maximum 5 personnes (2 adultes + 3 enfants)"}
                    </p>
                  )}
                  {errors.guests && (
                    <p className="text-sm text-destructive mt-1">{errors.guests}</p>
                  )}
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Type d'hébergement
                  </Label>
                    <Select value={formData.accommodationType} onValueChange={(value) => {
                      handleInputChange("accommodationType", value);
                      // Reset dates when accommodation type changes to refresh availability
                      setCheckInDate(undefined);
                      setCheckOutDate(undefined);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un hébergement" />
                      </SelectTrigger>
                      <SelectContent>
                        {accommodationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div>{type.label}</div>
                              <div className="text-xs text-muted-foreground">
                                À partir de 160€/nuit • Pieds dans l'eau
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                  </Select>
                  {errors.accommodationType && (
                    <p className="text-sm text-destructive mt-1">{errors.accommodationType}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="specialRequests">Demandes spéciales (optionnel)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Allergies, préférences, occasions spéciales..."
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading || availabilityLoading} 
                  className="w-full" 
                  size="lg"
                >
                  {loading ? "Réservation en cours..." : "Confirmer la réservation"}
                </Button>
                
                {formData.accommodationType && (
                  <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                    <Info className="w-4 h-4 inline mr-2" />
                    Les dates en gris ne sont pas disponibles pour ce type d'hébergement.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Résumé de la réservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {checkInDate && checkOutDate && (
                <div>
                  <h3 className="font-semibold mb-2">Dates</h3>
                  <p className="text-sm text-muted-foreground">
                    Du {format(checkInDate, "dd/MM/yyyy")} au {format(checkOutDate, "dd/MM/yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} nuit(s)
                  </p>
                  
                  {/* Détail des prix par saison */}
                  {formData.accommodationType && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                      <p className="font-medium text-blue-900 mb-1">Tarification par saison :</p>
                      {(() => {
                        const current = new Date(checkInDate);
                        const end = new Date(checkOutDate);
                        const nights = Math.ceil((end.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
                        const seasons: { [key: string]: number } = {};
                        
                        for (let i = 0; i < nights; i++) {
                          const price = getSeasonalPrice(current);
                          const season = getSeasonName(price);
                          seasons[season] = (seasons[season] || 0) + 1;
                          current.setDate(current.getDate() + 1);
                        }
                        
                        return Object.entries(seasons).map(([season, count]) => (
                          <div key={season} className="text-blue-700">
                            {count} nuit{count > 1 ? 's' : ''} en {season}
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Invités</h3>
                <p className="text-sm text-muted-foreground">{formData.guests} personne(s)</p>
              </div>

              {formData.accommodationType && (
                <div>
                  <h3 className="font-semibold mb-2">Hébergement</h3>
                  <p className="text-sm text-muted-foreground">
                    {accommodationTypes.find(type => type.value === formData.accommodationType)?.label}
                  </p>
                </div>
              )}

              {totalPrice > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">{totalPrice}€</span>
                  </div>
                </div>
              )}

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  ✓ Annulation gratuite jusqu'à 48h avant l'arrivée<br/>
                  ✓ Confirmation immédiate par email<br/>
                  ✓ Paiement sécurisé<br/>
                  ✓ Situation exceptionnelle pieds dans l'eau
                </p>
                <div className="mt-3 text-xs text-muted-foreground border-t pt-2">
                  <strong>Tarifs saisonniers :</strong><br/>
                  • Haute saison (Jul-Août, Noël) : 230€/nuit<br/>
                  • Moyenne saison : 200€/nuit<br/>
                  • Basse saison : 160€/nuit
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}