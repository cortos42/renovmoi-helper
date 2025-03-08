
import React from 'react';
import { Mail, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-renovmoi-black text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-renovmoi-green">Renov</span>&moi
            </h3>
            <p className="text-gray-300 mb-4">
              Service d'accompagnement complet pour vos projets de rénovation énergétique. Plus de 10 ans d'expertise à votre service.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">Simulation d'aides</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">Accompagnement administratif</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">Audit énergétique</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">Rénovation globale</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">Artisans certifiés RGE</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">À propos de nous</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">Témoignages clients</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-renovmoi-green transition-colors">Mentions légales</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="text-renovmoi-green mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-300">renovmoi@techni-conseils.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Renov&moi - Techni-Conseil. Tous droits réservés.
            </p>
            <ul className="flex space-x-4 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-renovmoi-green transition-colors">Politique de confidentialité</a>
              </li>
              <li>
                <a href="#" className="hover:text-renovmoi-green transition-colors">Mentions légales</a>
              </li>
              <li>
                <a href="#" className="hover:text-renovmoi-green transition-colors">CGV</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
