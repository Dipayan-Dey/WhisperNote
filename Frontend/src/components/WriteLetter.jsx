import { useEffect, useState } from "react";
import { api } from "../api/letterapi";
import FloatingHearts from "./FloatingHearts";

export default function WriteLetter({ onBack, onSent }) {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [inkDrops, setInkDrops] = useState([]);

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 100);
    const drops = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 2
    }));
    setInkDrops(drops);
  }, []);

  const send = async () => {
    if (!text.trim()) return;
    setIsSending(true);
    try {
      const res = await api.createLetter(text);
      setTimeout(() => {
        onSent(res.link);
      }, 2000);
    } catch (error) {
      console.error("Failed to send:", error);
      setIsSending(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-2 sm:p-4 md:p-6 relative overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4a574' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
           }} />

      <FloatingHearts />
      
      {inkDrops.map(drop => (
        <div key={drop.id} className="absolute w-1 h-1 bg-amber-800 rounded-full opacity-20 animate-drip pointer-events-none"
             style={{ left: `${drop.left}%`, top: '-10px', animationDelay: `${drop.delay}s` }} />
      ))}

      <div className={`w-full max-w-5xl max-h-[95vh] z-10 transition-all duration-1000 transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative bg-gradient-to-br from-amber-50 via-rose-50/30 to-amber-50 rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-12 border-4 md:border-8 border-amber-900 overflow-hidden"
             style={{
               backgroundImage: `
                 repeating-linear-gradient(transparent, transparent 31px, rgba(139, 69, 19, 0.08) 31px, rgba(139, 69, 19, 0.08) 32px),
                 radial-gradient(circle at 15% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 40%)
               `
             }}>
          
          {/* Spine / Rings */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-amber-950 to-amber-900 shadow-inner">
            <div className="flex flex-col justify-around h-full py-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-1 bg-gradient-to-r from-yellow-600 to-yellow-500 mx-2 md:mx-4 rounded-full shadow-md" />
              ))}
            </div>
          </div>

          <div className="ml-6 md:ml-12 flex flex-col h-full max-h-[80vh]">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <button onClick={onBack} className="text-amber-900 hover:text-rose-800 text-xs md:text-sm flex items-center gap-1 group transition-colors">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Return
              </button>
              <div className="flex gap-2 opacity-30">
                <span className="text-xl md:text-2xl animate-spin-slow">✦</span>
              </div>
            </div>

            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-amber-950" style={{ fontFamily: "'Playfair Display', serif" }}>
                My Dearest,
              </h2>
            </div>

            {/* Input Area */}
            <div className="relative flex-grow">
              <textarea
                className="w-full h-40 sm:h-64 md:h-80 bg-transparent border-none outline-none resize-none 
                           text-amber-950 leading-[32px] p-2 md:p-4 text-sm sm:text-base md:text-lg
                           placeholder:text-amber-700/30 placeholder:italic scrollbar-hide"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Let your heart speak through your pen..."
                disabled={isSending}
              />
              
              {text && (
                <div className="absolute bottom-2 right-2 flex items-center gap-2 opacity-40">
                  <span className="text-lg animate-bounce">🪶</span>
                  <span className="text-[10px] uppercase tracking-widest">writing</span>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 pt-4 border-t border-amber-900/10 gap-4">
              <div className="text-[10px] md:text-xs text-amber-800 italic uppercase tracking-tighter">
                {text.length} characters of emotion
              </div>
              
              <button
                onClick={send}
                disabled={!text.trim() || isSending}
                className="w-full sm:w-auto px-8 md:px-12 py-3 bg-amber-950 text-amber-50 rounded-full 
                           disabled:opacity-30 disabled:grayscale transform hover:scale-105 transition-all 
                           shadow-xl flex items-center justify-center gap-3 text-sm md:text-base"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sealing...</span>
                  </>
                ) : (
                  <>
                    <span>Seal & Send</span>
                    <span>✉️</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes drip {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.2; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-drip { animation: drip 8s linear infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}