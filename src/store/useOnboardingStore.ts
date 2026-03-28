import { create } from 'zustand';

interface OnboardingState {
  currentStep: number;
  firmId: string;
  firmName: string;
  address: string;
  gstin: string;
  onboardingData: any;
  setCurrentStep: (step: number) => void;
  setFirm: (firm: { id: string; name: string }) => void;
  setAddress: (address: string) => void;
  setGstin: (gstin: string) => void;
  updateOnboardingData: (data: any) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 0,
  firmId: '',
  firmName: '',
  address: '',
  gstin: '',
  onboardingData: {},
  setCurrentStep: (step) => set({ currentStep: step }),
  setFirm: (firm) => set({ firmId: firm.id, firmName: firm.name }),
  setAddress: (address) => set({ address }),
  setGstin: (gstin) => set({ gstin }),
  updateOnboardingData: (data) => set((state) => ({ 
    onboardingData: { ...state.onboardingData, ...data } 
  })),
  resetOnboarding: () => set({ 
    currentStep: 0, 
    firmId: '',
    firmName: '', 
    address: '',
    gstin: '',
    onboardingData: {} 
  }),
}));
