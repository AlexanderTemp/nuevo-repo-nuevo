import { ThemeMode } from '@/themes/ThemeRegistry'
import dayjs from 'dayjs'

export const ColorCiudadania: Record<ThemeMode, string> = {
  dark: '#8f99ff',
  light: '#333e92',
}

export interface IHistorialSolicitud {
  fecha: string
  hora: string
  entidadFuente: string
  entidadSolicitante: string
  objeto: string
}

export interface IHistorialTemporal {
  idTransaccion: string
  fechayHora: string
  entidadPublicadoraSigla: string
  entidadPublicadoraNombre: string
  entidadConsumidoraSigla: string
  entidadConsumidoraNombre: string
  servicioObjeto: string
}
export interface IEstructuraPeticion {
  mes: string
  datos: IHistorialSolicitud[]
}

export interface IFiltroHistorial {
  entidadSolicitante: string
  entidadFuente: string
  mes: string
  anio: string
}

export const inicialFiltroHistorial: IFiltroHistorial = {
  entidadSolicitante: '',
  entidadFuente: '',
  mes: '',
  anio: `${dayjs().year()}`,
}

export interface ITokenMovil {
  usuario: string
  fecha_nacimiento: string
  nombres: string
  primer_apellido: string
  segundo_apellido: string
  email: string
  mobile: boolean
  iat: number
  exp: number
}

export interface IReporte {
  documento: string
  nombre: string
}

export const inicialReporte: IReporte = {
  documento: '',
  nombre: '',
}

export interface IEntidadSolicitante {
  entidadConsumidoraGobBo: number
  entidadConsumidoraSigla: string
  entidadConsumidoraNombre: string
}

export interface IEntidadFuente {
  entidadPublicadoraGobBo: number
  entidadPublicadoraSigla: string
  entidadPublicadoraNombre: string
}

export interface IFiltroEntidades {
  fuente: {
    total: number
    filas: IEntidadFuente[]
  }
  solicitante: {
    total: number
    filas: IEntidadSolicitante[]
  }
}

export const inicialFiltroEntidades: IFiltroEntidades = {
  fuente: {
    total: 0,
    filas: [],
  },
  solicitante: {
    total: 0,
    filas: [],
  },
}
