import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router/router.jsx'
import { RouterProvider } from "react-router-dom"
import AuthProvider from './Context/AuthContext/AuthProvider.jsx'
import Aos from 'aos'
import 'aos/dist/aos.css'

Aos.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-in-out'
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
)
