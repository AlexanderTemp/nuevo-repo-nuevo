'use client'

import { IconoTooltip } from '../components/botones/IconoTooltip'
import { Icono } from '../components/Icono'
import { crearArrayAnios, obtenerMesesDisponibles } from '../utils/utilidades'
import { Box, Collapse, Grid, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useThemeContext } from '../themes/ThemeRegistry'
import {
  ColorCiudadania,
  IFiltroHistorial,
  inicialFiltroHistorial,
} from '../types/historial-solicitudes.types'
import { FormInputDropdown } from '../components/form'

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
  filtros,
}: Props) => {
  // const { palette } = useTheme()
  // const { cargando, error, entidades } = useFiltroHistorial(token)
  const [isFilterOpen] = useState(false)
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

  // const opcionesEntidadFuente = entidades?.fuente?.filas.map(
  //   (entidad, index) => ({
  //     key: `key-entidades-fuente-${entidad?.entidadPublicadoraGobBo?.toString()}-${index}`,
  //     value: entidad?.entidadPublicadoraGobBo
  //       ? entidad?.entidadPublicadoraGobBo?.toString()
  //       : '',
  //     label: `${entidad?.entidadPublicadoraSigla} - ${entidad?.entidadPublicadoraNombre}`,
  //   })
  // )

  // const opcionesEntidadSolicitante = entidades?.solicitante?.filas.map(
  //   (entidad, index) => ({
  //     key: `key-entidades-solicitante-${entidad?.entidadConsumidoraGobBo?.toString()}-${index}`,
  //     value: entidad?.entidadConsumidoraGobBo
  //       ? entidad?.entidadConsumidoraGobBo?.toString()
  //       : '',
  //     label: `${entidad?.entidadConsumidoraSigla} - ${entidad?.entidadConsumidoraNombre}`,
  //   })
  // )

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
          {/* <IconoTooltip
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
          /> */}
          {/* <IconoTooltip
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
          /> */}
        </Box>
      </Stack>
      <Collapse in={isFilterOpen} timeout={300} unmountOnExit>
        <Grid container sx={{}} spacing={2} mt={1}>
          {/* {error && (
            <Grid size={12}>
              <Typography>Ocurrió un error al obtener los filtros.</Typography>
            </Grid>
          )} */}
          {/* <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <FormInputAutocomplete
              id={'entidadSolicitante'}
              name={'entidadSolicitante'}
              control={control}
              label={'Entidad solicitante'}
              size="small"
              options={opcionesEntidadSolicitante}
              onChange={(elem: any) =>
                cambioFiltros({ entidadSolicitante: elem?.value ?? '' })
              }
              disabled={cargando}
              renderOption={(option) => <>{option.label}</>}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => {
                if (!option || !value) return option === value
                return option.value === (value?.value || value)
              }}
              clearable
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <FormInputAutocomplete
              id={'entidadFuente'}
              name={'entidadFuente'}
              control={control}
              label={'Entidad fuente de información'}
              size={'small'}
              onChange={(elem: any) =>
                cambioFiltros({ entidadFuente: elem?.value ?? '' })
              }
              options={opcionesEntidadFuente}
              disabled={cargando}
              renderOption={(option) => <>{option.label}</>}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => {
                if (!option || !value) return option === value
                return option.value === (value?.value || value)
              }}
              clearable
            />
          </Grid> */}

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormInputDropdown
              id={'mes'}
              name={'mes'}
              control={control}
              label={'Mes'}
              size={'small'}
              options={meses.map((m, index) => ({
                key: `${index}`,
                value: `${index + 1}`,
                label: m,
              }))}
              clearable
            />
          </Grid>

          <Grid size={{ xs: 6, md: 4, lg: 3 }}>
            <FormInputDropdown
              id={'anio'}
              name={'anio'}
              control={control}
              label={'Año'}
              size={'small'}
              options={(aniosArray || []).map((a) => ({
                key: `${a}`,
                value: `${a}`,
                label: `${a}`,
              }))}
            />
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}
