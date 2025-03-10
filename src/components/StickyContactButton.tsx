
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import ContactModal from './ContactModal';

const StickyContactButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        onClick={openModal}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-renovmoi-green text-white font-semibold py-3 px-6 shadow-lg hover:bg-renovmoi-green-dark transition-all duration-300 transform hover:scale-105 animate-pulse-slow"
      >
        <Phone size={20} />
        <span>Besoin d'aide ? Demandez à être rappelé !</span>
      </button>
      
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default StickyContactButton;
