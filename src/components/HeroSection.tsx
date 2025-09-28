import { useEffect, useState } from "react";
import seaViewFermanville from "@/assets/sea-view-fermanville.jpg";

const HeroSection = () => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const title = "FortJoret Resort";

  useEffect(() => {
    // Animation simple et fiable
    const timer = setInterval(() => {
      setVisibleLetters(prev => {
        if (prev >= title.length) {
          clearInterval(timer);
          return title.length;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [title.length]);

  useEffect(() => {
    // Afficher les informations de debug après le chargement
    const updateDebugInfo = () => {
      const screenWidth = document.getElementById('screen-width');
      const viewportWidth = document.getElementById('viewport-width');
      if (screenWidth) screenWidth.textContent = screen.width.toString();
      if (viewportWidth) viewportWidth.textContent = window.innerWidth.toString();
    };
    
    updateDebugInfo();
    window.addEventListener('resize', updateDebugInfo);
    
    return () => window.removeEventListener('resize', updateDebugInfo);
  }, []);

  return (
    <section 
      id="accueil" 
      className="relative min-h-screen flex items-center justify-center"
      aria-label="Section d'accueil du FortJoret Resort"
      style={{ touchAction: 'auto' }}
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
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ pointerEvents: 'auto' }}>
        <h1 className="text-5xl md:text-7xl font-cursive font-bold mb-6 leading-tight bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
          {title.split('').map((letter, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-300 ${
                index < visibleLetters 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
          Fermanville, Normandie
        </p>
        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Découvrez l'élégance normande au cœur de la côte du Cotentin. 
          Un refuge de luxe face à la mer, où tradition et modernité se rencontrent.
        </p>
        
        {/* Boutons responsive */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium h-12 px-10 min-w-[200px] bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-elegant cursor-pointer select-none animate-pulse-glow"
            onClick={() => window.location.href = "/reservation"}
          >
            Réserver Maintenant
          </div>
          <div 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium h-12 px-10 min-w-[200px] bg-background/80 backdrop-blur-sm text-foreground border border-border/50 shadow-soft cursor-pointer select-none"
            onClick={() => {
              const element = document.getElementById('hebergements');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Découvrir
          </div>
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