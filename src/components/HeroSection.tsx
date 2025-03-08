import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToEligibility = () => {
    const element = document.getElementById('eligibilite');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Arrière-plan avec gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-renovmoi-green-light/10 to-renovmoi-green/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/lovable-uploads/e8aae22e-5f40-414a-b0f4-813c543f0b5e.png')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
      </div>
      
      <div className="container mx-auto relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-renovmoi-black mb-6">
              Transformez votre maison, <span className="text-renovmoi-green">économisez</span> sur votre énergie
            </h1>
            
            <p className="text-lg md:text-xl text-renovmoi-black/80 mb-8">
              Bénéficiez de <span className="highlight-number">jusqu'à 65 000€</span> d'aides avec MaPrimeRénov' pour vos travaux de rénovation énergétique. Accompagnement complet par des experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={scrollToEligibility}
                className="cta-button text-base"
              >
                Vérifiez votre éligibilité
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="secondary-button text-base"
              >
                Découvrir nos services
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-md">
              <p className="text-renovmoi-black font-medium mb-3">
                <span className="text-renovmoi-green">✓</span> Plus de <span className="font-bold">10 ans d'expérience</span> en rénovation
              </p>
              <p className="text-renovmoi-black font-medium mb-3">
                <span className="text-renovmoi-green">✓</span> <span className="font-bold">Centaines de clients</span> satisfaits
              </p>
              <p className="text-renovmoi-black font-medium">
                <span className="text-renovmoi-green">✓</span> Artisans <span className="font-bold">certifiés RGE</span> pour tous vos travaux
              </p>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-renovmoi-green/10 rounded-full filter blur-3xl"></div>
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform rotate-1 card-shadow">
              <img 
                src="/lovable-uploads/e8aae22e-5f40-414a-b0f4-813c543f0b5e.png" 
                alt="Maison écologique avec étiquette énergétique" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <span className="bg-renovmoi-green text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">MaPrimeRénov'</span>
                <h3 className="text-white text-xl font-bold">Des aides pour tous vos projets</h3>
              </div>
            </div>
            <div className="absolute top-20 -right-4 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-renovmoi-black font-semibold">
                Jusquà <span className="text-renovmoi-green text-xl">65 000€</span> d'aides
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <span className="block text-sm text-renovmoi-gray mb-2">Découvrir</span>
        <ChevronDown size={28} className="mx-auto text-renovmoi-green animate-pulse-slow" />
      </div>
    </section>
  );
};

export default HeroSection;
