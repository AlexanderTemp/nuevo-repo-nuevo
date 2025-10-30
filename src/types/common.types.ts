export const enum OrdenEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export interface CriterioOrdenType {
  campo: string
  nombre: string
  alineacion?: 'left' | 'right' | 'inherit' | 'justify' | 'center'
  orden?: OrdenEnum
  ordenar?: boolean
}

export type MensajeType = 'success' | 'error' | 'warning'

export interface OpcionesMensaje {
  success: string
  error: string
  warning: string
}

export const inicialMensajes: OpcionesMensaje = {
  success: '',
  error: '',
  warning: '',
}
export interface getParams {
  pagina?: number
  limite?: number
  filtro?: string
  paginado?: boolean
}

export interface IPaginacionSolicitud extends getParams {
  tipo?: string
}

export interface Option {
  key?: any
  value: any
  label: string
}

export interface IPaginacionQueryBase {
  pagina?: number
  limite?: number
  filtro?: string
  paginado?: boolean

  orden?: Array<CriterioOrdenType>
}

export const inicialPaginacionBase: IPaginacionQueryBase = {
  filtro: '',
  pagina: 1,
  limite: 10,
  paginado: false,

  orden: [],
}
