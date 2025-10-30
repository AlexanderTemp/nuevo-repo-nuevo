import { CircularProgress, Paper, Stack, Typography } from '@mui/material'
import { toast } from 'sonner'
import { useState } from 'react'

interface IRespuestaProgreso {
  mostrarProgreso: (descripcion: string) => void
  cerrarProgreso: () => void
  estadoProgreso: boolean
}

export const useAlertaProgreso = (key: string): IRespuestaProgreso => {
  const [estadoProgreso, setEstadoProgreso] = useState(false)
  const [toastId, setToastId] = useState<string | number | undefined>(undefined)

  const AlertaProgreso = (descripcion: string) => (
    <Paper elevation={5}>
      <Stack direction="row" gap={2} alignItems="center" p={2}>
        <CircularProgress color="primary" size={20} thickness={5} />
        <Typography variant="body2">{descripcion}</Typography>
      </Stack>
    </Paper>
  )

  const mostrarProgreso = (descripcion: string) => {
    if (estadoProgreso) return

    const id = toast.custom(() => AlertaProgreso(descripcion), {
      id: key,
      duration: Infinity, // No desaparece hasta que se cierre manualmente
      position: 'top-center',
    })

    setToastId(id)
    setEstadoProgreso(true)
  }

  const cerrarProgreso = () => {
    if (toastId) {
      toast.dismiss(toastId)
      setEstadoProgreso(false)
    }
  }

  return {
    mostrarProgreso,
    cerrarProgreso,
    estadoProgreso,
  }
}
