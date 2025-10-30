'use client'

import axios from 'axios'
import type { IPaginacionQueryBase } from '../types/common.types'
import { useMemo, useRef, useCallback, useState, useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import useSWR from 'swr'
import { fetcherTokenMovil } from '../utils/axios'
import { NO_REVALIDAR } from '../services'
import { Constantes } from '../config/Constantes'
import { imprimir } from '../utils/imprimir'

import {
  type IFiltroEntidades,
  type IHistorialTemporal,
  inicialFiltroEntidades,
  type IReporte,
  type IFiltroHistorial,
} from '../types/historial-solicitudes.types'

export const useHistorialSolicitudes = ({
  filtro,
  limite = 10,
  token,
}: Omit<IPaginacionQueryBase, 'filtro' | 'orden' | 'pagina'> & {
  filtro: IFiltroHistorial
  token: string | undefined
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const keyHistorial = (pagina: number) => [
    `info/consultar`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: {
        pagina,
        limite,
        ...(filtro.entidadFuente.length > 0 && {
          entidadFuente: filtro.entidadFuente,
        }),
        ...(filtro.entidadSolicitante.length > 0 && {
          entidadSolicitante: filtro.entidadSolicitante,
        }),
        ...(filtro.mes.length > 0 && {
          mes: filtro.mes,
        }),
        ...(filtro.anio.length > 0 && {
          anio: filtro.anio,
        }),
      },
    },
  ]

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite(
      (index) => keyHistorial(index + 1),
      fetcherTokenMovil,
      NO_REVALIDAR
    )

  useEffect(() => {
    if (!isInitialized && !isLoading) {
      setIsInitialized(true)
      setSize(1)
    }
  }, [isInitialized, isLoading, setSize])

  const loadMore = useCallback(() => {
    if (!isLoading && !isValidating) {
      setSize(size + 1)
    }
  }, [isLoading, isValidating, setSize, size])

  const setObserverRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return

      if (observerRef.current) observerRef.current.disconnect()

      loadMoreRef.current = node

      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              loadMore()
            }
          },
          { threshold: 0.1 }
        )

        observerRef.current.observe(node)
      }
    },
    [isLoading, loadMore]
  )

  const allItems: IHistorialTemporal[] = useMemo(() => {
    if (!data) return []

    return data.flatMap((pageData) => pageData?.datos?.filas || [])
  }, [data])

  const total = useMemo(() => {
    if (!data || data.length === 0) return 0
    return data[0]?.datos?.total ?? 0
  }, [data])

  const hasMore = useMemo(() => {
    if (!data || data.length === 0 || allItems >= total) return false

    return allItems.length < total
  }, [data, allItems, total])

  const historicoMemo = useMemo(() => {
    const itemsPorMes: { mes: string; solicitudes: IHistorialTemporal[] }[] = []

    if (allItems.length > 0) {
      const mapaItemsPorMes = new Map<string, IHistorialTemporal[]>()

      allItems.forEach((item) => {
        const fecha = new Date(item.fechayHora)
        const nombreMes = new Intl.DateTimeFormat('es-ES', {
          month: 'long',
          year: 'numeric',
        }).format(fecha)

        if (!mapaItemsPorMes.has(nombreMes)) {
          mapaItemsPorMes.set(nombreMes, [])
        }

        mapaItemsPorMes.get(nombreMes)?.push(item)
      })

      Array.from(mapaItemsPorMes.entries())
        .sort((a, b) => {
          const fechaA = a[1][0].fechayHora
          const fechaB = b[1][0].fechayHora
          return new Date(fechaB).getTime() - new Date(fechaA).getTime()
        })
        .forEach(([mes, solicitudes]) => {
          itemsPorMes.push({
            mes,
            solicitudes,
          })
        })
    }

    return {
      error,
      cargando: isLoading || isValidating,
      items: allItems as IHistorialTemporal[],
      itemsPorMes,
      total,
      hasMore,
      loadMoreRef: setObserverRef,
      loadMore,
      actualizar: () => mutate(),
    }
  }, [
    error,
    isLoading,
    isValidating,
    allItems,
    total,
    hasMore,
    setObserverRef,
    loadMore,
    mutate,
  ])

  return historicoMemo
}

export const useFiltroHistorial = (token: string | undefined) => {
  const keyEntidades = [
    `historial-solicitudes/entidades`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  ]

  const { data, error, isLoading, isValidating } = useSWR(
    keyEntidades,
    fetcherTokenMovil,
    NO_REVALIDAR
  )

  const entidadesMemo = useMemo(
    () => ({
      error,
      cargando: isLoading || isValidating,
      entidades: (data?.datos as IFiltroEntidades) ?? inicialFiltroEntidades,
    }),
    [error, data, isLoading, isValidating]
  )
  return entidadesMemo
}

export const obtenerReporteHistorial = async ({
  filtro,
  token,
}: Omit<IPaginacionQueryBase, 'filtro' | 'orden' | 'pagina' | 'limite'> & {
  filtro: IFiltroHistorial
  token: string | undefined
}): Promise<IReporte> => {
  try {
    const res = await axios.get(
      `${Constantes.baseUrl}/historial-solicitudes/reporte`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ...(filtro.entidadFuente.length > 0 && {
            entidadFuente: filtro.entidadFuente,
          }),
          ...(filtro.entidadSolicitante.length > 0 && {
            entidadSolicitante: filtro.entidadSolicitante,
          }),
          ...(filtro.mes.length > 0 && {
            mes: filtro.mes,
          }),
          ...(filtro.anio.length > 0 && {
            anio: filtro.anio,
          }),
        },
      }
    )

    if (!res.data.documento || !res.data.nombre) {
      throw new Error('Error al obtener el documento')
    }

    return {
      documento: `data:application/pdf;base64,${res.data.documento}`,
      nombre: res.data.nombre,
    }
  } catch (error) {
    throw new Error('Error al obtener el reporte del servicio consumido')
  }
}

export const obtenerAccesoTokenMovil = async (
  token: string
): Promise<IAccessToken> => {
  try {
    const { status, data } = await axios.get(
      `${Constantes.baseUrl}/historial-solicitudes/auth`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (status !== 200) return { fallido: true }

    return {
      fallido: false,
      token: data?.datos?.token ?? '',
    }
  } catch (error: any) {
    imprimir(`Error: `, error)
    return { fallido: true }
  }
}

export interface IAccessToken {
  token?: string
  fallido: boolean
}
