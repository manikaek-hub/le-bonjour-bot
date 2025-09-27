import { MapPin, Wifi, Car, Waves, Coffee, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: <Waves className="w-8 h-8 text-primary" />,
      title: "Accès direct plage",
      description: "Sentier des douaniers à 50m, l'une des plus belles balades du Cotentin"
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Emplacement unique",
      description: "Vue panoramique sur la côte sauvage de Fermanville, à couper le souffle"
    },
    {
      icon: <Coffee className="w-8 h-8 text-primary" />,
      title: "Confort moderne",
      description: "Appartement entièrement rénové avec équipements haut de gamme"
    },
    {
      icon: <Car className="w-8 h-8 text-primary" />,
      title: "Parking gratuit",
      description: "Places de stationnement gratuites disponibles à proximité"
    },
    {
      icon: <Wifi className="w-8 h-8 text-primary" />,
      title: "Wifi haut débit", 
      description: "Connexion internet fibre pour rester connecté en toute simplicité"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Séjour sécurisé",
      description: "Accueil personnalisé et disponibilité 7j/7 pour votre tranquillité"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pourquoi choisir FortJoret Resort ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une expérience unique alliant confort moderne et authenticité normande 
            pour des séjours mémorables.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group bg-card/30 backdrop-blur-sm border-0 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;