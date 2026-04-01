import { motion, AnimatePresence } from "motion/react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Smartphone, Gift, ShoppingBag, Menu, X, ChevronRight, ChevronLeft, Star, ArrowRight, Quote, Play, Heart, Plus, Minus, Home, Trophy, MessageSquare, Users, Zap, Camera, BatteryCharging, Monitor, Video, ClipboardCheck, Package, Truck, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SRI_StudioImg from "./assets/Images/SRI_PackingBag.jpg";
import SRI_StudioImg2 from "./assets/Images/SRI_Studio_LongImage.jpg";
import SRI_StudioImg3 from "./assets/Images/SRIMainImage-1.jpg";
import ClothMeasurement from "./assets/Images/ClothMeasurement.jpg";
import SRIBrandInCity from "./assets/Images/SRIBrandInCity.jpg";
import SRISuitInOffice from "./assets/Images/SRISuitInOffice.jpg";
import MainWomenKurti from "./assets/Images/MainWomenKurti.jpg";
import MainWomenHeels from "./assets/Images/MainWomenHeels.jpg";
import MainWomenSaree from "./assets/Images/MainWomenSaree.jpg";
import MainWomenLehengaCholi from "./assets/Images/MainWomenLehengaCholi.jpg";
import MainWomenHandBag from "./assets/Images/MainWomenHandBag.jpg";
import BestSellerMens2 from "./assets/Images/BestSellerMens-2.jpg";
import BestSellerMens3 from "./assets/Images/BestSellerMens-3.jpg";
import BestSellerWomens1 from "./assets/Images/BestSellerWomens-1.jpg";
import BestSellerWomens2 from "./assets/Images/BestSellerWomens-2.jpg";
import SRI_Cart_Logo from "./assets/Images/SRI-Cart Logo.jpg";
import MensMainSuitCard from "./assets/Images/Men'sMainSuitCard.jpg";
import MensMainShirtCard from "./assets/Images/Men'sMainShirtCard.jpg";
import MensMainPantCard from "./assets/Images/Mens'sMainPantCard.jpg";
import MensMainTShirtCard from "./assets/Images/Men'sMainTShirtCard.jpg";
import MensMainPerfumeCard from "./assets/Images/Men'sMainPerfumeCard.jpg";

import Saree1 from "./assets/Images/Saree-1.jpg";
import Saree2 from "./assets/Images/Saree-2.jpg";
import Saree3 from "./assets/Images/Saree-3.jpg";
import Lehenga1 from "./assets/Images/Lehenga Choli-1.jpg";
import Lehenga2 from "./assets/Images/Lehenga Choli-2.jpg";
import Lehenga3 from "./assets/Images/Lehenga Choli-3.jpg";
import Kurta1 from "./assets/Images/Kurti Set-1.jpg";
import Kurta2 from "./assets/Images/Kurti Set-2.jpg";
import Kurta3 from "./assets/Images/Kurti Set-3.jpg";
import Heels1 from "./assets/Images/Heels Sandals-1.jpg";
import Heels2 from "./assets/Images/Heels Sandals-2.jpg";
import Heels3 from "./assets/Images/Heels Sandals-3.jpg";
import Handbag1 from "./assets/Images/Handbag-1.jpg";
import Handbag2 from "./assets/Images/Handbag-2.jpg";
import Handbag3 from "./assets/Images/Handbag-3.jpg";

import BabyBoyBlazer from "./assets/Images/BabyBoyBlazer-1.jpg";
import BabyBoyBlazer2 from "./assets/Images/BabyBoyBlazer-2.jpg";
import BabyBoyBlazer3 from "./assets/Images/BabyBoyBlazer-3.jpg";
import BabyBoyBlazer4 from "./assets/Images/BabyBoyBlazer-4.jpg";

import BabyBoyTraditional from "./assets/Images/BabyBoyTraditional-2.jpg";
import BabyBoyTraditional1 from "./assets/Images/BabyBoyTraditional-1.jpg";
import BabyBoyTraditional3 from "./assets/Images/BabyBoyTraditional-3.jpg";
import BabyBoyTraditional4 from "./assets/Images/BabyBoyTraditional-4.jpg";

import BabyGirlFrock1 from "./assets/Images/BabyGirlFrock-1.jpg";
import BabyGirlFrock2 from "./assets/Images/BabyGirlFrock-2.jpg";
import BabyGirlFrock from "./assets/Images/BabyGirlFrock-3.jpg";
import BabyGirlFrock4 from "./assets/Images/BabyGirlFrock-4.jpg";

import BabyGirlTraditional from "./assets/Images/BabyGirlTraditional-1.jpg";
import BabyGirlTraditional2 from "./assets/Images/BabyGirlTraditional-2.jpg";
import BabyGirlTraditional3 from "./assets/Images/BabyGirlTraditional-3.jpg";
import BabyGirlTraditional4 from "./assets/Images/BabyGirlTraditional-4.jpg";

import KidsSchoolBag from "./assets/Images/MainKidsSchoolBagCard.jpg";
import KidsSchoolMarvelBag1 from "./assets/Images/KidsSchoolMarvelBag-1.jpg";
import KidsSchoolBarbieBag2 from "./assets/Images/KidsSchoolBarbieBag-2.jpg";
import KidsSchoolPokemonBag3 from "./assets/Images/KidsSchoolPokemonBag-3.jpg";
import KidsSchoolNijajHattoriBag4 from "./assets/Images/KidsSchoolNijajHattoriBag-4.jpg";
import ExperienceSectionImage from "./assets/Images/SRIMainImage-1.jpg";
import ExperienceSectionImage1 from "./assets/Images/Men'sSshirt-1.jpg";
import TShirt1 from "./assets/Images/Men'sT-shirt-1.jpg";
import TShirt2 from "./assets/Images/Men'sT-shirt-2.jpg";
import TShirt3 from "./assets/Images/Men'sT-shirt-3.jpg";
import SShirt2 from "./assets/Images/Men'sSshirt-2.jpg";
import SShirt3 from "./assets/Images/Men'sSshirt-3.jpg";
import SShirt4 from "./assets/Images/Men'sSshirt-4.jpg";
import Suit1 from "./assets/Images/Men'sSuit-1.jpg";
import Suit2 from "./assets/Images/Men'sSuit-2.jpg";
import Suit3 from "./assets/Images/Men'sSuit-3.jpg";
import Jeans1 from "./assets/Images/Men'sJeans-1.jpg";
import Jeans2 from "./assets/Images/Men'sJeans-2.jpg";
import Jeans3 from "./assets/Images/Men'sJeans-3.jpg";
import Perfume1 from "./assets/Images/Men'sPerfume-1.jpg";
import Perfume2 from "./assets/Images/Men'sPerfume-2.jpg";
import Perfume3 from "./assets/Images/Men'sPerfume-3.jpg";
import ExperienceSectionVideo from "./assets/Videos/ExperienceSectionVideo.mp4";
import MainLogoRevealVideo from "./assets/Videos/MainLogoReveal.mp4";

import { ShopByCategory } from "./components/ShopByCategory";
import { ProductDetail } from "./components/ProductDetail";
import { CartPreview } from "./components/CartPreview";
import UpdatingPage from "./components/UpdatingPage";
import FeatureBar from "./components/FeatureBar";


export default function App() {
  return (
    <BrowserRouter basename="/SRI-Cart/">
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(1);
  const [activeTab, setActiveTab] = useState<"Men" | "Women" | "Kids">("Men");
  const [scrollIndex, setScrollIndex] = useState(2);
  const [cart, setCart] = useState<any[]>(() => {
    try {
      const savedCart = localStorage.getItem("sri-cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
    }
    return [];
  });
  const initialLoad = useRef(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLogoRevealPlaying, setIsLogoRevealPlaying] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const addToCart = (product: any, quantity: number, size: string, selectedImageIndex: number) => {
    setCart(prev => [...prev, { ...product, quantity, size, selectedImageIndex, cartId: Date.now() }]);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartId: number, delta: number) => {
    setCart(prev => prev.map(item =>
      item.cartId === cartId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeFromCart = (cartId: number) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleScroll = () => {
    if (galleryRef.current) {
      const scrollLeft = galleryRef.current.scrollLeft;
      const containerWidth = galleryRef.current.offsetWidth;
      const items = Array.from(galleryRef.current.children);

      let closestIndex = 0;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const itemCenter = (item as HTMLElement).offsetLeft + (item as HTMLElement).offsetWidth / 2;
        const scrollCenter = scrollLeft + containerWidth / 2;
        const distance = Math.abs(itemCenter - scrollCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== scrollIndex) {
        setScrollIndex(closestIndex);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (galleryRef.current) {
        const items = galleryRef.current.children;
        if (items.length > 2) {
          const focalItem = items[2] as HTMLElement;
          const containerWidth = galleryRef.current.offsetWidth;
          const itemOffset = focalItem.offsetLeft;
          const itemWidth = focalItem.offsetWidth;
          galleryRef.current.scrollTo({
            left: itemOffset - (containerWidth / 2) + (itemWidth / 2),
            behavior: "smooth"
          });
          setScrollIndex(2);
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    // Reset scroll to top on refresh
    window.history.scrollRestoration = 'manual';
    if (location.pathname === "/" && !location.hash) {
      window.scrollTo(0, 0);
    }

    // Handle anchor scrolling
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    try {
      localStorage.setItem("sri-cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [cart]);

  const scrollToSection = (id: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    } else {
      navigate("/#" + id);
      setIsMenuOpen(false);
    }
  };

  const categoryData = {
    Men: [
      { name: "Suits", img: MensMainSuitCard },
      { name: "Shirts", img: MensMainShirtCard },
      { name: "Pants", img: MensMainPantCard },
      { name: "T-Shirts", img: MensMainTShirtCard },
      { name: "Perfumes", img: MensMainPerfumeCard },
    ],
    Women: [
      { name: "Kurti", img: MainWomenKurti, url: "/women-kurta" },
      { name: "Heels", img: MainWomenHeels, url: "/women-heels" },
      { name: "Saree", img: MainWomenSaree, url: "/women-saree" },
      { name: "Lehenga Choli", img: MainWomenLehengaCholi, url: "/women-LehengaCholi" },
      { name: "Hand Bag", img: MainWomenHandBag, url: "/women-handbags" },
    ],
    Kids: [
      { name: "Baby Boy Blazer", img: BabyBoyBlazer },
      { name: "Baby Boy Traditional", img: BabyBoyTraditional },
      { name: "Baby Girl Frock", img: BabyGirlFrock },
      { name: "Baby Girl Traditional", img: BabyGirlTraditional },
      { name: "School Bags", img: KidsSchoolBag },
    ],
  };

  const defaultProduct = {
    name: "Elite Pro Max Series",
    price: "1,299.00",
    description: "Next-Generation Flagship Smartphone",
    images: [
      "https://picsum.photos/seed/thumb-1/800/1000",
      "https://picsum.photos/seed/thumb-2/800/1000",
      "https://picsum.photos/seed/thumb-3/800/1000",
      "https://picsum.photos/seed/thumb-4/800/1000",
      "https://picsum.photos/seed/thumb-5/800/1000",
    ],
    colors: [
      { name: "Bronze Gold", color: "#8b5e3c" },
      { name: "Deep Teal", color: "#0F3D3E" },
      { name: "Pearl White", color: "#fdf5e6" },
    ],
  };

  const tshirtProduct = {
    name: "Men's Premium T-Shirt",
    price: "299.00",
    description: "High-quality cotton T-shirt for everyday comfort.",
    images: [TShirt1, TShirt2, TShirt3],
    colors: [
      { name: "Classic Black", color: "#1a1a1a" },
      { name: "Pure White", color: "#ffffff" },
      { name: "Navy Blue", color: "#000080" },
    ],
    styles: ["Small", "Medium", "Large", "XL"],
  };

  const shirtProduct = {
    name: "Men's Premium Shirt",
    price: "799.00",
    description: "Elegant formal shirt with a perfect fit.",
    images: [SShirt2, SShirt3, SShirt4],
    colors: [
      { name: "Sky Blue", color: "#87CEEB" },
      { name: "White", color: "#ffffff" },
      { name: "Lavender", color: "#E6E6FA" },
    ],
    styles: ["Small", "Medium", "Large", "XL"],
  };

  const suitProduct = {
    name: "Men's Executive Suit",
    price: "1199.00",
    description: "Tailored suit for a sharp and professional look.",
    images: [Suit1, Suit2, Suit3],
    colors: [
      { name: "Midnight Blue", color: "#191970" },
      { name: "Charcoal Gray", color: "#36454F" },
      { name: "Classic Black", color: "#000000" },
    ],
    styles: ["48R", "50R", "52R", "54R"],
  };

  const pantsProduct = {
    name: "Men's Premium Trousers",
    price: "899.00",
    description: "High-quality denim and fabric for maximum durability.",
    images: [Jeans1, Jeans2, Jeans3],
    colors: [
      { name: "Dark Indigo", color: "#000040" },
      { name: "Slate Blue", color: "#6A5ACD" },
      { name: "Olive Green", color: "#556B2F" },
    ],
    styles: ["30", "32", "34", "36"],
  };

  const perfumeProduct = {
    name: "Men's Signature Scent",
    price: "449.00",
    description: "A bold and long-lasting fragrance for the modern man.",
    images: [Perfume1, Perfume2, Perfume3],
    colors: [
      { name: "Gold", color: "#FFD700" },
      { name: "Silver", color: "#C0C0C0" },
    ],
  };

  const sareeProduct = {
    name: "Royal Silk Saree",
    price: "999.00",
    description: "Exquisite hand-woven silk saree with intricate gold zari work, perfect for weddings and special occasions.",
    images: [MainWomenSaree, Saree1, Saree2, Saree3],
    colors: [{ name: "Ivory Gold", color: "#fdf5e6" }, { name: "Royal Amber", color: "#8b5e3c" }],
    styles: ["Regular Fit"],
  };

  const lehengaProduct = {
    name: "Designer Lehenga Choli",
    price: "799.00",
    description: "Premium handcrafted lehenga with detailed embroidery and elegant drape, a true masterpiece of craftsmanship.",
    images: [MainWomenLehengaCholi, Lehenga1, Lehenga2, Lehenga3],
    colors: [{ name: "Ivory", color: "#fdf5e6" }, { name: "Gold", color: "#FFD700" }],
    styles: ["S", "M", "L"],
  };

  const kurtaProduct = {
    name: "Classic Kurti Set",
    price: "599.00",
    description: "Comfortable and stylish cotton kurti set with contemporary prints, ideal for daily wear and small gatherings.",
    images: [MainWomenKurti, Kurta1, Kurta2, Kurta3],
    colors: [{ name: "Sky Blue", color: "#87CEEB" }, { name: "White", color: "#ffffff" }],
    styles: ["S", "M", "L", "XL"],
  };

  const heelsProduct = {
    name: "Elegant Stiletto Heels",
    price: "449.00",
    description: "Sophisticated stiletto heels designed for ultimate comfort and timeless style, featuring premium leather finish.",
    images: [MainWomenHeels, Heels1, Heels2, Heels3],
    colors: [{ name: "Cream", color: "#f5f5f0" }, { name: "Black", color: "#000000" }],
    styles: ["36", "37", "38", "39", "40"],
  };

  const handbagProduct = {
    name: "Luxury Leather Handbag",
    price: "499.00",
    description: "Spacious and chic leather handbag with gold-tone hardware, providing both functionality and a premium fashion statement.",
    images: [MainWomenHandBag, Handbag1, Handbag2, Handbag3],
    colors: [{ name: "Tan", color: "#D2B48C" }, { name: "Black", color: "#000000" }],
  };

  const kidBlazerProduct = {
    name: "Baby Boy's Royal Blazer",
    price: "449.00",
    description: "A premium velvet blazer for baby boys, perfect for formal occasions and celebrations. Features exquisite gold embroidery and a comfortable lining.",
    images: [BabyBoyBlazer, BabyBoyBlazer2, BabyBoyBlazer3, BabyBoyBlazer4],
    colors: [{ name: "Emerald Green", color: "#043927" }, { name: "Royal Navy", color: "#002366" }],
    styles: ["1-2Y", "2-3Y", "3-4Y", "4-5Y"],
  };

  const kidTraditionalBoyProduct = {
    name: "Baby Boy's Festive Sherwani",
    price: "699.00",
    description: "Traditional sherwani set for boys, featuring heavy Peacock embroidery and premium silk fabric for a grand look.",
    images: [BabyBoyTraditional, BabyBoyTraditional1, BabyBoyTraditional3, BabyBoyTraditional4],
    colors: [{ name: "Imperial Blue", color: "#002366" }, { name: "Silk Gold", color: "#D4AF37" }],
    styles: ["1-2Y", "2-3Y", "3-4Y", "4-5Y"],
  };

  const kidFrockProduct = {
    name: "Baby Girl's Luxury Frock",
    price: "799.00",
    description: "Beautiful designer frock for baby girls, featuring velvet bodice and gold pattern work. Ideal for birthdays and weddings.",
    images: [BabyGirlFrock, BabyGirlFrock1, BabyGirlFrock2, BabyGirlFrock4],
    colors: [{ name: "Royal Purple", color: "#4B0082" }, { name: "Deep Maroon", color: "#800000" }],
    styles: ["1-2Y", "2-3Y", "3-4Y", "4-5Y"],
  };

  const kidTraditionalGirlProduct = {
    name: "Baby Girl's Traditional Lehenga",
    price: "759.00",
    description: "Elegant traditional lehenga choli set for girls, handcrafted with gold zari work and premium velvet finish.",
    images: [BabyGirlTraditional, BabyGirlTraditional2, BabyGirlTraditional3, BabyGirlTraditional4],
    colors: [{ name: "Golden Sand", color: "#C5B358" }, { name: "Rose Pink", color: "#FF69B4" }],
    styles: ["1-2Y", "2-3Y", "3-4Y", "4-5Y"],
  };

  const kidBagProduct = {
    name: "Sri Premium School Bag",
    price: "449.00",
    description: "Durable and stylish school bags for kids, featuring ergonomic design and multiple compartments. Inspired by popular themes.",
    images: [KidsSchoolBag, KidsSchoolMarvelBag1, KidsSchoolBarbieBag2, KidsSchoolPokemonBag3, KidsSchoolNijajHattoriBag4],
    colors: [{ name: "Emerald Green", color: "#043927" }, { name: "Royal Blue", color: "#002366" }],
  };

  const handleItemClick = (item: { name: string; img: string }) => {
    const productMap: Record<string, { data: any, path: string }> = {
      "T-Shirts": { data: tshirtProduct, path: "/mens-tshirt" },
      "Shirts": { data: shirtProduct, path: "/mens-shirt" },
      "Suits": { data: suitProduct, path: "/mens-suit" },
      "Pants": { data: pantsProduct, path: "/mens-pants" },
      "Perfumes": { data: perfumeProduct, path: "/mens-perfume" },
      "Kurti": { data: kurtaProduct, path: "/women-kurta" },
      "Heels": { data: heelsProduct, path: "/women-heels" },
      "Saree": { data: sareeProduct, path: "/women-saree" },
      "Lehenga Choli": { data: lehengaProduct, path: "/women-LehengaCholi" },
      "Hand Bag": { data: handbagProduct, path: "/women-handbags" },
      "Baby Boy Blazer": { data: kidBlazerProduct, path: "/kids-blazer" },
      "Baby Boy Traditional": { data: kidTraditionalBoyProduct, path: "/kids-traditional-boy" },
      "Baby Girl Frock": { data: kidFrockProduct, path: "/kids-frock" },
      "Baby Girl Traditional": { data: kidTraditionalGirlProduct, path: "/kids-traditional-girl" },
      "School Bags": { data: kidBagProduct, path: "/kids-bags" },
    };

    // turbo
    const product = productMap[item.name];
    if (product) {
      setSelectedImage(1);
      navigate(product.path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-amber-500/30 overflow-x-hidden bg-[#fdf5e6]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-12 min-w-0">
            <button
              onClick={() => navigate("/")}
              className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#8b5e3c] hover:opacity-80 transition-opacity whitespace-nowrap overflow-hidden text-ellipsis"
            >
              SRI-Cart
            </button>
            <div className="hidden lg:flex items-center gap-8">
              {["Home", "BestSeller", "About", "Collections"].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    if (link === "Home") scrollToSection("hero");
                    else if (link === "BestSeller") scrollToSection("best-seller");
                    else if (link === "About") scrollToSection("about");
                    else if (link === "Collections") scrollToSection("collections");
                    else navigate("/");
                  }}
                  className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-6 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 group scale-75 sm:scale-100"
            >
              <ShoppingBag className="w-6 h-6 text-black/60 group-hover:text-[#8b5e3c] transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8b5e3c] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="hidden sm:block px-4 lg:px-8 py-2.5 lg:py-3 bg-[#8b5e3c] text-white rounded-xl font-bold text-xs lg:text-sm hover:bg-[#704a2f] transition-all shadow-lg shadow-[#8b5e3c]/20 whitespace-nowrap">
              Sign In
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 hover:bg-black/5 rounded-full transition-colors">
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-[80%] bg-white p-12"
            >
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 p-2">
                <X className="w-8 h-8" />
              </button>
              <div className="flex flex-col gap-10 mt-16">
                {["Home", "BestSeller", "About", "Collections"].map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      if (link === "Home") scrollToSection("hero");
                      else if (link === "BestSeller") scrollToSection("best-seller");
                      else if (link === "About") scrollToSection("about");
                      else if (link === "Collections") scrollToSection("collections");
                      else { navigate("/"); setIsMenuOpen(false); }
                    }}
                    className="text-3xl font-serif font-bold text-[#1a1a1a] text-left"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <section id="hero" className="relative pt-28 lg:pt-40 pb-20 overflow-hidden bg-[#fdf5e6]">
              {/* Massive Background Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.015, scale: 1 }}
                  transition={{ duration: 2 }}
                  className="text-[25vw] font-serif font-black text-[#8b5e3c] leading-none whitespace-nowrap"
                >
                  SRI-CART
                </motion.h1>
              </div>

              {/* Split Background with Dynamic Shapes */}
              <div className="absolute inset-0 flex flex-col lg:flex-row -z-10">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-full lg:w-[42%] teal-gradient relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                  <div className="bokeh w-[500px] h-[500px] -top-20 -left-20 bg-amber-400/20" />
                </motion.div>
                <div className="w-full lg:w-[58%] bg-[#fdf5e6]" />
              </div>

              <div className="max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-20 w-full relative z-10">
                <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-32 items-center">

                  {/* Left Side: Editorial Content */}
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left py-8 lg:py-0 z-20 order-1">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#8b5e3c]/10 border border-[#8b5e3c]/20 text-[#8b5e3c] text-sm font-bold uppercase tracking-[0.3em] mb-10"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#8b5e3c] animate-pulse" />
                      New Arrival 2026
                    </motion.div>

                    <div className="relative mb-10">
                      <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl sm:text-8xl lg:text-9xl font-serif font-black leading-[0.9] tracking-tighter gold-text slam-in"
                      >
                        SRI<br />CART
                      </motion.h1>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 1 }}
                        className="absolute -bottom-4 left-0 h-2 bg-gradient-to-r from-[#8b5e3c] to-transparent hidden lg:block"
                      />
                    </div>

                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-[1.1] max-w-2xl teal-text-gradient"
                    >
                      Where Innovation <br className="hidden sm:block" />
                      Meets <span className="italic font-serif font-medium">Elegance</span>
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-lg lg:text-xl text-black/60 mb-12 max-w-xl leading-relaxed font-medium"
                    >
                      Experience a curated selection of the world's most advanced smartphones, delivered with unparalleled service.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="flex flex-col sm:flex-row items-center gap-8"
                    >
                      <button className="group relative px-10 sm:px-20 py-5 sm:py-7 gold-button text-white rounded-[1.5rem] sm:rounded-2xl font-bold text-xl sm:text-2xl shadow-2xl shadow-[#8b5e3c]/30 overflow-hidden">
                        <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest">
                          Explore Now <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </button>

                      <div className="flex items-center gap-6">
                        <div className="w-px h-12 bg-black/10" />
                        <div className="text-left">
                          <p className="text-3xl font-serif font-bold text-[#1a3b3b]">12k+</p>
                          <p className="text-xs text-black/40 uppercase tracking-widest">Products Sold</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Side: Immersive Visuals */}
                  <div className="relative flex justify-center lg:justify-end items-center h-full min-h-[720px] sm:min-h-[600px] lg:min-h-[850px] order-2 z-10">
                    {/* Floating Glass Cards */}
                    <motion.div
                      animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 -left-6 sm:-left-10 w-48 h-60 glass rounded-3xl z-30 flex flex-col p-6 shadow-2xl border border-white/20 origin-top-left scale-[0.6] sm:scale-90 lg:scale-100"
                    >
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                        <Star className="w-5 h-5 text-amber-500 fill-current" />
                      </div>
                      <p className="text-[#8b5e3c] text-sm font-bold mb-1">Premium Quality</p>
                      <p className="text-black/40 text-[10px] mb-4 leading-tight">Crafted with excellence and precision for the elite.</p>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-amber-500 fill-current" />
                        ))}
                        <span className="text-[10px] font-bold text-black/60 ml-1">4.9/5</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#8b5e3c]/10 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: ["0%", "92%"] }}
                          transition={{ duration: 2, delay: 1 }}
                          className="h-full bg-gradient-to-r from-amber-500 to-[#8b5e3c]"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/4 -right-6 sm:-right-10 w-48 h-32 glass rounded-3xl z-30 flex flex-col p-5 shadow-2xl origin-top-right scale-[0.6] sm:scale-90 lg:scale-100"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-full bg-[#0F3D3E] flex items-center justify-center">
                          <Smartphone className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[#0F3D3E] font-bold text-[10px]">Latest Tech</span>
                      </div>
                      <p className="text-[#0F3D3E]/70 text-[10px] font-medium leading-relaxed">Experience the next generation of mobile innovation.</p>
                    </motion.div>

                    {/* Main Visual Cluster */}
                    <div className="relative flex items-center justify-center w-full">
                      {/* Background Glow */}
                      <div className="absolute inset-0 bg-amber-500/10 blur-[120px] rounded-full" />

                      {/* Phone Mockup */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative z-20 perspective-1000"
                      >
                        <div className="w-[240px] h-[480px] sm:w-[280px] sm:h-[580px] lg:w-[320px] lg:h-[640px] bg-black rounded-[3rem] sm:rounded-[3.5rem] border-[10px] sm:border-[12px] border-[#1a1a1a] shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden relative group">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-black rounded-b-3xl z-30" />

                          {!isLogoRevealPlaying ? (
                            <>
                              <img
                                src={SRI_Cart_Logo}
                                alt="SRI-Cart Logo"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                              />
                              {/* Interactive Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                                <p className="text-white font-serif text-2xl mb-2">SRI-Cart</p>
                                <p className="text-white/60 text-sm font-medium">Experience Luxury</p>
                              </div>
                            </>
                          ) : (
                            <video
                              src={MainLogoRevealVideo}
                              autoPlay
                              loop
                              muted
                              className="w-full h-full object-cover"
                              onClick={() => setIsLogoRevealPlaying(false)}
                            />
                          )}

                          {/* Home Button / Play Toggle */}
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setIsLogoRevealPlaying(!isLogoRevealPlaying)}
                              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-1 shadow-2xl hover:bg-white/20 transition-all group/btn"
                            >
                              {!isLogoRevealPlaying ? (
                                <>
                                  <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                                  <span className="text-[6px] text-white/60 font-bold uppercase tracking-tighter group-hover/btn:text-white transition-colors">Reveal</span>
                                </>
                              ) : (
                                <>
                                  <X className="w-4 h-4 text-white" />
                                  <span className="text-[6px] text-white/60 font-bold uppercase tracking-tighter group-hover/btn:text-white transition-colors">Close</span>
                                </>
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>

                      {/* Floating Elements */}
                      <div className="absolute -left-6 sm:-left-10 bottom-10 z-30 flex">
                        <motion.div
                          animate={{ x: [-10, 10, -10], y: [-10, 10, -10] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="w-48 h-64 bg-[#0F3D3E] rounded-3xl shadow-2xl p-6 flex flex-col justify-between border border-white/10 origin-bottom-left scale-[0.6] sm:scale-90 lg:scale-100"
                        >
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                            <ShoppingBag className="w-6 h-6 text-amber-500" />
                          </div>
                          <div>
                            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-1">Collection 2026</p>
                            <p className="text-white font-serif text-xl font-bold mb-2">Elite Series</p>
                            <p className="text-white/50 text-[10px] leading-relaxed mb-4">Discover the pinnacle of design and performance.</p>
                            <button className="flex items-center gap-2 text-[10px] font-bold text-amber-500 uppercase tracking-widest group">
                              View More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Feature Showcase Bar (Replaced Fulfillment Animation) */}
              <FeatureBar />

            </section>

            {/* Experience Section (Inspired by Uploaded Image) */}
            <section className="py-24 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="relative bg-[#f5f5f0] rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden">
                  {/* Background Decorative Elements */}
                  <div className="absolute top-10 right-10 opacity-5">
                    <svg width="200" height="200" viewBox="0 0 100 100" className="text-[#8b5e3c]">
                      <path d="M10 10 H90 V90 H10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="lg:w-1/2 relative z-10">
                    <Quote className="w-20 h-20 text-amber-500/20 mb-8" />
                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#0F3D3E] leading-tight mb-8">
                      Our experience to always <br />
                      update the <span className="italic text-[#8b5e3c]">latest styles</span>
                    </h2>
                    <div className="flex gap-4">
                      <div className="w-12 h-1 bg-amber-500 rounded-full" />
                      <div className="w-4 h-1 bg-amber-500/30 rounded-full" />
                    </div>
                  </div>

                  <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
                    <div className="relative group">
                      {/* Main Video/Image Thumbnail */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="w-72 h-96 rounded-3xl overflow-hidden shadow-2xl relative z-20 cursor-pointer"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        {!isVideoPlaying ? (
                          <>
                            <img
                              src={ExperienceSectionImage}
                              alt="Experience"
                              className="w-full h-full object-cover animate-fade-in"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-[#8b5e3c] fill-current ml-1" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <video
                            src={ExperienceSectionVideo}
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover animate-fade-in"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsVideoPlaying(false);
                            }}
                          ></video>
                        )}
                      </motion.div>

                      {/* Secondary Image (Stacked behind) */}
                      <motion.div
                        initial={{ x: 50, y: 50, opacity: 0 }}
                        whileInView={{ x: -40, y: -40, opacity: 1 }}
                        className="absolute top-0 left-0 w-64 h-80 rounded-3xl overflow-hidden shadow-xl z-10 -translate-x-10 -translate-y-10"
                      >
                        <img
                          src={ExperienceSectionImage1}
                          alt="Experience Detail"
                          className="w-full h-full object-cover grayscale opacity-40"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>

                      {/* Decorative Dots */}
                      <div className="absolute -bottom-10 -right-10 grid grid-cols-4 gap-2 opacity-20">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8b5e3c]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Best Sellers Section */}
            <section id="best-seller" className="py-24 bg-[#fdf5e6]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row items-end justify-between mb-16 gap-6">
                  <div className="text-left">
                    <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-4 block">Top Rated</span>
                    <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F3D3E]">Our best seller product</h2>
                  </div>
                  <button 
                    onClick={() => navigate("/updates")}
                    className="group flex items-center gap-3 px-8 py-4 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                  >
                    See all Product <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { name: "Premium Classic Shirt", price: "1,299", img: BestSellerMens2 },
                    { name: "Silk Evening Gown", price: "999", img: BestSellerWomens1 },
                    { name: "Traditional Bridal Lehenga", price: "1,799", img: BestSellerWomens2 },
                    { name: "Modern Slim Fit Suit", price: "699", img: BestSellerMens3 }
                  ].map((product, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-black/5 group"
                    >
                      <div className="relative h-64 rounded-3xl overflow-hidden bg-[#f5f5f0] mb-6">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-contain p-8 transition-transform group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4">
                          <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-black/40 hover:text-red-500 transition-colors">
                            <Star className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-[#0F3D3E] mb-1">{product.name}</h3>
                          <div className="flex items-center gap-1">
                            <p className="text-xl font-serif font-bold text-[#8b5e3c]">₹{product.price}</p>
                            <span className="text-[10px] text-black/30 line-through mt-1">₹1,499</span>
                          </div>
                        </div>
                        <button className="w-full py-3 bg-black text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-[#8b5e3c] transition-colors">
                          Buy Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Promotional & Stats Section */}
            <section id="about" className="py-24 bg-[#fdf5e6]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-[2px] bg-[#8b5e3c]" />
                      <span className="text-[#8b5e3c] text-sm font-bold uppercase tracking-widest">Best Gadget & Fashion</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-serif font-bold text-[#1a1a1a] leading-[1.1]">
                      30% Off <span className="text-[#8b5e3c]">Winter Sale</span><br />
                      Promo Code
                    </h2>
                  </div>
                  <div className="lg:max-w-xs">
                    <p className="text-black/60 text-lg mb-8 leading-relaxed">
                      This year, our new summer collection will shelter you from the harsh elements of a world that.
                    </p>
                    <button onClick={() => { scrollToSection("collections") }} className="px-10 py-4 bg-[#8b5e3c] text-white rounded-full font-bold hover:bg-[#704a2f] transition-all shadow-lg shadow-[#8b5e3c]/20">
                      Shop Now
                    </button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                  <div
                    className="lg:col-span-2 relative rounded-[3rem] overflow-hidden group p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 border border-white/10 shadow-2xl bg-cover bg-center lg:bg-center"
                    style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 100%), url(${SRI_StudioImg2})` }}
                  >
                    <div className="relative z-10 max-w-sm text-center lg:text-left">
                      <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                        <div className="w-8 h-[1px] bg-amber-500" />
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em]">Premium Tailoring</span>
                      </div>
                      <h4 className="text-6xl font-serif font-black text-white mb-6 leading-tight">SRI Studio</h4>
                      <p className="text-white/70 text-sm mb-10 leading-relaxed font-medium">Experience the pinnacle of sartorial excellence in our flagship showroom, where traditional craft meets modern elegance.</p>
                      <button className="px-10 py-4 bg-amber-500 text-white rounded-2xl font-bold text-sm hover:bg-white hover:text-[#1a1a1a] transition-all shadow-xl shadow-black/20 uppercase tracking-widest">
                        Explore Studio
                      </button>
                    </div>

                    <div className="relative flex-1 w-full flex flex-col sm:flex-row gap-4">
                      {[
                        { icon: <Zap className="w-4 h-4" />, title: "Bespoke Fitting", subtitle: "Craftsmanship" },
                        { icon: <Star className="w-4 h-4" />, title: "Premium Fabrics", subtitle: "Elite Selection" }
                      ].map((feature, idx) => (
                        <div key={idx} className="flex-1 bg-white hover:bg-[#8b5e3c] group/pill rounded-full p-2 pl-8 flex items-center justify-between shadow-xl border border-black/5 transition-all duration-300 transform hover:-translate-y-1">
                          <div className="flex flex-col text-left">
                            <h5 className="font-serif font-bold text-base text-[#1a1a1a] group-hover/pill:text-white leading-tight">{feature.title}</h5>
                            <span className="text-[9px] uppercase tracking-widest text-[#8b5e3c] group-hover/pill:text-white/60 font-bold">{feature.subtitle}</span>
                          </div>
                          <div className="w-12 h-12 bg-[#8b5e3c] group-hover/pill:bg-white rounded-full flex items-center justify-center transition-colors">
                            <div className="text-white group-hover/pill:text-[#8b5e3c]">{feature.icon}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative teal-gradient rounded-[3rem] overflow-hidden group p-8 lg:p-12 flex flex-col items-center text-center shadow-2xl shadow-teal-900/40 border border-white/5 transition-shadow hover:shadow-teal-500/20"
                  >
                    <div className="mb-10 z-10 w-full relative">
                      <p className="text-[10px] lg:text-xs font-bold text-white/40 uppercase tracking-[0.3em] mb-4">Signature Packaging</p>
                      <h4 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-3">EXQUISITE</h4>
                      <p className="text-xs lg:text-sm font-medium text-amber-500/80 uppercase tracking-widest mb-8">SRI Packing Bag</p>
                      <button className="px-10 py-4 bg-white text-[#0F3D3E] rounded-2xl font-bold text-sm hover:bg-amber-500 hover:text-white transition-all shadow-xl shadow-black/20 group-hover:px-12">
                        View Details
                      </button>
                    </div>
                    <div className="relative w-full aspect-square max-w-[240px] lg:max-w-[280px]">
                      <div className="absolute inset-0 bg-amber-500/10 blur-[80px] rounded-full animate-pulse" />
                      <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-20 scale-110 lg:scale-125 group-hover:scale-135 transition-transform duration-700"
                      >
                        <img src={SRI_StudioImg} alt="SRI Signature Packing Bag" className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-[2.5rem] p-8 flex items-center gap-6 shadow-sm border border-black/5">
                    <div className="w-16 h-16 bg-[#fdf5e6] rounded-2xl flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-[#8b5e3c]" />
                    </div>
                    <div>
                      <h5 className="text-3xl font-bold text-[#1a1a1a]">#1</h5>
                      <p className="text-sm font-medium text-black/40">eCommerce Platform</p>
                    </div>
                  </div>
                  <div className="bg-[#8b5e3c] rounded-[2.5rem] p-8 flex items-center gap-6 shadow-xl shadow-[#8b5e3c]/20">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h5 className="text-3xl font-bold text-white">25k+</h5>
                      <p className="text-sm font-medium text-white/60">Client Testimonials</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-[2.5rem] p-8 flex items-center gap-6 shadow-sm border border-black/5">
                    <div className="w-16 h-16 bg-[#fdf5e6] rounded-2xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-[#8b5e3c]" />
                    </div>
                    <div>
                      <h5 className="text-3xl font-bold text-[#1a1a1a]">1 Million</h5>
                      <p className="text-sm font-medium text-black/40">Real Customer & Buyers</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="collections" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <span className="text-[#8b5e3c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">New Arrival</span>
                  <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#1a1a1a]">Latest Collection</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-8">
                    <div className="relative h-72 bg-[#8b5e3c] rounded-[3rem] overflow-hidden group">
                      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 border border-white/20" />
                      <div className="absolute inset-0 p-12 flex flex-col justify-end text-white z-10">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Craftsmanship</p>
                        <h3 className="text-2xl font-bold">Precision Measurements</h3>
                      </div>
                      <img src={ClothMeasurement} alt="Cloth Measurement" className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 object-contain transition-transform group-hover:scale-110" />
                    </div>
                    <div className="relative h-72 bg-[#0F3D3E] rounded-[3rem] overflow-hidden group">
                      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 border border-white/20" />
                      <div className="absolute inset-0 p-12 flex flex-col justify-end text-white z-10">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Urban Living</p>
                        <h3 className="text-2xl font-bold">SRI Street Presence</h3>
                      </div>
                      <img src={SRIBrandInCity} alt="Brand in City" className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 object-contain transition-transform group-hover:scale-110" />
                    </div>
                  </div>
                  <div className="relative h-[608px] teal-gradient rounded-[3rem] overflow-hidden group">
                    <div className="absolute inset-0 p-12 flex flex-col justify-end text-white z-10">
                      <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Corporate</p>
                      <h3 className="text-4xl font-bold mb-8">Executive Insights</h3>
                      <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all w-fit">Discover More <ArrowRight className="w-5 h-5" /></button>
                    </div>
                    <img src={SRISuitInOffice} alt="Suit in Office" className="absolute right-0 bottom-0 h-[90%] w-auto object-contain transition-transform group-hover:scale-105" />
                  </div>
                </div>
              </div>
            </section>


            <ShopByCategory
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              categoryData={categoryData}
              galleryRef={galleryRef}
              handleScroll={handleScroll}
              onItemClick={handleItemClick}
            />
          </motion.div>
        } />
        <Route path="/mens-tshirt" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Men's" product={tshirtProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/mens-shirt" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Men's" product={shirtProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/mens-suit" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Men's" product={suitProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/mens-pants" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Men's" product={pantsProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/mens-perfume" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Men's" product={perfumeProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/women-saree" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Women's" product={sareeProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/women-LehengaCholi" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Women's" product={lehengaProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/women-kurta" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Women's" product={kurtaProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/women-heels" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Women's" product={heelsProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/kids-blazer" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Kids'" product={kidBlazerProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/kids-traditional-boy" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Kids'" product={kidTraditionalBoyProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/kids-frock" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Kids'" product={kidFrockProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/kids-traditional-girl" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Kids'" product={kidTraditionalGirlProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/kids-bags" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Kids'" product={kidBagProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/women-handbags" element={
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
            <ProductDetail category="Women's" product={handbagProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} addToCart={addToCart} onBack={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        } />
        <Route path="/updates" element={<UpdatingPage />} />
      </Routes>

      {/* Footer */}
      <footer className="relative bg-[#fdf5e6] pt-24 pb-12 overflow-hidden border-t border-black/5">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
            {/* Column 1: Brand & About */}
            <div className="lg:col-span-4">
              <span className="text-3xl font-serif font-bold text-[#8b5e3c] mb-8 block">SRI-Cart</span>
              <p className="text-black/60 text-lg leading-relaxed mb-10 max-w-sm">
                Elevating your digital lifestyle with premium tech and curated fashion. Experience excellence in every detail.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <button key={social} className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-[#8b5e3c] hover:text-white transition-all duration-300 shadow-sm group">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 opacity-60 group-hover:opacity-100 uppercase text-[8px] font-bold">
                      {social.substring(0, 2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-[#1a1a1a] font-bold uppercase tracking-widest text-sm mb-8">Navigation</h4>
              <ul className="flex flex-col gap-5">
                {['Home', 'Shop All', 'Collections', 'About Us', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="lg:col-span-2">
              <h4 className="text-[#1a1a1a] font-bold uppercase tracking-widest text-sm mb-8">Support</h4>
              <ul className="flex flex-col gap-5">
                {['Shipping Policy', 'Returns & Exchanges', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="lg:col-span-4">
              <h4 className="text-[#1a1a1a] font-bold uppercase tracking-widest text-sm mb-8">Join the Elite</h4>
              <p className="text-black/50 text-sm mb-8">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>
              <form className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-16 bg-white border border-black/5 rounded-2xl px-6 pr-32 focus:ring-2 focus:ring-[#8b5e3c] focus:border-transparent outline-none transition-all shadow-sm"
                />
                <button className="absolute right-2 top-2 bottom-2 px-6 bg-[#8b5e3c] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#7a4d2b] transition-all shadow-lg shadow-[#8b5e3c]/20">
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-black/40 text-[10px] font-bold uppercase tracking-[0.3em]">
              © 2026 SRI-Cart. PURE EXCELLENCE.
            </p>
            <div className="flex items-center gap-8 opacity-40">
              <span className="text-[10px] font-bold uppercase tracking-widest">Apple Pay</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Visa</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Mastercard</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">PayPal</span>
            </div>
          </div>
        </div>
      </footer>
      <CartPreview
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}
