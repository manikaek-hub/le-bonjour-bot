import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contactez-Nous
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prêt à vivre l'expérience FortJoret ? Contactez-nous pour réserver votre séjour 
            ou obtenir plus d'informations.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Informations de Contact
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Adresse</h4>
                    <p className="text-muted-foreground">
                      FortJoret Resort<br />
                      Fermanville, 50840<br />
                      Normandie, France
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">contact@fortjoret-resort.fr</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Téléphone</h4>
                    <p className="text-muted-foreground">+33 (0)2 33 XX XX XX</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-coastal rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-3">Horaires de Réception</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <span>15h00 - 20h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <span>08h00 - 11h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Réception:</span>
                  <span>09h00 - 18h00</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-elegant">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Demande de Réservation
              </h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre.email@example.com" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkin">Date d'arrivée</Label>
                    <Input id="checkin" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="checkout">Date de départ</Label>
                    <Input id="checkout" type="date" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="guests">Nombre d'invités</Label>
                  <Input id="guests" type="number" min="1" max="10" placeholder="2" />
                </div>
                
                <div>
                  <Label htmlFor="message">Message (optionnel)</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Partagez-nous vos demandes particulières ou questions..."
                    rows={4}
                  />
                </div>
                
                <Button variant="ocean" size="lg" className="w-full">
                  Envoyer la Demande
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;