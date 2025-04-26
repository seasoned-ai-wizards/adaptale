interface BlobProps {
  currentMessage: string;
}

export function CompanionBlob({ currentMessage }: BlobProps) {
  return (
    <div>
      <div className="relative h-96 flex items-center justify-center mb-8">
        <div className="absolute">
          <div className="relative">
            <div
              className="animate-blob w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div
              className="animate-blob animation-delay-2000 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 absolute -top-4 -left-4"></div>
            <div
              className="animate-blob animation-delay-4000 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 absolute -bottom-8 -right-4"></div>
          </div>
        </div>

        {/* Message Display */}
        <div className="relative z-10 bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
          <p className="text-lg text-center">{currentMessage}</p>
        </div>
      </div>
    </div>
  );
}
