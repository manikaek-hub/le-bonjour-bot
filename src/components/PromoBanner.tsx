import { X } from "lucide-react";
import { useState } from "react";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-ocean text-primary-foreground py-3 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="text-sm md:text-base font-medium">
            🌊 <strong>Offre Spéciale Automne :</strong> -15% sur les séjours de 3 nuits minimum ! 
            <span className="ml-2 bg-white/20 px-2 py-1 rounded text-xs">
              Code: AUTOMNE15
            </span>
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Fermer la bannière"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;