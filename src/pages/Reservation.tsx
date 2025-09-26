import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CalendarDays, Users, Home, ArrowLeft } from "lucide-react";
import { z } from "zod";

const reservationSchema = z.object({
  checkInDate: z.string().min(1, "Date d'arrivée requise"),
  checkOutDate: z.string().min(1, "Date de départ requise"),
  guests: z.number().min(1, "Nombre d'invités requis").max(20, "Maximum 20 invités"),
  accommodationType: z.string().min(1, "Type d'hébergement requis"),
  specialRequests: z.string().optional(),
}).refine((data) => new Date(data.checkInDate) >= new Date(new Date().setHours(0, 0, 0, 0)), {
  message: "La date d'arrivée doit être aujourd'hui ou ultérieure",
  path: ["checkInDate"],
}).refine((data) => new Date(data.checkOutDate) > new Date(data.checkInDate), {
  message: "La date de départ doit être après la date d'arrivée",
  path: ["checkOutDate"],
});

const accommodationTypes = [
  { value: "villa_luxe", label: "Villa de Luxe", price: 450 },
  { value: "suite_familiale", label: "Suite Familiale", price: 320 },
  { value: "chambre_vue_mer", label: "Chambre Vue Mer", price: 280 },
  { value: "chambre_standard", label: "Chambre Standard", price: 180 },
];

export default function Reservation() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: 2,
    accommodationType: "",
    specialRequests: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    try {
      reservationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const calculateTotalPrice = () => {
    if (!formData.checkInDate || !formData.checkOutDate || !formData.accommodationType) {
      return 0;
    }

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    const accommodation = accommodationTypes.find(type => type.value === formData.accommodationType);
    const basePrice = accommodation?.price || 0;
    
    return nights * basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!user) return;

    setLoading(true);

    try {
      const totalPrice = calculateTotalPrice();

      // Créer la réservation
      const { data: reservation, error } = await supabase
        .from("reservations")
        .insert({
          user_id: user.id,
          check_in_date: formData.checkInDate,
          check_out_date: formData.checkOutDate,
          guests: formData.guests,
          accommodation_type: formData.accommodationType,
          total_price: totalPrice,
          special_requests: formData.specialRequests || null,
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

      // Récupérer les informations du profil utilisateur
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("user_id", user.id)
        .single();

      const userName = profile && (profile.first_name || profile.last_name) 
        ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
        : user.email?.split('@')[0] || 'Client';

      // Envoyer l'email de confirmation
      try {
        await supabase.functions.invoke('send-reservation-email', {
          body: {
            userEmail: user.email,
            userName: userName,
            reservationId: reservation.id.substring(0, 8).toUpperCase(),
            checkInDate: formData.checkInDate,
            checkOutDate: formData.checkOutDate,
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
        title: "Réservation créée !",
        description: `Votre réservation de ${totalPrice}€ a été créée avec succès. Un email de confirmation vous a été envoyé.`,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
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
                Réservez votre séjour au FortJoret Resort
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkInDate">Date d'arrivée</Label>
                    <Input
                      id="checkInDate"
                      type="date"
                      value={formData.checkInDate}
                      onChange={(e) => handleInputChange("checkInDate", e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.checkInDate && (
                      <p className="text-sm text-destructive mt-1">{errors.checkInDate}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="checkOutDate">Date de départ</Label>
                    <Input
                      id="checkOutDate"
                      type="date"
                      value={formData.checkOutDate}
                      onChange={(e) => handleInputChange("checkOutDate", e.target.value)}
                      min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                    />
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
                    max="20"
                    value={formData.guests}
                    onChange={(e) => handleInputChange("guests", parseInt(e.target.value) || 1)}
                  />
                  {errors.guests && (
                    <p className="text-sm text-destructive mt-1">{errors.guests}</p>
                  )}
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Type d'hébergement
                  </Label>
                  <Select value={formData.accommodationType} onValueChange={(value) => handleInputChange("accommodationType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un hébergement" />
                    </SelectTrigger>
                    <SelectContent>
                      {accommodationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label} - {type.price}€/nuit
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

                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  {loading ? "Réservation en cours..." : "Confirmer la réservation"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Résumé de la réservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.checkInDate && formData.checkOutDate && (
                <div>
                  <h3 className="font-semibold mb-2">Dates</h3>
                  <p className="text-sm text-muted-foreground">
                    Du {new Date(formData.checkInDate).toLocaleDateString('fr-FR')} au {new Date(formData.checkOutDate).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {Math.ceil((new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) / (1000 * 60 * 60 * 24))} nuit(s)
                  </p>
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
                  ✓ Paiement sécurisé
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}