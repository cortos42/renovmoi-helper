
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save contact request to Supabase
      const { error } = await supabase
        .from('eligibility_submissions')
        .insert([
          { 
            name, 
            phone,
            email: "",  // Required by schema but not needed for callback
            construction_year: "",  // Required by schema
            occupants: "1",  // Required by schema
            postal_code: "",  // Required by schema
            property_type: "callback_request"  // Mark this as a callback request
          }
        ]);
        
      if (error) throw error;
      
      toast({
        title: "Demande envoyée",
        description: "Nous vous rappellerons dans les plus brefs délais",
      });
      
      // Reset form and close modal
      setName("");
      setPhone("");
      onClose();
      
    } catch (error) {
      console.error("Error submitting contact request:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue, veuillez réessayer",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-renovmoi-black mb-4">
          Besoin d'aide ? Nous vous rappelons !
        </h2>
        
        <p className="text-renovmoi-gray mb-6">
          Laissez-nous vos coordonnées et un conseiller vous contactera rapidement.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom et prénom</Label>
            <Input
              id="name"
              type="text"
              placeholder="Votre nom et prénom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Votre numéro de téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-renovmoi-green hover:bg-renovmoi-green-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Demander à être rappelé"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
