import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Package, MapPin, Navigation, Truck, DollarSign, LogOut, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router-dom

const RiderDashboard = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const fetchParcels = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_URL}/api/rider/orders", headers);
      setParcels(res.data.orders || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchParcels(); }, []);

  // Calculate earnings: 30 TK per delivered parcel
  const totalEarnings = useMemo(() => {
    return parcels.filter(p => p.status === "delivered").length * 30;
  }, [parcels]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Change this to your login route
  };

  const acceptOrder = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/rider/accept/${id}`, {}, headers);
      fetchParcels();
    } catch (err) { console.error(err); }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/rider/update-status/${id}`, { status }, headers);
      fetchParcels();
    } catch (err) { console.error(err); }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] gap-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-gray-500 animate-pulse font-medium">Loading deliveries...</p>
      </div>
    ); 
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Rider Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage and track your active delivery assignments</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="stats shadow bg-white border border-gray-100">
              <div className="stat py-2 px-4">
                <div className="stat-title text-[10px] font-bold uppercase">Total Tasks</div>
                <div className="stat-value text-xl text-primary">{parcels.length}</div>
              </div>
              <div className="stat py-2 px-4 border-l">
                <div className="stat-title text-[10px] font-bold uppercase flex items-center gap-1">
                  <Wallet size={12} /> Earnings
                </div>
                <div className="stat-value text-xl text-emerald-600">{totalEarnings} TK</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-ghost text-red-500 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {parcels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <Package size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No parcels found</h3>
            <p className="text-gray-500">Check back later for new delivery requests.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {parcels.map((parcel) => (
              <div key={parcel._id} className="card bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="card-body p-6">
                  {/* Status & ID Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tracking ID</span>
                      <p className="font-mono font-bold text-lg text-gray-800">#{parcel.trackingId}</p>
                    </div>
                    <span className={`badge badge-md py-3 px-4 font-bold border-none rounded-lg
                      ${parcel.status === "pending" ? "bg-amber-100 text-amber-700" : ""}
                      ${parcel.status === "accepted" ? "bg-blue-100 text-blue-700" : ""}
                      ${parcel.status === "picked" ? "bg-purple-100 text-purple-700" : ""}
                      ${parcel.status === "delivered" ? "bg-emerald-100 text-emerald-700" : ""}
                    `}>
                      {parcel.status}
                    </span>
                  </div>

                  <div className="divider my-0"></div>

                  {/* Delivery Route */}
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-gray-100 rounded-full"><MapPin size={16} className="text-gray-600" /></div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Pickup From</p>
                        <p className="font-semibold text-gray-800">{parcel.senderName}</p>
                        <p className="text-sm text-gray-500">{parcel.senderRegion}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-primary/10 rounded-full"><Navigation size={16} className="text-primary" /></div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Deliver To</p>
                        <p className="font-semibold text-gray-800">{parcel.receiverName}</p>
                        <p className="text-sm text-gray-500">{parcel.receiverRegion}</p>
                      </div>
                    </div>
                  </div>

                  <div className="divider my-0"></div>

                  {/* Weight & Cost Footer */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <Truck size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">{parcel.weight}kg</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} className="text-emerald-500" />
                        <span className="text-sm font-bold text-gray-800">${parcel.cost}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {parcel.status === "pending" && (
                        <button onClick={() => acceptOrder(parcel._id)} className="btn btn-primary btn-sm px-6 rounded-lg shadow-sm">
                          Accept Order
                        </button>
                      )}
                      {parcel.status === "accepted" && (
                        <button onClick={() => updateStatus(parcel._id, "picked")} className="btn btn-info btn-sm px-6 text-white rounded-lg shadow-sm">
                          Mark as Picked
                        </button>
                      )}
                      {parcel.status === "picked" && (
                        <button onClick={() => updateStatus(parcel._id, "delivered")} className="btn btn-success btn-sm px-6 text-white rounded-lg shadow-sm">
                          Mark Delivered
                        </button>
                      )}
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
};

export default RiderDashboard;
