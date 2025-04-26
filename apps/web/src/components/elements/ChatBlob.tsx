interface BlobProps {
  currentMessage: string;
}

export function ChatBlob({ currentMessage }: BlobProps) {
  return (
    <div>
      <div className="relative mb-8 flex h-96 items-center justify-center">
        <div className="absolute">
          <div className="relative">
            <div className="animate-blob animate-blob h-72 w-72 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animate-blob animation-delay-2000 absolute -left-4 -top-4 h-72 w-72 rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animate-blob animation-delay-4000 absolute -bottom-8 -right-4 h-72 w-72 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
          </div>
        </div>

        {/* Message Display */}
        <div className="relative z-10 mx-auto max-w-lg rounded-2xl bg-white bg-opacity-90 p-6 shadow-lg">
          <p className="text-center text-lg">{currentMessage}</p>
        </div>
      </div>
    </div>
  );
}
