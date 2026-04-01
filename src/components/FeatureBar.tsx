import { motion } from "framer-motion";
import { Diamond, Globe, ShieldCheck, Leaf, Headset } from "lucide-react";

const features = [
  {
    icon: <Diamond className="w-7 h-7 md:w-8 md:h-8" />,
    title: "Premium Quality",
    color: "#f59e0b" // Theme Orange
  },
  {
    icon: <Globe className="w-7 h-7 md:w-8 md:h-8" />,
    title: "Global Shipping",
    color: "#2dd4bf" // Theme Teal
  },
  {
    icon: <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" />,
    title: "Secure Payments",
    color: "#f59e0b" // Theme Orange
  },
  {
    icon: <Leaf className="w-7 h-7 md:w-8 md:h-8" />,
    title: "Sustainable Fashion",
    color: "#2dd4bf" // Theme Teal
  },
  {
    icon: <Headset className="w-7 h-7 md:w-8 md:h-8" />,
    title: "24/7 Support",
    color: "#f59e0b" // Theme Orange
  }
];

export default function FeatureBar() {
  // Triple the features for a seamless infinite loop
  const marqueeFeatures = [...features, ...features, ...features];

  return (
    <div className="relative w-full py-10 lg:py-12 bg-gradient-to-r from-[#0F3D3E] via-[#1a3b3b] to-[#0F3D3E] border-t border-b border-white/5 shadow-[0_-15px_50px_rgba(0,0,0,0.4)] mt-16 lg:mt-0 overflow-hidden group">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -left-20 top-0 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full" />
        <div className="absolute -right-20 bottom-0 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center gap-10 lg:gap-12">
        {/* Themed Trust Header */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[10px] md:text-sm text-white/40 uppercase tracking-[0.4em] font-black text-center"
        >
          Trusted by 10,000+ fashion enthusiasts worldwide
        </motion.p>

        {/* Scaled Infinite Marquee Container */}
        <div className="relative w-full overflow-hidden mask-fade-edges">
          {/* Edge Fade Masks */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0F3D3E] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0F3D3E] to-transparent z-20 pointer-events-none" />
          
          <motion.div 
            className="flex items-center gap-20 md:gap-32 lg:gap-48 whitespace-nowrap w-max py-4"
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 45,
                ease: "linear"
              }
            }}
          >
            {marqueeFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-5 md:gap-6 opacity-70 hover:opacity-100 transition-all duration-500 cursor-default group/item"
              >
                <div 
                   style={{ color: feature.color }} 
                   className="drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover/item:drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] group-hover/item:scale-125 transition-all duration-500 transform-gpu"
                >
                  {feature.icon}
                </div>
                <span className="text-sm md:text-base text-white/90 font-black uppercase tracking-[0.25em] whitespace-nowrap group-hover/item:text-white transition-colors duration-300">
                  {feature.title}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Underline Drift Effect */}
      <motion.div 
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-40"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .mask-fade-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
    </div>
  );
}
