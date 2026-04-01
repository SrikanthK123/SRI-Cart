import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Bell, Clock, Star, ArrowRight, Shield, Workflow, Globe, Activity, Layers, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LuxuryWatchTeaser from "../assets/Images/SRIWatchBrand.jpg";
import SneakerTeaser from "../assets/Images/UpComingSportShoe.jpg";
import FragranceTeaser from "../assets/Images/UpComingSunGlass.jpg";

export default function UpdatingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const upcomingCollections = [
        {
            title: "SRI Elite Watches",
            tag: "Dropping Spring 2026",
            image: LuxuryWatchTeaser,
            description: "Uncompromising precision and timeless design. The new standard for luxury timepieces, crafted for those who define the era.",
            color: "#8b5e3c"
        },
        {
            title: "Velocity Sport Series",
            tag: "Dropping Summer 2026",
            image: SneakerTeaser,
            description: "Performance redefined. Our upcoming sport shoe collection combines explosive energy return with extreme breathability.",
            color: "#0F3D3E"
        },
        {
            title: "Aviator Vision Collection",
            tag: "Dropping Autumn 2026",
            image: FragranceTeaser,
            description: "See the world through a new lens. Premium handcrafted sunglasses designed for ultimate clarity and iconic style.",
            color: "#1a1a1a"
        }
    ];

    return (
        <div className="min-h-screen bg-[#fdf5e6] pt-32 pb-20 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0F3D3E]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8b5e3c]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 text-[#8b5e3c] font-bold uppercase tracking-widest text-xs mb-12 hover:gap-5 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Store
                </motion.button>

                {/* Hero Section */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#8b5e3c]/10 border border-[#8b5e3c]/20 text-[#8b5e3c] text-sm font-bold uppercase tracking-[0.3em] mb-10">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            Future Launches
                        </div>
                        <h1 className="text-6xl lg:text-9xl font-serif font-black text-[#1a1a1a] leading-[0.9] mb-8 tracking-tighter">
                            A NEW ERA <br />
                            OF LUXURY
                        </h1>
                        <p className="text-xl text-black/40 font-medium max-w-2xl mx-auto leading-relaxed">
                            We are working to innovate more efficiently. The following exclusive drops are launching soon on SRI-Cart.
                        </p>
                    </motion.div>
                </div>

                {/* Upcoming Collections Grid */}
                <div className="flex flex-col gap-32">
                    {upcomingCollections.map((collection, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-32`}
                        >
                            {/* Image Side */}
                            <div className="lg:w-1/2 relative group w-full">
                                <div
                                    className="absolute inset-0 blur-[60px] opacity-20 rounded-[3rem] transition-all group-hover:opacity-40"
                                    style={{ backgroundColor: collection.color }}
                                />
                                <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-white/20 aspect-[4/5] lg:aspect-auto h-[400px] md:h-[500px] lg:h-[600px]">
                                    <img
                                        src={collection.image}
                                        alt={collection.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-8 left-8">
                                        <div className="px-6 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-black/5 flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-[#8b5e3c]" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">{collection.tag}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start max-w-xl">
                                <div className="flex items-center gap-2 text-amber-600 font-black uppercase tracking-widest text-xs mb-6 px-4 py-1.5 bg-amber-500/10 rounded-full">
                                    <Star className="w-3.5 h-3.5 fill-current" /> Exclusive Drop
                                </div>
                                <h2 className="text-5xl lg:text-6xl font-serif font-bold text-[#0F3D3E] mb-8 leading-tight">{collection.title}</h2>
                                <p className="text-lg text-black/60 font-medium mb-12 leading-relaxed">{collection.description}</p>
                                <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                                    <button className="flex items-center justify-center gap-3 px-10 py-5 bg-[#1a1a1a] text-white rounded-2xl font-bold hover:bg-[#333] transition-all shadow-xl group">
                                        <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Notify Me
                                    </button>
                                    <button className="flex items-center justify-center gap-3 px-10 py-5 border-2 border-black/10 rounded-2xl font-bold hover:bg-black/5 transition-all group">
                                        Details <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>


                {/* Footer Statistics/Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-40 text-center border-t border-black/5 pt-20"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { label: "Dropping Soon", value: "3 Collections" },
                            { label: "Efficiency", value: "+40% faster" },
                            { label: "Exclusive", value: "Limited Stock" },
                            { label: "Global Launch", value: "Q2 2026" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#8b5e3c]">{stat.label}</span>
                                <span className="text-3xl font-serif font-bold text-[#0F3D3E]">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}