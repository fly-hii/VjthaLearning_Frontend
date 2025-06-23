import { useState, useEffect } from 'react';

export const BackToTop = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(document.body.scrollHeight - window.innerHeight, 1); // avoid division by 0
      const scroll = Math.min((scrollTop / docHeight) * 100, 100);

      setScrollPercent(scroll);
      setIsVisible(scroll > 2); // 🟢 now hidden until you scroll more than 4%
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`group fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center rounded-full z-50 
      backdrop-blur-sm bg-blue-300 border border-white/30 
      transition-all duration-300 transform hover:scale-110 
      ${isVisible ? 'opacity-100 animate-pulse' : 'opacity-0 pointer-events-none'} 
      shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)]`}
      aria-label="Back to top"
      title={`${Math.round(scrollPercent)}% scrolled`}
    >
      <svg className="absolute w-16 h-16 transform -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={175}
          strokeDashoffset={175 - (175 * scrollPercent) / 100}
          fill="none"
        />
      </svg>
      <svg
        className="w-6 h-6 text-white group-hover:animate-bounce transition-transform"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};