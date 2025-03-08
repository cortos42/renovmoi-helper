
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  content: string;
  project: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Thomas D.",
    location: "Lyon",
    rating: 5,
    content: "Renov&moi a transformé notre maison ! L'équipe nous a accompagnés dans toutes les démarches et nous avons obtenu plus de 15 000€ d'aides pour notre rénovation énergétique. Le résultat est bien au-delà de nos attentes.",
    project: "Isolation des combles et pompe à chaleur",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sophie M.",
    location: "Nantes",
    rating: 5,
    content: "Un accompagnement de A à Z, professionnel et attentif. Grâce à Renov&moi, nous avons pu réaliser nos travaux avec un reste à charge minime. Notre maison est maintenant bien plus confortable et économe en énergie.",
    project: "Rénovation globale",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Jean-Pierre L.",
    location: "Bordeaux",
    rating: 4,
    content: "Des conseillers compétents et à l'écoute qui ont su nous orienter vers les bonnes solutions pour notre maison ancienne. Les artisans sélectionnés étaient professionnels et soigneux. Je recommande vivement.",
    project: "Isolation thermique par l'extérieur",
    image: "https://randomuser.me/api/portraits/men/62.jpg"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow flex flex-col h-full">
      <div className="flex items-start mb-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-14 h-14 rounded-full mr-4 object-cover"
        />
        <div>
          <p className="font-semibold text-renovmoi-black">{testimonial.name}</p>
          <p className="text-sm text-renovmoi-gray">{testimonial.location}</p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-renovmoi-gray italic mb-4 flex-grow">"{testimonial.content}"</p>
      
      <div className="bg-gray-50 rounded-lg p-3 mt-auto">
        <p className="text-sm font-medium text-renovmoi-black">Projet: {testimonial.project}</p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="temoignages" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Ce que disent nos clients</h2>
          <p className="text-lg text-renovmoi-gray">
            Découvrez les témoignages de propriétaires qui ont fait confiance à Renov&moi pour leurs projets de rénovation énergétique.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <div className="bg-renovmoi-green/10 p-6 rounded-lg max-w-2xl text-center">
            <p className="text-lg font-medium text-renovmoi-black mb-2">
              Rejoignez nos <span className="text-renovmoi-green">centaines de clients satisfaits</span>
            </p>
            <p className="text-renovmoi-gray mb-4">
              Faites confiance à notre expertise et bénéficiez d'un accompagnement personnalisé pour tous vos projets de rénovation énergétique.
            </p>
            <button 
              onClick={() => document.getElementById('eligibilite')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-button"
            >
              Vérifiez votre éligibilité
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
