import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: readonly Step[];
  currentStep: number;
  completedSteps: number[];
}

export function StepIndicator({ steps, currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile: Compact Progress Bar */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {steps[currentStep - 1].title}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: Full Step Indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.number);
            const isCurrent = currentStep === step.number;
            const isUpcoming = step.number > currentStep;

            return (
              <React.Fragment key={step.number}>
                {/* Step Circle */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200',
                      {
                        'bg-green-500 border-green-500 text-white': isCompleted,
                        'bg-blue-600 border-blue-600 text-white scale-110': isCurrent,
                        'bg-white border-gray-300 text-gray-400': isUpcoming
                      }
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="text-lg font-semibold">{step.number}</span>
                    )}
                  </div>

                  {/* Step Title & Description */}
                  <div className="mt-3 text-center">
                    <p
                      className={cn('text-sm font-medium', {
                        'text-gray-900': isCurrent || isCompleted,
                        'text-gray-400': isUpcoming
                      })}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 max-w-[120px]">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 flex-1 -mt-14 transition-all duration-200',
                      {
                        'bg-green-500': completedSteps.includes(step.number),
                        'bg-gray-300': !completedSteps.includes(step.number)
                      }
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
