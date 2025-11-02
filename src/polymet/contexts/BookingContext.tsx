import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type {
  BookingState,
  TravelerInfo,
  SelectedAddon,
  Coupon,
  PaymentPlan,
  PackageDepartureDate
} from '../types/booking.types';

interface BookingContextType {
  state: BookingState;
  
  // Step 1: Date & Participants
  setPackageAndDate: (packageId: string, departureDate: PackageDepartureDate) => void;
  setParticipants: (count: number) => void;
  
  // Step 2: Add-ons
  addAddon: (addon: SelectedAddon) => void;
  removeAddon: (addonId: string) => void;
  clearAddons: () => void;
  
  // Step 3: Travelers
  updateTraveler: (index: number, traveler: Partial<TravelerInfo>) => void;
  setLeadTraveler: (index: number) => void;
  copyTravelerData: (fromIndex: number, toIndex: number) => void;
  
  // Step 4: Review & Payment
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  setPaymentPlan: (plan: PaymentPlan) => void;
  setSpecialRequests: (requests: string) => void;
  setTermsAccepted: (accepted: boolean) => void;
  
  // Wizard navigation
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeStep: (step: number) => void;
  
  // Pricing
  calculatePricing: () => void;
  
  // Auto-save & Restore
  saveToLocalStorage: () => void;
  restoreFromLocalStorage: () => boolean;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY = 'tmpl_booking_draft';

// Initial state from booking.types.ts
const getInitialState = (): BookingState => ({
  package_id: null,
  departure_date_id: null,
  departure_date: null,
  participants: 1,
  selected_addons: [],
  travelers: [],
  lead_traveler_index: 0,
  coupon_code: '',
  applied_coupon: null,
  payment_plan: 'pay_later',
  special_requests: '',
  terms_accepted: false,
  pricing: {
    subtotal: 0,
    addons_total: 0,
    coupon_discount: 0,
    total_amount: 0,
    currency: 'RM'
  },
  current_step: 1,
  completed_steps: []
});

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>(getInitialState);

  // Auto-save to localStorage every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveToLocalStorage();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [state]);

  // Save on unmount
  useEffect(() => {
    return () => {
      saveToLocalStorage();
    };
  }, []);

  const saveToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save booking draft:', error);
    }
  }, [state]);

  const restoreFromLocalStorage = useCallback((): boolean => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(parsed);
        return true;
      }
    } catch (error) {
      console.error('Failed to restore booking draft:', error);
    }
    return false;
  }, []);

  const clearBooking = useCallback(() => {
    setState(getInitialState());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Step 1: Date & Participants
  const setPackageAndDate = useCallback((packageId: string, departureDate: PackageDepartureDate) => {
    setState(prev => ({
      ...prev,
      package_id: packageId,
      departure_date_id: departureDate.id,
      departure_date: departureDate,
      pricing: {
        ...prev.pricing,
        subtotal: departureDate.price_override || 0
      }
    }));
  }, []);

  const setParticipants = useCallback((count: number) => {
    setState(prev => {
      // Adjust travelers array based on participant count
      const newTravelers = [...prev.travelers];
      
      if (count > newTravelers.length) {
        // Add empty traveler slots
        for (let i = newTravelers.length; i < count; i++) {
          newTravelers.push({
            participant_number: i + 1,
            is_lead_traveler: i === 0,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            ic_number: '',
            nationality: '',
            date_of_birth: '',
            gender: 'male',
            passport_number: '',
            emergency_contact_name: '',
            emergency_contact_relation: '',
            emergency_contact_phone: ''
          });
        }
      } else if (count < newTravelers.length) {
        // Remove excess travelers
        newTravelers.splice(count);
      }

      return {
        ...prev,
        participants: count,
        travelers: newTravelers
      };
    });
  }, []);

  // Step 2: Add-ons
  const addAddon = useCallback((addon: SelectedAddon) => {
    setState(prev => ({
      ...prev,
      selected_addons: [...prev.selected_addons, addon]
    }));
  }, []);

  const removeAddon = useCallback((addonId: string) => {
    setState(prev => ({
      ...prev,
      selected_addons: prev.selected_addons.filter(a => a.addon_id !== addonId)
    }));
  }, []);

  const clearAddons = useCallback(() => {
    setState(prev => ({
      ...prev,
      selected_addons: []
    }));
  }, []);

  // Step 3: Travelers
  const updateTraveler = useCallback((index: number, traveler: Partial<TravelerInfo>) => {
    setState(prev => {
      const newTravelers = [...prev.travelers];
      newTravelers[index] = {
        ...newTravelers[index],
        ...traveler
      };
      return {
        ...prev,
        travelers: newTravelers
      };
    });
  }, []);

  const setLeadTraveler = useCallback((index: number) => {
    setState(prev => {
      const newTravelers = prev.travelers.map((t, i) => ({
        ...t,
        is_lead_traveler: i === index
      }));
      return {
        ...prev,
        travelers: newTravelers,
        lead_traveler_index: index
      };
    });
  }, []);

  const copyTravelerData = useCallback((fromIndex: number, toIndex: number) => {
    setState(prev => {
      const newTravelers = [...prev.travelers];
      const source = newTravelers[fromIndex];
      newTravelers[toIndex] = {
        ...source,
        participant_number: toIndex + 1,
        is_lead_traveler: false
      };
      return {
        ...prev,
        travelers: newTravelers
      };
    });
  }, []);

  // Step 4: Review & Payment
  const applyCoupon = useCallback((coupon: Coupon) => {
    setState(prev => ({
      ...prev,
      coupon_code: coupon.code,
      applied_coupon: coupon
    }));
  }, []);

  const removeCoupon = useCallback(() => {
    setState(prev => ({
      ...prev,
      coupon_code: '',
      applied_coupon: null
    }));
  }, []);

  const setPaymentPlan = useCallback((plan: PaymentPlan) => {
    setState(prev => ({
      ...prev,
      payment_plan: plan
    }));
  }, []);

  const setSpecialRequests = useCallback((requests: string) => {
    setState(prev => ({
      ...prev,
      special_requests: requests
    }));
  }, []);

  const setTermsAccepted = useCallback((accepted: boolean) => {
    setState(prev => ({
      ...prev,
      terms_accepted: accepted
    }));
  }, []);

  // Wizard navigation
  const goToStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      current_step: step
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      current_step: Math.min(prev.current_step + 1, 5)
    }));
  }, []);

  const previousStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      current_step: Math.max(prev.current_step - 1, 1)
    }));
  }, []);

  const completeStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      completed_steps: [...new Set([...prev.completed_steps, step])]
    }));
  }, []);

  // Pricing calculation
  const calculatePricing = useCallback(() => {
    setState(prev => {
      const subtotal = prev.departure_date?.price_override || 0;
      const participantMultiplier = prev.participants;
      
      // Calculate add-ons total
      const addons_total = prev.selected_addons.reduce((sum, addon) => {
        return sum + addon.total_price;
      }, 0);
      
      // Calculate total before discount
      const beforeDiscount = (subtotal * participantMultiplier) + addons_total;
      
      // Calculate coupon discount
      let coupon_discount = 0;
      if (prev.applied_coupon) {
        if (prev.applied_coupon.type === 'percentage') {
          coupon_discount = (beforeDiscount * prev.applied_coupon.value) / 100;
          // Apply max discount cap if exists
          if (prev.applied_coupon.conditions.maximum_discount) {
            coupon_discount = Math.min(coupon_discount, prev.applied_coupon.conditions.maximum_discount);
          }
        } else if (prev.applied_coupon.type === 'fixed') {
          coupon_discount = prev.applied_coupon.value;
        }
      }
      
      const total_amount = beforeDiscount - coupon_discount;
      
      // Calculate deposit and balance based on total
      let deposit_amount: number | undefined;
      let balance_amount: number | undefined;
      
      if (prev.payment_plan === 'deposit') {
        deposit_amount = total_amount < 10000 ? 500 : 1000;
        balance_amount = total_amount - deposit_amount;
      }
      
      return {
        ...prev,
        pricing: {
          subtotal: subtotal * participantMultiplier,
          addons_total,
          coupon_discount,
          total_amount,
          deposit_amount,
          balance_amount,
          currency: 'RM'
        }
      };
    });
  }, []);

  // Recalculate pricing whenever relevant data changes
  useEffect(() => {
    calculatePricing();
  }, [
    state.departure_date,
    state.participants,
    state.selected_addons,
    state.applied_coupon,
    state.payment_plan
  ]);

  const value: BookingContextType = {
    state,
    setPackageAndDate,
    setParticipants,
    addAddon,
    removeAddon,
    clearAddons,
    updateTraveler,
    setLeadTraveler,
    copyTravelerData,
    applyCoupon,
    removeCoupon,
    setPaymentPlan,
    setSpecialRequests,
    setTermsAccepted,
    goToStep,
    nextStep,
    previousStep,
    completeStep,
    calculatePricing,
    saveToLocalStorage,
    restoreFromLocalStorage,
    clearBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
