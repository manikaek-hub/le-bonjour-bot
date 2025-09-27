import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { user, signOut, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg"></div>
            <h1 className="text-xl font-bold text-foreground">FortJoret Resort</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navigation principale">
            <a href="/#accueil" className="text-muted-foreground hover:text-primary transition-colors">
              Accueil
            </a>
            <a href="/#hebergements" className="text-muted-foreground hover:text-primary transition-colors">
              Hébergements
            </a>
            <a href="/#region" className="text-muted-foreground hover:text-primary transition-colors">
              La Région
            </a>
            <a href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" aria-label="Menu de navigation">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8" role="navigation" aria-label="Navigation mobile">
                  <a 
                    href="/#accueil" 
                    className="text-lg text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Accueil
                  </a>
                  <a 
                    href="/#hebergements" 
                    className="text-lg text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Hébergements
                  </a>
                  <a 
                    href="/#region" 
                    className="text-lg text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    La Région
                  </a>
                  <a 
                    href="/#contact" 
                    className="text-lg text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
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