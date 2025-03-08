
import React from 'react';
import { TrendingUp, Zap, Clock, CreditCard, Award, Shield } from 'lucide-react';

const AdvantageCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow h-full flex flex-col">
      <div className="mb-4 text-renovmoi-green">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-renovmoi-black">{title}</h3>
      <p className="text-renovmoi-gray flex-grow">{description}</p>
    </div>
  );
};

const AdvantagesSection = () => {
  return (
    <section id="avantages" className="py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Les avantages de Renov&moi</h2>
          <p className="text-lg text-renovmoi-gray">
            Découvrez pourquoi des centaines de propriétaires nous font confiance pour leurs projets de rénovation énergétique.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AdvantageCard 
            icon={<TrendingUp size={28} />}
            title="Économies substantielles"
            description="Réduisez jusqu'à 30% votre facture d'énergie grâce à une rénovation adaptée à votre logement."
          />
          
          <AdvantageCard 
            icon={<Zap size={28} />}
            title="Performance énergétique"
            description="Améliorez le confort thermique de votre logement et augmentez sa valeur patrimoniale."
          />
          
          <AdvantageCard 
            icon={<Clock size={28} />}
            title="Gain de temps"
            description="Nous nous occupons de toutes les démarches administratives pour l'obtention des aides."
          />
          
          <AdvantageCard 
            icon={<CreditCard size={28} />}
            title="Financement optimisé"
            description="Profitez de MaPrimeRénov' et d'autres aides cumulables pour minimiser votre reste à charge."
          />
          
          <AdvantageCard 
            icon={<Award size={28} />}
            title="Expertise reconnue"
            description="Plus de 10 ans d'expérience et des centaines de projets réussis partout en France."
          />
          
          <AdvantageCard 
            icon={<Shield size={28} />}
            title="Qualité garantie"
            description="Travaux réalisés uniquement par des artisans certifiés RGE rigoureusement sélectionnés."
          />
        </div>
        
        <div className="mt-16 bg-renovmoi-green rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">Prêt à concrétiser votre projet ?</h3>
              <p className="opacity-90">Vérifiez votre éligibilité en quelques minutes et soyez rappelé par un expert.</p>
            </div>
            <button 
              onClick={() => document.getElementById('eligibilite')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-renovmoi-green font-semibold py-3 px-8 rounded-lg hover:bg-renovmoi-green-light/20 transition-colors duration-300"
            >
              Vérifiez votre éligibilité
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
