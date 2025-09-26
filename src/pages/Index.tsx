import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AccommodationSection from "@/components/AccommodationSection";
import RegionSection from "@/components/RegionSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AccommodationSection />
      <RegionSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
