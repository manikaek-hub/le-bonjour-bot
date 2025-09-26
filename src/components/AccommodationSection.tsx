import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import accommodationImage from "@/assets/accommodation-interior.jpg";

const AccommodationSection = () => {
  return (
    <section id="hebergements" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos Hébergements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des espaces de vie exceptionnels alliant charme normand et confort moderne, 
            pour une expérience inoubliable en bord de mer.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="overflow-hidden shadow-elegant border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <img 
                  src={accommodationImage} 
                  alt="Intérieur luxueux du resort"
                  className="w-full h-80 object-cover"
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Suite Panoramique
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Notre suite signature offre une vue imprenable sur la Manche. 
                Avec ses 45m² d'espace de vie, sa terrasse privée et ses finitions haut de gamme, 
                elle incarne l'art de vivre normand.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">45m²</div>
                <div className="text-sm text-muted-foreground">Surface</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">2-4</div>
                <div className="text-sm text-muted-foreground">Personnes</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Vue mer panoramique</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Terrasse privée avec mobilier</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Kitchenette équipée</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Salle de bain avec douche à l'italienne</span>
              </div>
            </div>
            
            <Button variant="ocean" size="lg" className="w-full md:w-auto">
              Voir les Disponibilités
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;