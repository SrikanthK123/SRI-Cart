import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
  image: string;
}

interface OrderPayload {
  orderId: string;
  date: string;
  total: number;
  items: OrderItem[];
}

export default function OrderDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const data = searchParams.get("data");

  const payload = useMemo<OrderPayload | null>(() => {
    if (!data) return null;
    try {
      const json = decodeURIComponent(atob(data));
      return JSON.parse(json) as OrderPayload;
    } catch {
      return null;
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#fdf5e6] py-28 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl p-8 sm:p-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[#8b5e3c] font-bold uppercase tracking-[0.3em] text-xs mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {payload ? (
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8b5e3c] mb-2">Order scanned</p>
              <h1 className="text-4xl font-serif font-black text-[#0F3D3E]">Order Summary</h1>
              <p className="text-sm text-black/60 mt-3">Order ID <span className="font-semibold text-[#8b5e3c]">{payload.orderId}</span></p>
              <p className="text-sm text-black/60">Placed on {new Date(payload.date).toLocaleString()}</p>
            </div>
            <div className="grid gap-4">
              {payload.items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-stretch gap-4 rounded-[2rem] border border-black/5 bg-[#faf8f0] p-4 w-full">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden bg-white border border-black/5">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-black/30 uppercase tracking-[0.2em]">No image</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-[#1a1a1a] truncate">{item.name}</p>
                    <div className="mt-2 text-sm text-[#1a1a1a]/70 flex flex-wrap gap-3">
                      <span>Qty {item.quantity}</span>
                      <span>Price {item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-[2rem] bg-[#f7f2ea] p-6 border border-black/5">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8b5e3c] mb-3">Total</p>
              <p className="text-3xl font-serif font-black text-[#8b5e3c]">₹{payload.total.toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-sm text-[#8b5e3c] uppercase tracking-[0.3em] mb-4">Invalid order QR</p>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Unable to decode order details.</h2>
            <p className="text-sm text-black/50 mt-4">Make sure the QR code is correct and try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}
