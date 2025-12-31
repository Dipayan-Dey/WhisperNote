import { useEffect, useState } from "react";
import FloatingHearts from "./FloatingHearts";
import logo from "../assets/cropped_circle_image.png";

export default function LandingPage({ onWriteLetter }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    // Changed justify-center to justify-between to spread content across the screen
    <div className="h-screen overflow-hidden flex flex-col items-center justify-between p-6 md:p-10 relative">
      <FloatingHearts />

      {/* Dreamy gradient background */}
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

      {/* Top Section: Logo & Title */}
      <div
        className={`w-full text-center space-y-4 z-10 transition-all duration-1000 pt-4 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-300 via-amber-200 to-purple-300 blur-2xl opacity-50 scale-110"></div>
          <img
            src={logo}
            alt="WhisperNote logo"
            className="relative h-24 md:h-32 object-contain mx-auto drop-shadow-[0_12px_25px_rgba(251,207,232,0.7)]"
          />
        </div>

        <div className="relative">
          <h1
            className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-800 via-amber-700 to-purple-800 tracking-wider px-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Dear Someone
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            <span className="text-rose-400 animate-pulse">❀</span>
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          </div>
        </div>
      </div>

      {/* Middle Section: Subtitle & Description */}
      <div
        className={`w-full max-w-2xl text-center space-y-6 z-10 transition-all duration-1000 delay-300 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <p
          className="text-2xl md:text-4xl text-rose-900 italic"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Where hearts whisper through words
        </p>

        <div className="relative mb-6">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 " />
          <div className="relative p-6">
            <p
              className="text-sm md:text-xl text-amber-900 leading-relaxed"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              In a world of fleeting messages, create something{" "}
              <span className="text-rose-700 font-semibold">timeless</span>. Pour
              your soul into words that{" "}
              <span className="text-purple-700 font-semibold">
                echo through eternity
              </span>.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: CTA, Creator Name & Footer */}
      <div
        className={`w-full text-center space-y-8 z-10 transition-all duration-1000 delay-500 pb-6 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <button
          onClick={onWriteLetter}
          className="group relative px-12 py-4 bg-gradient-to-r from-rose-700 via-amber-600 to-purple-700 
                     text-white rounded-full text-xl md:text-2xl font-serif shadow-2xl 
                     hover:scale-105 transition-all duration-500 overflow-hidden border border-white/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10 flex items-center justify-center gap-3">
            ✍️ Begin Your Letter 💌
          </span>
        </button>

        {/* Prominent Creator Name Section */}
        <div className="pt-4 flex gap-2 items-center justify-center space-y-1">
          <p className="text-amber-900/80 font-serif text-md md:text-xl" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Created with <span className="text-rose-500 animate-pulse">♥</span> by
          </p>
          <a
            href="https://www.dipayandey.site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md md:text-xl font-bold  text-rose-800 hover:text-purple-800 transition-colors tracking-tighter"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Dipayan Dey
          </a>
        </div>

        <footer className="text-[10px] md:text-xs text-amber-900/50 uppercase tracking-[0.2em]">
          © 2025 WhisperNote • All Rights Reserved
        </footer>
      </div>
    </div>
  );
}