import React from 'react';

interface StepperProgressProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const StepperProgress: React.FC<StepperProgressProps> = ({ 
  currentStep, 
  totalSteps,
  labels = ['Business', 'Audience', 'Voice', 'Unique', 'Resources']
}) => {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative h-1 bg-muted rounded-full mb-6 overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full gradient-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`stepper-dot ${
                step === currentStep 
                  ? 'active' 
                  : step < currentStep 
                    ? 'completed' 
                    : ''
              }`}
            />
            <span 
              className={`text-xs mt-2 transition-colors duration-300 ${
                step === currentStep 
                  ? 'text-accent font-medium' 
                  : step < currentStep 
                    ? 'text-accent/60' 
                    : 'text-muted-foreground'
              }`}
            >
              {labels[step - 1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepperProgress;
