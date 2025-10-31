import { createBrowserRouter } from 'react-router-dom'
import App2 from '../App2'
import LoginCiudadania from '../LoginCiudadania'
import HistorialSolicitudes from '../HistorialSolicitudes'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <App2 /> },
      { path: 'login-ciudadania', element: <LoginCiudadania /> },
      { path: 'historial-solicitudes', element: <HistorialSolicitudes /> },
    ],
  },
])

export default router
