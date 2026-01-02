import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface OnboardingData {
  // Stage 1 - Business Identity
  businessType: string;
  problemSolved: string;
  primaryGoal: string;
  // Stage 2 - Target Audience
  idealCustomer: string;
  activeChannel: string;
  customerStage: string;
  // Stage 3 - Brand Voice
  brandVoice: string;
  contentPreference: string;
  // Stage 4 - Differentiation
  differentiator: string;
  mainOffer: string;
  // Stage 5 - Resources
  marketingExperience: string;
  monthlyBudget: string;
  weeklyTime: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  currentStage: number;
  isComplete: boolean;
  updateData: (field: keyof OnboardingData, value: string) => void;
  nextStage: () => void;
  prevStage: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const defaultData: OnboardingData = {
  businessType: '',
  problemSolved: '',
  primaryGoal: '',
  idealCustomer: '',
  activeChannel: '',
  customerStage: '',
  brandVoice: '',
  contentPreference: '',
  differentiator: '',
  mainOffer: '',
  marketingExperience: '',
  monthlyBudget: '',
  weeklyTime: '',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [currentStage, setCurrentStage] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('tactix_onboarding');
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed.data || defaultData);
      setIsComplete(parsed.isComplete || false);
    }
  }, []);

  const updateData = (field: keyof OnboardingData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStage = () => {
    if (currentStage < 5) {
      setCurrentStage(prev => prev + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage(prev => prev - 1);
    }
  };

  const completeOnboarding = () => {
    setIsComplete(true);
    localStorage.setItem('tactix_onboarding', JSON.stringify({ data, isComplete: true }));
    
    // Simulated n8n webhook call
    console.log('Sending onboarding data to n8n webhook:', data);
  };

  const resetOnboarding = () => {
    setData(defaultData);
    setCurrentStage(1);
    setIsComplete(false);
    localStorage.removeItem('tactix_onboarding');
  };

  return (
    <OnboardingContext.Provider value={{
      data,
      currentStage,
      isComplete,
      updateData,
      nextStage,
      prevStage,
      completeOnboarding,
      resetOnboarding,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};
