import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Calendar, 
  User, 
  Settings, 
  Users, 
  CreditCard, 
  BarChart3,
  Menu,
  X,
  Heart,
  MessageCircle,
  Search,
  PlusSquare
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const publicNavItems = [
  { title: "Accueil", url: "/", icon: Home },
  { title: "Réserver", url: "/reservation", icon: Calendar },
];

const userNavItems = [
  { title: "Mes Réservations", url: "/mes-reservations", icon: User },
];

const adminNavItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: BarChart3 },
  { title: "Réservations", url: "/admin/reservations", icon: Calendar },
  { title: "Utilisateurs", url: "/admin/users", icon: Users },
  { title: "Paiements", url: "/admin/payments", icon: CreditCard },
];

export function ModernSidebar() {
  const { state } = useSidebar();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => cn(
    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
    isActive(path)
      ? "bg-gradient-ocean text-white shadow-medium"
      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
  );

  const collapsed = state === "collapsed";

  return (
    <Sidebar
      className={cn(
        "border-r-0 bg-gradient-soft transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarContent className="p-4 space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-gradient-ocean rounded-xl flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg bg-gradient-ocean bg-clip-text text-transparent">
                FortJoret
              </h1>
              <p className="text-xs text-muted-foreground">Resort</p>
            </div>
          )}
        </div>

        {/* Navigation principale */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {publicNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                      {isActive(item.url) && (
                        <div className="absolute inset-0 bg-gradient-ocean rounded-xl opacity-0 group-hover:opacity-10 transition-opacity" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation utilisateur */}
        {user && (
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Mon Compte
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {userNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClassName(item.url)}>
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && (
                          <span className="truncate">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Navigation admin */}
        {isAdmin && (
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Administration
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClassName(item.url)}>
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && (
                          <span className="truncate">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Quick Actions */}
        {!collapsed && (
          <div className="space-y-2 pt-4 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
            >
              <Search className="w-4 h-4" />
              Recherche
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="w-4 h-4" />
              Support
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}