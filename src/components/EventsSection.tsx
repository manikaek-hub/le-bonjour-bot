import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, MapPin, Euro, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  dates: string;
  location: string;
  price: string;
  image_url: string;
  external_link: string;
}

const categoryColors = {
  "Nautisme": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Gastronomie": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Patrimoine": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Art et artisanat": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Sport": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
};

export default function EventsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
        // Use fallback events if database fetch fails
        setEvents(getFallbackEvents());
      } else {
        setEvents(data || getFallbackEvents());
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(getFallbackEvents());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackEvents = (): Event[] => [
    {
      id: "1",
      title: "Drheam Cup",
      description: "Compétition nautique internationale dans le port de Cherbourg",
      category: "Nautisme",
      dates: "11-15 juillet 2024",
      location: "Cherbourg-en-Cotentin",
      price: "Gratuit",
      image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      external_link: "https://www.encotentin.fr/temps-fort/drheam-cup/"
    },
    {
      id: "2",
      title: "Aoûtcider",
      description: "Festival célébrant le cidre et les traditions normandes",
      category: "Gastronomie",
      dates: "31 août 2024",
      location: "Rauville la Bigot",
      price: "Gratuit",
      image_url: "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=800&h=600&fit=crop",
      external_link: "https://www.encotentin.fr/temps-fort/aoutcider/"
    },
    {
      id: "3",
      title: "Grand Océan",
      description: "Festival maritime et culturel du Cotentin",
      category: "Nautisme",
      dates: "13-15 septembre 2024",
      location: "Cotentin",
      price: "Gratuit",
      image_url: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop",
      external_link: "https://www.encotentin.fr/temps-fort/grand-ocean/"
    }
  ];

  const handleEventClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-ocean bg-clip-text text-transparent">
            Événements du Cotentin
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez les temps forts de notre région. Des événements authentiques qui rythment 
            la vie cotentinaise et enrichiront votre séjour d'expériences inoubliables.
          </p>
        </div>

        {/* Events Carousel */}
        <div className="relative mb-16">
          {/* Navigation Buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollLeft}
              className="w-10 h-10 p-0 rounded-full shadow-medium hover:shadow-large transition-all duration-300"
              aria-label="Événement précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollRight}
              className="w-10 h-10 p-0 rounded-full shadow-medium hover:shadow-large transition-all duration-300"
              aria-label="Événement suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="flex-shrink-0 w-80 animate-pulse">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded mb-3"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-10 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              events.map((event, index) => (
                <Card 
                  key={event.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2 animate-fade-in-up flex-shrink-0 w-80"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    scrollSnapAlign: 'start'
                  }}
                  onClick={() => handleEventClick(event.external_link)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.image_url}
                      alt={event.title}
                      className="aspect-video object-cover w-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant="secondary" 
                        className={`${categoryColors[event.category as keyof typeof categoryColors]} border-0`}
                      >
                        {event.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-3">
                      {event.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.dates}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Euro className="w-4 h-4" />
                        <span>{event.price}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    >
                      En savoir plus
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up">
          <div className="bg-card rounded-2xl p-8 shadow-medium">
            <h3 className="text-2xl font-semibold mb-4">Plus d'événements sur le site officiel</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Consultez le site officiel du Cotentin pour découvrir tous les événements, 
              festivals et animations qui vous attendent pendant votre séjour.
            </p>
            <Button 
              className="bg-gradient-ocean text-white hover:opacity-90"
              onClick={() => window.open('https://www.encotentin.fr/evenements/temps-forts/', '_blank')}
            >
              Voir tous les événements
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}