import React , { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/adminAPI";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    getUsers()
      .then((res) => {
        const onlyUsers = res.data.filter((u) => u.role === "user");
        setUsers(onlyUsers);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.name || ""} ${user.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const monthlyUsers = {};

  users.forEach((user) => {
    const date = new Date(user.createdAt);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthlyUsers[month]) monthlyUsers[month] = 0;
    monthlyUsers[month]++;
  });

  const chartData = Object.keys(monthlyUsers).map((month) => ({
    month,
    users: monthlyUsers[month],
  }));

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-3xl font-bold">Manage Users</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="border p-2 rounded w-full md:w-96"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-4">Monthly User Registrations</h2>

        <ResponsiveContainer width="100%" height={260}>

          <BarChart data={chartData}>

            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.7} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="users"
              fill="url(#colorUsers)"
              radius={[8, 8, 0, 0]}
              barSize={80}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

        </table>

        <div className="max-h-100 overflow-y-auto">

          <table className="w-full">

            <tbody>

              {filteredUsers.map((user) => (

                <React.Fragment key={user._id}>   

                  <tr className="border-t hover:bg-gray-50">  
                    <td className="p-3 font-medium">{user.name}</td>

                    <td className="p-3">{user.email}</td>

                    <td className="p-3 space-x-2">

                      <button
                        onClick={() =>
                          setExpandedUser(
                            expandedUser === user._id ? null : user._id
                          )
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                  {expandedUser === user._id && (

                    <tr className="bg-gray-50">

                      <td colSpan="3" className="p-4">

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                          <div>
                            <p className="text-sm text-gray-500">User ID</p>
                            <p className="font-medium">{user._id}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{user.email}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="font-medium">{user.role}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Created</p>
                            <p className="font-medium">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                        </div>

                      </td>

                    </tr>

                  )}

                </React.Fragment>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ManageUsers;