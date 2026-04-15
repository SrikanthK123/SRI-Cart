import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import QRCode from "qrcode";
import {
  ArrowLeft, ArrowRight, Tag, Trash2, Minus, Plus,
  ShieldCheck, CreditCard, Truck, CheckCircle2, X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface CartItem {
  cartId: number;
  name: string;
  price: string;
  quantity: number;
  size: string;
  images: string[];
  selectedImageIndex?: number;
}

const PAYMENT_METHODS = [
  { id: "visa",    label: "Visa / Mastercard / Amex", sub: "Credit or debit card" },
  { id: "paypal",  label: "PayPal",                   sub: "Pay with your PayPal account" },
  { id: "upi",     label: "UPI",                      sub: "Google Pay, PhonePe, BHIM" },
  { id: "cod",     label: "Cash on Delivery",         sub: "Pay when your order arrives" },
];

interface FinalPayProps {
  cart: CartItem[];
  updateQuantity: (cartId: number, delta: number) => void;
  removeFromCart: (cartId: number) => void;
  clearCart: () => void;
}

export default function FinalPay({ cart, updateQuantity, removeFromCart, clearCart }: FinalPayProps) {
  const navigate = useNavigate();

  const [couponCode, setCouponCode]     = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponType, setCouponType] = useState<"firstOrder" | "standard" | null>(null);
  const [couponError, setCouponError]   = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [orderPlaced, setOrderPlaced]   = useState(false);
  const [firstOrderAvailable, setFirstOrderAvailable] = useState(() => !localStorage.getItem("sri-first-order-used"));
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{
    items: CartItem[];
    total: number;
    date: string;
    orderId: string;
  } | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const parsePrice = (price: string) =>
    parseFloat((price || "0").replace(/,/g, ""));

  const itemsTotal  = cart.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);
  const totalQty    = cart.reduce((acc, item) => acc + item.quantity, 0);
  const shopDiscount = Math.min(25, Math.floor(itemsTotal * 0.01));
  const couponDiscount = couponApplied
    ? couponType === "firstOrder"
      ? Math.floor(itemsTotal * 0.25)
      : Math.floor(itemsTotal * 0.1)
    : 0;
  const subtotal    = itemsTotal - shopDiscount - couponDiscount;
  const shipping    = itemsTotal > 1500 ? 0 : 99;

  let tax = 0;
  if (totalQty > 0) {
    if (totalQty <= 2) {
      const norm = Math.min(1, Math.max(0, (itemsTotal - 300) / 1700));
      tax = Math.round(100 + norm * 50);
    } else {
      const base = 99 - (totalQty - 3) * 8;
      tax = Math.round(Math.min(98, Math.max(40, base)));
    }
  }

  const total = subtotal + shipping + tax;

  const handleApplyCoupon = () => {
    const normalized = couponCode.trim().toLowerCase();

    if (normalized === "srifirst") {
      if (!firstOrderAvailable) {
        setCouponError(true);
        setCouponType(null);
      } else {
        setCouponApplied(true);
        setCouponType("firstOrder");
        setCouponError(false);
      }
    } else if (normalized === "sri10") {
      setCouponApplied(true);
      setCouponType("standard");
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponType(null);
    }

    setTimeout(() => setCouponError(false), 2500);
  };

  const handleCheckout = () => {
    const orderId = `SRI-${Date.now()}`;
    setCompletedOrder({
      items: cart,
      total,
      date: new Date().toISOString(),
      orderId,
    });
    setOrderPlaced(true);
    clearCart();

    if (couponType === "firstOrder") {
      localStorage.setItem("sri-first-order-used", "true");
      setFirstOrderAvailable(false);
    }
  };

  useEffect(() => {
    if (!orderPlaced || !completedOrder) return;

    const payload = {
      orderId: completedOrder.orderId,
      date: completedOrder.date,
      total: completedOrder.total,
      items: completedOrder.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.images?.[item.selectedImageIndex ?? 0] ?? "",
      })),
    };

    const baseUrl = `${window.location.origin}${import.meta.env.BASE_URL || "/"}`.replace(/\/$/, "");
    const raw = JSON.stringify(payload);
    const encoded = btoa(encodeURIComponent(raw));
    const orderUrl = `${baseUrl}/order?data=${encoded}`;

    QRCode.toDataURL(orderUrl, { width: 400, margin: 2 })
      .then((dataUrl) => setQrCodeDataUrl(dataUrl))
      .catch((err) => console.error("Failed to generate QR code", err));
  }, [orderPlaced, completedOrder]);

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#fdf5e6] flex flex-col items-center justify-center px-6 pt-28 pb-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 16 }}
          className="bg-white rounded-[3rem] shadow-2xl p-16 flex flex-col items-center text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-[#8b5e3c]/10 rounded-full flex items-center justify-center mb-8"
          >
            <CheckCircle2 className="w-12 h-12 text-[#8b5e3c]" />
          </motion.div>
          <h2 className="text-4xl font-serif font-bold text-[#0F3D3E] mb-4">Order Placed!</h2>
          <p className="text-black/50 mb-2 text-sm leading-relaxed">
            Thank you for shopping with SRI-Cart. Your order of{" "}
            <span className="font-bold text-[#8b5e3c]">₹{completedOrder?.total.toFixed(2)}</span> has been confirmed.
          </p>
          <p className="text-[10px] uppercase tracking-widest text-black/30 mb-6">
            A confirmation will be sent to your email.
          </p>

          <div className="w-full text-left mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b5e3c] mb-2">Order Details</p>
            <p className="text-sm text-[#1a1a1a] font-semibold mb-2">Order ID: {completedOrder?.orderId}</p>
            <p className="text-sm text-black/60 mb-4">Placed on {completedOrder ? new Date(completedOrder.date).toLocaleString() : "--"}</p>
            <div className="flex flex-wrap items-center gap-3">
              {completedOrder?.items.slice(0, 3).map((item) => (
                <div key={item.cartId} className="w-16 h-16 rounded-3xl overflow-hidden bg-[#faf8f0] border border-black/5">
                  <img src={item.images?.[item.selectedImageIndex ?? 0] ?? ""} alt={item.name} className="w-full h-full object-cover" />
                </div>
              ))}
              {completedOrder && completedOrder.items.length > 3 && (
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#f3ede5] text-xs font-black text-[#8b5e3c] border border-black/5">
                  +{completedOrder.items.length - 3}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => { localStorage.setItem("sri-cart", "[]"); navigate("/"); }}
            className="w-full py-5 bg-[#8b5e3c] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#704a2f] transition-all shadow-xl shadow-amber-900/20 flex items-center justify-center gap-3 group"
          >
            Back to Store
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {qrCodeDataUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center max-w-md w-full"
          >
            <h3 className="text-2xl font-serif font-bold text-[#0F3D3E] mb-4">Scan QR Code for Order Details</h3>
            <p className="text-sm text-black/50 mb-6">Use your phone's camera to scan and view order information</p>
            <div className="inline-block bg-white rounded-[2rem] p-6 shadow-xl border border-black/5">
              <img src={qrCodeDataUrl} alt="Order QR code" className="w-80 h-80 rounded-3xl" />
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf5e6] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-[#8b5e3c] font-bold uppercase tracking-widest text-xs mb-12 hover:gap-5 transition-all group"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </motion.button>

        {/* Page heading */}
        <div className="mb-12">
          <h1 className="text-5xl lg:text-6xl font-serif font-black text-[#0F3D3E] mb-3">Your Cart</h1>
          <p className="text-sm text-black/50 max-w-2xl">
            Review your order, choose a payment method, and complete checkout with SRI-Cart’s premium theme styling.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-[#8b5e3c]/10 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-9 h-9 text-[#8b5e3c]/40" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-3">Your cart is empty</h3>
            <p className="text-black/40 text-sm mb-8">Go back and add something you love.</p>
            <button
              onClick={() => navigate("/")}
              className="px-10 py-4 bg-[#8b5e3c] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#704a2f] transition-all shadow-xl shadow-amber-900/20"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.6fr_0.95fr] items-start">

            {/* ── LEFT: Product + Coupon Section ── */}
            <div className="space-y-6">
              <div className="bg-white rounded-[3rem] border border-black/5 shadow-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#8b5e3c]">Added items</p>
                    <h2 className="text-3xl font-serif font-black text-[#1a1a1a]">Review cart</h2>
                  </div>
                  <span className="text-sm text-black/50">{totalQty} {totalQty === 1 ? "item" : "items"}</span>
                </div>
                <div className="space-y-4">
                  {cart.map((item) => {
                    const imgSrc = item.images?.[item.selectedImageIndex ?? 0] ?? "";
                    const itemTotal = parsePrice(item.price) * item.quantity;

                    return (
                      <motion.div
                        key={item.cartId}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.35 }}
                        className="rounded-[2rem] bg-[#faf8f0] border border-black/5 p-4 flex flex-col sm:flex-row items-center gap-4"
                      >
                        <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[#f7f2ea] shadow-inner shadow-black/5 flex items-center justify-center">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs uppercase tracking-[0.2em] text-black/30">No Image</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="text-lg font-bold text-[#1a1a1a] truncate">{item.name}</h3>
                              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#0F3D3E]/70">
                                Size {item.size || "N/A"} · Qty {item.quantity}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.cartId)}
                              className="rounded-full p-2 text-[#1a1a1a]/70 hover:text-[#c0392b] transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span className="px-3 py-2 rounded-full bg-white border border-black/5 text-[10px] uppercase tracking-[0.2em] text-[#0F3D3E]">
                              ₹{parsePrice(item.price).toFixed(2)} each
                            </span>
                            <span className="px-3 py-2 rounded-full bg-white border border-black/5 text-[10px] uppercase tracking-[0.2em] text-[#0F3D3E]">
                              Total ₹{itemTotal.toFixed(2)}
                            </span>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center gap-2 w-full">
                            <button
                              onClick={() => updateQuantity(item.cartId, -1)}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1a1a1a]/70 hover:text-[#8b5e3c] transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="inline-flex h-10 items-center justify-center rounded-full bg-white border border-black/5 px-4 text-sm font-bold text-[#1a1a1a]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartId, 1)}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1a1a1a]/70 hover:text-[#8b5e3c] transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => navigate(-1)}
                              className="ml-auto text-xs uppercase tracking-[0.25em] font-black text-[#0F3D3E] hover:text-[#8b5e3c] transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-[3rem] border border-black/5 shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-4 h-4 text-[#8b5e3c]" />
                  <h3 className="font-black text-sm uppercase tracking-widest text-[#1a1a1a]">Apply Coupon</h3>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Enter your coupon code"
                    disabled={couponApplied}
                    className={`flex-1 h-16 rounded-3xl border px-6 text-sm font-medium outline-none transition-all ${
                      couponError
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-300"
                        : couponApplied
                        ? "border-green-300 bg-green-50 text-green-700"
                        : "border-black/10 bg-[#faf8f0] focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20"
                    }`}
                  />
                  {couponApplied ? (
                    <button
                      onClick={() => { setCouponApplied(false); setCouponCode(""); setCouponType(null); }}
                      className="h-16 rounded-3xl border border-red-200 bg-white px-8 text-sm font-bold uppercase tracking-[0.25em] text-red-500 hover:bg-red-50 transition-all"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyCoupon}
                      className="h-16 rounded-3xl bg-[#8b5e3c] px-8 text-sm font-bold uppercase tracking-[0.25em] text-white hover:bg-[#704a2f] transition-all"
                    >
                      Apply
                    </button>
                  )}
                </div>
                <p className="mt-4 text-xs text-[#0F3D3E]/70 max-w-xl">
                  {firstOrderAvailable
                    ? "Use coupon code SriFirst for 25% off your first order."
                    : "SriFirst has already been used for your first order. Use SRI10 for 10% off instead."}
                </p>
                {couponError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-bold mt-3"
                  >
                    Invalid coupon code. Please try again.
                  </motion.p>
                )}
              </div>
            </div>

            {/* ── RIGHT: Payment + Order Summary ── */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-28 w-full">
              <div className="bg-white rounded-[3rem] border border-black/5 shadow-xl p-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-[#8b5e3c] mb-3">How you'll pay</p>
                    <h2 className="text-3xl font-serif font-black text-[#0F3D3E]">Payment</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-3xl bg-[#0F3D3E] text-white px-4 py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center">Visa</div>
                    <div className="rounded-3xl bg-[#8b5e3c] text-white px-4 py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center">Mastercard</div>
                    <div className="rounded-3xl bg-[#1a1a1a] text-white px-4 py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center">Amex</div>
                    <div className="rounded-3xl bg-[#f7f3e8] text-[#0F3D3E] px-4 py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center border border-black/5">PayPal</div>
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`flex items-center gap-4 p-4 rounded-[1.75rem] border-2 transition-all text-left ${
                        selectedPayment === method.id
                          ? "border-[#8b5e3c] bg-[#8b5e3c]/10"
                          : "border-black/5 bg-[#faf8f0] hover:border-black/10"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        selectedPayment === method.id
                          ? "border-[#8b5e3c] bg-[#8b5e3c]"
                          : "border-black/20"
                      }`}>
                        {selectedPayment === method.id && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1a1a1a]">{method.label}</p>
                        <p className="text-[10px] text-black/40 font-medium">{method.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[3rem] border border-black/5 shadow-xl p-8">
                <h3 className="font-black text-xs uppercase tracking-widest text-[#8b5e3c] mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm text-[#1a1a1a]/70">
                    <span>Item(s) total</span>
                    <span className="font-semibold">₹{itemsTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#1a1a1a]/70">
                    <span>Shop discount</span>
                    <span className="text-[#0F3D3E] font-semibold">−₹{shopDiscount.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-sm text-[#1a1a1a]/70">
                      <span>Coupon discount</span>
                      <span className="text-[#0F3D3E] font-semibold">−₹{couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-[#1a1a1a]/70">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#1a1a1a]/70">
                    <span>Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#1a1a1a]/70">
                    <span>Estimated Tax</span>
                    <span className="font-semibold">+₹{tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="h-px bg-black/5 mb-6" />
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-[#1a1a1a]">Total ({totalQty} {totalQty === 1 ? "item" : "items"})</span>
                  <span className="text-3xl font-serif font-black text-[#8b5e3c]">₹{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-5 bg-[#8b5e3c] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#704a2f] transition-all shadow-xl shadow-amber-900/20 flex items-center justify-center gap-3"
                >
                  Process to Check Out
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
