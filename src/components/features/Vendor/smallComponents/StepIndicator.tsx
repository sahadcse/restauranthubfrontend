import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  return (
    <div className="mb-8">
      {/* Progress Steps */}
      <div className="flex items-center space-x-4 mb-6">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          return (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step <= currentStep
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                aria-current={step === currentStep ? "step" : undefined}
              >
                {step}
              </div>
              {step < totalSteps && (
                <div
                  className={`w-12 h-1 ml-2 transition-colors ${
                    step < currentStep ? "bg-teal-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="text-sm text-gray-600">
        Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
      </div>
    </div>
  );
};
