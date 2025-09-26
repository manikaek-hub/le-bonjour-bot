import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import bedroomTropical from "@/assets/bedroom-tropical.jpg";
import bedroomLoft from "@/assets/bedroom-loft.jpg";
import livingRoom from "@/assets/living-room.jpg";
import kitchenView from "@/assets/kitchen-view.jpg";
import kitchenDining from "@/assets/kitchen-dining.jpg";
import livingRoomFireplace from "@/assets/living-room-fireplace.jpg";
import entranceTiles from "@/assets/entrance-tiles.jpg";
import bedroomMultiple from "@/assets/bedroom-multiple.jpg";
import fireplaceDetail from "@/assets/fireplace-detail.jpg";
import seaViewFermanville from "@/assets/sea-view-fermanville.jpg";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AccommodationSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    { src: bedroomTropical, alt: "Chambre avec papier peint tropical" },
    { src: bedroomLoft, alt: "Chambre sous les combles" },
    { src: livingRoom, alt: "Salon avec mur bleu canard" },
    { src: kitchenView, alt: "Vue sur la cuisine moderne" },
    { src: kitchenDining, alt: "Cuisine et salle à manger" },
    { src: livingRoomFireplace, alt: "Salon avec cheminée" },
    { src: entranceTiles, alt: "Entrée avec tomettes hexagonales" },
    { src: bedroomMultiple, alt: "Chambre avec lits multiples" },
    { src: fireplaceDetail, alt: "Détail de la cheminée normande" },
    { src: seaViewFermanville, alt: "Vue sur la mer à Fermanville" }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
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
            <Card className="overflow-hidden shadow-elegant border-0 bg-card/50 backdrop-blur-sm relative group">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={images[currentImageIndex].src} 
                    alt={images[currentImageIndex].alt}
                    className="w-full h-80 object-cover transition-all duration-500"
                  />
                  
                  {/* Navigation buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Logement Unique Vue Mer
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Détendez-vous dans ce logement unique et tranquille offrant une vue plongeante sur la 
                côte sauvage de Fermanville, à couper le souffle ! Vous pourrez en profiter été comme 
                hiver, les espaces sont confortables avec sa cheminée dans le salon de 32m² ouverte sur 
                une cuisine équipée et une grande table à manger pour des moments de convivialités en 
                famille et entre amis.
              </p>
              <p className="text-muted-foreground/80 mb-6 text-sm leading-relaxed">
                La maison est au départ du chemin des douaniers, l'une des plus belles balades du 
                Cotentin et offre un accès direct à la plage.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">32m²</div>
                <div className="text-sm text-muted-foreground">Salon</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">5-7</div>
                <div className="text-sm text-muted-foreground">Couchages</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Salon 32m² avec cheminée</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">1 chambre lit 160cm + 1 chambre 3 lits 90cm</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Cuisine ouverte tout équipée</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Grande douche italienne</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Table à manger 6-8 personnes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Accès direct à la plage</span>
              </div>
            </div>
            
            <Button variant="ocean" size="lg" className="w-full md:w-auto animate-pulse-glow">
              🏖️ Réserver Maintenant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;