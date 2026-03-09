import { useEffect, useState } from "react";
import {
  getRiders,
  approveRider,
  rejectRider,
  deleteUser
} from "../services/adminAPI";

import {
  Eye,
  CheckCircle,
  XCircle,
  Trash2
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

const ManageRiders = () => {
  const [riders, setRiders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  const loadRiders = async () => {
    const res = await getRiders();
    setRiders(res.data);
  };

  useEffect(() => {
    loadRiders();
  }, []);

  const handleApprove = async (id) => {
    await approveRider(id);
    loadRiders();
  };

  const handleReject = async (id) => {
    await rejectRider(id);
    loadRiders();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadRiders();
  };

  const filteredRiders = riders.filter((r) =>
    `${r.name || ""} ${r.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const approved = riders.filter((r) => r.status === "active").length;
  const pending = riders.filter((r) => r.status !== "active").length;

  const pieData = [
    { name: "Approved", value: approved },
    { name: "Pending", value: pending }
  ];

  const COLORS = ["#22c55e", "#f59e0b"];

  const monthly = {};

  riders.forEach((rider) => {
    const date = new Date(rider.createdAt);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthly[month]) monthly[month] = 0;
    monthly[month]++;
  });

  const monthlyData = Object.keys(monthly).map((month) => ({
    month,
    riders: monthly[month]
  }));

  const getStatusBadge = (status) => {
    if (status === "active")
      return (
        <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
          Approved
        </span>
      );

    if (status === "rejected")
      return (
        <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full">
          Rejected
        </span>
      );

    return (
      <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
        Pending
      </span>
    );
  };

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-3xl font-bold">Rider Management</h1>

      <input
        type="text"
        placeholder="Search rider by name or email..."
        className="border p-2 rounded w-full md:w-96"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white shadow-lg rounded-xl p-6">

          <h2 className="font-semibold mb-4">
            Rider Status Overview
          </h2>

          <ResponsiveContainer width="100%" height={250}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">

          <h2 className="font-semibold mb-4">
            Monthly Rider Registrations
          </h2>

          <ResponsiveContainer width="100%" height={250}>

            <BarChart data={monthlyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="riders"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
                barSize={80}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* RIDERS TABLE */}

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">

        <div className="grid grid-cols-4 bg-gray-100 text-gray-600 font-semibold p-4">
          <span>Rider</span>
          <span>Vehicle</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* SCROLL CONTAINER */}

        <div className="max-h-100 overflow-y-auto">

          {filteredRiders.map((rider) => (

            <div key={rider._id} className="border-t">

              <div className="grid grid-cols-4 items-center p-4 hover:bg-gray-50 transition">

                <div className="flex flex-col">
                  <span className="font-semibold">{rider.name}</span>
                  <span className="text-sm text-gray-500">{rider.email}</span>
                </div>

                <span className="font-medium">{rider.vehicleType}</span>

                <div>{getStatusBadge(rider.status)}</div>

                <div className="flex justify-end gap-3">

                  <button
                    onClick={() =>
                      setExpanded(expanded === rider._id ? null : rider._id)
                    }
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => handleApprove(rider._id)}
                    className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700"
                  >
                    <CheckCircle size={18} />
                  </button>

                  <button
                    onClick={() => handleReject(rider._id)}
                    className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                  >
                    <XCircle size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

              {expanded === rider._id && (

                <div className="bg-gray-50 p-6 border-t">

                  <div className="grid md:grid-cols-3 gap-6 text-sm">

                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium">{rider.phone}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">NID</p>
                      <p className="font-medium">{rider.NIDCardNumber}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">Vehicle Number</p>
                      <p className="font-medium">{rider.vehicleNumber}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">City</p>
                      <p className="font-medium">{rider.city}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">Address</p>
                      <p className="font-medium">{rider.address}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">Joined</p>
                      <p className="font-medium">
                        {new Date(rider.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                  </div>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default ManageRiders;