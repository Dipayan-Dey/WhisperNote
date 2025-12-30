export default function  FloatingHearts() {
  const elements = ['✨', '💫', '⭐', '🌟', '💝', '💖', '💗', '🌸', '🌺', '🦋'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-xl md:text-3xl opacity-30 animate-float-random"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}
        >
          {elements[Math.floor(Math.random() * elements.length)]}
        </div>
      ))}
    </div>
  );
}