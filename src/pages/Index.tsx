
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import EligibilitySection from '@/components/EligibilitySection';
import AdvantagesSection from '@/components/AdvantagesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import StickyContactButton from '@/components/StickyContactButton';
import Footer from '@/components/Footer';

const Index = () => {
  // Mise à jour du titre de la page et des méta-données
  useEffect(() => {
    document.title = "Renov&moi | Aides MaPrimeRénov' jusqu'à 65 000€ pour votre rénovation énergétique";
    
    // Mettre à jour les méta-données pour l'optimisation SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content", 
        "Renov&moi vous accompagne pour obtenir jusqu'à 65 000€ d'aides MaPrimeRénov' pour vos travaux de rénovation énergétique. Simulation gratuite, démarches simplifiées et artisans certifiés RGE."
      );
    }
  }, []);

  return (
    <div className="bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <EligibilitySection />
      <AdvantagesSection />
      <TestimonialsSection />
      <FaqSection />
      <StickyContactButton />
      <Footer />
    </div>
  );
};

export default Index;
