import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Package, MapPin, User, Banknote, Calendar, LogOut, Home } from "lucide-react";

const UserDashboard = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchParcels = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParcels(res.data);
    } catch (err) {
      console.error("Fetch parcels error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Helper for status badge colors
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "delivered": return "bg-green-100 text-green-700 border-green-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              My Parcels
            </h1>
            <p className="text-gray-500 mt-1">Manage and track your ongoing shipments</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
            >
              <Home size={18} /> Home
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-md shadow-red-100"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 w-full bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : parcels.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <Package className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900">No parcels found</h3>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parcels.map((parcel) => (
              <div
                key={parcel._id}
                className="group bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 relative overflow-hidden"
              >
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(parcel.status)}`}>
                    {parcel.status}
                  </span>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(parcel.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {parcel.title}
                </h2>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-blue-500 transition-colors">
                      <User size={16} />
                    </div>
                    <p><span className="font-semibold text-gray-800">To:</span> {parcel.receiverName}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-blue-500 transition-colors">
                      <MapPin size={16} />
                    </div>
                    <p className="truncate"><span className="font-semibold text-gray-800">Dest:</span> {parcel.receiverRegion}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-blue-500 transition-colors">
                      <Banknote size={16} />
                    </div>
                    <p className="text-lg font-bold text-blue-600">{parcel.cost} <span className="text-xs font-normal text-gray-500">BDT</span></p>
                  </div>
                </div>

                {/* Tracking ID */}
                <div className="mt-5 pt-4 border-t border-gray-50 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  ID: {parcel.trackingId}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
