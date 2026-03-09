import { useEffect, useState } from "react";
import { getOrders } from "../services/adminAPI";
import { Eye, Search } from "lucide-react";

const ParcelManagement = () => {

  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");

  const loadOrders = async () => {
    try {
      const res = await getOrders();

      // show latest parcels first
      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(sortedOrders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Filter orders by tracking ID
  const filteredOrders = orders.filter((order) =>
    (order.trackingId || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 📊 Parcel statistics
  const totalParcels = orders.length;
  const pendingParcels = orders.filter(o => o.status === "pending").length;
  const deliveredParcels = orders.filter(o => o.status === "delivered").length;

  const getStatusBadge = (status) => {

    if (status === "delivered") {
      return (
        <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
          Delivered
        </span>
      );
    }

    if (status === "accepted") {
      return (
        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
          Accepted
        </span>
      );
    }

    if (status === "picked") {
      return (
        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
          Picked
        </span>
      );
    }

    return (
      <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
        Pending
      </span>
    );
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Parcel Management
      </h1>

      {/* 📊 PARCEL STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Total Parcels</p>
          <p className="text-2xl font-bold">{totalParcels}</p>
        </div>

        <div className="bg-yellow-50 shadow rounded-lg p-4">
          <p className="text-yellow-700 text-sm">Pending Parcels</p>
          <p className="text-2xl font-bold">{pendingParcels}</p>
        </div>

        <div className="bg-green-50 shadow rounded-lg p-4">
          <p className="text-green-700 text-sm">Delivered Parcels</p>
          <p className="text-2xl font-bold">{deliveredParcels}</p>
        </div>

      </div>

      {/* 🔎 SEARCH BAR */}

      <div className="mb-6 relative max-w-md">

        <Search className="absolute left-3 top-3 text-gray-400" size={18} />

        <input
          type="text"
          placeholder="Search by Tracking ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

        {/* HEADER */}

        <div className="grid grid-cols-2 sm:grid-cols-6 bg-gray-100 p-4 text-gray-600 font-semibold">

          <span>Tracking</span>

          <span className="hidden sm:block">Parcel</span>
          <span className="hidden sm:block">Sender</span>
          <span className="hidden sm:block">Receiver</span>
          <span className="hidden sm:block">Status</span>

          <span className="text-right">Details</span>

        </div>

        {/* SCROLLABLE ROWS */}

        <div className="max-h-167.5 overflow-y-auto">

          {filteredOrders.map((order) => (

            <div key={order._id} className="border-t">

              {/* MAIN ROW */}

              <div className="grid grid-cols-2 sm:grid-cols-6 items-center p-4 hover:bg-gray-50">

                <span className="font-semibold text-blue-600">
                  {order.trackingId}
                </span>

                <span className="hidden sm:block font-medium">
                  {order.title}
                </span>

                <span className="hidden sm:block">
                  {order.senderName}
                  <p className="text-xs text-gray-500">
                    {order.senderRegion}
                  </p>
                </span>

                <span className="hidden sm:block">
                  {order.receiverName}
                  <p className="text-xs text-gray-500">
                    {order.receiverRegion}
                  </p>
                </span>

                <span className="hidden sm:block">
                  {getStatusBadge(order.status)}
                </span>

                <div className="flex justify-end">

                  <button
                    onClick={() =>
                      setExpanded(expanded === order._id ? null : order._id)
                    }
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Eye size={18} />
                  </button>

                </div>

              </div>

              {/* DETAILS */}

              {expanded === order._id && (

                <div className="bg-gray-50 p-6 border-t">

                  <div className="grid md:grid-cols-3 gap-6 text-sm">

                    <div>
                      <p className="text-gray-500">Sender Contact</p>
                      <p className="font-medium">
                        {order.senderContact}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Receiver Contact</p>
                      <p className="font-medium">
                        {order.receiverContact}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Parcel Type</p>
                      <p className="font-medium">
                        {order.type}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Weight</p>
                      <p className="font-medium">
                        {order.weight} kg
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Cost</p>
                      <p className="font-medium">
                        ৳ {order.cost}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Created</p>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Pickup Address</p>
                      <p className="font-medium">
                        {order.senderAddress}, {order.senderCenter}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Delivery Address</p>
                      <p className="font-medium">
                        {order.receiverAddress}, {order.receiverCenter}
                      </p>
                    </div>

                  </div>

                </div>

              )}

            </div>

          ))}

          {filteredOrders.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No parcels found
            </div>
          )}

        </div>

      </div>

    </div>

  );
};

export default ParcelManagement;