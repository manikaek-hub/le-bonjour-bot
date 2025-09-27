import { Helmet } from "react-helmet";
import HeroSection from "@/components/HeroSection";
import LocalDiscoveriesSection from "@/components/LocalDiscoveriesSection";
import EventsSection from "@/components/EventsSection";
import AccommodationSection from "@/components/AccommodationSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RegionSection from "@/components/RegionSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>FortJoret Resort - Fermanville, Normandie | Hébergement de Luxe Face à la Mer</title>
        <meta name="description" content="Découvrez FortJoret Resort à Fermanville, votre refuge de luxe en Normandie. Suites panoramiques face à la Manche, architecture normande authentique." />
      </Helmet>
      <StructuredData />
      
      <div className="relative">
        <Header />
        <main className="min-h-screen bg-background">
          <HeroSection />
          <AccommodationSection />
          <LocalDiscoveriesSection />
          <EventsSection />
          <WhyChooseUsSection />
          <TestimonialsSection />
          <RegionSection />
          <FAQSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;