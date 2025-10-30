'use client'

import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { capitalize } from '../utils/utilidades'
import {
  obtenerReporteHistorial,
  useHistorialSolicitudes,
} from '../actions/hitorial-solicitud.action'
import { useThemeContext } from '../themes/ThemeRegistry'
import { imprimir } from '../utils/imprimir'
import {
  ColorCiudadania,
  IFiltroHistorial,
  inicialFiltroHistorial,
} from '../types/historial-solicitudes.types'

import { useAlertaProgreso } from '../hooks/useAlertaProgreso'
import Iconify from '../components/Iconify'
import { Icons } from '../types/icon.types'
import { AppBarWS } from './AppBarWS'
import { CardWS } from './CardWS'
import { toast } from 'sonner'

interface IProps {
  token: string
  inhabilitarAcceso: () => void
}

export const HistorialServicios = ({ token, inhabilitarAcceso }: IProps) => {
  const { cerrarProgreso, mostrarProgreso } = useAlertaProgreso(
    'key-alerta-progreso'
  )

  const { themeMode } = useThemeContext()
  const { current: ciudadaniaColor } = useRef<string>(
    ColorCiudadania[themeMode]
  )
  const [cargaReporte, setCargaReporte] = useState(false)
  const [filtro, setFiltro] = useState<IFiltroHistorial>(inicialFiltroHistorial)

  const {
    items,
    hasMore,
    itemsPorMes,
    loadMoreRef,
    cargando,
    actualizar,
    error,
  } = useHistorialSolicitudes({
    filtro,
    token,
  })

  const actualizarDatos = async () => {
    setFiltro(inicialFiltroHistorial)
    await actualizar()
  }

  const obtenerReporte = async () => {
    setCargaReporte(true)
    mostrarProgreso('Obteniendo reporte...')

    try {
      const dataReporte = await obtenerReporteHistorial({
        filtro,
        token,
      })
      const link = document.createElement('a')
      link.href = dataReporte.documento
      link.download = dataReporte.nombre || 'reporte.pdf'
      link.click()
    } catch (error) {
      imprimir(error)
      cerrarProgreso()

      toast.error('Error al obtener el reporte')
      inhabilitarAcceso()
    } finally {
      cerrarProgreso()
      setCargaReporte(false)
    }
  }

  useEffect(() => {
    imprimir(error)
    if (error) inhabilitarAcceso()
  }, [error])

  return (
    <Box minHeight="100dvh" sx={{ bgcolor: ColorCiudadania.light }}>
      <pre>{token}</pre>
      <Box px={2} py={4}>
        <Typography variant="h4" fontWeight="600" color="white">
          Historial de accesos a mis datos
        </Typography>
      </Box>
      <Box
        px={{ xs: 2, md: 6 }}
        py={2}
        borderRadius="24px"
        bgcolor="background.paper"
      >
        <AppBarWS
          datosVacios={items.length == 0}
          cargandoDatos={cargando}
          token={token}
          actualizar={actualizarDatos}
          filtros={filtro}
          setFiltros={(filtros: any) => setFiltro(filtros)}
          cargandoReporte={cargaReporte}
          obtenerReporte={obtenerReporte}
        />
        <Stack width="100%" height="100%" minHeight="75dvh">
          {itemsPorMes.map((elem, index) => (
            <Stack
              key={`datos-mensuales-reservados-${index}`}
              gap={3}
              marginTop={2}
            >
              <Typography variant="h5" color={ciudadaniaColor}>
                {capitalize(elem.mes)}
              </Typography>
              <Grid container spacing={3}>
                {elem.solicitudes.map((elem2, index2) => (
                  <Grid key={index2}>
                    <CardWS {...elem2} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          ))}
          {hasMore && !cargando && (
            <>
              <Stack justifyContent="center" alignItems="center" marginY={5}>
                {cargando ? (
                  <CircularProgress />
                ) : (
                  <Typography>Desplázate para cargar más.</Typography>
                )}
              </Stack>
              <Box height={30} />

              <div ref={loadMoreRef} />
            </>
          )}
          {!cargando && !hasMore && itemsPorMes.length == 0 && (
            <Stack
              height="70dvh"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              gap={2}
            >
              <Iconify icon={Icons.EMPTY} width={120} color={ciudadaniaColor} />
              <Typography>
                Aún no hay solicitudes de acceso a tu información
              </Typography>
            </Stack>
          )}
          {!cargando && !hasMore && itemsPorMes.length > 0 && (
            <Stack alignItems="center" marginY={4}>
              <Typography>Has llegado al final de los registros</Typography>
            </Stack>
          )}
        </Stack>
      </Box>
      <Box height={20} />
    </Box>
  )
}
