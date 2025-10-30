import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios'
import { Constantes } from '../config/Constantes'
import { imprimir } from './imprimir'
import { delay } from './utilidades'
import { eliminarCookie, guardarCookie, leerCookie } from './cookies'
import { estadosSinPermiso, Servicios } from '../services'
import { verificarToken } from './token'

const axiosApi: AxiosInstance = axios.create({
  baseURL: Constantes.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  withCredentials: true,
})

const borrarCookiesSesion = () => {
  eliminarCookie('token')
  eliminarCookie('jid')
}

const actualizarSesion = async () => {
  imprimir(`Actualizando token 🚨`)
  try {
    const respuesta = await Servicios.post({
      url: `${Constantes.baseUrl}/token`,
      body: {
        token: leerCookie('token'),
      },
    })

    guardarCookie('token', respuesta.datos?.access_token)
    await delay(500)
  } catch (e) {
    await cerrarSesion()
    throw e
  }
}

const cerrarSesion = async () => {
  try {
    const token = leerCookie('token')
    borrarCookiesSesion()

    const respuesta = await Servicios.get({
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      url: `${Constantes.baseUrl}/logout`,
    })
    imprimir(`finalizando con respuesta`, respuesta)

    if (respuesta?.url) {
      window.location.href = respuesta?.url
    } else {
      window.location.reload()
    }
  } catch (e) {
    imprimir(`Error al cerrar sesión: `, e)
    window.location.reload()
  }
}

axiosApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = leerCookie('token') ?? ''

    if (!verificarToken(token)) {
      imprimir(`Token caducado ⏳`)
      await actualizarSesion()
    }

    config.headers.set('Authorization', `Bearer ${leerCookie('token') ?? ''}`)
    config.headers.set('accept', 'application/json')

    imprimir(
      `enviando 🔐🌍`,
      config.data,
      config.method,
      config.url,
      config.headers
    )
    return config
  },
  (error) => Promise.reject(error)
)

axiosApi.interceptors.response.use(
  (response) => {
    imprimir(
      'respuesta 🔐📡',
      response.config.data,
      response.config.method,
      response.config.url,
      response
    )
    return response
  },
  async (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('La petición está tardando demasiado'))
    }

    if (Servicios.isNetworkError(error)) {
      return Promise.reject(new Error('Error en la conexión 🌎'))
    }

    if (estadosSinPermiso.includes(error.response?.status)) {
      await cerrarSesion()
      return Promise.reject(error)
    }

    return Promise.reject(
      error.response?.data || 'Ocurrió un error desconocido'
    )
  }
)

export default axiosApi

const axiosInstance = axios.create({ baseURL: Constantes.baseUrl })

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Error desconocido'
    )
)

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args]

  if (url !== null) {
    const res = await axiosApi.get(url, { ...config })
    return res.data
  }
  return null
}

export const fetcherLocal = async (
  args: string | [string, AxiosRequestConfig]
) => {
  const [url, config] = Array.isArray(args) ? args : [args]
  const res = await axios.get(url, { ...config })
  return res.data
}

export const fetcherTokenMovil = async (
  args: string | [string, AxiosRequestConfig]
) => {
  const [url, config] = Array.isArray(args) ? args : [args]

  if (url !== null) {
    const res = await axios
      .create({ baseURL: Constantes.baseUrl })
      .get(url, { ...config })
    return res.data
  }
  return null
}
