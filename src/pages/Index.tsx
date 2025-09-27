import HeroSection from "@/components/HeroSection";
import LocalDiscoveriesSection from "@/components/LocalDiscoveriesSection";
import AccommodationSection from "@/components/AccommodationSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RegionSection from "@/components/RegionSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <LocalDiscoveriesSection />
      <AccommodationSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <RegionSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
