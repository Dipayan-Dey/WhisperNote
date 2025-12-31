import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import ThreeBackground from "./components/ThreeBackground";
import LandingPage from "./components/LandingPage";
import WriteLetter from "./components/WriteLetter";
import LinkGenerated from "./components/LinkGenerated";
import ReadLetter from "./components/ReadLetter";

// ============================================================================
// API MODULE
// ============================================================================


// ============================================================================
// THREE.JS BACKGROUND
// ============================================================================


// ============================================================================
// FLOATING HEARTS
// ============================================================================


// ============================================================================
// LANDING PAGE
// ============================================================================


// ============================================================================
// WRITE LETTER PAGE (DIARY STYLE)
// ============================================================================


// ============================================================================
// LINK GENERATED PAGE
// ============================================================================


// ============================================================================
// READ LETTER PAGE (DIFFERENT DESIGN - CARD STYLE)
// ============================================================================


// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {

  const [page, setPage] = useState("landing");
  const [generatedLink, setGeneratedLink] = useState(null);
  const [currentLetterId, setCurrentLetterId] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/letter/")) {
      const id = path.split("/")[2];
      setCurrentLetterId(id);
      setPage("read");
    }
  }, []);


 useEffect(() => {
    // Disable right click
    const handleContextMenu = (e) => e.preventDefault();

    // Disable copy
    // const handleCopy = (e) => e.preventDefault();

    // Disable key shortcuts
    const handleKeyDown = (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, Ctrl+Shift+C
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && ["U", "S","A"].includes(e.key.toUpperCase()))
      ) {
        e.preventDefault();
      }
    };

    // Disable double click selection
    const handleDoubleClick = (e) => e.preventDefault();
  //  const handleSelectStart = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    // document.addEventListener("copy", handleCopy);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dblclick", handleDoubleClick);
//  document.addEventListener("selectstart", handleSelectStart);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      // document.removeEventListener("copy", handleCopy);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dblclick", handleDoubleClick);
      //  document.addEventListener("selectstart", handleSelectStart);
    };
    document.addEventListener("keyup", function(e) {
  if (e.key === "PrintScreen") {
    alert("Screenshots are disabled!");
    navigator.clipboard.writeText(""); // Clear clipboard
  }
});
  }, []);

  return (
    <>
      <ThreeBackground />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-heart {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-fade-in-up { 
          animation: fade-in-up 1s ease-out; 
          opacity: 0; 
          animation-fill-mode: forwards; 
        }
        
        .animate-shimmer { 
          background-size: 200% auto;
          animation: shimmer 3s linear infinite; 
        }
        
        .animate-float { 
          animation: float 3s ease-in-out infinite; 
        }
        
        .animate-float-heart { 
          animation: float-heart linear forwards; 
        }
        
        .animate-bounce-slow { 
          animation: bounce-slow 2s ease-in-out infinite; 
        }
        
        .animate-pulse-slow { 
          animation: pulse-slow 4s ease-in-out infinite; 
        }
        
        .animate-spin-slow { 
          animation: spin-slow 20s linear infinite; 
        }
        
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 15s ease infinite; 
        }
        
        * {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(217, 119, 6, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(217, 119, 6, 0.5);
          border-radius: 4px;
        }
      `}</style>

      {page === "landing" && (
        <LandingPage onWriteLetter={() => setPage("write")} />
      )}

      {page === "write" && (
        <WriteLetter
          onBack={() => setPage("landing")}
          onSent={(link) => {
            setGeneratedLink(link);
            setPage("sent");
          }}
        />
      )}

      {page === "sent" && (
        <LinkGenerated
          link={generatedLink}
          onNewLetter={() => {
            setGeneratedLink(null);
            setPage("landing");
          }}
        />
      )}

      {page === "read" && (
        <ReadLetter letterId={currentLetterId} />
      )}
    </>
  );
}