import { useEffect } from 'react'
import { Constantes } from './config/Constantes'
import { CircularProgress, Stack } from '@mui/material'
import { delay } from './utils/utilidades'
import { useLocation } from 'react-router-dom'

function App2() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      const redireccion = async () => {
        await delay(300)
        window.location.href = `${Constantes.baseUrl}/ciudadania-auth`
      }
      redireccion().finally()
    }
  }, [location.pathname])

  return (
    <>
      <Stack minHeight="100dvh" justifyContent="center" alignItems="center">
        <Stack gap={2} alignItems="center">
          <CircularProgress />
          Ingresando con ciudadanía digital...
        </Stack>
      </Stack>
    </>
  )
}

export default App2
