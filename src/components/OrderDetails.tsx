import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Calendar, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [orders, setOrders] = useState<OrderPayload[]>([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<OrderPayload | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<OrderPayload | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

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
                        <div className="w-20 h-20 rounded-3xl overflow-hidden bg-white border border-black/5">
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
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-[#f3ede5] text-sm font-bold uppercase tracking-[0.2em] text-[#1a1a1a] hover:bg-[#e7dfd3] transition whitespace-nowrap"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 bg-white p-6 sm:p-8 md:p-12 overflow-y-auto">
              <div className="mb-6">
                <p className="text-gray-500 font-medium text-lg mb-6">Professional Shopping Experience</p>
                <hr className="border-[#8b5e3c] border-t-2" />
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between mb-10 gap-6">
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
