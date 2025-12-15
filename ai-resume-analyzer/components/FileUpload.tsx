"use client";

interface FileUploadProps {
  onUpload: (file: File) => void;
  onNext: () => void;
  fileName?: string;
  disabled: boolean;
}

export default function FileUpload({
  onUpload,
  onNext,
  fileName,
  disabled,
}: FileUploadProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) validateAndUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) validateAndUpload(file);
  };

  const validateAndUpload = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|docx?|txt)$/i)) {
      alert("Please upload a PDF, DOCX, or TXT file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    onUpload(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Upload Your Resume
      </h2>
      <p className="text-gray-600 mb-6">Upload your resume in PDF or DOCX format</p>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-green-500 transition"
      >
        {fileName ? (
          <div>
            <svg
              className="mx-auto h-12 w-12 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-green-600 font-semibold">{fileName}</p>
            <p className="text-gray-500 text-sm mt-2">Click to change file</p>
          </div>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-gray-700 font-semibold mb-2">
              Drag and drop your resume here
            </p>
            <p className="text-gray-500 text-sm mb-4">or click to browse</p>
            <p className="text-gray-400 text-xs">
              Supports PDF, DOCX, DOC (Max 5MB)
            </p>
          </>
        )}

        <input
          type="file"
          accept=".pdf,.docx,.doc,.txt"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          Select File
        </label>
      </div>

      <button
        onClick={onNext}
        disabled={disabled}
        className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Job Description
      </button>
    </div>
  );
}