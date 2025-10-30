'use client'

import { SubirArchivo } from '@/components/archivos/SubirArchivo'
import { IconoTooltip } from '@/components/botones/IconoTooltip'
import Iconify from '@/components/Iconos/iconify'
import { CustomDialog } from '@/components/modales/CustomDialog'
import PdfPreview from '@/components/preview/PdfPreview'
import { TextoTruncado } from '@/components/utils'
import { useAlerts } from '@/hooks'
import {
  ArchivoType,
  MapInputTipoContenido,
  MapTipoContenido,
  NuevoArchivoType,
  TipoContenido,
  validarArchivo,
} from '@/types/fileType'
import { Icons } from '@/types/icon.types'
import {
  obtenerTamanio,
  secondFileToArray,
  unirSinDuplicar,
  verificarArchivoXss,
  verificarCabeceraArchivo,
} from '@/utils'
import { Icon } from '@iconify/react'
import {
  Alert,
  Box,
  Card,
  Chip,
  CircularProgress,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { useEffect, useState } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

export interface FormInputFileProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  id: string
  index?: number
  name: TName
  control: Control<TFieldValues>
  tiposPermitidos?: TipoContenido
  limite?: number
  tamanioMaximo?: number
  cantidadArchivos?: number
  multiple?: boolean
  label: string
  labelVariant?: Variant
  textoApoyo?: string
  mostrarTitulo?: boolean
  mostrarArchivos?: number
  disabled?: boolean
}

interface CardFileProps {
  archivo: NuevoArchivoType
  quitarArchivo: () => void
}

const FormInputFileXss = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  id,
  name,
  control,
  limite = 1000,
  tamanioMaximo = 5,
  multiple = false,
  tiposPermitidos = TipoContenido.CUALQUIERA,
  label,
  labelVariant = 'subtitle2',
  textoApoyo = '',
  mostrarTitulo = true,
  mostrarArchivos = 2,
  cantidadArchivos,
  disabled = false,
}: FormInputFileProps<TFieldValues, TName>) => {
  const { Alerta } = useAlerts()

  const [mostrarPDF, setMostrarPDF] = useState<boolean>(false)
  const [verificandoArchivos, setVerificandoArchivos] = useState<boolean>(false)

  const [archivosCargados, setArchivosCargados] = useState<NuevoArchivoType[]>(
    []
  )

  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  const [archivoEdicion, setArchivoEdicion] = useState<
    ArchivoType | undefined | null
  >()

  const cerrarModalPdf = () => {
    setMostrarPDF(false)
    setArchivoEdicion(null)
  }

  const agregarArchivos = (files: FileList) => {
    const auxFiles = cantidadLimite(unirSinDuplicar(field.value, files))

    field.onChange(auxFiles)
    setArchivosCargados(secondFileToArray(auxFiles))
  }

  const cantidadLimite = (files: FileList) => {
    let limiteAUsar = multiple ? limite : 1

    if (multiple && cantidadArchivos !== undefined) {
      if (files.length > cantidadArchivos) {
        Alerta({
          mensaje: `Solo puedes subir un máximo de ${cantidadArchivos} archivo${cantidadArchivos !== 1 ? 's' : ''}.`,
          variant: 'warning',
        })
      }
      limiteAUsar = cantidadArchivos
    }

    const dt = new DataTransfer()

    for (const file of Array.from(files ?? []).slice(0, limiteAUsar)) {
      dt.items.add(file)
    }

    return dt.files
  }

  const quitarArchivo = (index: number) => {
    const dt = new DataTransfer()

    const nuevosArchivos = [...archivosCargados]
    nuevosArchivos.splice(index, 1)

    for (const i of nuevosArchivos.keys()) {
      dt.items.add(field.value[i])
    }

    field.onChange(dt.files)
    setArchivosCargados(nuevosArchivos)
  }

  const ContenidoCardFilePreview = ({
    archivo,
    icono,
    quitarArchivo,
  }: {
    archivo: NuevoArchivoType
    icono: string
    quitarArchivo: () => void
  }) => {
    const verArchivo = () => {
      if (archivo.file) {
        const url = URL.createObjectURL(archivo.file)
        window.open(url, '_blank')
      }
    }

    return (
      <Card
        variant={'outlined'}
        sx={{
          borderRadius: 3,
        }}
      >
        <Stack
          width="100%"
          height="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={archivo.valido ? 0 : 2}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <Iconify
              icon={icono}
              width="2.5rem"
              color={archivo.valido ? 'primary.main' : 'error.main'}
            />
            <Stack direction={'column'} sx={{ display: 'grid' }} gap={1}>
              <Stack direction="row" alignItems="center" gap={1}>
                <TextoTruncado variant="body2">{archivo.nombre}</TextoTruncado>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <Chip label={archivo.tipo} size="small" sx={{ padding: 0 }} />
                {archivo.valido && (
                  <Chip
                    label="Seguro"
                    icon={<Iconify icon={Icons.SAFE} width="1rem" />}
                    variant="outlined"
                    size="small"
                    color="success"
                  />
                )}
                <Typography variant="caption" color="text.secondary">
                  {obtenerTamanio(archivo.espacio)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row">
            {archivo.valido && (
              <IconoTooltip
                id={`id-ver-archivo-${0}`}
                color="primary"
                titulo={'Ver archivo'}
                key={`accionVerArchivo`}
                accion={verArchivo}
                icono={<Icon icon={Icons.EYE} />}
                name={'Ver Archivo'}
              />
            )}
            <IconoTooltip
              desactivado={disabled}
              id={`id-quitar-archivo-${0}`}
              color="error"
              titulo={'Quitar archivo'}
              key={`accionQuitarArchivo`}
              accion={(event) => {
                event.preventDefault()
                event.stopPropagation()
                quitarArchivo()
              }}
              icono={<Icon icon={Icons.TRASH} />}
              name={'Quitar Archivo'}
            />
          </Stack>
        </Stack>

        {!archivo.valido && (
          <Alert severity="error" sx={{ paddingY: 0.1, paddingX: 2 }}>
            <Typography component="span" fontWeight="500" variant="body2">
              Advertencia de seguridad:
            </Typography>
            &nbsp;Este archivo puede contener código potencialmente malicioso.
          </Alert>
        )}
      </Card>
    )
  }

  const CardFilePreview = ({ archivo, quitarArchivo }: CardFileProps) =>
    archivo.tipo == 'application/pdf' ? (
      <>
        {ContenidoCardFilePreview({
          archivo,
          icono: 'ic:twotone-picture-as-pdf',
          quitarArchivo,
        })}
      </>
    ) : (
      ContenidoCardFilePreview({
        archivo,
        icono: 'vscode-icons:default-file',
        quitarArchivo,
      })
    )

  const validacionArchivos = async (array: NuevoArchivoType[]) => {
    setVerificandoArchivos(true)
    const archivosValidos: NuevoArchivoType[] = []

    const sumaTotalTamanio = Array.from(array).reduce(
      (total, elem) => total + elem.file.size,
      0
    )

    if (sumaTotalTamanio >= tamanioMaximo * 1024 * 1024) {
      field.onChange([])
      setArchivosCargados([])
      Alerta({
        mensaje: `El tamaño total de los archivos excede el límite de ${Math.floor(tamanioMaximo)} MB.`,
        variant: 'error',
      })
      setVerificandoArchivos(false)
      return
    }

    for (const elem of array) {
      const mensaje = await validarArchivo(
        elem.file,
        tiposPermitidos,
        tamanioMaximo,
        true
      )

      if (mensaje.length > 0) {
        field.onChange([])
        setArchivosCargados([])
        Alerta({
          mensaje,
          variant: 'error',
        })
        setVerificandoArchivos(false)
        return
      }

      let validadorXss = true
      let validadorCabeceras = true
      if (
        MapTipoContenido[TipoContenido.PDF].includes(
          elem.file.type.toLowerCase()
        )
      ) {
        validadorXss = await verificarArchivoXss(elem.file)
      } else {
        validadorCabeceras = await verificarCabeceraArchivo(elem.file)
      }

      archivosValidos.push({
        ...elem,
        valido: validadorXss && validadorCabeceras,
      })
    }

    setArchivosCargados(archivosValidos)
    setVerificandoArchivos(false)
  }

  useEffect(() => {
    if (field.value) {
      const data = secondFileToArray(field.value)
      validacionArchivos(data).finally()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [, field.value])

  const calcularTamanioColumna = () => {
    if (!mostrarArchivos || mostrarArchivos <= 0) return 6

    const tamanio = Math.floor(12 / mostrarArchivos)

    return Math.max(1, Math.min(12, tamanio))
  }

  const columnSize = calcularTamanioColumna()

  return (
    <>
      <CustomDialog isOpen={mostrarPDF} handleClose={cerrarModalPdf}>
        <PdfPreview archivo={archivoEdicion} />
      </CustomDialog>
      <Box id={id}>
        <InputLabel htmlFor={id}>
          <Typography
            variant={labelVariant}
            sx={{ color: 'text.primary', fontWeight: '400' }}
          >
            {label}
          </Typography>
        </InputLabel>

        {!multiple && archivosCargados.length == 1 ? (
          <Box
            sx={{
              mt: 1,
              mb: 1,
              border: '1px dashed #ABAFB3',
              padding: 2.3,
              borderRadius: 3,
              bgcolor: 'background.paper',
            }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {verificandoArchivos ? (
              <Stack
                width="100%"
                height={50}
                direction="row"
                gap={2}
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress />
                <Typography>Verificando archivos...</Typography>
              </Stack>
            ) : (
              <CardFilePreview
                archivo={archivosCargados[0]}
                quitarArchivo={() => {
                  quitarArchivo(0)
                }}
              />
            )}
          </Box>
        ) : (
          <>
            {!disabled && (
              <SubirArchivo
                multiple={multiple}
                mostrarTitulo={mostrarTitulo}
                textoApoyo={textoApoyo}
                cantidadArchivos={cantidadArchivos}
                tamanioMaximo={tamanioMaximo}
                tiposPermitidos={MapInputTipoContenido[tiposPermitidos]}
                handleChange={(files: FileList) => {
                  agregarArchivos(files)
                }}
              />
            )}
          </>
        )}

        {multiple && !verificandoArchivos && (
          <Box>
            <Grid container spacing={1}>
              {archivosCargados.map((archivo, index) => (
                <Grid
                  key={`archivo-${index}`}
                  item
                  xs={12}
                  sm={columnSize}
                  md={columnSize}
                >
                  <CardFilePreview
                    archivo={archivo}
                    quitarArchivo={() => {
                      quitarArchivo(index)
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
      </Box>
    </>
  )
}

export default FormInputFileXss
