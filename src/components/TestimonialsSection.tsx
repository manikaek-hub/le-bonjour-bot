import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie & Pierre L.",
      location: "Paris",
      rating: 5,
      comment: "Un séjour absolument magique ! La vue sur la mer est à couper le souffle et l'appartement est décoré avec un goût exquis. Nous reviendrons sans hésiter !",
      date: "Septembre 2024"
    },
    {
      name: "Sophie T.",
      location: "Lyon", 
      rating: 5,
      comment: "Parfait pour une escapade en famille. Les enfants ont adoré la plage accessible directement. L'accueil chaleureux et les équipements modernes font la différence.",
      date: "Août 2024"
    },
    {
      name: "Jean-Marc R.",
      location: "Rouen",
      rating: 5,
      comment: "La cheminée le soir avec le bruit des vagues... un pur moment de bonheur ! L'appartement est exactement conforme aux photos. Bravo pour cette belle rénovation !",
      date: "Octobre 2024"
    }
  ];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ils ont adoré leur séjour
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les avis authentiques de nos hôtes qui ont vécu 
            l'expérience FortJoret Resort.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-0 shadow-elegant hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                
                <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-primary/5 px-6 py-3 rounded-full">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">4.92/5</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">+ de 50 avis excellents</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;