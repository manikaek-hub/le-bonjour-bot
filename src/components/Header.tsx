import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Shield, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut, loading } = useAuth();
  const { isAdmin } = useAdmin();
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span className="hidden md:inline">{user.email}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5 text-sm">
                          <div className="font-medium">{user.email}</div>
                          <div className="text-xs text-muted-foreground">
                            {isAdmin ? "Administrateur" : "Utilisateur"}
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate("/mes-reservations")}>
                          Mes réservations
                        </DropdownMenuItem>
                        {isAdmin && (
                          <DropdownMenuItem onClick={() => navigate("/admin")}>
                            <Shield className="mr-2 h-4 w-4" />
                            Administration
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={signOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Déconnexion
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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