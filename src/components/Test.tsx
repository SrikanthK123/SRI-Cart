import { motion } from "motion/react";
import { ArrowLeft, Layout, MousePointer2, Sparkles, Zap, Shield, Globe, Search, PenTool, Code2, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UpdatingDashboardImg from "../assets/Images/UpdatingDashboardProject.png";

export default function UpdatingPage() {
    const navigate = useNavigate();

    const cursors = [
        { name: "Alex", x: "15%", y: "25%", delay: 0 },
        { name: "Simon", x: "75%", y: "15%", delay: 1 },
        { name: "Melissa", x: "82%", y: "45%", delay: 2 },
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
                <div className="text-center mb-28 relative">
                    {/* Floating Cursors */}
                    {cursors.map((cursor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: [0, 15, -10, 0],
                                y: [0, -20, 10, 0]
                            }}
                            transition={{
                                opacity: { duration: 1, delay: cursor.delay },
                                scale: { duration: 0.5, delay: cursor.delay },
                                x: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: cursor.delay },
                                y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: cursor.delay }
                            }}
                            className="absolute hidden lg:flex items-center gap-2 z-20"
                            style={{ left: cursor.x, top: cursor.y }}
                        >
                            <div className="relative">
                                <MousePointer2 className="w-6 h-6 text-[#0F3D3E] fill-current drop-shadow-lg" />
                                <div className="absolute left-4 top-4 px-3 py-1 bg-[#0F3D3E] text-white text-[10px] font-bold rounded-md shadow-xl whitespace-nowrap">
                                    {cursor.name}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl border border-black/5">
                                <Sparkles className="w-8 h-8 text-[#8b5e3c]" />
                            </div>
                        </div>
                        <h1 className="text-5xl lg:text-8xl font-serif font-black text-[#1a1a1a] leading-[1.1] mb-10 max-w-5xl mx-auto tracking-tight">
                            E-commerce, mobile apps, <br />
                            web portals & <span className="text-[#8b5e3c] italic">more</span>
                        </h1>
                        <p className="text-xl text-black/40 font-medium tracking-tight">
                            We always overdeliver, just like that.
                        </p>
                    </motion.div>
                </div>

                {/* Feature Block */}
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-[2px] bg-[#8b5e3c]" />
                            <span className="text-[#8b5e3c] text-sm font-bold uppercase tracking-widest">Efficiency Unleashed</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#0F3D3E] mb-8 leading-tight">
                            SRI Dashboard <br className="hidden lg:block" />
                            Design System
                        </h2>
                        <p className="text-lg text-black/60 leading-relaxed mb-10 font-medium">
                            We transform innovative ideas into market-ready solutions. Currently we are working to more efficiently so we are soon for more updates. We excel at crafting smart, eye-catching products that align with user needs and business goals.
                        </p>
                        <div className="flex flex-wrap gap-4 mb-12">
                            {["Design Leadership", "UI Design", "UX Design", "Product Strategy"].map((tag) => (
                                <span key={tag} className="px-6 py-2.5 bg-white border border-black/5 rounded-full text-xs font-bold text-black/60 shadow-sm hover:border-[#8b5e3c] hover:text-[#8b5e3c] transition-all cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { icon: <Zap className="w-5 h-5 text-amber-500" />, title: "Ultra Fast", sub: "Load speeds" },
                                { icon: <Shield className="w-5 h-5 text-[#0F3D3E]" />, title: "Secure", sub: "Data encryption" },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        {item.icon}
                                        <span className="font-bold text-[#1a1a1a]">{item.title}</span>
                                    </div>
                                    <span className="text-xs text-black/40 font-medium uppercase tracking-widest">{item.sub}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-7"
                    >
                        <div className="relative">
                            {/* Decorative Frame */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F3D3E]/10 to-[#8b5e3c]/10 blur-[60px] rounded-[3rem]" />
                            <div className="relative bg-white/40 backdrop-blur-md rounded-[3rem] p-4 lg:p-8 border border-white shadow-2xl overflow-hidden ring-1 ring-black/5">
                                <img
                                    src={UpdatingDashboardImg}
                                    alt="Dashboard Preview"
                                    className="w-full h-auto rounded-[2rem] shadow-2xl"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Working Process Section */}
                <section className="mt-40 mb-20 px-6">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b5e3c]/10 text-[#8b5e3c] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6"
                        >
                            <Sparkles className="w-3 h-3" />
                            Strategic Journey
                        </motion.div>
                        <h2 className="text-5xl font-serif font-black text-[#1a1a1a] mb-6 tracking-tight">Our Working Process</h2>
                        <p className="text-lg text-black/40 font-medium max-w-2xl mx-auto">From vision to execution, we follow a rigorous process to ensure every update delivers excellence and efficiency.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {/* Desktop Connectors */}
                        <div className="absolute top-1/4 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#8b5e3c]/20 to-transparent hidden lg:block -z-10" />

                        {[
                            { icon: <Search className="w-6 h-6" />, title: "Strategy & Discovery", desc: "Analyzing market trends and user feedback to define the path forward." },
                            { icon: <PenTool className="w-6 h-6" />, title: "Concept & Design", desc: "Crafting premium visuals and intuitive user experiences for modern needs." },
                            { icon: <Code2 className="w-6 h-6" />, title: "Development", desc: "Building high-performance code with a focus on speed and security." },
                            { icon: <Rocket className="w-6 h-6" />, title: "Optimization & Launch", desc: "Final testing and performance tuning for a flawless user experience." }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group relative flex flex-col items-center text-center p-8 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white hover:border-[#8b5e3c]/30 hover:bg-white/60 transition-all shadow-sm hover:shadow-xl"
                            >
                                <div className="absolute top-[-15px] left-8 px-4 py-1 bg-[#1a1a1a] text-white text-[10px] font-black rounded-full shadow-lg">
                                    Phase 0{idx + 1}
                                </div>
                                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-8 group-hover:scale-110 transition-transform text-[#8b5e3c]">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-serif font-black text-[#0F3D3E] mb-4">{step.title}</h3>
                                <p className="text-sm text-black/60 font-medium leading-[1.6] px-2">{step.desc}</p>
                                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-8 h-[2px] bg-[#8b5e3c]" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 text-center"
                >
                    <div className="inline-flex items-center gap-8 py-8 px-12 bg-white rounded-[2rem] shadow-sm border border-black/5">
                        <div className="flex flex-col items-center">
                            <Globe className="w-6 h-6 text-[#8b5e3c] mb-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Global Scale</span>
                        </div>
                        <div className="w-[1px] h-12 bg-black/5" />
                        <div className="flex flex-col items-center">
                            <Layout className="w-6 h-6 text-[#0F3D3E] mb-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Multi-Device</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}