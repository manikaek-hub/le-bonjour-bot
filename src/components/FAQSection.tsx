import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Quels sont les horaires d'arrivée et de départ ?",
      answer: "L'arrivée se fait à partir de 16h et le départ avant 11h. Nous restons flexibles selon vos contraintes de transport, n'hésitez pas à nous contacter."
    },
    {
      question: "Y a-t-il un parking disponible ?",
      answer: "Oui, un parking privé gratuit est inclus pour votre véhicule. Vous pourrez vous garer en toute sécurité devant le logement."
    },
    {
      question: "La plage est-elle vraiment accessible à pied ?",
      answer: "Absolument ! Vous êtes au départ du sentier des douaniers, à seulement 50 mètres de la plage. L'accès est direct et vous profiterez de l'une des plus belles balades du Cotentin."
    },
    {
      question: "Le logement est-il adapté aux familles avec enfants ?",
      answer: "Tout à fait ! Avec 2 chambres (1 lit 160cm + 3 lits 90cm), le logement peut accueillir confortablement une famille. La plage à proximité est idéale pour les enfants."
    },
    {
      question: "Que comprend la cuisine équipée ?",
      answer: "La cuisine est entièrement équipée avec électroménager moderne (réfrigérateur, four, plaques de cuisson, micro-ondes), vaisselle complète et ustensiles pour préparer vos repas en toute simplicité."
    },
    {
      question: "Y a-t-il des commerces à proximité ?",
      answer: "Oui, le village de Fermanville dispose de commerces de proximité (boulangerie, épicerie). Pour plus de choix, Cherbourg se trouve à 15 minutes en voiture."
    },
    {
      question: "Peut-on utiliser la cheminée ?",
      answer: "Bien sûr ! La cheminée fonctionne parfaitement et nous fournissons le bois nécessaire. Rien de tel qu'une soirée au coin du feu avec le bruit des vagues en fond sonore !"
    },
    {
      question: "Les animaux sont-ils acceptés ?",
      answer: "Nous acceptons les animaux de compagnie sur demande préalable et moyennant un supplément. Merci de nous contacter avant votre réservation."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions pour préparer 
            au mieux votre séjour à FortJoret Resort.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-sm rounded-lg border-0 shadow-soft px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Vous n'avez pas trouvé la réponse à votre question ?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-primary hover:text-primary-glow font-semibold transition-colors"
          >
            Contactez-nous directement →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;