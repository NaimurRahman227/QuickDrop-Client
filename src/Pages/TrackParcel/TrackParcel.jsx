import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Search, Package, MapPin, Truck, CheckCircle, ArrowLeft, Home } from "lucide-react";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSearch = async () => {
    if (!trackingId.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/orders/track/${trackingId}`);
      setParcel(res.data);
      setError("");
    } catch (err) {
      setParcel(null);
      setError("We couldn't find a parcel with that Tracking ID.");
    } finally {
      setLoading(false);
    }
  };

  const statuses = ["pending", "accepted", "picked", "delivered"];
  const currentStep = statuses.indexOf(parcel?.status?.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 relative">
      {/* Back to Home Button */}
      <div className="max-w-2xl mx-auto mb-6">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Track Your Shipment</h1>
          <p className="text-gray-500">Enter your tracking number to get real-time updates.</p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white p-2 rounded-2xl shadow-xl flex gap-2 border border-gray-100 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="e.g. PRC-17730630..."
              className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none text-gray-700 font-medium"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            onClick={handleSearch} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : "Track"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-center animate-pulse">
            {error}
          </div>
        )}

        {parcel && (
          <div className="space-y-6">
            {/* Visual Status Stepper */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between relative">
                {statuses.map((step, index) => (
                  <div key={step} className="flex flex-col items-center z-10 w-full">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      index <= currentStep ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-200 text-gray-300"
                    }`}>
                      {index < currentStep ? <CheckCircle size={20} /> : <Package size={20} />}
                    </div>
                    <p className={`text-[10px] sm:text-xs font-bold mt-2 uppercase tracking-tighter ${index <= currentStep ? "text-blue-600" : "text-gray-400"}`}>
                      {step}
                    </p>
                  </div>
                ))}
                {/* Connector Line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 z-0">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-700" 
                    style={{ width: `${(currentStep / (statuses.length - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Detailed Info Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
                  <Truck size={14}/> Logistics Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-gray-500">Title:</span> <span className="font-bold text-gray-800">{parcel.title}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Weight:</span> <span className="font-bold text-gray-800">{parcel.weight} kg</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Cost:</span> <span className="font-bold text-blue-600 text-lg">৳ {parcel.cost}</span></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
                  <MapPin size={14}/> Destination
                </h3>
                <div className="space-y-2">
                  <p className="font-bold text-gray-800">{parcel.receiverName}</p>
                  <p className="text-sm text-gray-600">{parcel.receiverAddress}</p>
                  <p className="text-sm text-gray-600">{parcel.receiverRegion}, {parcel.receiverCenter}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackParcel;
