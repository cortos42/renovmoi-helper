
import React from 'react';
import { Phone } from 'lucide-react';

const StickyContactButton = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button 
      onClick={scrollToContact}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-renovmoi-green text-white font-semibold py-3 px-6 shadow-lg hover:bg-renovmoi-green-dark transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
    >
      <Phone size={20} />
      <span>Besoin d'aide ? Demandez à être rappelé !</span>
    </button>
  );
};

export default StickyContactButton;
