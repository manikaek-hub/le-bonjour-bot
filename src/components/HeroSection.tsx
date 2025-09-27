import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import seaViewFermanville from "@/assets/sea-view-fermanville.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleReservationClick = () => {
    console.log("Bouton réservation cliqué");
    navigate("/reservation");
  };

  const handleDiscoverClick = () => {
    console.log("Bouton découvrir cliqué");
    const element = document.getElementById('hebergements');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="accueil" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Section d'accueil du FortJoret Resort"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${seaViewFermanville})` }}
        role="img"
        aria-label="Vue panoramique sur la mer depuis Fermanville en Normandie"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-cursive font-bold mb-6 leading-tight bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
          FortJoret Resort
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
          Fermanville, Normandie
        </p>
        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Découvrez l'élégance normande au cœur de la côte du Cotentin. 
          Un refuge de luxe face à la mer, où tradition et modernité se rencontrent.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-10 min-w-[200px] bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-elegant hover:shadow-lg hover:scale-[1.02] animate-pulse-glow touch-manipulation select-none"
            aria-label="Réserver votre séjour au FortJoret Resort maintenant"
            onClick={handleReservationClick}
            onTouchEnd={handleReservationClick}
            style={{ touchAction: 'manipulation' }}
          >
            Réserver Maintenant
          </button>
          <button 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-10 min-w-[200px] bg-background/80 backdrop-blur-sm text-foreground border border-border/50 shadow-soft hover:bg-background hover:shadow-elegant touch-manipulation select-none"
            aria-label="Découvrir le FortJoret Resort et ses services"
            onClick={handleDiscoverClick}
            onTouchEnd={handleDiscoverClick}
            style={{ touchAction: 'manipulation' }}
          >
            Découvrir
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Faire défiler vers le bas pour découvrir plus de contenu"
        role="button"
        tabIndex={0}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;