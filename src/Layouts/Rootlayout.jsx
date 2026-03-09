import React, { useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom";
import Navbar from '../Pages/Home/Home/Shared/Navbar/Navbar';
import Footer from '../Pages/Home/Home/Shared/Navbar/Footer/Footer';
import AOS from "aos";

const Rootlayout = () => {

  const location = useLocation();

  useEffect(() => {
    AOS.refreshHard();   // re-scan DOM after route change
  }, [location]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Rootlayout;

