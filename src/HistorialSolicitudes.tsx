import { useEffect, useState } from 'react'
import { HistorialServicios } from './modules/HistorialServicios'
import { leerCookie } from './utils/cookies'

const HistorialSolicitudes = () => {
  const [tokenNuevo, setTokenNuevo] = useState<string>('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const cargarToken = () => {
      const tokenTemporal = leerCookie('token')
      setTokenNuevo(tokenTemporal || '')
      setCargando(false)
    }

    cargarToken()
  }, [])

  if (cargando) return <>Cargando</>

  return (
    <HistorialServicios
      inhabilitarAcceso={() => {}}
      // token={tokenLocal}
      token={tokenNuevo ?? ''}
    />
  )
}

export default HistorialSolicitudes
