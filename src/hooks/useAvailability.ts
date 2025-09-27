import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { addDays, isWithinInterval, parseISO } from "date-fns";

interface UnavailableDate {
  check_in_date: string;
  check_out_date: string;
  accommodation_type: string;
}

// Configuration des capacités par type d'hébergement
const ACCOMMODATION_CAPACITY = {
  villa_luxe: 2,        // Maximum 2 villas de luxe
  suite_familiale: 3,   // Maximum 3 suites familiales
  chambre_vue_mer: 4,   // Maximum 4 chambres vue mer
  chambre_standard: 6,  // Maximum 6 chambres standard
};

export const useAvailability = () => {
  const { user } = useAuth();
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDate[]>([]);
  const [loading, setLoading] = useState(false);

  // Récupérer toutes les réservations confirmées
  const fetchUnavailableDates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('check_in_date, check_out_date, accommodation_type')
        .in('status', ['confirmed', 'pending']); // Inclure les réservations en attente

      if (error) throw error;
      setUnavailableDates(data || []);
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les disponibilités.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Vérifier si une date est disponible pour un type d'hébergement
  const isDateAvailable = (date: Date, accommodationType: string): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    
    // Compter combien de réservations existent pour ce type et cette date
    const reservationsForDate = unavailableDates.filter(reservation => {
      if (reservation.accommodation_type !== accommodationType) return false;
      
      const checkIn = parseISO(reservation.check_in_date);
      const checkOut = parseISO(reservation.check_out_date);
      
      return isWithinInterval(date, { start: checkIn, end: addDays(checkOut, -1) });
    });

    const capacity = ACCOMMODATION_CAPACITY[accommodationType as keyof typeof ACCOMMODATION_CAPACITY] || 1;
    return reservationsForDate.length < capacity;
  };

  // Vérifier si une période est disponible
  const isRangeAvailable = (checkIn: Date, checkOut: Date, accommodationType: string): boolean => {
    const current = new Date(checkIn);
    const end = new Date(checkOut);
    
    while (current < end) {
      if (!isDateAvailable(current, accommodationType)) {
        return false;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return true;
  };

  // Obtenir la prochaine date disponible
  const getNextAvailableDate = (accommodationType: string): Date => {
    const today = new Date();
    let current = new Date(today);
    
    for (let i = 0; i < 365; i++) { // Chercher sur un an maximum
      if (isDateAvailable(current, accommodationType)) {
        return current;
      }
      current = addDays(current, 1);
    }
    
    return addDays(today, 1); // Fallback
  };

  // Valider une réservation
  const validateReservation = async (checkIn: string, checkOut: string, accommodationType: string): Promise<{ valid: boolean; message?: string }> => {
    const checkInDate = parseISO(checkIn);
    const checkOutDate = parseISO(checkOut);
    
    // Vérifier les dates
    if (checkInDate >= checkOutDate) {
      return { valid: false, message: "La date de départ doit être après la date d'arrivée." };
    }
    
    if (checkInDate < new Date()) {
      return { valid: false, message: "La date d'arrivée doit être aujourd'hui ou ultérieure." };
    }
    
    // Rafraîchir les données de disponibilité
    await fetchUnavailableDates();
    
    // Vérifier la disponibilité
    if (!isRangeAvailable(checkInDate, checkOutDate, accommodationType)) {
      const nextAvailable = getNextAvailableDate(accommodationType);
      return { 
        valid: false, 
        message: `Ces dates ne sont pas disponibles pour ce type d'hébergement. Prochaine disponibilité : ${nextAvailable.toLocaleDateString('fr-FR')}` 
      };
    }
    
    return { valid: true };
  };

  useEffect(() => {
    fetchUnavailableDates();
  }, []);

  return {
    unavailableDates,
    loading,
    isDateAvailable,
    isRangeAvailable,
    getNextAvailableDate,
    validateReservation,
    fetchUnavailableDates,
  };
};