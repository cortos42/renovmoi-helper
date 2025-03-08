
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "q1",
    question: "Qu'est-ce que MaPrimeRénov' ?",
    answer: "MaPrimeRénov' est une aide financière de l'État destinée aux propriétaires souhaitant réaliser des travaux de rénovation énergétique dans leur logement. Elle permet de financer jusqu'à 65 000€ de travaux selon votre situation et votre projet."
  },
  {
    id: "q2",
    question: "Qui peut bénéficier des aides à la rénovation énergétique ?",
    answer: "Les aides sont accessibles aux propriétaires occupants et bailleurs dont le logement a plus de 15 ans. Les montants varient selon les revenus du foyer, le type de travaux et leur impact sur la performance énergétique du logement."
  },
  {
    id: "q3",
    question: "Quels types de travaux sont éligibles aux aides ?",
    answer: "Les travaux éligibles comprennent principalement l'isolation thermique (murs, toiture, planchers), le remplacement des systèmes de chauffage, la ventilation, le changement des menuiseries, et la rénovation globale visant une amélioration significative de la performance énergétique."
  },
  {
    id: "q4",
    question: "Pourquoi choisir Renov&moi pour mon projet ?",
    answer: "Renov&moi vous offre un accompagnement complet et personnalisé pour maximiser vos aides et garantir des travaux de qualité. Nous prenons en charge toutes les démarches administratives et sélectionnons rigoureusement des artisans certifiés RGE pour réaliser vos travaux."
  },
  {
    id: "q5",
    question: "Comment se déroule l'accompagnement avec Renov&moi ?",
    answer: "Notre accompagnement comprend une simulation d'aides personnalisée, un audit énergétique de votre logement, le montage complet de votre dossier, la sélection d'artisans certifiés RGE, le suivi des travaux et une garantie de résultat sur les économies d'énergie réalisées."
  },
  {
    id: "q6",
    question: "Combien de temps durent les travaux de rénovation énergétique ?",
    answer: "La durée des travaux varie selon leur nature et l'ampleur du projet. Une rénovation par étapes peut s'étaler sur quelques jours à quelques semaines, tandis qu'une rénovation globale peut prendre plusieurs mois. Nous établissons un planning précis avec vous dès le début du projet."
  }
];

const FaqSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Questions fréquentes</h2>
          <p className="text-lg text-renovmoi-gray">
            Retrouvez les réponses aux questions les plus fréquemment posées sur la rénovation énergétique et les aides disponibles.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-renovmoi-gray">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-renovmoi-gray mb-6">
              Vous avez d'autres questions ? N'hésitez pas à nous contacter, notre équipe est à votre disposition.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="secondary-button"
            >
              Contactez-nous
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
