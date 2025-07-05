
import { useState, useRef, useEffect } from 'react';

export const AIPopup = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const askAI = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: '❌ Failed to connect to AI.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
    }
  }, [messages]);

  return (
    <>
      {/* AI Button */}
      <span
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50
                   w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center
                   text-2xl sm:text-3xl cursor-pointer
                   bg-gradient-to-r from-blue-200 to-blue-400
                   border-2 sm:border-4 border-yellow-200 rounded-full
                   shadow-[0_0_15px_#FFD700,0_0_30px_#FFD700]
                   animate-pulse-glow hover:scale-110 transition-transform duration-300"
      >
        🤖
      </span>

      {/* AI Popup */}
      {open && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 
                        w-[calc(100vw-2rem)] max-w-md h-[70vh] sm:h-[500px] 
                        rounded-xl overflow-hidden shadow-2xl border border-cyan-300 
                        bg-black bg-opacity-80 backdrop-blur-lg text-white">
          
          {/* Glow Border */}
          <div className="absolute inset-0 rounded-xl neon-border z-0"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col w-full h-full">
            
            {/* Header */}
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-cyan-600 to-purple-700 rounded-t-xl">
              <span className="font-semibold text-sm sm:text-base">💬 AI Assistant</span>
              <button onClick={() => setOpen(false)} className="hover:text-red-400 text-lg">✖</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[85%] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow ${
                    m.role === 'user'
                      ? 'ml-auto bg-cyan-700 text-white'
                      : 'mr-auto bg-gray-800 text-green-300'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="mr-auto bg-gray-800 text-green-300 px-3 sm:px-4 py-2 rounded-lg max-w-[85%] text-xs sm:text-sm leading-relaxed shadow w-fit">
                  🤖 Thinking...
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 flex gap-2 border-t border-cyan-800 bg-black bg-opacity-50 rounded-b-xl">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && askAI()}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded-lg bg-black bg-opacity-40 text-white border border-cyan-500 placeholder-gray-400 text-xs sm:text-sm"
              />
              <button
                onClick={askAI}
                disabled={loading}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm"
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .neon-border {
          pointer-events: none;
          background: conic-gradient(
            from 0deg,
            #00f7ff,
            #ff00ff,
            #00ff88,
            #ffcc00,
            #00f7ff
          );
          animation: rotate 4s linear infinite;
          padding: 2px;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-pulse-glow {
          animation: pulseGlow 1.8s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px #00f7ff, 0 0 20px #00f7ff; }
          50% { box-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff; }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        @media (min-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #00f7ff;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
};
