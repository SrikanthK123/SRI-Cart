import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Calendar, Hash } from "lucide-react";

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
}

export default function OrderDetails() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderPayload[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("sri-orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error("Failed to parse orders:", error);
      }
    }
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

            {orders.reverse().map((order, index) => (
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
      </div>
    </div>
  );
}
