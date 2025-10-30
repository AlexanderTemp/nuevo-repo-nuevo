import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HistorialServicios } from './modules/HistorialServicios'

function App() {
  const [searchParams] = useSearchParams()
  // const [cargando, setCargando] = useState(false)
  // const [acceso, setAcceso] = useState(false)
  // const [tokenLocal, setTokenLocal] = useState<string>('')

  const token = searchParams.get('t')

  // const validarSesionMovil = async () => {
  //   try {
  //     setCargando(true)
  //     if (!token || !verificarToken(token)) {
  //       setAcceso(false)
  //       return
  //     }

  //     const res = await obtenerAccesoTokenMovil(token)
  //     await delay(300)

  //     if (res.fallido) {
  //       setAcceso(false)
  //       return
  //     }

  //     if (res.token) {
  //       imprimir(`Token ✅: ${res.token}`)
  //       setTokenLocal(res.token)
  //     }
  //   } catch (error) {
  //     imprimir('Error', error)
  //     setAcceso(false)
  //   } finally {
  //     setCargando(false)
  //   }
  // }

  useEffect(() => {
    // validarSesionMovil()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* {cargando && (
        <Stack
          minHeight="70dvh"
          justifyContent="center"
          alignItems="center"
          zIndex={99999}
        >
          <Stack direction="row" alignItems="center" gap={2}>
            <CircularProgress />
            <Typography>Ingresando con ciudadanía...</Typography>
          </Stack>
        </Stack>
      )}

      {!cargando && !acceso && (
        <Alert variant="outlined" severity="error" sx={{ m: 2, p: 2 }}>
          No cuenta con la autorización para el servicio solicitado
        </Alert>
      )} */}

      {/* {!cargando && acceso && ( */}
      <pre
        style={{ background: '#f5f5f5', padding: '10px', borderRadius: '6px' }}
      >
        {window.location.href}
      </pre>
      <HistorialServicios
        inhabilitarAcceso={() => {}}
        // token={tokenLocal}
        token={token ?? ''}
      />
      {/* )} */}
    </>
  )
}

export default App
