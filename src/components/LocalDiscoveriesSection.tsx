import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Clock, Star } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

import restaurantVueMer from "@/assets/restaurant-vue-mer.jpg";
import fermeRenouville from "@/assets/ferme-renouville.jpg";
import phareCapLevi from "@/assets/phare-cap-levi.jpg";
import restaurantGastronomique from "@/assets/restaurant-gastronomique.jpg";
import chocolatierArtisan from "@/assets/chocolatier-artisan.jpg";
import goelandVueMer from "@/assets/goeland-vue-mer.jpg";
import goelandLogo from "@/assets/goeland-logo.png";

const localDiscoveries = [
  {
    title: "GOÉLAND 1937",
    description: "Bistro Mer Resto ☀️🍹🏄‍♂️ - Ambiance décontractée face à la mer",
    category: "Restaurant",
    image: goelandVueMer,
    logo: goelandLogo,
    link: "#", // Pas de redirection directe
    type: "local",
    location: "12 rue du Vieux Château, 50110 Bretteville",
    rating: 4.8,
    openingHours: "12h-22h"
  },
  {
    title: "Ferme de Renouville",
    description: "Producteurs locaux, circuits courts et authenticité normande",
    category: "Producteur Local",
    image: fermeRenouville,
    link: "https://fermederenouville.com/",
    type: "website",
    location: "Renouville",
    rating: 4.9,
    openingHours: "9h-18h"
  },
  {
    title: "Phare du Cap Lévi",
    description: "Phare carré de 28 mètres de haut érigé en 1858, offrant une vue imprenable sur la côte",
    category: "Patrimoine",
    image: phareCapLevi,
    link: "https://www.encotentin.fr/patrimoine-culturel/phare-du-cap-levi/",
    type: "website",
    location: "9 Village Le Cap Levi, Fermanville",
    rating: 4.7,
    openingHours: "Variable selon saison"
  },
  {
    title: "La Maison Rouge",
    description: "Restaurant gastronomique célébrant les saveurs du terroir",
    category: "Gastronomie",
    image: restaurantGastronomique,
    link: "https://www.restaurant-lamaisonrouge.fr/",
    type: "website",
    location: "Fermanville",
    rating: 4.6,
    openingHours: "19h-22h"
  },
  {
    title: "Maison Gosselin",
    description: "Artisan chocolatier et confiseur traditionnel normand",
    category: "Artisanat",
    image: chocolatierArtisan,
    link: "https://www.maison-gosselin.fr/",
    type: "website",
    location: "Cherbourg",
    rating: 4.9,
    openingHours: "9h-19h"
  }
];

export default function LocalDiscoveriesSection() {
  const handleDiscoveryClick = (link: string, type: string) => {
    if (type !== 'local') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-ocean bg-clip-text text-transparent">
            Pépites du Cotentin
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez les trésors authentiques de notre région. Des expériences uniques 
            sélectionnées avec passion pour enrichir votre séjour.
          </p>
        </div>

        {/* Video Hero */}
        <div className="mb-16 animate-fade-in-up">
          <div className="relative rounded-2xl overflow-hidden shadow-large">
            <iframe
              src="https://player.vimeo.com/video/853395554?badge=0&autopause=0&player_id=0&app_id=58479"
              title="La beauté du Cotentin"
              className="w-full aspect-video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-6 left-6 text-white pointer-events-none">
              <h3 className="text-2xl font-semibold mb-2">La Pointe du Cotentin</h3>
              <p className="text-white/90">Découvrez la beauté sauvage de notre région</p>
            </div>
          </div>
        </div>

        {/* Discoveries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localDiscoveries.map((discovery, index) => (
            <Card 
              key={discovery.title}
              className="group cursor-pointer overflow-hidden border-0 shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleDiscoveryClick(discovery.link, discovery.type)}
            >
              <div className="relative overflow-hidden">
                <OptimizedImage
                  src={discovery.image}
                  alt={discovery.title}
                  className="aspect-video object-cover w-full group-hover:scale-105 transition-transform duration-300"
                />
                {discovery.logo && (
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-medium">
                      <OptimizedImage
                        src={discovery.logo}
                        alt={`${discovery.title} logo`}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant="secondary" 
                    className="bg-white/90 text-foreground"
                  >
                    {discovery.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {discovery.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{discovery.rating}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {discovery.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{discovery.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{discovery.openingHours}</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                >
                  {discovery.type === 'instagram' ? 'RDV sur Facebook ou Instagram' : discovery.type === 'local' ? 'Plus d\'infos bientôt' : 'RDV sur Facebook ou Instagram'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-card rounded-2xl p-8 shadow-medium">
            <h3 className="text-2xl font-semibold mb-4">Une question sur la région ?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nos équipes locales connaissent tous les secrets du Cotentin. 
              Nous serons ravis de vous conseiller pour découvrir les plus beaux endroits.
            </p>
            <Button className="bg-gradient-ocean text-white hover:opacity-90">
              Demander des conseils
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}