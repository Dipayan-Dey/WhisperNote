import { useEffect, useState } from "react";
import { api } from "../api/letterapi";
import FloatingHearts from "./FloatingHearts";

export default function ReadLetter({ letterId }) {
  const [data, setData] = useState(null);
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    api.getLetter(letterId).then((d) => {
      setData(d);
      setTimeout(() => setVisible(true), 100);
    });
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

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-100 to-purple-100 p-4">
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-bounce">
            📬
          </div>
          <p
            className="text-amber-800 text-base sm:text-lg md:text-xl animate-pulse text-center px-4"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            Opening your letter...
          </p>
        </div>
      </div>
    );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ fontFamily: "'Dancing Script', cursive" }}
    >
      {/* Notebook-style Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50">
        {/* Notebook binding on the left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 lg:w-32 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 shadow-2xl">
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{ top: `${i * 6.67}%` }}
              >
                <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 mx-3 sm:mx-4 md:mx-6 rounded-full shadow-lg opacity-80" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 via-transparent to-amber-950/30" />
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-12 left-24 text-rose-300 opacity-30 text-2xl animate-float">
          🌸
        </div>
        <div className="absolute top-32 right-20 text-purple-300 opacity-30 text-xl animate-bounce-slow">
          ✨
        </div>
        <div className="absolute bottom-40 left-32 text-amber-300 opacity-30 text-2xl animate-pulse">
          💛
        </div>
        <div className="absolute bottom-20 right-32 text-pink-300 opacity-30 text-xl animate-float">
          🦋
        </div>
        <div className="absolute top-1/2 right-12 text-rose-300 opacity-30 text-2xl animate-bounce-slow">
          🌸
        </div>
        <div className="absolute top-1/4 left-1/4 text-purple-300 opacity-20 text-3xl animate-pulse">
          ⭐
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-amber-300 opacity-20 text-2xl animate-float">
          💕
        </div>
      </div>

      <FloatingHearts />

      <div className="relative z-10 min-h-screen">
        <div
          className={`transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header Section */}
          <div className="text-center pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-12 px-4 ml-16 sm:ml-20 md:ml-24 lg:ml-32">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-purple-700 to-pink-700 mb-4 sm:mb-6"
              style={{
                fontFamily: "'Dancing Script', cursive",
                textShadow: "0 0 30px rgba(251, 207, 232, 0.4)",
              }}
            >
              Letters of the Heart
            </h1>

            <div className="flex justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              <div className="h-px w-16 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              <span className="text-xl sm:text-2xl md:text-3xl text-amber-600 animate-pulse">
                🧡
              </span>
              <div className="h-px w-16 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-l from-transparent via-amber-500 to-transparent" />
            </div>

            <p
              className="text-sm sm:text-base md:text-lg text-amber-800 mt-4 sm:mt-6 italic"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              A conversation across time and space
            </p>
          </div>

          {!showReply ? (
            <>
              {/* Messages Section */}
              <div
                className="px-4 sm:px-6 md:px-8 lg:px-12 ml-16 sm:ml-20 md:ml-24 lg:ml-32 pb-8"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                <div
                  className="max-w-5xl mx-auto space-y-6 sm:space-y-8 md:space-y-12"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {data.messages.map((m, i) => (
                    <div
                      key={i}
                      className="animate-fade-in-up"
                      style={{
                        animationDelay: `${i * 0.3}s`,
                        fontFamily: "'Dancing Script', cursive",
                      }}
                      // style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                      {/* Message Card with vintage paper overlay */}
                      <div className="relative">
                        {/* Vintage paper background for this message */}
                        <div
                          className="absolute inset-0 bg-cover bg-center rounded-3xl opacity-95"
                          style={{
                            backgroundImage: `url('https://i.pinimg.com/736x/11/40/a0/1140a0124a1f0fd2497705fd49cec079.jpg')`,
                            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                          }}
                        />

                        {/* Red heart seal/stamp */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full flex items-center justify-center shadow-xl z-20 border-2 border-white/50">
                          <span className="text-2xl sm:text-3xl md:text-4xl">
                            💌
                          </span>
                        </div>

                        {/* Content */}
                        <div
                          className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12"
                          style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                          {/* "YOUR REPLY" badge for replies */}
                          {m.sender === "reply" && (
                            <div className="mb-6 flex justify-start">
                              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-300/90 to-pink-300/90 backdrop-blur-sm shadow-lg border border-rose-400/30">
                                <span className="text-lg sm:text-xl">💝</span>
                                <span
                                  className="text-rose-900 font-bold text-xs sm:text-sm uppercase tracking-wider"
                                  style={{
                                    fontFamily: "'Libre Baskerville', serif",
                                  }}
                                >
                                  Your Reply
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Message text */}
                          <div className="relative">
                            <p
                              className="text-amber-950 whitespace-pre-wrap break-words
             text-base sm:text-lg md:text-xl lg:text-2xl"
                              style={{
                                fontFamily: "'Pacifico', cursive",
                                // fontOpticalSizing: "auto",
                                fontWeight: 500,
                                fontStyle: "normal",
                              }}
                            >
                              {m.text}
                            </p>

                            {/* Decorative flower at bottom */}
                            <div className="flex items-center justify-center gap-2 mt-6">
                              <span className="text-xs sm:text-sm text-rose-600/60">
                                ~
                              </span>
                              <span className="text-xl sm:text-2xl md:text-3xl text-rose-500/50 animate-pulse">
                                💖
                              </span>
                              <span className="text-xs sm:text-sm text-rose-600/60">
                                ~
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply button */}
              <div className="text-center pb-12 px-4 ml-16 sm:ml-20 md:ml-24 lg:ml-32">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  {/* Write Reply Button */}
                  <button
                    onClick={() => setShowReply(true)}
                    className="group relative px-8 sm:px-12 md:px-14 py-3 sm:py-4 
                 bg-gradient-to-r from-rose-700 via-amber-600 to-purple-700 
                 text-white rounded-full shadow-xl
                 transform hover:scale-105 transition-all duration-500
                 text-sm sm:text-base md:text-lg border border-white/40 overflow-hidden"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    />

                    <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl">✍️</span>
                      <span className="font-semibold">Write Reply</span>
                      <span className="text-xl sm:text-2xl">💌</span>
                    </span>
                  </button>

                  {/* Send Letter Button */}
                  <a
                    href="/"
                    className="group relative px-8 sm:px-12 md:px-14 py-3 sm:py-4 
                 bg-white/90 text-rose-900 rounded-full shadow-lg
                 transform hover:scale-105 transition-all duration-500
                 text-sm sm:text-base md:text-lg border border-rose-300/60 overflow-hidden"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-rose-200/40 via-pink-200/40 to-purple-200/40 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl">📩</span>
                      <span className="font-semibold">Send Letter</span>
                    </span>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 ml-16 sm:ml-20 md:ml-24 lg:ml-32 py-8">
              <div className="max-w-4xl mx-auto relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-4 border-rose-300/70 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 text-3xl sm:text-4xl md:text-5xl text-rose-500 opacity-30 animate-pulse flex gap-2">
                  <span>💕</span>
                  <span style={{ animationDelay: "0.5s" }}>💌</span>
                  <span
                    className="hidden sm:inline"
                    style={{ animationDelay: "1s" }}
                  >
                    💝
                  </span>
                </div>

                {/* Header */}
                <div className="text-center mb-8 sm:mb-10">
                  <h3
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-900 via-pink-800 to-purple-800 mb-4"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      textShadow: "0 0 30px rgba(255, 182, 193, 0.4)",
                    }}
                  >
                    Compose Your Reply
                  </h3>

                  <div className="flex justify-center items-center gap-3 mt-4">
                    <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-rose-400" />
                    <span className="text-xl sm:text-2xl text-rose-500 animate-pulse">
                      💌
                    </span>
                    <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-rose-400" />
                  </div>

                  <p
                    className="text-xs sm:text-sm md:text-base text-rose-800 mt-3 italic"
                    style={{ fontFamily: "'Libre Baskerville', serif" }}
                  >
                    Let your emotions flow through every word
                  </p>
                </div>

                {/* Textarea */}
                <div className="relative mb-8">
                  <textarea
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-white/90 border-2 border-rose-200/60 outline-none resize-none 
                             text-rose-950 leading-loose p-6 sm:p-8 md:p-10 rounded-3xl
                             focus:bg-white/95 focus:border-pink-300/70 focus:shadow-2xl transition-all duration-500 text-sm sm:text-base md:text-lg
                             placeholder:text-rose-700/40 placeholder:italic"
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      lineHeight: "2",
                    }}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="My dearest,

Pour your heart onto these pages... Let your words dance with love and sincerity..."
                    disabled={isSending}
                  />

                  {reply && (
                    <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-60">
                      <span className="text-xl sm:text-2xl animate-bounce">
                        🪶
                      </span>
                      <div className="flex flex-col items-end">
                        <span className="text-rose-800 text-sm font-semibold">
                          composing...
                        </span>
                        <span className="text-rose-600 text-xs italic">
                          {reply.length} characters
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-sm sm:text-base text-rose-800 italic flex items-center gap-2 order-2 sm:order-1">
                    <span className="text-xl sm:text-2xl animate-pulse">
                      💕
                    </span>
                    <span style={{ fontFamily: "'Libre Baskerville', serif" }}>
                      {reply.length} characters of love
                    </span>
                  </div>

                  <div className="flex gap-4 w-full sm:w-auto order-1 sm:order-2">
                    <button
                      onClick={() => setShowReply(false)}
                      className="flex-1 sm:flex-none px-6 md:px-8 py-3 sm:py-4 text-rose-900 hover:text-rose-950 font-semibold transition-all duration-300 hover:scale-105 border-2 border-rose-300/50 rounded-full hover:bg-white/50 text-sm sm:text-base"
                      style={{ fontFamily: "'Libre Baskerville', serif" }}
                      disabled={isSending}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={sendReply}
                      disabled={!reply.trim() || isSending}
                      className="flex-1 sm:flex-none px-8 sm:px-12 md:px-16 py-3 sm:py-5 bg-gradient-to-r from-rose-800 via-pink-700 to-purple-800 text-rose-50 rounded-full 
                             disabled:opacity-40 disabled:cursor-not-allowed
                             transform hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl text-sm sm:text-base md:text-lg
                             border-2 border-white/30 group overflow-hidden relative"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                        {isSending ? (
                          <>
                            <span className="inline-block w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="font-semibold">Sending...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-xl sm:text-2xl">💌</span>
                            <span className="font-semibold">Send Reply</span>
                            <span className="text-xl sm:text-2xl">✨</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <footer>
            {" "}
            <div className=" flex gap-2 items-center justify-center space-y-2 mb-6">
              <p
                className="text-[10px] md:text-xs text-amber-900/50 uppercase tracking-[0.2em]"
                // style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Created with{" "}
                <span className="text-rose-500 animate-pulse">♥</span> by
              </p>

              <a
                href="https://www.dipayandey.site"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-[10px] md:text-xs uppercase font-bold text-rose-800 hover:text-purple-800 transition-colors tracking-tighter"
                // style={{ fontFamily: "'Playfair Display', serif" }}
              >
                WhisperNote Studio
              </a>
            </div>
            {/* <div className="mb-6">
              <p className="text-[10px] md:text-xs text-amber-900/50 uppercase tracking-[0.2em] text-center">
                © 2025 WhisperNote • All Rights Reserved
              </p>
            </div> */}
          </footer>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
