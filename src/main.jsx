import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Routes.jsx'
import AuthProvider from '../Context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartProvider from '../Context/CartProvider.jsx'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <CartProvider>
    
      
    <RouterProvider router={router}></RouterProvider>
    <Toaster />
    </CartProvider>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
