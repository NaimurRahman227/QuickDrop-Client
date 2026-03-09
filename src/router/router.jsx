import { createBrowserRouter } from "react-router";
import Rootlayout from "../Layouts/Rootlayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import RiderRegister from "../Pages/Authentication/Register/RiderRegister";
import UserDashboard from "../dashboard/user/UserDashboard";
import RiderDashboard from "../dashboard/rider/RiderDashboard";
import TrackParcel from "../Pages/TrackParcel/TrackParcel";
import About from "../Pages/About";

// Admin
import AdminLayout from "../dashboard/admin/AdminLayout";
import Overview from "../dashboard/admin/pages/Overview";
import ManageUsers from "../dashboard/admin/pages/ManageUsers";
import ManageRiders from "../dashboard/admin/pages/ManageRiders";
import ParcelManagement from "../dashboard/admin/pages/ParcelManagement";
import PrivacyPolicy from "../Pages/PrivacyPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'coverage',
        element: <Coverage />
      },
      {
        path: 'sendParcel',
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        )
      }
    ]
  },

  {
    path: "/dashboard/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "users",
        element: <ManageUsers />,
      },
      {
        path: "riders",
        element: <ManageRiders />,
      },
      {
        path: "parcels",
        element: <ParcelManagement />,
      },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "Register",
        element: <Register />
      },
      {
        path: 'RiderRegister',
        element: <RiderRegister />
      }
    ]
  },

  {
    path: "/dashboard/user",
    element: <UserDashboard />,
  },
  {
    path: "/dashboard/rider",
    element: <RiderDashboard />,
  },

  {
    path: "/track",
    element: <TrackParcel />
  },
  {
    path:"/about",
    element:<About/>
  },
   {
    path:"/privacy-policy",
    element:<PrivacyPolicy/>
  }

]);

