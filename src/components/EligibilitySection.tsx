
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function EligibilitySection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postal_code: '',
    construction_year: '',
    property_type: '',
    occupants: '',
    occupancy_status: 'Propriétaire occupant', // Default value
    planned_works: [] as string[],
    income_range: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, planned_works: [...prev.planned_works, value] };
      } else {
        return { ...prev, planned_works: prev.planned_works.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('eligibility_submissions')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Demande soumise",
        description: "Nous vous contacterons bientôt pour discuter de votre éligibilité.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        postal_code: '',
        construction_year: '',
        property_type: '',
        occupants: '',
        occupancy_status: 'Propriétaire occupant',
        planned_works: [],
        income_range: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de la soumission du formulaire.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="eligibility" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Vérifiez votre éligibilité</h2>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations personnelles */}
              <div className="col-span-full">
                <h3 className="text-xl font-semibold mb-4">Informations personnelles</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    required
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="construction_year" className="block text-sm font-medium text-gray-700 mb-1">
                    Année de construction *
                  </label>
                  <input
                    type="text"
                    id="construction_year"
                    name="construction_year"
                    required
                    value={formData.construction_year}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="occupants" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre d'occupants *
                  </label>
                  <input
                    type="text"
                    id="occupants"
                    name="occupants"
                    required
                    value={formData.occupants}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="col-span-full">
                <label htmlFor="property_type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type de logement *
                </label>
                <select
                  id="property_type"
                  name="property_type"
                  required
                  value={formData.property_type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Sélectionnez</option>
                  <option value="Maison individuelle">Maison individuelle</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              
              {/* Nouvelles questions */}
              <div className="col-span-full mt-6">
                <h3 className="text-xl font-semibold mb-4">Informations complémentaires</h3>
              </div>
              
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dans ce logement, vous êtes : *
                </label>
                <div className="space-y-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="occupancy_status"
                        value="Propriétaire occupant"
                        checked={formData.occupancy_status === "Propriétaire occupant"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                        required
                      />
                      <span className="ml-2">Propriétaire occupant</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="occupancy_status"
                        value="Propriétaire d'une résidence secondaire"
                        checked={formData.occupancy_status === "Propriétaire d'une résidence secondaire"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Propriétaire d'une résidence secondaire</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="occupancy_status"
                        value="Locataire"
                        checked={formData.occupancy_status === "Locataire"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Locataire</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="col-span-full mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quels travaux envisagez-vous de réaliser ? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="planned_works"
                        value="Isolation"
                        checked={formData.planned_works.includes("Isolation")}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Isolation</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="planned_works"
                        value="Chauffage"
                        checked={formData.planned_works.includes("Chauffage")}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Chauffage</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="planned_works"
                        value="Ventilation"
                        checked={formData.planned_works.includes("Ventilation")}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Ventilation</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="planned_works"
                        value="Porte/fenêtre"
                        checked={formData.planned_works.includes("Porte/fenêtre")}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Porte/fenêtre</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="col-span-full mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pour déterminer vos aides, nous avons besoin d'une fourchette approximative de votre revenu fiscal : *
                </label>
                <div className="space-y-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="income_range"
                        value="Inférieur à 20 000€"
                        checked={formData.income_range === "Inférieur à 20 000€"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                        required
                      />
                      <span className="ml-2">Inférieur à 20 000€</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="income_range"
                        value="Entre 20 000€ et 40 000€"
                        checked={formData.income_range === "Entre 20 000€ et 40 000€"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Entre 20 000€ et 40 000€</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="income_range"
                        value="Supérieur à 40 000€"
                        checked={formData.income_range === "Supérieur à 40 000€"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Supérieur à 40 000€</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="col-span-full mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition duration-200 flex justify-center items-center"
                >
                  {loading ? (
                    <span>Envoi en cours...</span>
                  ) : (
                    <span>Vérifier mon éligibilité</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
