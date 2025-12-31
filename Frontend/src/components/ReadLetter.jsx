import { useEffect, useState } from "react";
import { api } from "../api/letterapi";
import FloatingHearts from "./FloatingHearts";

export default function ReadLetter({ letterId }) {
  const [data, setData] = useState(null);
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [visible, setVisible] = useState(false);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    api.getLetter(letterId).then(d => {
      setData(d);
      setTimeout(() => setVisible(true), 100);
    });
    
    const newPetals = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 5
    }));
    setPetals(newPetals);
  }, [letterId]);

  const sendReply = async () => {
    if (!reply.trim()) return;
    setIsSending(true);
    await api.replyLetter(letterId, reply);
    setReply("");
    setTimeout(() => {
      api.getLetter(letterId).then(setData);
      setShowReply(false);
      setIsSending(false);
    }, 1500);
  };

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-100 to-purple-100 p-4">
      <div className="flex flex-col items-center gap-3 md:gap-4">
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-bounce">📬</div>
        <p className="text-amber-800 text-base sm:text-lg md:text-xl animate-pulse text-center px-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Opening your letter...
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6 lg:p-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-purple-50"
           style={{
             backgroundImage: `
               radial-gradient(circle at 20% 30%, rgba(251, 207, 232, 0.25) 0%, transparent 60%),
               radial-gradient(circle at 80% 70%, rgba(254, 215, 170, 0.25) 0%, transparent 60%),
               url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a574' fill-opacity='0.04'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm2 2h36v36H22V22z'/%3E%3C/g%3E%3C/svg%3E")
             `
           }} />
      
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      <FloatingHearts />
      
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute text-rose-400 opacity-30 animate-fall-rotate pointer-events-none text-lg sm:text-xl md:text-2xl"
          style={{
            left: `${petal.left}%`,
            top: '-50px',
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`
          }}
        >
          🌸
        </div>
      ))}

      <div className={`max-w-7xl mx-auto z-10 relative transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {!showReply ? (
          <>
            <div className="relative bg-gradient-to-br from-white via-amber-50/40 to-rose-50/40 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 lg:p-14 border-4 sm:border-6 md:border-8 border-amber-900 mb-4 sm:mb-6 md:mb-8 overflow-hidden"
                 style={{
                   backgroundImage: `
                     repeating-linear-gradient(transparent, transparent 36px, rgba(139, 69, 19, 0.05) 36px, rgba(139, 69, 19, 0.05) 37px),
                     radial-gradient(circle at 15% 25%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
                     radial-gradient(circle at 85% 75%, rgba(255, 182, 193, 0.08) 0%, transparent 50%)
                   `
                 }}>
              
              <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 rounded-l-2xl sm:rounded-l-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0">
                  {[...Array(14)].map((_, i) => (
                    <div key={i} className="absolute left-0 right-0" style={{ top: `${i * 7.14}%` }}>
                      <div className="h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700 mx-2 sm:mx-3 md:mx-4 lg:mx-6 rounded-full shadow-lg opacity-80" />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 via-transparent to-amber-950/30" />
                <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 w-2 sm:w-3 md:w-4 h-4 sm:h-6 md:h-8 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-full shadow-lg" />
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-2 sm:w-3 md:w-4 h-4 sm:h-6 md:h-8 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-full shadow-lg" />
              </div>

              <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 flex gap-2 sm:gap-3 opacity-25">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-700 animate-spin-slow">✦</div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-rose-600 animate-pulse" style={{ animationDelay: '1s' }}>❀</div>
              </div>
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-12 sm:left-14 md:left-16 lg:left-20 flex gap-2 sm:gap-3 opacity-20">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-700 animate-bounce-slow">✿</div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-amber-600 animate-pulse" style={{ animationDelay: '1.5s' }}>✾</div>
              </div>

              <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 ml-6 sm:ml-8 md:ml-12 lg:ml-16">
                <div className="relative inline-block">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-rose-800 to-purple-800 mb-3 sm:mb-4 md:mb-6"
                      style={{ 
                        fontFamily: "'Playfair Display', serif",
                        textShadow: '0 0 30px rgba(251, 207, 232, 0.4)'
                      }}>
                    Letters of the Heart
                  </h2>
                  <div className="absolute -top-4 sm:-top-6 md:-top-8 -left-4 sm:-left-6 md:-left-8 text-2xl sm:text-3xl md:text-4xl opacity-30 animate-float">🕊️</div>
                  <div className="absolute -top-3 sm:-top-4 md:-top-6 -right-3 sm:-right-4 md:-right-6 text-xl sm:text-2xl md:text-3xl opacity-30 animate-bounce-slow">💝</div>
                </div>
                
                <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6">
                  <div className="h-px w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                  <span className="text-lg sm:text-xl md:text-2xl text-amber-600 animate-pulse">✦</span>
                  <div className="h-px w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 bg-gradient-to-l from-transparent via-amber-500 to-transparent" />
                </div>
                
                <p className="text-xs sm:text-sm md:text-base text-amber-800 mt-2 sm:mt-3 md:mt-4 italic px-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  A conversation across time and space
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 ml-6 sm:ml-8 md:ml-12 lg:ml-16 mr-2 sm:mr-3 md:mr-4 lg:mr-6">
                {data.messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.sender === "original" ? "justify-start" : "justify-end"} animate-fade-in-up`}
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <div className={`max-w-full sm:max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] relative group ${
                      m.sender === "original" 
                        ? "bg-gradient-to-br from-white via-amber-50/60 to-white" 
                        : "bg-gradient-to-br from-rose-50/80 via-pink-50/60 to-rose-50/80"
                    } backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 ${
                      m.sender === "original" ? "border-amber-300/60" : "border-rose-300/60"
                    } hover:shadow-2xl hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500`}>
                      
                      <div className={`absolute -top-2 sm:-top-3 md:-top-4 ${m.sender === "original" ? "-left-2 sm:-left-3 md:-left-4" : "-right-2 sm:-right-3 md:-right-4"} w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg ${
                        m.sender === "original" 
                          ? "bg-gradient-to-br from-amber-400 to-amber-600" 
                          : "bg-gradient-to-br from-rose-400 to-rose-600"
                      }`}>
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                          {m.sender === "original" ? "✉️" : "💌"}
                        </span>
                      </div>
                      
                      <div className={`absolute -bottom-2 sm:-bottom-3 ${m.sender === "original" ? "-right-2 sm:-right-3" : "-left-2 sm:-left-3"} text-2xl sm:text-3xl md:text-4xl opacity-40 group-hover:opacity-60 transition-opacity animate-spin-slow`}>
                        🔴
                      </div>
                      
                      <div className="relative mb-3 sm:mb-4 md:mb-5 pb-2 sm:pb-3 md:pb-4 border-b-2 border-amber-200/40">
                        <div className={`inline-block px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider sm:tracking-widest shadow-md ${
                          m.sender === "original" 
                            ? "bg-gradient-to-r from-amber-200 to-amber-100 text-amber-900" 
                            : "bg-gradient-to-r from-rose-200 to-rose-100 text-rose-900"
                        }`}
                             style={{ fontFamily: "'Libre Baskerville', serif" }}>
                          {m.sender === "original" ? "📨 Received" : "💝 Your Reply"}
                        </div>
                      </div>
                      
                      <p className="text-amber-950 leading-relaxed sm:leading-loose whitespace-pre-wrap text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-5 break-words"
                         style={{ 
                           fontFamily: "'Libre Baskerville', serif",
                           lineHeight: "1.8",
                           textIndent: "1em"
                         }}>
                        {m.text}
                      </p>

                      <div className={`flex ${m.sender === "original" ? "justify-end" : "justify-start"} items-center gap-1 sm:gap-2 mt-2 sm:mt-3 md:mt-4`}>
                        <span className={`text-[10px] sm:text-xs ${m.sender === "original" ? "text-amber-600/60" : "text-rose-600/60"}`}>~</span>
                        <span className={`text-lg sm:text-xl md:text-2xl ${m.sender === "original" ? "text-amber-500/50" : "text-rose-500/50"} animate-pulse`}>✿</span>
                        <span className={`text-[10px] sm:text-xs ${m.sender === "original" ? "text-amber-600/60" : "text-rose-600/60"}`}>~</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center relative px-4">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="text-4xl sm:text-5xl md:text-6xl animate-pulse">💕</div>
              </div>
              
              <button
                onClick={() => setShowReply(true)}
                className="group relative w-full sm:w-auto px-8 sm:px-12 md:px-16 lg:px-20 py-4 sm:py-5 md:py-6 lg:py-7 bg-gradient-to-r from-rose-700 via-amber-600 to-purple-700 text-white rounded-full 
                         transform hover:scale-105 sm:hover:scale-110 transition-all duration-700 shadow-2xl text-base sm:text-lg md:text-xl lg:text-2xl border-2 border-white/30 overflow-hidden"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                  <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl animate-bounce">✍️</span>
                  <span className="font-semibold">Write Your Reply</span>
                  <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>💌</span>
                </span>
                
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-rose-500 to-amber-600 opacity-0 group-hover:opacity-50 blur-2xl transition-opacity duration-500" />
              </button>
            </div>
          </>
        ) : (
          <div className="relative bg-gradient-to-br from-rose-50 via-pink-50/60 to-purple-50/40 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 lg:p-14 border-4 sm:border-6 md:border-8 border-rose-900 overflow-hidden"
               style={{
                 backgroundImage: `
                   repeating-linear-gradient(transparent, transparent 36px, rgba(139, 69, 19, 0.05) 36px, rgba(139, 69, 19, 0.05) 37px),
                   radial-gradient(circle at 80% 50%, rgba(255, 182, 193, 0.15) 0%, transparent 60%)
                 `
               }}>
            
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24 bg-gradient-to-r from-rose-950 via-rose-900 to-rose-800 rounded-l-2xl sm:rounded-l-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="absolute left-0 right-0" style={{ top: `${i * 8.33}%` }}>
                    <div className="h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 mx-2 sm:mx-3 md:mx-4 lg:mx-6 rounded-full shadow-lg opacity-80" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-rose-950/30 via-transparent to-rose-950/30" />
              <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 w-2 sm:w-3 md:w-4 h-4 sm:h-6 md:h-8 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full shadow-lg" />
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-2 sm:w-3 md:w-4 h-4 sm:h-6 md:h-8 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full shadow-lg" />
            </div>

            <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-500 opacity-30 animate-pulse flex gap-2 sm:gap-3">
              <span>💕</span>
              <span style={{ animationDelay: '0.5s' }}>💌</span>
              <span className="hidden sm:inline" style={{ animationDelay: '1s' }}>💝</span>
            </div>

            <div className="ml-6 sm:ml-8 md:ml-12 lg:ml-16">
              <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <div className="relative inline-block">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-900 via-pink-800 to-purple-800 mb-3 sm:mb-4 md:mb-6"
                      style={{ 
                        fontFamily: "'Playfair Display', serif",
                        textShadow: '0 0 30px rgba(255, 182, 193, 0.4)'
                      }}>
                    Compose Your Reply
                  </h3>
                  <div className="absolute -top-3 sm:-top-4 md:-top-6 -right-4 sm:-right-6 md:-right-8 text-2xl sm:text-3xl md:text-4xl opacity-40 animate-bounce-slow">🪶</div>
                </div>
                
                <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6">
                  <div className="h-px w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 bg-gradient-to-r from-transparent to-rose-400" />
                  <span className="text-xl sm:text-2xl md:text-3xl text-rose-500 animate-pulse">💌</span>
                  <div className="h-px w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 bg-gradient-to-l from-transparent to-rose-400" />
                </div>
                
                <p className="text-xs sm:text-sm md:text-base text-rose-800 mt-2 sm:mt-3 md:mt-4 italic px-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  Let your emotions flow through every word
                </p>
              </div>

              <div className="relative mb-6 sm:mb-8 md:mb-10 group">
                <div className="absolute inset-0 bg-white/40 rounded-2xl sm:rounded-3xl blur-xl group-focus-within:bg-white/60 transition-all duration-500" />
                
                <textarea
                  className="relative w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 bg-white/60 backdrop-blur-sm border-2 border-rose-200/60 outline-none resize-none 
                             text-rose-950 leading-relaxed sm:leading-loose p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl
                             focus:bg-white/80 focus:border-pink-300/70 focus:shadow-2xl transition-all duration-500 text-sm sm:text-base md:text-lg
                             placeholder:text-rose-700/40 placeholder:italic"
                  style={{ 
                    fontFamily: "'Libre Baskerville', serif",
                    lineHeight: "2"
                  }}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="My dearest,

Pour your heart onto these pages... Let your words dance with love and sincerity..."
                  disabled={isSending}
                />

                {reply && (
                  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 flex items-center gap-2 sm:gap-3 opacity-60">
                    <span className="text-xl sm:text-2xl md:text-3xl animate-bounce">🪶</span>
                    <div className="flex flex-col items-end">
                      <span className="text-rose-800 text-xs sm:text-sm font-semibold">composing...</span>
                      <span className="text-rose-600 text-[10px] sm:text-xs italic">{reply.length} characters</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 items-center justify-between">
                <div className="text-sm sm:text-base md:text-lg text-rose-800 italic flex items-center gap-2 sm:gap-3 order-2 sm:order-1">
                  <span className="text-lg sm:text-xl md:text-2xl animate-pulse">💕</span>
                  <span style={{ fontFamily: "'Libre Baskerville', serif" }}>
                    {reply.length} characters of love
                  </span>
                </div>
                
                <div className="flex gap-3 sm:gap-4 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    onClick={() => setShowReply(false)}
                    className="flex-1 sm:flex-none px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-rose-900 hover:text-rose-950 font-semibold transition-all duration-300 hover:scale-105 border-2 border-rose-300/50 rounded-full hover:bg-white/50 text-sm sm:text-base"
                    style={{ fontFamily: "'Libre Baskerville', serif" }}
                    disabled={isSending}
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={sendReply}
                    disabled={!reply.trim() || isSending}
                    className="flex-1 sm:flex-none px-6 sm:px-10 md:px-12 lg:px-16 py-3 sm:py-4 md:py-5 lg:py-6 bg-gradient-to-r from-rose-800 via-pink-700 to-purple-800 text-rose-50 rounded-full 
                             disabled:opacity-40 disabled:cursor-not-allowed
                             transform hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl text-sm sm:text-base md:text-lg lg:text-xl
                             border-2 border-white/30 group overflow-hidden relative"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      {isSending ? (
                        <>
                          <span className="inline-block w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span className="font-semibold hidden xs:inline">Sending with love...</span>
                          <span className="font-semibold xs:hidden">Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg sm:text-xl md:text-2xl">💌</span>
                          <span className="font-semibold">Send Reply</span>
                          <span className="text-lg sm:text-xl md:text-2xl">✨</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fall-rotate {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        .animate-fall-rotate { animation: fall-rotate linear infinite; }
      `}</style>
    </div>
  )
}