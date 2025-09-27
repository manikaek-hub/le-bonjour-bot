import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Shield, Bell, Search, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ModernHeader() {
  const { user, signOut, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-accent rounded-lg p-2 transition-colors" />
          
          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2 min-w-[300px]">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  {/* Notifications */}
                  <Button variant="ghost" size="sm" className="relative p-2">
                    <Bell className="w-5 h-5" />
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                    >
                      2
                    </Badge>
                  </Button>

                  {/* Quick reserve button */}
                  <Button
                    onClick={() => navigate("/reservation")}
                    className="bg-gradient-ocean hover:opacity-90 text-white border-0 shadow-medium hidden md:flex"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Réserver
                  </Button>

                  {/* User menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                        <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                          <AvatarFallback className="bg-gradient-ocean text-white text-sm font-medium">
                            {getInitials(user.email)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-2 bg-card/95 backdrop-blur-md border-border/50">
                      <div className="px-3 py-2 space-y-1">
                        <p className="text-sm font-medium">{user.email}</p>
                        <div className="flex items-center gap-2">
                          {isAdmin && (
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            Membre
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate("/mes-reservations")} className="gap-2 rounded-lg">
                        <User className="w-4 h-4" />
                        Mes réservations
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem onClick={() => navigate("/admin")} className="gap-2 rounded-lg">
                          <Shield className="w-4 h-4" />
                          Administration
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOut} className="gap-2 rounded-lg text-destructive focus:text-destructive">
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/auth">
                    <Button variant="ghost" className="text-sm">
                      Connexion
                    </Button>
                  </Link>
                  <Button
                    onClick={() => navigate("/reservation")}
                    className="bg-gradient-ocean hover:opacity-90 text-white border-0 shadow-medium"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Réserver
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}