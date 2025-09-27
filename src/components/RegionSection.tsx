import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Footprints, Mountain } from "lucide-react";

const RegionSection = () => {
  const attractions = [
    {
      title: "Cherbourg-en-Cotentin",
      description: "Cité de la Mer, Port militaire, Architecture navale",
      distance: "15 min"
    },
    {
      title: "Cap de la Hague",
      description: "Falaises spectaculaires, Phare de Goury, Randonnées",
      distance: "20 min"
    },
    {
      title: "Barfleur",
      description: "Plus Beaux Villages de France, Port de pêche authentique",
      distance: "25 min"
    },
    {
      title: "Mont Saint-Michel",
      description: "Merveille de l'Occident, Patrimoine mondial UNESCO",
      distance: "2h30"
    }
  ];

  return (
    <section id="region" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Découvrir la Normandie
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fermanville, porte d'entrée vers les plus beaux sites de la Manche et du Cotentin. 
            Une position privilégiée pour explorer les trésors normands.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((attraction, index) => (
            <Card 
              key={index} 
              className="bg-card/70 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {attraction.distance}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {attraction.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {attraction.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-coastal rounded-2xl p-8 md:p-12 shadow-elegant">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Votre Base d'Exploration Normande
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Depuis le 55 Fort Joret à Fermanville, partez à la découverte des plus beaux sentiers du Cotentin. 
              Votre logement est le point de départ idéal pour des balades authentiques.
            </p>
          </div>

          {/* Balades depuis Fort Joret */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Footprints className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Sentier des Douaniers</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>2h30 - Facile</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Départ directement depuis votre logement vers la côte sauvage. Découvrez les criques secrètes et les panoramas exceptionnels sur la mer.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Départ : 55 Fort Joret</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phare du Cap Lévi</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>1h30 - Facile</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Une balade familiale jusqu'au phare historique. Vue imprenable sur la rade de Cherbourg et les îles Anglo-Normandes.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>3 km depuis Fort Joret</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Footprints className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Boucle de Fermanville</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>3h - Modéré</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Circuit complet du village avec passage par les falaises, les plages et le centre historique. Parfait pour une demi-journée.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Circuit depuis Fort Joret</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Cartes détaillées et conseils disponibles directement dans votre logement
            </p>
            <Button variant="outline" className="bg-white/20 border-white/30 text-foreground hover:bg-white/30">
              Découvrir plus de randonnées
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionSection;