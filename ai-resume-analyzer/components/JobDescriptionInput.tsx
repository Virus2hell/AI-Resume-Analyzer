"use client";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  onBack: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function JobDescriptionInput({
  value,
  onChange,
  onAnalyze,
  onBack,
  loading,
  disabled,
}: JobDescriptionInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Add Job Description
      </h2>
      <p className="text-gray-600 mb-6">
        Paste the job description you're applying for
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the complete job description here..."
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-sm"
      />

      <p className="text-gray-500 text-sm mt-2">
        Tip: Include requirements, responsibilities, and desired skills for better analysis
      </p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
        >
          Back
        </button>
        <button
          onClick={onAnalyze}
          disabled={disabled || loading}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              ✓ Analyze Resume
            </>
          )}
        </button>
      </div>
    </div>
  );
}