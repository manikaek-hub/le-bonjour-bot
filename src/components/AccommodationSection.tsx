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
import maison2Sunset from "@/assets/maison2-sunset.jpg";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AccommodationSection = () => {
  const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  
  // Images pour la maison 70m² (5 personnes)
  // Maison 1 - Vue panoramique en hauteur sur roche blanche et une vue à 180° de la mer
  const images1 = [
    { src: bedroomTropical, alt: "Chambre avec papier peint tropical" },
    { src: livingRoom, alt: "Salon avec mur bleu canard" },
    { src: kitchenView, alt: "Vue sur la cuisine moderne" },
    { src: kitchenDining, alt: "Cuisine et salle à manger" },
    { src: livingRoomFireplace, alt: "Salon avec cheminée" },
    { src: bedroomMultiple, alt: "Chambre avec lits multiples" },
    { src: fireplaceDetail, alt: "Détail de la cheminée normande" }
  ];

  // Images pour la maison 40m² (2 adultes + 3 enfants)
  // Maison 2 - Charme des tomettes anciennes, du parquet en bois, zelliges marocains de la salle de bain
  // Les pieds dans le sable, coucher de soleil face à la maison baignée de soleil grâce à des grandes baies vitrées
  // Terrain de pétanque et un grand terrain de 1500m²
  const images2 = [
    { src: bedroomLoft, alt: "Chambre sous les combles" },
    { src: entranceTiles, alt: "Entrée avec tomettes hexagonales" },
    { src: maison2Sunset, alt: "Coucher de soleil face à la maison" }
  ];

  const nextImage1 = () => {
    setCurrentImageIndex1((prev) => (prev + 1) % images1.length);
  };

  const prevImage1 = () => {
    setCurrentImageIndex1((prev) => (prev - 1 + images1.length) % images1.length);
  };

  const nextImage2 = () => {
    setCurrentImageIndex2((prev) => (prev + 1) % images2.length);
  };

  const prevImage2 = () => {
    setCurrentImageIndex2((prev) => (prev - 1 + images2.length) % images2.length);
  };
  return (
    <section id="hebergements" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos Hébergements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deux logements exceptionnels alliant charme normand et confort moderne, 
            pour une expérience inoubliable en bord de mer.
          </p>
        </div>
        
        {/* MAISON 70m² - 5 PERSONNES */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Card className="overflow-hidden shadow-elegant border-0 bg-card/50 backdrop-blur-sm relative group">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={images1[currentImageIndex1].src} 
                    alt={images1[currentImageIndex1].alt}
                    className="w-full h-80 object-cover transition-all duration-500"
                  />
                  
                  {/* Navigation buttons */}
                  <button
                    onClick={prevImage1}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  
                  <button
                    onClick={nextImage1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images1.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex1(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentImageIndex1 ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6 flex flex-col h-full">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Maison Vue Mer 70m² - 5 personnes
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Spacieuse maison de 70m² avec vue plongeante sur la côte sauvage de Fermanville. 
                Parfaite pour une famille ou un groupe d'amis, elle dispose de tout le confort moderne 
                avec sa cheminée dans le salon ouvert sur une cuisine équipée.
              </p>
              <p className="text-muted-foreground/80 mb-6 text-sm leading-relaxed">
                Idéale pour des séjours conviviaux avec accès direct au chemin des douaniers 
                et à la plage.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">70m²</div>
                <div className="text-sm text-muted-foreground">Surface</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">5</div>
                <div className="text-sm text-muted-foreground">Personnes max</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Salon spacieux avec cheminée</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">2 chambres (1 lit double + 3 lits simples)</span>
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
                <span className="text-muted-foreground">Vue mer panoramique</span>
              </div>
            </div>
            
            <div className="mt-auto pt-6">
              <div 
                style={{
                  width: '100%',
                  maxWidth: '300px'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '50px',
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))',
                    color: 'white',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px -6px hsl(var(--primary) / 0.4)',
                    WebkitTapHighlightColor: 'transparent',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    position: 'relative',
                    zIndex: 999,
                    touchAction: 'manipulation',
                    transition: 'all 0.3s ease'
                  }}
                  onTouchStart={() => {
                    console.log('TOUCH MAISON 70M²');
                  }}
                  onTouchEnd={(e) => {
                    console.log('TOUCH END MAISON 70M²');
                    e.preventDefault();
                    setTimeout(() => {
                      window.location.href = '/reservation';
                    }, 100);
                  }}
                  onMouseDown={(e) => {
                    console.log('MOUSE DOWN MAISON 70M²');
                    e.preventDefault();
                    window.location.href = '/reservation';
                  }}
                  onClick={(e) => {
                    console.log('CLICK MAISON 70M²');
                    e.preventDefault();
                    window.location.href = '/reservation';
                  }}
                >
                  🏡 Réserver cette maison
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAISON 40m² - 2 ADULTES + 3 ENFANTS */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <Card className="overflow-hidden shadow-elegant border-0 bg-card/50 backdrop-blur-sm relative group">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={images2[currentImageIndex2].src} 
                    alt={images2[currentImageIndex2].alt}
                    className="w-full h-80 object-cover transition-all duration-500"
                  />
                  
                  {/* Navigation buttons */}
                  <button
                    onClick={prevImage2}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  
                  <button
                    onClick={nextImage2}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images2.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex2(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentImageIndex2 ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6 md:order-1 flex flex-col h-full">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Petite Maison les pieds dans l'eau
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Charmante maison de 55m² spécialement conçue pour les familles avec jeunes enfants. 
                Située les pieds dans l'eau avec un accès direct à la plage depuis le jardin, 
                elle offre un cadre privilégié pour des vacances sereines en bord de mer.
              </p>
              <p className="text-muted-foreground/80 mb-6 text-sm leading-relaxed">
                Espace optimisé et chaleureux avec vue panoramique sur la mer, 
                à deux pas des sentiers côtiers pour vos balades matinales.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">55m²</div>
                <div className="text-sm text-muted-foreground">Surface</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">2+3</div>
                <div className="text-sm text-muted-foreground">Adultes + enfants</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Salon vue sur la mer ouvert sur cuisine équipée</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Chambre parentale 40m² au sol sous pente</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Coin enfants (3 lits superposés)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Salle TV</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Petite douche italienne</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Accès direct à la plage</span>
              </div>
            </div>
            
            <div className="mt-auto pt-6">
              <div 
                style={{
                  width: '100%',
                  maxWidth: '300px'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '50px',
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))',
                    color: 'white',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px -6px hsl(var(--primary) / 0.4)',
                    WebkitTapHighlightColor: 'transparent',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    position: 'relative',
                    zIndex: 999,
                    touchAction: 'manipulation',
                    transition: 'all 0.3s ease'
                  }}
                  onTouchStart={() => {
                    console.log('TOUCH MAISON 40M²');
                  }}
                  onTouchEnd={(e) => {
                    console.log('TOUCH END MAISON 40M²');
                    e.preventDefault();
                    setTimeout(() => {
                      window.location.href = '/reservation';
                    }, 100);
                  }}
                  onMouseDown={(e) => {
                    console.log('MOUSE DOWN MAISON 40M²');
                    e.preventDefault();
                    window.location.href = '/reservation';
                  }}
                  onClick={(e) => {
                    console.log('CLICK MAISON 40M²');
                    e.preventDefault();
                    window.location.href = '/reservation';
                  }}
                >
                  👨‍👩‍👧‍👦 Réserver pour famille
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;