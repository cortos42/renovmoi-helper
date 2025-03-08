
import React from 'react';
import { FileCheck, Home, Wrench, Users, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="bg-renovmoi-green/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
        <div className="text-renovmoi-green">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-renovmoi-black">{title}</h3>
      <p className="text-renovmoi-gray">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Notre accompagnement complet</h2>
          <p className="text-lg text-renovmoi-gray">
            Techni-Conseil vous propose un service clé en main pour tous vos projets de rénovation énergétique. Notre équipe d'experts vous accompagne à chaque étape du processus.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<FileCheck size={28} />}
            title="Simulation d'aides"
            description="Estimation personnalisée des aides auxquelles vous êtes éligible selon votre profil et votre projet."
          />
          
          <ServiceCard 
            icon={<Home size={28} />}
            title="Audit énergétique"
            description="Analyse complète de votre logement pour identifier les travaux prioritaires et optimiser vos économies d'énergie."
          />
          
          <ServiceCard 
            icon={<Users size={28} />}
            title="Montage de dossier"
            description="Prise en charge administrative complète pour l'obtention des aides MaPrimeRénov' et autres subventions disponibles."
          />
          
          <ServiceCard 
            icon={<Shield size={28} />}
            title="Sélection d'artisans"
            description="Mise en relation avec des artisans certifiés RGE, rigoureusement sélectionnés pour la qualité de leur travail."
          />
          
          <ServiceCard 
            icon={<Wrench size={28} />}
            title="Suivi des travaux"
            description="Supervision complète du chantier, de la planification à la réception finale, pour garantir la qualité et le respect des délais."
          />
          
          <ServiceCard 
            icon={<CheckCircle2 size={28} />}
            title="Garantie de résultat"
            description="Engagement sur les économies d'énergie réalisées et suivi post-travaux pour assurer votre satisfaction."
          />
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            onClick={() => document.getElementById('eligibilite')?.scrollIntoView({ behavior: 'smooth' })}
            className="cta-button text-base"
          >
            Vérifiez votre éligibilité
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
