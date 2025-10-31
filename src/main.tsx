import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import React from 'react'
import router from './routes/index.tsx'
import ThemeRegistry from './themes/ThemeRegistry.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeRegistry>
      <RouterProvider router={router} />
      <Toaster richColors closeButton />
    </ThemeRegistry>
  </React.StrictMode>
)
