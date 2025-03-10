import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, Home, Users, Calendar, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Checkbox } from "@/components/ui/checkbox";

const EligibilitySection = () => {
  const {
    toast
  } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    constructionYear: '',
    occupants: '',
    postalCode: '',
    email: '',
    phone: '',
    name: '',
    occupancyStatus: '',
    plannedWorks: [] as string[],
    incomeRange: ''
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      // Ajouter l'item au tableau
      setFormData({
        ...formData,
        plannedWorks: [...formData.plannedWorks, value]
      });
    } else {
      // Retirer l'item du tableau
      setFormData({
        ...formData,
        plannedWorks: formData.plannedWorks.filter(item => item !== value)
      });
    }
  };
  const nextStep = () => {
    if (step === 1) {
      // Valider première étape
      if (!formData.propertyType || !formData.constructionYear || !formData.occupancyStatus) {
        toast({
          title: "Information manquante",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive"
        });
        return;
      }
    } else if (step === 2) {
      // Valider deuxième étape
      if (!formData.occupants || !formData.postalCode || formData.plannedWorks.length === 0 || !formData.incomeRange) {
        toast({
          title: "Information manquante",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive"
        });
        return;
      }
    }
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation finale
    if (!formData.email || !formData.phone || !formData.name) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      // Envoyer les données du formulaire à Supabase
      const {
        error
      } = await supabase.from('eligibility_submissions').insert([{
        property_type: formData.propertyType,
        construction_year: formData.constructionYear,
        occupants: formData.occupants,
        postal_code: formData.postalCode,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        occupancy_status: formData.occupancyStatus,
        planned_works: formData.plannedWorks,
        income_range: formData.incomeRange
      }]);
      if (error) {
        console.error('Erreur lors de l\'enregistrement des données:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Demande envoyée avec succès !",
          description: "Un expert Renov&moi vous contactera très rapidement."
        });

        // Réinitialiser le formulaire
        setFormData({
          propertyType: '',
          constructionYear: '',
          occupants: '',
          postalCode: '',
          email: '',
          phone: '',
          name: '',
          occupancyStatus: '',
          plannedWorks: [],
          incomeRange: ''
        });
        setStep(1);
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return <section id="eligibilite" className="py-20 gradient-green-bg">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Vérifiez votre éligibilité aux aides</h2>
          
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardContent className="p-6 md:p-8">
              <Tabs defaultValue="form" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="form">Simulateur d'aides</TabsTrigger>
                  <TabsTrigger value="info">Conditions d'éligibilité</TabsTrigger>
                </TabsList>
                
                <TabsContent value="form">
                  <form onSubmit={handleSubmit}>
                    {/* Étape 1: Type de logement */}
                    {step === 1 && <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Home className="mr-2 text-renovmoi-green" />
                          Votre logement
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="propertyType">Type de logement <span className="text-red-500">*</span></Label>
                            <Select value={formData.propertyType} onValueChange={value => handleSelectChange('propertyType', value)}>
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Sélectionnez votre type de logement" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="house">Maison individuelle</SelectItem>
                                <SelectItem value="apartment">Appartement</SelectItem>
                                <SelectItem value="building">Immeuble collectif</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="constructionYear">Année de construction <span className="text-red-500">*</span></Label>
                            <Select value={formData.constructionYear} onValueChange={value => handleSelectChange('constructionYear', value)}>
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Sélectionnez l'année de construction" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="before1950">Avant 1950</SelectItem>
                                <SelectItem value="1950-1970">Entre 1950 et 1970</SelectItem>
                                <SelectItem value="1971-1990">Entre 1971 et 1990</SelectItem>
                                <SelectItem value="1991-2005">Entre 1991 et 2005</SelectItem>
                                <SelectItem value="after2005">Après 2005</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="occupancyStatus">Dans ce logement, vous êtes <span className="text-red-500">*</span></Label>
                            <Select value={formData.occupancyStatus} onValueChange={value => handleSelectChange('occupancyStatus', value)}>
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Sélectionnez votre statut d'occupation" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="owner-occupant">Propriétaire occupant</SelectItem>
                                <SelectItem value="owner-secondary">Propriétaire d'une résidence secondaire</SelectItem>
                                <SelectItem value="tenant">Locataire</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                          <Button type="button" onClick={nextStep} className="cta-button">
                            Continuer
                          </Button>
                        </div>
                      </div>}
                    
                    {/* Étape 2: Situation personnelle et travaux */}
                    {step === 2 && <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Users className="mr-2 text-renovmoi-green" />
                          Votre situation
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="occupants">Nombre d'occupants <span className="text-red-500">*</span></Label>
                            <Select value={formData.occupants} onValueChange={value => handleSelectChange('occupants', value)}>
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Sélectionnez le nombre d'occupants" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 personne</SelectItem>
                                <SelectItem value="2">2 personnes</SelectItem>
                                <SelectItem value="3">3 personnes</SelectItem>
                                <SelectItem value="4">4 personnes</SelectItem>
                                <SelectItem value="5+">5 personnes ou plus</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="postalCode">Code postal <span className="text-red-500">*</span></Label>
                            <Input id="postalCode" name="postalCode" placeholder="Entrez votre code postal" value={formData.postalCode} onChange={handleChange} className="mt-2" />
                          </div>

                          <div>
                            <Label className="mb-2 block">Quels travaux envisagez-vous de réaliser ? <span className="text-red-500">*</span></Label>
                            <div className="space-y-2 mt-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="isolation" checked={formData.plannedWorks.includes('isolation')} onCheckedChange={checked => handleCheckboxChange('isolation', checked as boolean)} />
                                <Label htmlFor="isolation" className="cursor-pointer">Isolation</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox id="chauffage" checked={formData.plannedWorks.includes('chauffage')} onCheckedChange={checked => handleCheckboxChange('chauffage', checked as boolean)} />
                                <Label htmlFor="chauffage" className="cursor-pointer">Chauffage</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox id="ventilation" checked={formData.plannedWorks.includes('ventilation')} onCheckedChange={checked => handleCheckboxChange('ventilation', checked as boolean)} />
                                <Label htmlFor="ventilation" className="cursor-pointer">Ventilation</Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox id="fenetres" checked={formData.plannedWorks.includes('fenetres')} onCheckedChange={checked => handleCheckboxChange('fenetres', checked as boolean)} />
                                <Label htmlFor="fenetres" className="cursor-pointer">Porte/fenêtre</Label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="incomeRange">Pour déterminer vos aides, nous avons besoin d'une fourchette approximative de votre revenu fiscal <span className="text-red-500">*</span></Label>
                            <Select value={formData.incomeRange} onValueChange={value => handleSelectChange('incomeRange', value)}>
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Sélectionnez votre fourchette de revenu" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="below-20k">Inférieur à 20 000€</SelectItem>
                                <SelectItem value="20k-40k">Entre 20 000€ et 40 000€</SelectItem>
                                <SelectItem value="above-40k">Supérieur à 40 000€</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-between">
                          <Button type="button" variant="outline" onClick={prevStep}>
                            Retour
                          </Button>
                          <Button type="button" onClick={nextStep} className="cta-button">
                            Continuer
                          </Button>
                        </div>
                      </div>}
                    
                    {/* Étape 3: Coordonnées */}
                    {step === 3 && <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <CheckCircle2 className="mr-2 text-renovmoi-green" />
                          Vos coordonnées
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Nom complet <span className="text-red-500">*</span></Label>
                            <Input id="name" name="name" placeholder="Entrez votre nom complet" value={formData.name} onChange={handleChange} className="mt-2" />
                          </div>
                          
                          <div>
                            <Label htmlFor="email">Adresse e-mail <span className="text-red-500">*</span></Label>
                            <Input id="email" name="email" type="email" placeholder="Entrez votre adresse e-mail" value={formData.email} onChange={handleChange} className="mt-2" />
                          </div>
                          
                          <div>
                            <Label htmlFor="phone">Téléphone <span className="text-red-500">*</span></Label>
                            <Input id="phone" name="phone" placeholder="Entrez votre numéro de téléphone" value={formData.phone} onChange={handleChange} className="mt-2" />
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-between">
                          <Button type="button" variant="outline" onClick={prevStep}>
                            Retour
                          </Button>
                          <Button type="submit" className="cta-button" disabled={loading}>
                            {loading ? "Envoi en cours..." : "Vérifier mon éligibilité"}
                          </Button>
                        </div>
                      </div>}
                  </form>
                </TabsContent>
                
                <TabsContent value="info">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Conditions d'éligibilité MaPrimeRénov'</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Calendar className="mr-3 text-renovmoi-green flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium">Ancienneté du logement</h4>
                          <p className="text-sm text-renovmoi-gray">Votre logement doit être construit depuis au moins 15 ans à la date de début des travaux.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Home className="mr-3 text-renovmoi-green flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium">Type de logement</h4>
                          <p className="text-sm text-renovmoi-gray">Il doit s'agir de votre résidence principale occupée au moins 8 mois par an.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Thermometer className="mr-3 text-renovmoi-green flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium">Types de travaux éligibles</h4>
                          <p className="text-sm text-renovmoi-gray">Isolation thermique, chauffage, ventilation, audit énergétique et rénovation globale.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle2 className="mr-3 text-renovmoi-green flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium">Artisans certifiés RGE</h4>
                          <p className="text-sm text-renovmoi-gray">Les travaux doivent être réalisés par des entreprises labellisées RGE (Reconnues Garantes de l'Environnement).</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-renovmoi-green/10 p-4 rounded-lg flex items-start mt-6">
                      <HelpCircle className="text-renovmoi-green mr-3 flex-shrink-0 mt-1" size={20} />
                      <p className="text-sm">
                        Besoin d'aide pour déterminer votre éligibilité ? Contactez-nous par mail ou remplissez le formulaire pour être rappelé par un conseiller.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};

export default EligibilitySection;
