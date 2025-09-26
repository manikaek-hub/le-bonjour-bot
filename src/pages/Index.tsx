import Header from "@/components/Header";
import PromoBanner from "@/components/PromoBanner";
import HeroSection from "@/components/HeroSection";
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
      <PromoBanner />
      <Header />
      <HeroSection />
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
