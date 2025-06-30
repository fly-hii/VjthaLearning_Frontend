import { useState, useRef, useEffect } from 'react';

export const AIPopup = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // Update with your actual API URL
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
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* AI Button */}
      <span
  onClick={() => setOpen(true)}
  className="relative left-[520px] top-[-38px] h-9 w-[150px] px-3 flex items-center justify-center gap-2 text-2xl bg-black border-2 border-cyan-400 shadow-[0_0_15px_#00f7ff] animate-pulse-glow text-white cursor-pointer hover:scale-105 transition-all rounded-full"
>
  🤖
  <span className="text-[14px] font-semibold tracking-widest text-neon-blue animate-flicker">
    VJTHA AI
  </span>
</span>

<style>{`
  .text-neon-blue {
    color: #00f7ff;
    text-shadow:
      0 0 3px #00f7ff,
      0 0 6px #00f7ff,
      0 0 8px #00f7ff;
  }

  @keyframes flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
      opacity: 1;
    }
    20%, 22%, 24%, 55% {
      opacity: 0.4;
    }
  }

  .animate-flicker {
    animation: flicker 2.5s infinite;
  }

  .animate-pulse-glow {
    animation: pulseGlow 2s infinite;
  }

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 8px #00f7ff, 0 0 12px #00f7ff;
    }
    50% {
      box-shadow: 0 0 12px #ff00ff, 0 0 18px #ff00ff;
    }
  }
`}</style>



      {/* AI Popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
          <div className="relative w-full max-w-3xl h-[80vh] rounded-2xl overflow-hidden neon-container border border-cyan-300">

            {/* Glow Border */}
            <div className="absolute inset-0 rounded-2xl neon-border z-0"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col w-full h-full bg-black bg-opacity-60 backdrop-blur-lg text-white shadow-2xl rounded-2xl">
              {/* Header */}
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-600 to-purple-700">
                <span className="font-semibold text-lg">💬 AI Assistant</span>
                <button onClick={() => setOpen(false)} className="hover:text-red-400 text-xl">✖</button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap shadow ${
                      m.role === 'user'
                        ? 'ml-auto bg-cyan-700 text-white'
                        : 'mr-auto bg-gray-800 text-green-300'
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {loading && (
                  <div className="mr-auto bg-gray-700 text-yellow-400 px-4 py-2 rounded animate-pulse w-fit">
                    🤖 Thinking...
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 flex gap-2 border-t border-cyan-800 bg-black bg-opacity-50">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && askAI()}
                  placeholder="Type your message..."
                  className="flex-1 p-3 rounded-lg bg-black bg-opacity-40 text-white border border-cyan-500 placeholder-gray-400"
                />
                <button
                  onClick={askAI}
                  disabled={loading}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
                >
                  Ask
                </button>
              </div>
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
          width: 6px;
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


