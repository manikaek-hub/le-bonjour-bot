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
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300" style={{ pointerEvents: 'auto' }}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg"></div>
            <h1 className="text-xl font-bold text-foreground">FortJoret Resort</h1>
          </div>
          
           <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navigation principale">
             <a href="/#accueil" className="text-muted-foreground hover:text-primary transition-colors" style={{ touchAction: 'manipulation' }}>
               Accueil
             </a>
             <a href="/#hebergements" className="text-muted-foreground hover:text-primary transition-colors" style={{ touchAction: 'manipulation' }}>
               Hébergements
             </a>
             <a href="/#region" className="text-muted-foreground hover:text-primary transition-colors" style={{ touchAction: 'manipulation' }}>
               La Région
             </a>
             <a href="/#contact" className="text-muted-foreground hover:text-primary transition-colors" style={{ touchAction: 'manipulation' }}>
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
                     className="text-lg text-muted-foreground hover:text-primary transition-colors py-2 block w-full"
                     onClick={() => setIsOpen(false)}
                     style={{ touchAction: 'manipulation' }}
                   >
                     Accueil
                   </a>
                   <a 
                     href="/#hebergements" 
                     className="text-lg text-muted-foreground hover:text-primary transition-colors py-2 block w-full"
                     onClick={() => setIsOpen(false)}
                     style={{ touchAction: 'manipulation' }}
                   >
                     Hébergements
                   </a>
                   <a 
                     href="/#region" 
                     className="text-lg text-muted-foreground hover:text-primary transition-colors py-2 block w-full"
                     onClick={() => setIsOpen(false)}
                     style={{ touchAction: 'manipulation' }}
                   >
                     La Région
                   </a>
                   <a 
                     href="/#contact" 
                     className="text-lg text-muted-foreground hover:text-primary transition-colors py-2 block w-full"
                     onClick={() => setIsOpen(false)}
                     style={{ touchAction: 'manipulation' }}
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
                         <DropdownMenuItem asChild>
                           <a href="/mes-reservations" className="flex items-center w-full">
                             Mes réservations
                           </a>
                         </DropdownMenuItem>
                         {isAdmin && (
                           <DropdownMenuItem asChild>
                             <a href="/admin" className="flex items-center w-full">
                               <Shield className="mr-2 h-4 w-4" />
                               Administration
                             </a>
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
                   <a href="/auth" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-background/80 backdrop-blur-sm text-foreground border border-border/50 shadow-soft hover:bg-background hover:shadow-elegant no-underline" style={{ touchAction: 'manipulation' }}>
                     Connexion
                   </a>
                 )}
                 <a 
                   href="/reservation"
                   className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-elegant hover:shadow-lg hover:scale-[1.02] no-underline"
                   style={{ touchAction: 'manipulation' }}
                 >
                   Réserver
                 </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;