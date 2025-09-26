import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Header = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

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
          
          <div className="flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => navigate("/mes-reservations")}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Mes réservations
                    </Button>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span className="hidden md:inline">{user.email}</span>
                    </div>
                    <Button
                      variant="coastal"
                      size="sm"
                      onClick={signOut}
                      className="flex items-center space-x-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden md:inline">Déconnexion</span>
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth">
                    <Button variant="coastal" size="lg">
                      Connexion
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="ocean" 
                  size="lg"
                  onClick={() => navigate("/reservation")}
                >
                  Réserver
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;