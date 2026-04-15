import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Delete, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

interface CartItem {
  cartId: number;
  name: string;
  price: string;
  quantity: number;
  size: string;
  images: string[];
  selectedImageIndex?: number;
}

interface CartPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (cartId: number, delta: number) => void;
  removeFromCart: (cartId: number) => void;
}

export const CartPreview: React.FC<CartPreviewProps> = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
}) => {
  const navigate = useNavigate();

  const getCartHash = (items: CartItem[]) => {
    const seed = items
      .map(item => `${item.cartId}:${item.name}:${item.size}:${item.quantity}`)
      .join("|");
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0;
    }
    return `cart-${Math.abs(hash).toString(36)}`;
  };

  const parsePrice = (price: string) => {
    if (typeof price !== 'string') return 0;
    return parseFloat(price.replace(/,/g, ''));
  };

  const subtotal = cart.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  let tax = 0;
  if (totalQuantity > 0) {
    if (totalQuantity <= 2) {
      // 1–2 items: ₹100–₹150, nudging toward ₹150 for higher cart values.
      // Normalize cart value in a typical ₹300–₹2000 range → blends between 100 and 150.
      const normalized = Math.min(1, Math.max(0, (subtotal - 300) / 1700));
      tax = Math.round(100 + normalized * 50);
    } else {
      // 3+ items: below ₹99, scaling down smoothly as item count grows.
      // At 3 items → ~₹90; at 5 items → ~₹70; at 8+ items → floors near ₹40.
      const base = 99 - (totalQuantity - 3) * 8;
      tax = Math.round(Math.min(98, Math.max(40, base)));
    }
  }

  const total = subtotal + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[210] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-6 h-6 text-[#8b5e3c]" />
                <h2 className="text-xl font-serif font-bold text-[#1a1a1a]">Shopping Bag</h2>
                <span className="px-3 py-1 bg-[#8b5e3c]/10 text-[#8b5e3c] text-[10px] font-bold rounded-full">
                  {cart.length} ITEMS
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-black/40" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-[#fdf5e6] rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-[#8b5e3c]/40" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1a1a1a] mb-2">Your bag is empty</h3>
                  <p className="text-sm text-black/40 max-w-[200px]">Looks like you haven't added anything to your bag yet.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-6 group">
                    <div className="w-24 aspect-[4/5] rounded-2xl overflow-hidden bg-black/5 border border-black/5 shrink-0">
                      <img src={item.images[item.selectedImageIndex ?? 0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-[#1a1a1a] line-clamp-1">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-[10px] uppercase tracking-widest text-black/30 hover:text-red-500 transition-colors font-bold"
                          >
                            <Trash />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-4">{item.size}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-black/5 rounded-full p-1.5 px-4">
                          <button
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="p-0.5 hover:text-[#8b5e3c] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold min-w-[1rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="p-0.5 hover:text-[#8b5e3c] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-serif font-bold text-[#8b5e3c]">
                          ₹{(parsePrice(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-[#fdf5e6] border-t border-black/5">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-black/40 font-medium">Subtotal</span>
                    <span className="text-[#1a1a1a] font-bold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-black/40 font-medium">Estimated Tax</span>
                    <span className="text-[#1a1a1a] font-bold">+₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-black/5 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-serif font-bold text-[#1a1a1a]">Total</span>
                    <span className="text-2xl font-serif font-bold text-[#8b5e3c]">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={onClose}
                    className="py-5 rounded-2xl border border-black/5 font-bold text-[10px] uppercase tracking-widest text-black/40 hover:bg-white transition-all active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const cartHash = getCartHash(cart);
                      onClose();
                      navigate(`/#${cartHash}`);
                    }}
                    className="py-5 rounded-2xl bg-[#8b5e3c] text-white font-bold text-[10px] uppercase tracking-widest hover:bg-[#704a2f] transition-all shadow-xl shadow-amber-900/20 flex items-center justify-center gap-3 group active:scale-[0.98]"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
