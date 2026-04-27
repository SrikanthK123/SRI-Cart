import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, Sparkles, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'msg-1',
  type: 'bot',
  text: "Hello! I'm your SRI-Cart AI Assistant ✨ How can I help you discover our premium collections today?",
  timestamp: new Date()
};

const SUGGESTIONS = [
  "Track my last order",
  "Show me Best Sellers",
  "Recommend a Men's Suit",
  "What is the return policy?",
];

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responseText = getAutomatedResponse(text);
      const newBotMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAutomatedResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("track") || lowerQuery.includes("order")) {
      return "I'd be happy to help track your order. Please navigate to the 'Orders' page from the main menu, and you can see detailed tracking information for all your recent purchases.";
    }
    if (lowerQuery.includes("suit")) {
      return "Our 'Men's Executive Suit' in Midnight Blue is currently a top choice for formal occasions. You can find it under Collections > Men > Suits.";
    }
    if (lowerQuery.includes("return")) {
      return "We offer a 14-day premium return policy for all unworn items with original tags attached. Reach out to support@sri-cart.com to initiate a return.";
    }
    if (lowerQuery.includes("best seller")) {
      return "Our current best sellers boast the Royal Silk Saree and the Men's Executive Suit. Would you like me to guide you to their sections?";
    }
    return "Thank you for reaching out! One of our lifestyle consultants will review your query. In the meantime, feel free to browse our New Arrivals!";
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring", stiffness: 260, damping: 20,
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={() => setIsOpen(true)}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="fixed bottom-6 right-6 z-[200] w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr from-[#0F3D3E] to-[#043927] rounded-full shadow-2xl flex items-center justify-center cursor-pointer overflow-hidden border-2 border-white/40 group"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div animate={{ rotate: isHovered ? [0, -10, 10, -10, 0] : 0 }} transition={{ duration: 0.5 }}>
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            
            {/* Sparkles */}
            <Sparkles className="absolute top-3 right-3 w-3 h-3 text-white/80" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 z-[250] w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-white/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-5 bg-gradient-to-r from-[#0F3D3E] to-[#043927] flex items-center justify-between shrink-0">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-md relative">
                  <Bot className="w-5 h-5 text-white" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#8b5e3c]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-white leading-tight">SRI-Cart Concierge</h3>
                  <p className="text-[10px] text-white/80 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Assistant Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 pb-2 bg-[#fdf5e6]/30 flex flex-col gap-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0F3D3E] to-[#043927] flex flex-col items-center justify-center shrink-0 mb-1">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.type === 'user'
                        ? 'bg-[#1a1a1a] text-white rounded-br-sm'
                        : 'bg-white text-black/80 rounded-bl-sm border border-[#8b5e3c]/10'
                    }`}
                  >
                    {msg.text}
                    <div className={`text-[9px] mt-1.5 opacity-60 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0F3D3E] to-[#043927] flex flex-col items-center justify-center shrink-0 mb-1">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl rounded-bl-sm border border-[#8b5e3c]/10 flex items-center gap-1.5 shadow-sm">
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-[#8b5e3c]/50 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#8b5e3c]/50 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#8b5e3c]/50 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="px-5 py-2 flex flex-wrap gap-2 bg-[#fdf5e6]/30">
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full border border-[#8b5e3c]/30 text-[#8b5e3c] bg-white hover:bg-[#8b5e3c]/5 transition-colors shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-black/5 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  placeholder="Ask about our collections..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-[#fdf5e6]/50 border border-[#8b5e3c]/20 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:border-[#8b5e3c] transition-colors text-black/80 placeholder:text-black/30"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-[#8b5e3c] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#704a2f] transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
              <div className="text-center mt-2.5">
                <span className="text-[9px] text-black/30 tracking-wide">Powered by SRI-CART AI</span>
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 94, 60, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 94, 60, 0.4);
        }
      `}</style>
    </>
  );
};
