import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Download } from "lucide-react";

interface OrderData {
  orderId: string;
  date: string;
  total: number;
  invoiceImage?: string;
  items: Array<{
    name: string;
    price: string;
    quantity: number;
    size: string;
    images: string[];
    selectedImageIndex?: number;
  }>;
}

export default function InvoiceView() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setError(true);
      setLoading(false);
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const payload = searchParams.get("data");

    if (payload) {
      try {
        const parsed = JSON.parse(decodeURIComponent(payload));
        setOrderData(parsed);
        setLoading(false);
        return;
      } catch (err) {
        console.error("Failed to parse invoice payload:", err);
      }
    }

    // Fallback to localStorage if payload is not available
    try {
      const savedOrders = localStorage.getItem("sri-orders-with-invoices");
      if (savedOrders) {
        const orders = JSON.parse(savedOrders);
        const foundOrder = orders.find((o: OrderData) => o.orderId === orderId);

        if (foundOrder) {
          setOrderData(foundOrder);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to load order:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [orderId, location.search]);

  const downloadInvoice = () => {
    if (orderData?.invoiceImage) {
      const link = document.createElement("a");
      link.href = orderData.invoiceImage;
      link.download = `SRI-Cart-Invoice-${orderData.orderId}.png`;
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf5e6] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8b5e3c] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#0F3D3E] font-semibold">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-[#fdf5e6] flex flex-col items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-12 text-center max-w-md shadow-xl border border-black/5">
          <h2 className="text-2xl font-serif font-bold text-[#0F3D3E] mb-4">Invoice Not Found</h2>
          <p className="text-black/60 mb-8">Sorry, we couldn't find the invoice you're looking for. Please check the QR code and try again.</p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-[#8b5e3c] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#704a2f] transition-all"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf5e6] pt-20 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-[#8b5e3c] font-bold uppercase tracking-[0.3em] text-xs mb-8 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </button>

        {/* Invoice Layout matching Modal */}
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-2xl mb-8">
          <div className="mb-6">
            <p className="text-gray-500 font-medium text-lg mb-6">Professional Shopping Experience</p>
            <hr className="border-[#8b5e3c] border-t-2" />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between mb-10 gap-6">
            <div>
              <p className="text-[#8b5e3c] font-bold text-sm tracking-[0.15em] uppercase mb-2">Order Number</p>
              <p className="text-3xl font-black text-[#1a1a1a] break-all">SRI-{orderData.orderId}</p>
            </div>
            <div>
              <p className="text-[#8b5e3c] font-bold text-sm tracking-[0.15em] uppercase mb-2">Order Date</p>
              <p className="text-xl text-[#1a1a1a]">
                {new Date(orderData.date).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })}, {new Date(orderData.date).toLocaleTimeString('en-US', {
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
              {orderData.items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-6 p-5 border border-black/10 rounded-xl items-center">
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
                        <p className="text-gray-500 mt-1">Size: {item.size || 'N/A'}</p>
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
                <span className="font-semibold text-black">₹{orderData.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-500">
                <span>Tax & Fees:</span>
                <span className="font-semibold text-black">Included</span>
              </div>
              <hr className="border-[#8b5e3c] border-t-2 mb-4" />
              <div className="flex justify-between items-center">
                <span className="font-black text-xl text-[#0F3D3E]">Total Amount:</span>
                <span className="font-black text-3xl text-[#8b5e3c]">₹{orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={downloadInvoice}
          disabled={!orderData.invoiceImage}
          className={`w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 ${orderData.invoiceImage ? "bg-[#8b5e3c] text-white hover:bg-[#704a2f] shadow-amber-900/20" : "bg-[#d1d5db] text-[#6b7280] cursor-not-allowed"}`}
        >
          <Download className="w-4 h-4" />
          Download Original Invoice Image
        </button>

      </div>
    </div>
  );
}
