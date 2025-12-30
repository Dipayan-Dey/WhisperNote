import { useEffect, useState } from "react";
import FloatingHearts from "./FloatingHearts";
import logo from "../assets/cropped_circle_image.png";

export default function LandingPage({ onWriteLetter }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center p-4 md:p-6 relative">
      <FloatingHearts />

      {/* Dreamy gradient background with paper texture */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-purple-50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(251, 207, 232, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(254, 215, 170, 0.3) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      <div
        className="absolute bottom-32 right-20 w-72 h-72 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-full blur-3xl opacity-25 animate-pulse-slow"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full blur-3xl opacity-15 animate-pulse-slow"
        style={{ animationDelay: "3s" }}
      />

      {/* Main content */}
      <div
        className={`text-center space-y-3 md:space-y-6 max-w-4xl z-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Logo */}
     <div className="relative inline-block">
  {/* Soft glowing background */}
  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-300 via-amber-200 to-purple-300 blur-2xl opacity-50 scale-110"></div>

  {/* Logo */}
  <img
    src={logo}
    alt="WhisperNote logo"
    className="relative h-20 md:h-28 object-contain mx-auto
               drop-shadow-[0_12px_25px_rgba(251,207,232,0.7)]
               transition-transform duration-500 hover:scale-105"
  />
</div>


        {/* Title */}
        <div className="relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl md:text-6xl text-amber-600 opacity-20 animate-pulse">
            ✦
          </div>

          <h1
            className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-800 via-amber-700 to-purple-800 mb-3 tracking-wider px-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 0 40px rgba(251, 207, 232, 0.5)",
            }}
          >
            Dear Someone
          </h1>

          <div className="flex items-center justify-center gap-3 md:gap-4 mt-2">
            <span className="text-rose-400 animate-pulse text-xl">❀</span>
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            <span className="text-amber-500 animate-pulse text-lg">✿</span>
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            <span className="text-purple-400 animate-pulse text-xl">✾</span>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="text-xl md:text-3xl text-rose-900 italic"
          style={{
            fontFamily: "'Dancing Script', cursive",
            textShadow: "0 2px 10px rgba(251, 207, 232, 0.3)",
          }}
        >
          Where hearts whisper through words
        </p>

        {/* Description */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100 via-amber-50 to-purple-100 rounded-3xl transform -rotate-1 opacity-50" />
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-xl border border-amber-200/50">
            <p
              className="text-xs md:text-lg text-amber-900 leading-relaxed px-2"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              In a world of fleeting messages, create something{" "}
              <span className="text-rose-700 font-semibold">timeless</span>. Pour
              your soul into words that{" "}
              <span className="text-purple-700 font-semibold">
                echo through eternity
              </span>
              .
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="relative">
          <button
            onClick={onWriteLetter}
            className="group relative mt-4 px-10 md:px-14 py-3 md:py-4 max-w-full
                       bg-gradient-to-r from-rose-700 via-amber-600 to-purple-700 
                       text-white rounded-full text-lg md:text-2xl font-serif 
                       shadow-2xl transform hover:scale-105 transition-all duration-700 
                       overflow-hidden border border-white/20"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 flex items-center gap-3">
              ✍️ Begin Your Letter 💌
            </span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-3 text-xs md:text-sm text-amber-900/70 z-10">
        <span className="italic">
          Designed & crafted with love by{" "}
          <a
            href="https://www.dipayandey.site"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-rose-700 hover:text-purple-700 underline underline-offset-4"
          >
            Dipayan Dey
          </a>
        </span>
      </footer>
    </div>
  );
}
