import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';

const suggestions = [
  "Outfit for a date night?",
  "What to wear to a wedding?",
  "Casual summer look ideas",
  "Office wear suggestions",
];

const aiResponses = {
  "date": "For a date night 💕 I'd suggest our **Pink Blazer Set** paired with heels, or a **Floral Maxi Dress** for a romantic vibe. Accessorize with delicate gold jewelry!",
  "wedding": "Wedding guest look? ✨ Try our **Embroidered Kurta** for a traditional touch, or go chic with the **Pink Blazer Set**. Avoid white to be safe!",
  "summer": "Summer vibes 🌸 Our **Boho Summer Dress** is perfect! Pair with sandals and a sun hat. The **Floral Maxi Dress** also screams summer goddess.",
  "office": "Work it girl! 💼 Our **Pink Blazer Set** is a power move. Or style **Linen Wide-Leg Pants** with the **Pastel Crop Top** for smart-casual vibes.",
  "casual": "Casual days sorted ☀️ Try **Pastel Crop Top** with **Ruffled Mini Skirt** for a cute look. Or go comfy with our **Linen Wide-Leg Pants** and a simple top.",
  "party": "Party time! 🎉 Our **Sequin Party Top** with a mini skirt is a showstopper. Add bold earrings and strappy heels — you'll slay!",
  "winter": "Winter warmth 🧥 Layer a turtleneck under our **Pink Blazer Set**, or cozy up in knit sweaters. Check our sets collection for layering options!",
  "default": "Hey gorgeous! 👋 I can help you find the perfect outfit! Try asking me about date night looks, party wear, summer outfits, or office attire. What's the occasion? ✨",
};

function getResponse(msg) {
  const lower = msg.toLowerCase();
  for (const [key, val] of Object.entries(aiResponses)) {
    if (key !== 'default' && lower.includes(key)) return val;
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return "Hey there, fashionista! 🌸 I'm GlowBot, your personal style assistant. Ask me anything about outfits and fashion!";
  }
  if (lower.includes('price') || lower.includes('cost') || lower.includes('cheap')) {
    return "We have styles starting from just ₹899! Use code **GIRLY20** for 20% off. 🎀 Check our Sale section for amazing deals!";
  }
  return aiResponses.default;
}

function Message({ msg }) {
  return (
    <div className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
      {msg.from === 'bot' && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-700 to-rose-900 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot size={13} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          msg.from === 'user'
            ? 'bg-rose-700 text-white rounded-tr-sm'
            : 'bg-pink-50 text-gray-800 rounded-tl-sm border border-pink-100'
        }`}
      >
        {msg.text.split('**').map((part, i) =>
          i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
        )}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi gorgeous! 🌸 I'm GlowBot — your AI style assistant. Ask me for outfit suggestions!" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getResponse(msg) }]);
    }, 900 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-rose-700 to-rose-900 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-rose-300 group"
        aria-label="Open AI style assistant"
      >
        {open ? <X size={22} /> : (
          <>
            <MessageCircle size={22} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl shadow-rose-200 flex flex-col overflow-hidden border border-pink-100 animate-[fadeInUp_0.25s_ease]"
          style={{ maxHeight: '520px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-800 to-rose-900 px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">GlowBot ✨</p>
              <p className="text-rose-100 text-[11px]">Your AI Style Assistant • Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide" style={{ minHeight: 240 }}>
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-700 to-rose-900 flex items-center justify-center flex-shrink-0">
                  <Bot size={13} className="text-white" />
                </div>
                <div className="bg-pink-50 border border-pink-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => send(s)}
                className="flex-shrink-0 text-[11px] bg-pink-50 text-rose-700 border border-pink-200 px-3 py-1.5 rounded-full hover:bg-rose-700 hover:text-white transition-all font-medium"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-pink-50">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask for outfit ideas..."
                className="flex-1 px-4 py-2.5 rounded-full border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-pink-50/50 placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-10 h-10 bg-rose-700 text-white rounded-full flex items-center justify-center hover:bg-rose-800 transition-all hover:scale-105"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
