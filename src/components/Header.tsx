import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg"></div>
            <h1 className="text-xl font-bold text-foreground">FortJoret Resort</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="text-muted-foreground hover:text-primary transition-colors">
              Accueil
            </a>
            <a href="#hebergements" className="text-muted-foreground hover:text-primary transition-colors">
              Hébergements
            </a>
            <a href="#galerie" className="text-muted-foreground hover:text-primary transition-colors">
              Galerie
            </a>
            <a href="#region" className="text-muted-foreground hover:text-primary transition-colors">
              La Région
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          
          <Button variant="ocean" size="lg">
            Réserver
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;