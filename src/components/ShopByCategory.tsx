import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface CategoryItem {
  name: string;
  img: string;
}

interface ShopByCategoryProps {
  activeTab: "Men" | "Women" | "Kids";
  setActiveTab: (tab: "Men" | "Women" | "Kids") => void;
  categoryData: Record<"Men" | "Women" | "Kids", CategoryItem[]>;
  galleryRef: React.RefObject<HTMLDivElement | null>;
  handleScroll: () => void;
  onItemClick: (item: CategoryItem) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  activeTab,
  setActiveTab,
  categoryData,
  galleryRef,
  handleScroll,
  onItemClick,
}) => {
  return (
    <section className="py-24 bg-[#fdf5e6]/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Tabs */}
        <div className="flex justify-center gap-6 sm:gap-12 mb-16">
          {(["Men", "Women", "Kids"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-2xl font-bold transition-all relative pb-2 ${
                activeTab === tab ? "text-[#1a1a1a]" : "text-black/30 hover:text-black/50"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#8b5e3c] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Focal Point Gallery */}
        <div className="relative flex items-center justify-center">
          {/* Navigation Arrows (Desktop) */}
          <button className="absolute left-0 z-20 w-12 h-12 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors hidden lg:flex">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="absolute right-0 z-20 w-12 h-12 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors hidden lg:flex">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Gallery Items */}
          <div
            ref={galleryRef}
            onScroll={handleScroll}
            className="flex items-center justify-start lg:justify-center gap-4 lg:gap-8 overflow-x-auto lg:overflow-visible pb-8 no-scrollbar w-full snap-x snap-mandatory px-[17.5vw] lg:px-0"
          >
            {categoryData[activeTab].map((item, index) => {
              // Determine sizes based on position (focal point at index 2)
              const isFocal = index === 2;
              const isMedium = index === 1 || index === 3;

              return (
                <motion.div
                  key={`${activeTab}-${item.name}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => onItemClick(item)}
                  className={`flex-shrink-0 flex flex-col items-center group cursor-pointer snap-center w-[65vw] ${
                    isFocal ? "lg:w-80" : isMedium ? "lg:w-60" : "lg:w-44"
                  }`}
                >
                  <div className="relative w-full rounded-3xl overflow-hidden bg-white shadow-xl transition-all duration-500 group-hover:shadow-2xl aspect-[3/4]">
                    <img
                      src={item.img.startsWith("/") ? item.img : `https://picsum.photos/seed/${item.img}/600/800`}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </div>
                  <p
                    className={`mt-6 font-bold text-[#1a1a1a] transition-all ${
                      isFocal ? "text-xl" : "text-lg lg:text-sm"
                    } ${isMedium && "lg:text-lg"}`}
                  >
                    {item.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
