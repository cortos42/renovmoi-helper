
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Gestion du défilement pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-renovmoi-black font-bold text-xl md:text-2xl">
            <span className="text-renovmoi-green">Renov</span>&moi
          </Link>
          <span className="hidden md:block text-xs text-renovmoi-gray ml-2">par Techni-Conseil</span>
        </div>
        
        {/* Menu pour les écrans moyens et grands */}
        <div className="hidden md:flex items-center space-x-6 text-renovmoi-black">
          <button onClick={() => scrollToSection('services')} className="hover:text-renovmoi-green transition-colors">Services</button>
          <button onClick={() => scrollToSection('eligibilite')} className="hover:text-renovmoi-green transition-colors">Éligibilité</button>
          <button onClick={() => scrollToSection('avantages')} className="hover:text-renovmoi-green transition-colors">Avantages</button>
          <button onClick={() => scrollToSection('temoignages')} className="hover:text-renovmoi-green transition-colors">Témoignages</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-renovmoi-green transition-colors">Contact</button>
        </div>
        
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex items-center text-renovmoi-black">
            <Phone size={18} className="text-renovmoi-green mr-2" />
            <span className="font-medium">01 23 45 67 89</span>
          </div>
          <Button 
            onClick={() => scrollToSection('eligibilite')} 
            className="cta-button"
          >
            Vérifiez votre éligibilité
          </Button>
        </div>
        
        {/* Bouton du menu pour mobile */}
        <button onClick={toggleMenu} className="md:hidden text-renovmoi-black">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-lg animate-fade-in">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            <button onClick={() => scrollToSection('services')} className="text-left py-2 border-b border-gray-100">Services</button>
            <button onClick={() => scrollToSection('eligibilite')} className="text-left py-2 border-b border-gray-100">Éligibilité</button>
            <button onClick={() => scrollToSection('avantages')} className="text-left py-2 border-b border-gray-100">Avantages</button>
            <button onClick={() => scrollToSection('temoignages')} className="text-left py-2 border-b border-gray-100">Témoignages</button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-2 border-b border-gray-100">Contact</button>
            <div className="flex items-center pt-2">
              <Phone size={18} className="text-renovmoi-green mr-2" />
              <span className="font-medium">01 23 45 67 89</span>
            </div>
            <Button 
              onClick={() => scrollToSection('eligibilite')} 
              className="cta-button w-full mt-4"
            >
              Vérifiez votre éligibilité
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
