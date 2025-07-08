import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "aos/dist/aos.css";
import { RouterProvider } from 'react-router'
import router from './Router/Routes.jsx'
import 'leaflet/dist/leaflet.css';
import AuthProvider from './Provider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
    </AuthProvider>
  </StrictMode>,
)
