import React from 'react'
import { NavLink } from 'react-router-dom'
import QuickDropLogo from './QuickDropLogo/QuickDropLogo'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const goToDashboard = () => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/dashboard/admin");
    } else if (user.role === "rider") {
      navigate("/dashboard/rider");
    } else {
      navigate("/dashboard/user");
    }
  };

  const navItems = (
    <>
      <li className='card-hover'><NavLink to='/'>Home</NavLink></li>
      <li className='card-hover'><NavLink to='/sendParcel'>Send Parcel</NavLink></li>
      <li className='card-hover'><NavLink to='/track'>Track Parcel</NavLink></li>
      <li className='card-hover'><NavLink to='/RiderRegister'>Be a Rider</NavLink></li>
      <li className='card-hover'><NavLink to='/coverage'>Coverage</NavLink></li>
      <li className='card-hover'><NavLink to='/about'>About Us</NavLink></li>
    </>
  )

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 md:px-4">

      {/* LEFT */}
      <div className="navbar-start">

        {/* MENU DROPDOWN */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>

        {/* LOGO */}
        <NavLink to="/" className="ml-2 text-xl">
          <QuickDropLogo />
        </NavLink>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2">

        {/* DESKTOP BUTTONS */}
        <div className="hidden lg:flex gap-3">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline btn-accent card-hover">
                Log In
              </Link>

              <Link to='/Register' className="btn bg-white text-black border-[#e5e5e5] hover:bg-base-300 gap-2 card-hover">
                <svg width="16" height="16" viewBox="0 0 512 512">
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                </svg>
                New User
              </Link>
            </>
          ) : (
            <>
              <button onClick={goToDashboard} className="btn btn-success card-hover">
                Dashboard
              </button>

              <button onClick={handleLogout} className="btn btn-error card-hover">
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE USER DROPDOWN */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">

            {/* USER ICON */}
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.5 20.25a8.25 8.25 0 0115 0" />
            </svg>

          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-3 shadow gap-3"
          >
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline btn-accent card-hover">
                  Log In
                </Link>

                <li>
                  <Link to='/Register' className="btn bg-white text-black border-[#e5e5e5] hover:bg-base-300 w-full gap-2 card-hover">
                    <svg width="16" height="16" viewBox="0 0 512 512">
                      <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                      <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                      <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                      <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                    </svg>
                    Create Account
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={goToDashboard} className="btn btn-success w-full card-hover">
                    Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-error w-full card-hover">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar
