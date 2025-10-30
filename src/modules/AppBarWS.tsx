'use client'

import { IconoTooltip } from '../components/botones/IconoTooltip'
import { Icono } from '../components/Icono'
import { crearArrayAnios, obtenerMesesDisponibles } from '../utils/utilidades'
import { Box, Collapse, Grid, Stack, Typography, useTheme } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useFiltroHistorial } from '../actions/hitorial-solicitud.action'
import { useThemeContext } from '../themes/ThemeRegistry'
import {
  ColorCiudadania,
  IFiltroHistorial,
  inicialFiltroHistorial,
} from '../types/historial-solicitudes.types'

interface Props {
  token: string
  cargandoDatos: boolean
  actualizar: () => Promise<any>
  filtros: IFiltroHistorial
  setFiltros: (filtro: IFiltroHistorial) => void
  obtenerReporte: () => void
  datosVacios: boolean

  cargandoReporte: boolean
}
const MIN_YEAR = 2020

const aniosArray = crearArrayAnios(MIN_YEAR) || []

export const AppBarWS = ({
  actualizar,
  cargandoDatos,
  setFiltros,
  datosVacios,
  filtros,
  obtenerReporte,
  token,
  cargandoReporte,
}: Props) => {
  const { palette } = useTheme()
  const { cargando, error, entidades } = useFiltroHistorial(token)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { themeMode } = useThemeContext()
  const { current: ciudadaniaColor } = useRef<string>(
    ColorCiudadania[themeMode]
  )

  const { control, watch, reset } = useForm<IFiltroHistorial>({
    defaultValues: {
      entidadSolicitante: '',
      entidadFuente: '',
      mes: ``,
      anio: filtros.anio,
    },
  })

  const mes = watch('mes')
  const anio = watch('anio')
  const entidadSolicitante = watch('entidadSolicitante')
  const entidadFuente = watch('entidadFuente')

  const [meses, setMeses] = useState<string[]>([])

  const opcionesEntidadFuente = entidades?.fuente?.filas.map(
    (entidad, index) => ({
      key: `key-entidades-fuente-${entidad?.entidadPublicadoraGobBo?.toString()}-${index}`,
      value: entidad?.entidadPublicadoraGobBo
        ? entidad?.entidadPublicadoraGobBo?.toString()
        : '',
      label: `${entidad?.entidadPublicadoraSigla} - ${entidad?.entidadPublicadoraNombre}`,
    })
  )

  const opcionesEntidadSolicitante = entidades?.solicitante?.filas.map(
    (entidad, index) => ({
      key: `key-entidades-solicitante-${entidad?.entidadConsumidoraGobBo?.toString()}-${index}`,
      value: entidad?.entidadConsumidoraGobBo
        ? entidad?.entidadConsumidoraGobBo?.toString()
        : '',
      label: `${entidad?.entidadConsumidoraSigla} - ${entidad?.entidadConsumidoraNombre}`,
    })
  )

  useEffect(() => {
    // eslint-disable-next-line
    const key = anio ? Number(anio) : dayjs().year() - 1
    const mesesActual = obtenerMesesDisponibles(key)
    setMeses(mesesActual)
  }, [anio])

  const cambioFiltros = (filtro: Partial<IFiltroHistorial>) => {
    setFiltros({
      ...filtros,
      ...filtro,
    })
  }

  useEffect(() => {
    if (entidadFuente?.length == 0) cambioFiltros({ entidadFuente })
    if (entidadSolicitante?.length == 0) cambioFiltros({ entidadSolicitante })
    cambioFiltros({ mes, anio })
  }, [entidadFuente, entidadSolicitante, mes, anio])

  const limpiezaEnFiltros = () => {
    reset()
    cambioFiltros(inicialFiltroHistorial)
  }

  useEffect(() => {
    if (!isFilterOpen) limpiezaEnFiltros()
  }, [isFilterOpen])

  return (
    <>
      <Stack flexDirection="row" justifyContent="space-between">
        <IconoTooltip
          id={`refresh`}
          name={`refresh`}
          titulo={'Actualizar'}
          desactivado={cargandoDatos}
          icono={<Icono sx={{ color: ciudadaniaColor }}>restart_alt</Icono>}
          accion={async () => {
            limpiezaEnFiltros()
            await actualizar()
          }}
        />
        <Box>
          <IconoTooltip
            id={`download`}
            name={`download`}
            titulo={'Descargar'}
            desactivado={datosVacios || cargandoReporte}
            icono={
              <Icono
                sx={{
                  color:
                    datosVacios || cargandoReporte
                      ? palette.action.disabled
                      : ciudadaniaColor,
                }}
              >
                file_download
              </Icono>
            }
            accion={obtenerReporte}
          />
          <IconoTooltip
            id={`filter`}
            name={`filter`}
            titulo={'Filtrar'}
            desactivado={cargandoDatos}
            icono={
              <Icono sx={{ color: ciudadaniaColor }}>
                {isFilterOpen ? 'filter_list_off' : 'filter_list'}
              </Icono>
            }
            accion={() => {
              setIsFilterOpen(!isFilterOpen)
            }}
          />
        </Box>
      </Stack>
    </>
  )
}
