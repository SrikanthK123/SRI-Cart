import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Home, Star, Minus, Plus, ShoppingBag, Heart, Trophy, Users, Zap } from "lucide-react";
import React from "react";

interface ProductDetailProps {
  product: {
    name: string;
    price: string;
    description: string;
    images: string[];
    styles?: string[];
  };
  category: string;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
  onBack: () => void;
  addToCart: (product: any, quantity: number, style: string, selectedImageIndex: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  category,
  selectedImage,
  setSelectedImage,
  onBack,
  addToCart,
}) => {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [selectedStyle, setSelectedStyle] = React.useState(product.styles?.[0] || "");
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedStyle, selectedImage - 1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  return (
    <div className="pt-24 pb-20 bg-[#f8f6f2] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-3 mb-16 text-[11px] font-extrabold tracking-[0.25em] uppercase text-black/30">
          <button onClick={onBack} className="hover:text-[#8b5e3c] transition-colors flex items-center gap-2">
            <Home className="w-3.5 h-3.5" /> Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[#0F3D3E] font-serif italic normal-case text-sm tracking-normal">{category}</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-black/60">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left: Thumbnail & Main Image */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-8">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 md:gap-5 order-2 md:order-1 overflow-x-auto md:overflow-y-auto max-h-[120px] md:max-h-[60vh] lg:max-h-[80vh] pb-2 md:pb-0 pr-0 md:pr-4 no-scrollbar snap-x md:snap-y snap-mandatory scroll-smooth shrink-0 min-w-0">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index + 1)}
                  className={`w-20 lg:w-24 aspect-[4/5] rounded-3xl overflow-hidden border-2 transition-all duration-300 snap-start shrink-0 ${
                    selectedImage === index + 1 
                      ? 'border-[#8b5e3c] shadow-xl shadow-amber-900/10 scale-105' 
                      : 'border-black/5 hover:border-black/20 grayscale hover:grayscale-0'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image Card */}
            <div className="flex-1 order-1 md:order-2 w-full max-w-[500px] mx-auto lg:max-w-none">
              <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-white shadow-2xl shadow-black/5 border border-white/50">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    src={product.images[selectedImage - 1]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute top-6 left-6 sm:top-10 sm:left-10 text-left">
                  <span className="px-6 py-2 bg-[#0F3D3E] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg shadow-black/20 whitespace-nowrap">
                    Limited Edition
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 pt-4">
            <div className="flex flex-col gap-10">
              <div>
                <h1 className="text-6xl lg:text-8xl font-serif font-bold text-[#0F3D3E] leading-[0.95] mb-8 tracking-tight">
                  {product.name.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h1>
                <p className="text-xs font-medium tracking-wide text-black/50 mb-10 max-w-[90%] md:max-w-sm leading-relaxed border-l-2 border-[#8b5e3c]/30 pl-6">
                  {product.description}
                </p>
                <div className="flex items-end gap-6">
                  <span className="text-5xl lg:text-6xl font-serif font-bold text-[#8b5e3c] leading-none">₹{product.price}</span>
                  <span className="text-lg text-black/20 line-through mb-1.5">₹2,499.00</span>
                </div>
              </div>

              <div className="h-px bg-black/5 w-24" />

              {/* Style Selection */}
              {product.styles && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 mb-6 block">
                    {category === "Kids'" ? "Select Age:" : "Select Size:"}
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {product.styles.map((style) => (
                      <button
                        key={style}
                        onClick={() => setSelectedStyle(style)}
                        className={`px-10 py-4 rounded-2xl text-xs font-bold transition-all duration-300 ${
                          selectedStyle === style
                            ? 'bg-[#8b5e3c] text-white border border-[#8b5e3c] shadow-lg shadow-amber-900/20'
                            : 'bg-white/50 border border-black/5 text-black/60 hover:border-black/20'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-8 pt-4">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 block">Quantity:</span>
                  <div className="flex items-center justify-between sm:justify-start gap-8 bg-white/80 backdrop-blur-md border border-black/5 rounded-[1.5rem] p-3 px-8 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:text-[#8b5e3c] transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-xl font-serif font-bold min-w-[2rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:text-[#8b5e3c] transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 sm:pt-8 w-full relative">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full py-6 sm:py-7 bg-gradient-to-r from-[#0F3D3E] to-[#082121] text-white rounded-[1.5rem] sm:rounded-[2.5rem] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase hover:shadow-[0_20px_40px_rgba(15,61,62,0.4)] hover:scale-[1.02] transition-all duration-500 shadow-xl shadow-[#0F3D3E]/20 flex items-center justify-center gap-4 active:scale-[0.97] group border border-white/10"
                  >
                    <ShoppingBag className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    <span className="whitespace-nowrap">Add to Bag</span>
                  </button>

                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute -top-12 left-0 right-0 flex justify-center"
                      >
                        <div className="bg-[#8b5e3c] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2">
                          <Zap className="w-3 h-3 text-amber-300" />
                          Added to Bag Successfully
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-10 items-center opacity-30 pt-10 border-t border-black/5">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Premium Quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Global Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
