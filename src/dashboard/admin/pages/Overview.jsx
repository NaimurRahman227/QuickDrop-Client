import { useEffect, useState } from "react";
import { getUsers, getRiders, getOrders } from "../services/adminAPI.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Users, Bike, Package, Clock, CheckCircle, Banknote, Download, ArrowDown } from "lucide-react";

const Overview = () => {
  const [users, setUsers] = useState([]);
  const [riders, setRiders] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
    getRiders().then((res) => setRiders(res.data));
    getOrders().then((res) => setOrders(res.data));
  }, []);

  const downloadReport = () => {
    if (orders.length === 0) return alert("No data to export");
    const headers = ["Tracking ID", "Sender", "Receiver", "Status", "Cost", "Date"];
    const rows = orders.map(o => [o.trackingId, o.senderName, o.receiverName, o.status, o.cost, new Date(o.createdAt).toLocaleDateString()]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `report_${new Date().getTime()}.csv`);
    link.click();
  };

  const pendingParcels = orders.filter((o) => o.status === "pending").length;
  const deliveredParcels = orders.filter((o) => o.status === "delivered").length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.cost || 0), 0);

  const monthlyData = {};
  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    parcels: monthlyData[month],
  }));

  const recentParcels = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Riders", value: riders.length, icon: Bike, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Parcels", value: orders.length, icon: Package, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Pending", value: pendingParcels, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Delivered", value: deliveredParcels, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Revenue", value: `৳${totalRevenue}`, icon: Banknote, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    /* MAIN WRAPPER */
    <div className="h-screen overflow-y-auto bg-gray-50 font-sans scroll-smooth">
      
      {/* STICKY HEADER: Stays at the top of THIS scrollable container */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Live System Metrics</p>
        </div>
        <button 
          onClick={downloadReport}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-black hover:bg-indigo-700 transition-all shadow-md active:scale-95"
        >
          <Download size={18} />
          DOWNLOAD REPORT
        </button>
      </header>

      <div className="p-8 space-y-10 max-w-400 mx-auto pb-20">
        
        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-5`}>
                <stat.icon size={24} />
              </div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
              <p className="text-xl font-black text-gray-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* CHART SECTION */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xl font-black text-gray-800 tracking-tight">Delivery Performance</h2>
              <p className="text-sm text-gray-400 font-medium">Order volume distributed by month</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Orders</span>
            </div>
          </div>
          <div className="h-100 w-full">
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 16, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 16, fontWeight: 700}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '16px' }}
                />
                <Bar dataKey="parcels" fill="#4f46e5" radius={[12, 12, 0, 0]} barSize={65} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT SHIPMENTS TABLE */}
        <div id="shipments-section" className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-black text-gray-800">Recent Shipments</h2>
            <button 
               onClick={() => document.getElementById('shipments-section').scrollIntoView({ behavior: 'smooth' })}
               className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full uppercase tracking-wider hover:bg-indigo-100 transition-colors"
            >
               Live Updates
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-10 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Tracking ID</th>
                  <th className="px-10 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Sender</th>
                  <th className="px-10 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Receiver</th>
                  <th className="px-10 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-10 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentParcels.map((parcel) => (
                  <tr key={parcel._id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-10 py-6 text-sm font-black text-gray-900">{parcel.trackingId}</td>
                    <td className="px-10 py-6 text-sm text-gray-600 font-bold">{parcel.senderName}</td>
                    <td className="px-10 py-6 text-sm text-gray-600 font-bold">{parcel.receiverName}</td>
                    <td className="px-10 py-6 text-center">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        parcel.status === "pending" 
                        ? "bg-amber-100 text-amber-700 ring-1 ring-amber-200" 
                        : "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
                      }`}>
                        {parcel.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right text-sm font-black text-indigo-600">
                      ৳ {parcel.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-center">
            <button 
              onClick={() => alert("Already showing all available recent data.")}
              className="group flex items-center gap-3 text-gray-400 text-xs font-black uppercase tracking-widest hover:text-indigo-600 transition-all"
            >
              END OF RECENT ACTIVITY
              <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
