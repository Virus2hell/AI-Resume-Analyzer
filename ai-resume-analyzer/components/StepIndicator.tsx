"use client";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, title: "Upload Resume" },
    { number: 2, title: "Add Job Description" },
    { number: 3, title: "View Report" },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 -z-10" />

        {/* Progress line filled */}
        <div
          className="absolute top-5 left-0 h-1 bg-green-500 -z-10 transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step) => (
          <div key={step.number} className="text-center flex-1">
            <div
              className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-semibold text-white transition-all duration-300 ${
                step.number <= currentStep
                  ? "bg-green-500 scale-100"
                  : "bg-gray-300 scale-90"
              }`}
            >
              {step.number < currentStep ? "✓" : step.number}
            </div>
            <p
              className={`text-sm font-semibold ${
                step.number <= currentStep
                  ? "text-gray-800"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}