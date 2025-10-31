import { Box, CircularProgress, Typography, Button, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { delay } from './utils/utilidades'
import { imprimir } from './utils/imprimir'
import { toast } from 'sonner'
import { InterpreteMensajes } from './utils/mensajes'
import { guardarCookie } from './utils/cookies'
import { Constantes } from './config/Constantes'
import { Servicios } from './services'
import { useNavigate, useSearchParams } from 'react-router-dom'

const LoginCiudadania = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [error, setError] = useState(false)
  const [mensajeError, setMensajeError] = useState('')

  const autorizarCiudadania = async (parametros: Record<string, string>) => {
    try {
      const respuesta = await Servicios.get({
        url: `${Constantes.baseUrl}/ciudadania-autorizar`,
        body: {},
        params: parametros,
        headers: { accept: 'application/json' },
      })

      if (!respuesta?.access_token) {
        throw new Error('No se recibió un token válido')
      }

      imprimir('Sesión Autorizada', respuesta)
      guardarCookie('token', respuesta.access_token)

      await delay(500)
      navigate('/historial-solicitudes')
    } catch (e) {
      imprimir('Error al autorizar sesión', e)
      const mensaje = InterpreteMensajes(e)
      toast.error(mensaje)
      setMensajeError(mensaje)
      setError(true)
    }
  }

  const validar = async () => {
    const parametros = Object.fromEntries(searchParams.entries())
    imprimir(`parámetros:`, parametros)

    if (Object.keys(parametros).length === 0 || searchParams.has('error')) {
      navigate('/login-ciudadania', { replace: true })
      return
    }

    await autorizarCiudadania(parametros)
  }

  useEffect(() => {
    validar().finally(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={3}
      >
        <Card>
          <Typography variant="h5" gutterBottom>
            Error de Autenticación
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {mensajeError ||
              'Ha ocurrido un error al intentar autenticar tu sesión. Por favor, intenta nuevamente.'}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/login-ciudadania')}
          >
            Volver a intentar
          </Button>
        </Card>
      </Box>
    )
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={3}
    >
      <Card>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Autenticando
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Por favor espera mientras verificamos tu identidad...
        </Typography>
      </Card>
    </Box>
  )
}

export default LoginCiudadania
