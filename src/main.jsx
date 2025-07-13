import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "aos/dist/aos.css";
import { RouterProvider } from 'react-router'
import router from './Router/Routes.jsx'
import 'leaflet/dist/leaflet.css';
import AuthProvider from './Provider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.Vite_Strip_key);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
<Elements stripe={stripePromise}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
    </AuthProvider>
    </QueryClientProvider>
    </Elements>
    
  </StrictMode>,
)
