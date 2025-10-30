import { Constantes } from '../config/Constantes'
import dayjs from 'dayjs'
import packageJson from '../../package.json'

export const convertirMBs = (size: string): number => {
  const parsed = Number(size)
  if (isNaN(parsed) || parsed <= 0) return 0
  return Number((parsed / 1_000_000).toFixed(2))
}

export const obtenerTamanio = (size: number) =>
  size < 1000000
    ? `${(size / 1000).toFixed(2)} KB`
    : `${(size / 1000000).toFixed(2)} MB`

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const titleCase = (word: string) =>
  word.length <= 1
    ? word.toUpperCase()
    : word
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

export const capitalize = (s: string) =>
  (s && String(s[0]).toUpperCase() + String(s).slice(1)) || ''

export const versionNumber = () => Constantes.appVersion || packageJson.version

export const serviceName = () => packageJson.name

export const siteName = () => Constantes.siteName ?? ''

export const crearArrayAnios = (anioMinimo: number) => {
  const anioActual = new Date().getFullYear()
  const arrayAnios = []

  for (let anio = anioActual; anio >= anioMinimo; anio--) {
    arrayAnios.push(anio)
  }

  return arrayAnios
}

export const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]
export const DIAS_SEMANA = [
  { label: 'Lunes', value: 'lun' },
  { label: 'Martes', value: 'mar' },
  { label: 'Miércoles', value: 'mie' },
  { label: 'Jueves', value: 'jue' },
  { label: 'Viernes', value: 'vie' },
  { label: 'Sábado', value: 'sab' },
  { label: 'Domingo', value: 'dom' },
]

export const obtenerMesesDisponibles = (anio: number): string[] => {
  const mesActual = dayjs().month()
  const anioActual = dayjs().year()

  if (anio === anioActual) return MESES.filter((_, index) => index <= mesActual)

  return MESES
}

export const xssOptions = {
  whiteList: {
    p: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    span: [],
    div: [],
    b: [],
    strong: [],
    i: [],
    em: [],
    u: [],
    br: [],
    hr: [],
    ul: [],
    ol: [],
    li: [],
    table: [],
    tr: [],
    td: [],
    th: [],
    thead: [],
    tbody: [],
    tfoot: [],
    blockquote: [],
    code: [],
    a: ['href', 'target', 'rel'],
    pre: [],
    small: [],
    mark: [],
    sup: [],
    sub: [],
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script', 'style'],
}
