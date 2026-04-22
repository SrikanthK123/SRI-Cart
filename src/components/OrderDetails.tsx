import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Calendar, Hash, CheckCircle2, Truck, Box, MapPin, ChevronDown, ChevronUp, Download, Gift, Tag, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import LogoImage from "../assets/Images/SRI-Cart LogoWebsite2.jpg";

interface OrderItem {
  cartId: number;
  name: string;
  price: string;
  quantity: number;
  size: string;
  images: string[];
  selectedImageIndex?: number;
}

interface OrderPayload {
  orderId: string;
  date: string;
  total: number;
  items: OrderItem[];
  invoiceImage?: string;
}

export default function OrderDetails() {
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [orders, setOrders] = useState<OrderPayload[]>([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<OrderPayload | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<OrderPayload | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [scratchCards, setScratchCards] = useState<any[]>([]);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const handleRevealCard = (cardId: string) => {
    const updated = scratchCards.map(c => 
      c.id === cardId ? { ...c, isScratched: true } : c
    );
    setScratchCards(updated);
    localStorage.setItem("sri-scratch-cards", JSON.stringify(updated));
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };
  const getTrackingSteps = (orderDateStr: string) => {
    const placedDate = new Date(orderDateStr);
    
    // Helper to add times
    const addHours = (date: Date, hours: number) => new Date(date.getTime() + hours * 60 * 60 * 1000);
    const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    
    const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    const steps = [
      { label: 'Order Placed', icon: Box, date: placedDate },
      { label: 'Packing', icon: Package, date: addHours(placedDate, 2.5) },
      { label: 'Shipping', icon: Truck, date: addHours(addDays(placedDate, 1), 4) },
      { label: 'Out for Delivery', icon: MapPin, date: addHours(addDays(placedDate, 4), 2) },
      { label: 'Delivered', icon: CheckCircle2, date: addHours(addDays(placedDate, 5), 6) }
    ];

    const now = new Date();

    return steps.map(step => ({
      ...step,
      completed: step.date <= now,
      dateStr: formatDate(step.date),
      timeStr: formatTime(step.date).toLowerCase()
    }));
  };

  const toggleOrderTracking = (orderId: string) => {
    setExpandedOrders(prev => {
      const next = new Set(prev);
      if (next.has(orderId)) next.delete(orderId);
      else next.add(orderId);
      return next;
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    const updatedOrders = orders.filter((order) => order.orderId !== orderId);
    setOrders(updatedOrders);

    try {
      localStorage.setItem(
        "sri-orders",
        JSON.stringify(updatedOrders.map(({ invoiceImage, ...order }) => order))
      );
    } catch (error) {
      console.error("Failed to update order history:", error);
    }

    try {
      const savedInvoices = JSON.parse(localStorage.getItem("sri-orders-with-invoices") || "[]");
      const remainingInvoices = savedInvoices.filter((order: OrderPayload) => order.orderId !== orderId);
      localStorage.setItem("sri-orders-with-invoices", JSON.stringify(remainingInvoices));
    } catch (error) {
      console.error("Failed to update order invoices:", error);
    }

    if (selectedInvoiceOrder?.orderId === orderId) {
      setSelectedInvoiceOrder(null);
    }
  };

  useEffect(() => {
    const savedOrders = localStorage.getItem("sri-orders");
    const savedOrdersWithInvoices = localStorage.getItem("sri-orders-with-invoices");

    let parsedOrders: OrderPayload[] = [];
    let parsedInvoices: OrderPayload[] = [];

    if (savedOrders) {
      try {
        parsedOrders = JSON.parse(savedOrders);
      } catch (error) {
        console.error("Failed to parse orders:", error);
      }
    }

    if (savedOrdersWithInvoices) {
      try {
        parsedInvoices = JSON.parse(savedOrdersWithInvoices);
      } catch (error) {
        console.error("Failed to parse invoices:", error);
      }
    }

    const invoiceMap = new Map(parsedInvoices.map((order) => [order.orderId, order.invoiceImage]));

    setOrders(
      parsedOrders.map((order) => ({
        ...order,
        invoiceImage: invoiceMap.get(order.orderId),
      }))
    );
    
    const savedCards = JSON.parse(localStorage.getItem("sri-scratch-cards") || "[]");
    const validCards = savedCards.filter((card: any) => {
      if (!card.isUsed) return true;
      if (!card.usedAt) return true;
      const hoursSinceUsed = (Date.now() - new Date(card.usedAt).getTime()) / (1000 * 60 * 60);
      return hoursSinceUsed <= 48;
    });
    setScratchCards(validCards.reverse());
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf5e6] py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-[#8b5e3c] font-bold uppercase tracking-[0.3em] text-xs mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </button>

        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-serif font-black text-[#0F3D3E] mb-3">Order History</h1>
          <p className="text-sm text-black/50 max-w-2xl">
            View all your previous orders, track their status, and access order details.
          </p>
        </div>

        {/* Rewards Section */}
        {scratchCards.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-6 h-6 text-[#8b5e3c]" />
              <h2 className="text-2xl font-serif font-black text-[#1a1a1a]">Your Rewards & Offers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {scratchCards.map((card) => (
                <motion.div 
                  key={card.id} 
                  layout
                  className={`relative overflow-hidden rounded-[2rem] border ${card.isScratched ? 'bg-white border-black/10' : 'bg-gradient-to-br from-[#8b5e3c] to-[#0F3D3E] border-transparent'} shadow-xl p-6 h-48 flex flex-col items-center justify-center text-center cursor-pointer`}
                  onClick={() => !card.isScratched && handleRevealCard(card.id)}
                  whileHover={!card.isScratched ? { scale: 1.02, rotate: [-1, 1, -1, 0] } : {}}
                  transition={{ duration: 0.2 }}
                  whileTap={!card.isScratched ? { scale: 0.98 } : {}}
                >
                  {!card.isScratched ? (
                    <div className="flex flex-col items-center gap-3 z-10 w-full text-white">
                      <Gift className="w-8 h-8 opacity-80" />
                      <p className="font-bold uppercase tracking-widest text-sm">Reward Unlocked!</p>
                      <p className="text-xs text-white/60">Tap to scratch & reveal</p>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center w-full"
                    >
                      {card.rewardType === "BETTER_LUCK" ? (
                        <>
                          <p className="text-lg font-bold text-[#1a1a1a] mb-2">Better Luck Next Time!</p>
                          <p className="text-xs text-black/50">Keep shopping to earn more rewards.</p>
                        </>
                      ) : (
                        <>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8b5e3c] mb-1">
                            {card.rewardType === "FREE_TAX" ? "Tax Free Offer" : card.rewardType.replace("_", " ")}
                          </p>
                          <div className={`px-4 py-2 rounded-xl mb-3 ${card.isUsed ? 'bg-gray-100 text-gray-400 line-through' : 'bg-[#faf8f0] text-[#0F3D3E] border border-[#8b5e3c]/20'}`}>
                            <span className="font-mono font-bold text-lg">{card.couponCode}</span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleCopyCoupon(card.couponCode); }}
                              disabled={card.isUsed}
                              className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors ${card.isUsed ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#8b5e3c] text-white hover:bg-[#704a2f]'}`}
                            >
                              {card.isUsed ? <CheckCircle2 className="w-3.5 h-3.5" /> : copiedCoupon === card.couponCode ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              {card.isUsed ? "Used" : copiedCoupon === card.couponCode ? "Copied" : "Copy Code"}
                            </button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                  
                  {!card.isScratched && (
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] shadow-2xl p-16 text-center">
            <Package className="w-16 h-16 text-[#8b5e3c]/20 mx-auto mb-6" />
            <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-3">No orders yet</h3>
            <p className="text-black/40 text-sm mb-8">Your order history will appear here once you place your first order.</p>
            <button
              onClick={() => navigate("/")}
              className="px-10 py-4 bg-[#8b5e3c] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#704a2f] transition-all shadow-xl shadow-amber-900/20"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-6 border border-black/5">
              <div className="flex items-center gap-4">
                <Package className="w-6 h-6 text-[#8b5e3c]" />
                <span className="text-lg font-bold text-[#1a1a1a]">{orders.length} Order{orders.length !== 1 ? 's' : ''} Placed</span>
              </div>
            </div>

            {[...orders].reverse().map((order, index) => (
              <div key={order.orderId} className="bg-white rounded-[3rem] shadow-xl border border-black/5 overflow-hidden">
                <div className="p-8 border-b border-black/5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="w-4 h-4 text-[#8b5e3c]" />
                        <span className="text-sm font-bold text-[#8b5e3c] uppercase tracking-widest">Order ID</span>
                      </div>
                      <h3 className="text-2xl font-serif font-black text-[#0F3D3E]">{order.orderId}</h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-[#8b5e3c]" />
                        <span className="text-sm font-bold text-[#8b5e3c] uppercase tracking-widest">Date</span>
                      </div>
                      <p className="text-lg font-bold text-[#1a1a1a]">{new Date(order.date).toLocaleDateString()}</p>
                      <p className="text-sm text-black/60">{new Date(order.date).toLocaleTimeString()}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-black/60">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} • Total ₹{order.total.toFixed(2)}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-900/20 ${order.invoiceImage ? 'bg-[#8b5e3c] text-white hover:bg-[#704a2f]' : 'bg-[#f3ede5] text-[#6b7280] hover:bg-[#e7dfd3]'}`}
                      >
                        Check Invoice
                      </button>
                      <button
                        onClick={() => { setOrderToDelete(order); setIsDeleteConfirmOpen(true); }}
                        className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-red-200 text-red-600 font-bold text-xs uppercase tracking-widest hover:bg-red-50 transition-all shadow-xl shadow-amber-900/5"
                      >
                        Delete Order
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid gap-4 mb-6">
                    {order.items.map((item) => (
                      <div key={item.cartId} className="flex flex-col sm:flex-row items-stretch gap-4 rounded-[2rem] border border-black/5 bg-[#faf8f0] p-4 w-full">
                        <div className="w-20 h-20 rounded-3xl overflow-hidden bg-white border border-black/5 flex-shrink-0">
                          {item.images?.[item.selectedImageIndex ?? 0] ? (
                            <img src={item.images[item.selectedImageIndex ?? 0]} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-black/30 uppercase tracking-[0.2em]">No image</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-bold text-[#1a1a1a] truncate">{item.name}</p>
                          <div className="mt-2 text-sm text-[#1a1a1a]/70 flex flex-wrap gap-3">
                            <span>Qty {item.quantity}</span>
                            <span>Size {item.size}</span>
                            <span>₹{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <button 
                      onClick={() => toggleOrderTracking(order.orderId)}
                      className="flex items-center justify-between w-full text-xs font-bold text-[#8b5e3c] uppercase tracking-widest hover:text-[#704a2f] transition-all bg-[#faf8f0] px-6 py-4 rounded-2xl border border-black/5"
                    >
                      <span className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Delivery Status
                      </span>
                      {expandedOrders.has(order.orderId) ? (
                        <span className="flex items-center gap-1">Hide Details <ChevronUp className="w-4 h-4" /></span>
                      ) : (
                        <span className="flex items-center gap-1">View Details <ChevronDown className="w-4 h-4" /></span>
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedOrders.has(order.orderId) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-8 pb-4">
                            <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                              <div className="relative min-w-[480px] sm:min-w-0 sm:mx-8 flex items-start justify-between">
                                {/* Progress Line */}
                                {(() => {
                                  const trackingSteps = getTrackingSteps(order.date);
                                  const completedCount = trackingSteps.filter(s => s.completed).length;
                                  const progressPercentage = completedCount === 0 ? 0 : Math.min(100, ((completedCount - 1) / (trackingSteps.length - 1)) * 100);

                                  return (
                                    <>
                                      <div className="absolute left-0 top-6 -translate-y-1/2 w-full h-[2px] bg-gray-200 z-0"></div>
                                      <div className="absolute left-0 top-6 -translate-y-1/2 h-[2px] bg-[#8b5e3c] z-0 transition-all duration-1000 ease-in-out" style={{ width: `${progressPercentage}%` }}></div>

                                      {trackingSteps.map((step, idx) => (
                                        <div key={idx} className="relative z-10 flex flex-col items-center gap-3 w-24 sm:w-28 mt-0">
                                          <div className={`w-12 h-12 rounded-2xl flex flex-shrink-0 items-center justify-center outline outline-4 outline-[#faf8f0] transition-colors duration-500 ${step.completed ? 'bg-[#8b5e3c] text-white shadow-lg shadow-amber-900/20' : 'bg-white border-2 border-gray-200 text-gray-300'}`}>
                                            <step.icon className="w-5 h-5" />
                                          </div>
                                          <div className="text-center">
                                            <span className={`block text-[10px] sm:text-xs font-bold uppercase tracking-wider ${step.completed ? 'text-[#8b5e3c]' : 'text-gray-400'}`}>
                                              {step.label}
                                            </span>
                                            {step.completed ? (
                                              <div className="mt-1">
                                                <span className="block text-[10px] text-gray-600 font-medium whitespace-nowrap">{step.dateStr}</span>
                                                <span className="block text-[9px] text-gray-400 whitespace-nowrap">{step.timeStr}</span>
                                              </div>
                                            ) : (
                                              <div className="mt-1">
                                                <span className="block text-[9px] text-gray-400 font-medium whitespace-nowrap">Exp. {step.dateStr}</span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-black/5">
                    <div className="text-sm text-black/60">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} • Total ₹{order.total.toFixed(2)}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-serif font-black text-[#8b5e3c]">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      )}

      <AnimatePresence>
        {selectedInvoiceOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 pt-24"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-3xl rounded-[2rem] bg-white shadow-2xl flex flex-col max-h-[75vh] overflow-hidden"
            >
            <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#8b5e3c] mb-1">Invoice Preview</p>
                <h3 className="text-xl font-semibold text-[#0F3D3E] break-all">Order {selectedInvoiceOrder.orderId}</h3>
              </div>
              <div className="flex flex-row gap-3 sm:w-auto w-full sm:justify-end">
                <button
                  onClick={async () => {
                    if (invoiceRef.current) {
                      try {
                        const dataUrl = await toPng(invoiceRef.current, {
                          backgroundColor: "#ffffff",
                          pixelRatio: 2,
                        });
                        const link = document.createElement("a");
                        link.href = dataUrl;
                        link.download = `Invoice_${selectedInvoiceOrder.orderId}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      } catch (error) {
                        console.error("Failed to generate invoice image:", error);
                      }
                    }
                  }}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-[#8b5e3c] text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-[#704a2f] transition whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-[#f3ede5] text-sm font-bold uppercase tracking-[0.2em] text-[#1a1a1a] hover:bg-[#e7dfd3] transition whitespace-nowrap"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 bg-white overflow-y-auto">
              <div ref={invoiceRef} className="p-6 sm:p-8 md:p-12 relative bg-white">
                <div 
                  className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" 
                  style={{
                    backgroundImage: `url(${LogoImage})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "60%",
                  }} 
                />
                <div className="relative z-10">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-serif font-black text-[#0F3D3E] mb-2">SRI-CART</h1>
                    <p className="text-gray-500 font-medium text-lg">Professional Shopping Experience</p>
                  </div>
                  <img src={LogoImage} alt="SRI-Cart Logo" className="h-16 object-contain mix-blend-multiply" />
                </div>
                <hr className="border-[#8b5e3c] border-t-2" />

              <div className="flex flex-col sm:flex-row sm:justify-between mb-10 gap-6 mt-8">
                <div>
                  <p className="text-[#8b5e3c] font-bold text-sm tracking-[0.15em] uppercase mb-2">Order Number</p>
                  <p className="text-3xl font-black text-[#1a1a1a]">{selectedInvoiceOrder.orderId}</p>
                </div>
                <div>
                  <p className="text-[#8b5e3c] font-bold text-sm tracking-[0.15em] uppercase mb-2">Order Date</p>
                  <p className="text-xl text-[#1a1a1a]">
                    {new Date(selectedInvoiceOrder.date).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    })}, {new Date(selectedInvoiceOrder.date).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true
                    }).toLowerCase()}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-[#0F3D3E] uppercase tracking-widest mb-6">Order Items</h4>
                <div className="space-y-4">
                  {selectedInvoiceOrder.items.map((item, index) => (
                    <div key={item.cartId} className="flex flex-col sm:flex-row gap-6 p-5 border border-black/10 rounded-xl items-center">
                      <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0 border border-black/5">
                        {item.images?.[item.selectedImageIndex ?? 0] ? (
                          <img src={item.images[item.selectedImageIndex ?? 0]} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Image</div>
                        )}
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-extrabold text-xl text-[#1a1a1a]">{index + 1}. {item.name}</h5>
                            <p className="text-gray-500 mt-1">Size: {item.size}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-sm">Unit Price</p>
                            <p className="font-extrabold text-lg text-[#8b5e3c]">₹{parseFloat(item.price).toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-8">
                          <p className="text-gray-500">Quantity: <span className="font-bold text-black">{item.quantity}</span></p>
                          <p className="font-bold text-lg text-[#0F3D3E]">Total: ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-black/10 w-full flex justify-end">
                <div className="w-full sm:w-1/2">
                  <div className="flex justify-between mb-4 text-gray-500">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-black">₹{selectedInvoiceOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-gray-500">
                    <span>Tax & Fees:</span>
                    <span className="font-semibold text-black">Included</span>
                  </div>
                  <hr className="border-[#8b5e3c] border-t-2 mb-4" />
                  <div className="flex justify-between items-center">
                    <span className="font-black text-xl text-[#0F3D3E]">Total Amount:</span>
                    <span className="font-black text-3xl text-[#8b5e3c]">₹{selectedInvoiceOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteConfirmOpen && orderToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-xl rounded-[2rem] bg-white shadow-2xl overflow-hidden"
            >
            <div className="px-8 py-8 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-red-600 mb-3">Confirm Delete</p>
              <h3 className="text-2xl font-semibold text-[#0F3D3E] mb-4">Remove this order?</h3>
              <p className="text-sm text-black/60 mb-8">
                This will delete the order and its saved invoice image forever. You can’t recover it afterwards.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    handleDeleteOrder(orderToDelete.orderId);
                    setOrderToDelete(null);
                    setIsDeleteConfirmOpen(false);
                    if (selectedInvoiceOrder?.orderId === orderToDelete.orderId) {
                      setSelectedInvoiceOrder(null);
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-red-600 text-white font-bold uppercase tracking-[0.2em] hover:bg-red-700 transition"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => {
                    setOrderToDelete(null);
                    setIsDeleteConfirmOpen(false);
                  }}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#f3ede5] text-[#1a1a1a] font-bold uppercase tracking-[0.2em] hover:bg-[#e7dfd3] transition"
                >
                  Cancel
                </button>
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
  );
}
