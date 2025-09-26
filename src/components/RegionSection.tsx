import { Card, CardContent } from "@/components/ui/card";

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
        
        <div className="mt-16 bg-gradient-coastal rounded-2xl p-8 md:p-12 text-center shadow-elegant">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Votre Base d'Exploration Normande
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Depuis le FortJoret Resort, partez à la découverte des plages du Débarquement, 
            des jardins de Giverny, des fromageries traditionnelles et des marchés locaux. 
            La Normandie authentique vous attend.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegionSection;