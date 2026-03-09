import React from 'react'
import QuickDropLogo from '../QuickDropLogo/QuickDropLogo'
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content px-10 pt-10 pb-8">

      {/* Logo + Company Info */}
      <aside>
        <QuickDropLogo />
        <p className="font-bold">
          Naimur's SoftTech Ltd.
          <br />
          Providing reliable tech since 2026
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>

      <div className="w-full border-y border-dashed border-neutral-content/40 py-4 my-4">
        <ul className="
          flex flex-col sm:flex-row 
          flex-wrap 
          items-center 
          justify-center 
          gap-3 sm:gap-6 md:gap-8 
          text-sm sm:text-base md:text-lg 
          font-medium
        ">
          <li>
            <Link
              to="/privacy-policy"
              className="hover:text-primary transition cursor-pointer card-hover"
            >
              Privacy Policy
            </Link>
          </li>

          <li>
            <Link
              to="/coverage"
              className="hover:text-primary transition cursor-pointer card-hover"
            >
              Coverage
            </Link>
          </li>

          <li>
            <a className="hover:text-primary transition cursor-pointer card-hover">
              Blog
            </a>
          </li>

          <li>
            <Link
              to="/about"
              className="hover:text-primary transition cursor-pointer card-hover"
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>


      {/* Social Icons */}
      <nav>
        <div className="grid grid-flow-col gap-8">

          {/* Instagram */}
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition card-hover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0120 7.75v8.5A3.75 3.75 0 0116.25 20h-8.5A3.75 3.75 0 014 16.25v-8.5A3.75 3.75 0 017.75 4zm8.75 1.5a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition card-hover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com/@yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition card-hover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition card-hover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>

        </div>
      </nav>


    </footer>
  )
}

export default Footer
