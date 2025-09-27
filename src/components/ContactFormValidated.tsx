import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Loader2 } from "lucide-react";

// Schema de validation sécurisé
const contactSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, { message: "Le prénom est requis" })
    .max(50, { message: "Le prénom doit faire moins de 50 caractères" })
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, { message: "Le prénom contient des caractères invalides" }),
  lastName: z.string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(50, { message: "Le nom doit faire moins de 50 caractères" })
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, { message: "Le nom contient des caractères invalides" }),
  email: z.string()
    .trim()
    .email({ message: "Format d'email invalide" })
    .max(255, { message: "L'email doit faire moins de 255 caractères" }),
  checkin: z.string()
    .min(1, { message: "Date d'arrivée requise" })
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, { message: "La date d'arrivée doit être aujourd'hui ou ultérieure" }),
  checkout: z.string()
    .min(1, { message: "Date de départ requise" }),
  guests: z.number()
    .min(1, { message: "Au moins 1 invité requis" })
    .max(10, { message: "Maximum 10 invités autorisés" }),
  message: z.string()
    .max(1000, { message: "Le message doit faire moins de 1000 caractères" })
    .optional(),
}).refine((data) => {
  const checkinDate = new Date(data.checkin);
  const checkoutDate = new Date(data.checkout);
  return checkoutDate > checkinDate;
}, {
  message: "La date de départ doit être après la date d'arrivée",
  path: ["checkout"],
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactFormValidated() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    checkin: "",
    checkout: "",
    guests: 2,
    message: "",
  });
  const { toast } = useToast();

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Sécurisation des paramètres URL pour WhatsApp
      const safeFirstName = encodeURIComponent(formData.firstName);
      const safeLastName = encodeURIComponent(formData.lastName);
      const safeEmail = encodeURIComponent(formData.email);
      const safeMessage = encodeURIComponent(formData.message || "");
      
      const whatsappMessage = `Bonjour ! Je souhaite faire une réservation au FortJoret Resort.

👤 Nom: ${safeFirstName} ${safeLastName}
📧 Email: ${safeEmail}
📅 Arrivée: ${formData.checkin}
📅 Départ: ${formData.checkout}
👥 Invités: ${formData.guests}

${safeMessage ? `💬 Message: ${safeMessage}` : ''}

Merci !`;

      const whatsappUrl = `https://wa.me/33233000000?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Simuler une latence pour UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Demande envoyée !",
        description: "Votre demande de réservation va être envoyée via WhatsApp",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        checkin: "",
        checkout: "",
        guests: 2,
        message: "",
      });

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-elegant">
      <CardContent className="p-8">
        <h3 className="text-xl font-bold text-foreground mb-6">
          Demande de Réservation
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input 
                id="firstName" 
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Votre prénom"
                disabled={loading}
                className={errors.firstName ? "border-destructive" : ""}
                maxLength={50}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input 
                id="lastName" 
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Votre nom"
                disabled={loading}
                className={errors.lastName ? "border-destructive" : ""}
                maxLength={50}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="votre.email@example.com"
              disabled={loading}
              className={errors.email ? "border-destructive" : ""}
              maxLength={255}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkin">Date d'arrivée</Label>
              <Input 
                id="checkin" 
                type="date"
                value={formData.checkin}
                onChange={(e) => handleInputChange("checkin", e.target.value)}
                disabled={loading}
                className={errors.checkin ? "border-destructive" : ""}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.checkin && (
                <p className="text-sm text-destructive mt-1">{errors.checkin}</p>
              )}
            </div>
            <div>
              <Label htmlFor="checkout">Date de départ</Label>
              <Input 
                id="checkout" 
                type="date"
                value={formData.checkout}
                onChange={(e) => handleInputChange("checkout", e.target.value)}
                disabled={loading}
                className={errors.checkout ? "border-destructive" : ""}
                min={formData.checkin || new Date().toISOString().split('T')[0]}
              />
              {errors.checkout && (
                <p className="text-sm text-destructive mt-1">{errors.checkout}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="guests">Nombre d'invités</Label>
            <Input 
              id="guests" 
              type="number" 
              min="1" 
              max="10"
              value={formData.guests}
              onChange={(e) => handleInputChange("guests", parseInt(e.target.value) || 1)}
              disabled={loading}
              className={errors.guests ? "border-destructive" : ""}
            />
            {errors.guests && (
              <p className="text-sm text-destructive mt-1">{errors.guests}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="message">Message (optionnel)</Label>
            <Textarea 
              id="message" 
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Partagez-nous vos demandes particulières ou questions..."
              rows={4}
              disabled={loading}
              className={errors.message ? "border-destructive" : ""}
              maxLength={1000}
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {formData.message?.length || 0}/1000 caractères
            </p>
          </div>
          
          <Button 
            type="submit"
            variant="ocean" 
            size="lg" 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "📞 Envoyer ma Demande de Réservation"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}