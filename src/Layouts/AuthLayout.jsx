import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthImage from '/src/assets/authImage.png'
import QuickDropLogo from '../Pages/Home/Home/Shared/Navbar/QuickDropLogo/QuickDropLogo'

const AuthLayout = () => {
  return (
    <div className="min-h-190 bg-base-200 flex flex-col">

      {/* LOGO */}
      <div className="px-4 pt-4 md:px-8 md:pt-6">
        <QuickDropLogo />
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 flex justify-center px-4 mt-2">

        <div
          className="
            flex flex-col md:flex-row   /* stack only on small */
            items-center md:items-start
            gap-2 md:gap-6 lg:gap-20
            w-full max-w-5xl
          "
        >

          {/* FORM */}
          <div className="w-full max-w-md order-2 md:ms-30 md:order-1">
            <Outlet />
          </div>

          {/* IMAGE */}
          <div className="flex justify-center md:justify-end order-1 md:order-2 md:ml-6 lg:ml-16">
            <img
              src={AuthImage}
              alt="Auth"
              className="
                w-44        /* small smaller */
                md:w-64
                lg:w-96
                object-contain
              "
            />
          </div>

        </div>

      </div>
    </div>
  )
}

export default AuthLayout
