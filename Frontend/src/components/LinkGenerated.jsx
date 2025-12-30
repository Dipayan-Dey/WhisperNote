import { useEffect, useState } from "react";
import FloatingHearts from "./FloatingHearts";

export default function LinkGenerated({ link, onNewLetter }) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const fullLink = window.location.origin + link;

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-100 to-purple-100 animate-gradient" />
      <FloatingHearts />

      <div className={`text-center space-y-6 md:space-y-8 max-w-2xl z-10 w-full transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative inline-block animate-bounce-slow">
          <div className="text-6xl md:text-9xl animate-float mb-4">✉️</div>
          <div className="absolute -top-2 -right-2 text-2xl md:text-4xl animate-ping">✨</div>
        </div>

        <h2 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-rose-800 to-purple-800 px-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Letter Awaits
        </h2>

        <div className="flex justify-center items-center gap-3 px-4">
          <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-rose-400" />
          <span className="text-rose-600 animate-pulse">❤️</span>
          <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-rose-400" />
        </div>

        <p className="text-lg md:text-xl text-amber-900 italic px-4"
           style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Sealed with love, ready to be delivered
        </p>
        
        <div className="bg-gradient-to-br from-white/80 to-amber-50/80 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-amber-200 mx-4">
          <p className="text-xs text-amber-700 mb-3 uppercase tracking-wider font-semibold">Your Private Link</p>
          <div className="bg-white/60 p-3 md:p-4 rounded-lg mb-4 border-2 border-dashed border-amber-300">
            <p className="text-xs md:text-sm text-amber-900 break-all font-mono">
              {fullLink}
            </p>
          </div>
          
          <button
            onClick={copyLink}
            className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-900 via-rose-800 to-purple-900 text-amber-50 rounded-full 
                     hover:shadow-2xl transform hover:scale-105 transition-all duration-500 text-sm md:text-base"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            <span className="flex items-center justify-center gap-2 md:gap-3">
              {copied ? (
                <>
                  <span className="text-xl md:text-2xl animate-bounce">✓</span>
                  Copied!
                </>
              ) : (
                <>
                  <span className="text-lg md:text-xl">📋</span>
                  Copy Link
                </>
              )}
            </span>
          </button>
        </div>

        <div className="space-y-4 px-4">
          <p className="text-xs md:text-sm text-amber-800">
            Share this link with your recipient
          </p>
          <button
            onClick={onNewLetter}
            className="text-amber-900 hover:text-rose-800 underline decoration-wavy decoration-2 underline-offset-4 
                     transition-colors duration-300 font-semibold text-sm md:text-base"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            Compose Another Letter ✍️
          </button>
        </div>
      </div>
    </div>
  );
}