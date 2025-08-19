import { Check, ChevronRight } from "lucide-react";

interface ProgressBarProps {
  currentStep: number; // 1-based index
}

const steps = [
  { id: 1, title: "Traveller Details", description: "Share Your Personal & Trip Information" },
  { id: 2, title: "AI Trip Itinerary", description: "Instantly Generate Your Smart UAE Itinerary" },
  { id: 3, title: "Customization", description: "Fine-Tune Your Journey to Match Your Style" },
  { id: 4, title: "Final Review", description: "Confirm & Book Your Perfect UAE Experience" },
];

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const total = steps.length;
  const progressPercent = Math.min(
    100,
    Math.max(0, ((currentStep - 1) / (total - 1)) * 100)
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-3">
      {/* Steps row that fits screen width */}
      <div className="flex w-full items-center justify-between gap-1 sm:gap-2 md:gap-4">
        {steps.map((step, index) => {
          const isDone = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex-1 flex items-center min-w-0">
              {/* Step pill */}
              <div
                className={`flex flex-col flex-1 items-center text-center px-0.5 sm:px-2 md:px-3`}
              >
                <div
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 flex items-center justify-center rounded-full font-bold text-xs sm:text-sm border-2 transition-all duration-500
                    ${
                      isDone
                        ? "bg-gradient-to-r from-primary to-primary/80 border-primary text-white shadow-md"
                        : isActive
                        ? "bg-primary text-white border-primary scale-105 shadow-md shadow-primary/40"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                >
                  {isDone ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : step.id}

                  {isActive && (
                    <span className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping" 
                    />
                  )}
                </div>

                <p
                  className={`mt-1.5 sm:mt-2 lg:mt-1 text-[10px] sm:text-xs md:text-sm lg:text-xs font-bold tracking-wide transition-all duration-300 max-w-full overflow-hidden text-ellipsis whitespace-nowrap ${
                    step.id <= currentStep 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/70 drop-shadow-sm" 
                      : "text-gray-500"
                  }`}
                  style={{ 
                    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
                    textShadow: step.id <= currentStep ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                    letterSpacing: '0.3px'
                  }}
                  title={step.title}
                >
                  {step.title}
                </p>
                {/* Hide description on very small screens */}
                <p className={`hidden md:block text-[9px] sm:text-[10px] md:text-xs lg:text-[10px] mt-0.5 sm:mt-1 lg:mt-0.5 transition-all duration-300 max-w-full overflow-hidden text-ellipsis whitespace-nowrap ${
                    step.id <= currentStep ? "text-gray-600" : "text-gray-400"
                  }`}
                  style={{ 
                    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
                    fontWeight: '500',
                    letterSpacing: '0.2px',
                    lineHeight: '1.3'
                  }}
                  title={step.description}
                >
                  {step.description}
                </p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center justify-center px-1 sm:px-2">
                  <div className="h-0.5 sm:h-1 w-full bg-gray-200 relative overflow-hidden rounded-full">
                    <div
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500
                        ${isDone ? "w-full" : "w-0"}`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress track under steps */}
      <div className="mt-3 sm:mt-4 lg:mt-2">
        <div className="h-1 sm:h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/70 transition-[width] duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
