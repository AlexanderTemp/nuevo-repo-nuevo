import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster richColors closeButton />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
