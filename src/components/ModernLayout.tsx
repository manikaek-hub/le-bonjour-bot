import { SidebarProvider } from "@/components/ui/sidebar";
import { ModernSidebar } from "@/components/ModernSidebar";
import ModernHeader from "@/components/ModernHeader";
import { useLocation } from "react-router-dom";

interface ModernLayoutProps {
  children: React.ReactNode;
}

export default function ModernLayout({ children }: ModernLayoutProps) {
  const location = useLocation();
  
  // Routes where we want to show the sidebar
  const showSidebar = location.pathname !== "/" || true; // Always show for now

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex bg-gradient-soft">
        {showSidebar && <ModernSidebar />}
        
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