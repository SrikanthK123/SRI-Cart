import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Monitor, ShoppingCart, Package, Truck, Home, CheckCircle, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function FulfillmentJourney() {
  const [step, setStep] = useState(0); // 0: Request, 1: Processing, 2: Delivery, 3: Success

  useEffect(() => {
    const sequence = async () => {
      // Step 0: Request (Left to Right) - 4s
      setStep(0);
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Step 1: Processing at Warehouse - 3s
      setStep(1);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Step 2: Delivery (Warehouse -> Web Portal -> User) - 7s
      setStep(2);
      await new Promise(resolve => setTimeout(resolve, 7000));
      
      // Step 3: Success at User - 3s
      setStep(3);
      await new Promise(resolve => setTimeout(resolve, 4000));
    };

    const timer = setInterval(sequence, 18000);
    sequence();
    return () => clearInterval(timer);
  }, []);

  const stations = [
    { id: 'user', icon: <User className="w-10 h-10" />, label: "User", sub: "Ordering", pos: "10%" },
    { id: 'web', icon: <Monitor className="w-10 h-10" />, label: "Web Portal", sub: "Updating", pos: "40%" },
    { id: 'warehouse', icon: <Home className="w-10 h-10" />, label: "Warehouse", sub: "Inventory", pos: "80%" },
  ];

  return (
    <div className="relative w-full py-12 bg-gradient-to-r from-[#0F3D3E] via-[#1a3b3b] to-[#0F3D3E] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] mt-20 lg:mt-0 overflow-hidden h-[380px] flex items-center justify-center">
      {/* Background minimalist landscape elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
         <div className="absolute bottom-0 left-0 w-full h-32 flex justify-around items-end">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-64 h-32 bg-white rounded-t-full transform translate-y-16" />
            ))}
         </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-12 relative h-48 flex items-center">
        {/* The Connection Path */}
        <div className="absolute top-1/2 left-[15%] right-[25%] h-[2px] bg-white/10 -translate-y-1/2 z-0 hidden md:block">
           <motion.div 
             animate={{ x: ["0%", "100%"] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="w-20 h-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
           />
        </div>

        {/* Stations */}
        {stations.map((station, idx) => (
          <motion.div
            key={station.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: (step === 1 && idx === 2) || (step === 3 && idx === 0) ? 1.15 : 1
            }}
            className="absolute flex flex-col items-center gap-4 z-20"
            style={{ left: station.pos, transform: 'translateX(-50%)' }}
          >
            <div className={`relative p-5 rounded-3xl backdrop-blur-xl border-2 transition-all duration-500 ${
              (idx === 0 && (step === 0 || step === 3)) || 
              (idx === 1 && (step === 0 || step === 2)) ||
              (idx === 2 && (step === 1 || step === 2))
                ? 'bg-amber-500/20 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]' 
                : 'bg-white/5 border-white/10'
            }`}>
              <div className={step === (idx === 2 ? 1 : (idx === 0 ? 3 : 99)) ? 'text-amber-400' : 'text-white/60'}>
                {station.icon}
              </div>
              
              {/* Conditional Station Details */}
              {idx === 0 && (
                <motion.div 
                  animate={{ scale: step === 0 ? [1, 1.1, 1] : 1 }}
                  className="absolute -top-3 -right-3 p-1.5 bg-amber-500 rounded-lg shadow-lg"
                >
                  <Smartphone className="w-4 h-4 text-white" />
                </motion.div>
              )}
              {idx === 1 && step === 0 && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 whitespace-nowrap z-50">
                   <span className="text-[8px] font-black uppercase text-amber-500 animate-pulse">Request Updating...</span>
                </div>
              )}
              {idx === 1 && step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-amber-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 whitespace-nowrap z-50"
                >
                   <span className="text-[8px] font-black uppercase text-amber-500">Out for Delivery</span>
                </motion.div>
              )}
              {idx === 2 && step === 1 && (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="absolute -top-4 -left-4 bg-amber-500 p-2 rounded-xl shadow-xl"
                >
                  <Package className="w-5 h-5 text-white" />
                </motion.div>
              )}
              {idx === 0 && step === 3 && (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 p-2 rounded-full border-4 border-[#1a3b3b] shadow-2xl"
                >
                  <CheckCircle className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </div>
            <div className="text-center">
              <p className="text-white font-serif font-black tracking-tight text-sm uppercase">{station.label}</p>
              <p className="text-amber-500/60 text-[9px] font-bold uppercase tracking-[0.2em]">{station.sub}</p>
            </div>
          </motion.div>
        ))}

        {/* --- DYNAMIC TRANSITIONS --- */}

        {/* Phase 1: Request (Left to Right) */}
        {step === 0 && (
          <>
            <motion.div
              initial={{ x: "12%", opacity: 0 }}
              animate={{ x: ["12%", "38%", "38%", "78%", "78%"], opacity: [1, 1, 1, 1, 0] }}
              transition={{ duration: 5, ease: "easeInOut" }}
              className="absolute top-1/2 -translate-y-1/2 flex gap-1 z-30"
            >
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,1)]" />
              ))}
            </motion.div>
            <div className="absolute top-[65%] left-1/2 -translate-x-1/2">
                <span className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-black flex items-center gap-2">
                  Requesting <ArrowRight className="w-3 h-3 animate-bounce-x" />
                </span>
            </div>
          </>
        )}

        {/* Phase 2: Processing (Center-Right) */}
        {step === 1 && (
           <div className="absolute top-[65%] left-1/2 -translate-x-1/2">
              <span className="text-[10px] text-amber-500 uppercase tracking-[0.4em] font-black flex items-center gap-2">
                Collecting Items <Package className="w-3 h-3 animate-bounce" />
              </span>
           </div>
        )}

        {/* Phase 3: Delivery (Right to Left) */}
        {step === 2 && (
          <>
            <motion.div
              initial={{ x: "78%", opacity: 0 }}
              animate={{ 
                x: ["78%", "38%", "38%", "15%", "15%"], 
                opacity: [0, 1, 1, 1, 0],
                scale: [0.8, 1, 1, 1, 0.8]
              }}
              transition={{ 
                duration: 7, 
                ease: "easeInOut",
                times: [0, 0.3, 0.6, 0.9, 1] 
              }}
              className="absolute top-[35%] -translate-y-1/2 flex flex-col items-center gap-2 z-40"
            >
              <div className="relative">
                {/* Delivery Van Illustration */}
                <div className="relative">
                  <Truck className="w-14 h-14 text-white drop-shadow-2xl scale-x-[-1]" />
                  {/* Glowing Package on Top/Inside */}
                  <motion.div 
                    animate={{ y: [0, -5, 0], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-4 left-4"
                  >
                    <Package className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                  </motion.div>
                </div>
                
                {/* Backwards Speed Lines */}
                <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-60">
                   <motion.div animate={{ width: [10, 25, 10] }} transition={{ duration: 0.4, repeat: Infinity }} className="h-[1.5px] bg-white rounded-full" />
                   <motion.div animate={{ width: [15, 35, 15] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} className="h-[1.5px] bg-white/60 rounded-full" />
                </div>
              </div>
            </motion.div>
            <div className="absolute top-[70%] left-1/2 -translate-x-1/2">
                <span className="text-[10px] text-amber-500/80 uppercase tracking-[0.4em] font-black flex items-center gap-3">
                  <ArrowLeft className="w-3 h-3 animate-pulse" /> Dispatching to Portal <ArrowLeft className="w-3 h-3 animate-pulse" />
                </span>
            </div>
          </>
        )}

        {/* Phase 4: Success (Far Left) */}
        {step === 3 && (
           <div className="absolute top-[65%] left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="text-[10px] text-green-500 uppercase tracking-[0.4em] font-black mb-2 flex items-center gap-2">
                Successfully Delivered <CheckCircle className="w-3 h-3" />
              </span>
              <p className="text-[8px] text-white/40 uppercase tracking-widest text-center">Your order arrived at your doorstep</p>
           </div>
        )}
      </div>

      {/* Modern Progress Steps */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {[0, 1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <motion.div
              animate={{ 
                scale: step === s ? 1.3 : 1,
                backgroundColor: step === s ? "#f59e0b" : "rgba(255,255,255,0.1)",
                borderColor: step === s ? "rgba(255,255,255,0.4)" : "transparent"
              }}
              className="w-2.5 h-2.5 rounded-full border shadow-sm transition-all duration-500"
            />
            {s < 3 && (
              <div className="w-12 h-[1px] mx-1 bg-white/5 overflow-hidden">
                <motion.div 
                  animate={{ 
                    x: step > s ? 0 : "-100%",
                    backgroundColor: step > s ? "#f59e0b" : "transparent"
                  }}
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-10 left-10 w-20 h-20 bg-amber-500/20 blur-[50px] rounded-full" />
         <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#0F3D3E]/20 blur-[60px] rounded-full" />
      </div>
    </div>
  );
}
