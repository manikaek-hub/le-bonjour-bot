import OptimizedImage from "@/components/OptimizedImage";

const GalerieSection = () => {
  const images = [
    {
      src: "/src/assets/hero-resort.jpg",
      alt: "Vue panoramique de FortJoret Resort face à la mer",
      title: "Vue panoramique"
    },
    {
      src: "/src/assets/goeland-vue-mer.jpg", 
      alt: "Vue sur mer depuis le resort",
      title: "Vue sur mer"
    },
    {
      src: "/src/assets/living-room-fireplace.jpg",
      alt: "Salon avec cheminée dans un cadre authentique normand",
      title: "Salon avec cheminée"
    },
    {
      src: "/src/assets/bedroom-loft.jpg",
      alt: "Chambre en mezzanine avec poutres apparentes",
      title: "Chambre mezzanine"
    },
    {
      src: "/src/assets/kitchen-dining.jpg",
      alt: "Cuisine équipée avec espace repas",
      title: "Cuisine équipée"
    },
    {
      src: "/src/assets/accommodation-interior.jpg",
      alt: "Intérieur chaleureux du logement",
      title: "Intérieur chaleureux"
    },
    {
      src: "/src/assets/sea-view-fermanville.jpg",
      alt: "Vue sur la mer depuis Fermanville",
      title: "Côte de Fermanville"
    },
    {
      src: "/src/assets/phare-cap-levi.jpg",
      alt: "Phare du Cap Lévi à proximité",
      title: "Phare du Cap Lévi"
    },
    {
      src: "/src/assets/village-cotentin.png",
      alt: "Charme du village du Cotentin",
      title: "Village du Cotentin"
    }
  ];

  return (
    <section id="galerie" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Galerie Photos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez en images l'atmosphère unique de FortJoret Resort et les magnifiques paysages 
            du Cotentin qui vous entourent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl bg-card shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] relative">
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Venez découvrir par vous-même la beauté de nos hébergements et de la région
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-primary hover:text-primary-glow font-semibold transition-colors"
          >
            Réserver votre séjour →
          </a>
        </div>
      </div>
    </section>
  );
};

export default GalerieSection;