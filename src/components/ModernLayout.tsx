import { SidebarProvider } from "@/components/ui/sidebar";
import { ModernSidebar } from "@/components/ModernSidebar";
import ModernHeader from "@/components/ModernHeader";
import { useLocation } from "react-router-dom";

interface ModernLayoutProps {
  children: React.ReactNode;
}

export default function ModernLayout({ children }: ModernLayoutProps) {
  const location = useLocation();
  
  // Routes where we want to show the sidebar (admin routes only)
  const showSidebar = location.pathname.startsWith("/admin");

  if (!showSidebar) {
    // For homepage and public pages, use simple layout without sidebar
    return (
      <div className="min-h-screen w-full bg-background">
        {children}
      </div>
    );
  }

  // For admin pages, use sidebar layout
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex bg-gradient-soft">
        <ModernSidebar />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <ModernHeader />
          
          <main className="flex-1 overflow-auto">
            <div className="animate-fade-in-up">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}