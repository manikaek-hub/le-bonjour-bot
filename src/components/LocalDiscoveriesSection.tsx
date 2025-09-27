import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Clock, Star } from "lucide-react";

const localDiscoveries = [
  {
    title: "Le Goéland 1937",
    description: "Restaurant face à la mer avec vue panoramique sur la Manche",
    category: "Restaurant",
    image: "/api/placeholder/400/250",
    link: "https://www.instagram.com/legoeland1937_/?hl=fr",
    type: "instagram",
    location: "Fermanville",
    rating: 4.8,
    openingHours: "12h-22h"
  },
  {
    title: "Ferme de Renouville",
    description: "Producteurs locaux, circuits courts et authenticité normande",
    category: "Producteur Local",
    image: "/api/placeholder/400/250",
    link: "https://fermederenouville.com/",
    type: "website",
    location: "Renouville",
    rating: 4.9,
    openingHours: "9h-18h"
  },
  {
    title: "Phare du Cap Lévi",
    description: "Monument historique offrant une vue imprenable sur la côte",
    category: "Patrimoine",
    image: "/api/placeholder/400/250",
    link: "https://www.encotentin.fr/patrimoine-culturel/phare-du-cap-levi/",
    type: "website",
    location: "Fermanville",
    rating: 4.7,
    openingHours: "10h-17h"
  },
  {
    title: "La Maison Rouge",
    description: "Restaurant gastronomique célébrant les saveurs du terroir",
    category: "Gastronomie",
    image: "/api/placeholder/400/250",
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
    image: "/api/placeholder/400/250",
    link: "https://www.maison-gosselin.fr/",
    type: "website",
    location: "Cherbourg",
    rating: 4.9,
    openingHours: "9h-19h"
  }
];

export default function LocalDiscoveriesSection() {
  const handleDiscoveryClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
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
            <div className="aspect-video bg-gradient-ocean flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                </div>
                <h3 className="text-2xl font-semibold mb-2">La Pointe du Cotentin</h3>
                <p className="text-white/80">Découvrez la beauté sauvage de notre région</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>

        {/* Discoveries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localDiscoveries.map((discovery, index) => (
            <Card 
              key={discovery.title}
              className="group cursor-pointer overflow-hidden border-0 shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleDiscoveryClick(discovery.link)}
            >
              <div className="relative overflow-hidden">
                <div className="aspect-video bg-gradient-nature"></div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {discovery.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-foreground" />
                  </div>
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
                  {discovery.type === 'instagram' ? 'Voir sur Instagram' : 'Visiter le site'}
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