import dayjs from 'dayjs'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { IHistorialTemporal } from '../types/historial-solicitudes.types'

export const CardWS = ({
  fechayHora,
  entidadPublicadoraSigla,
  entidadPublicadoraNombre,
  entidadConsumidoraSigla,
  entidadConsumidoraNombre,
  servicioObjeto,
}: IHistorialTemporal) => {
  const fecha = dayjs(fechayHora).format('YYYY-MM-DD')
  const hora = dayjs(fechayHora).format('HH:mm:ss')

  return (
    <>
      <Card
        sx={{
          width: '100%',
          p: { xs: 0, md: 1 },
          bgcolor: 'background.default',
        }}
      >
        <CardContent
          sx={{ width: '100%', fontSize: { xs: 12, md: 14, lg: 16 } }}
        >
          <Stack>
            <Box display={'flex'} sx={{ gap: 2 }}>
              <Typography
                fontWeight={600}
                component={'span'}
                fontSize="inherit"
              >
                Fecha:{' '}
                <Typography
                  fontWeight={400}
                  component="span"
                  fontSize="inherit"
                >
                  {fecha}
                </Typography>
              </Typography>
              <Typography fontWeight={600} fontSize="inherit">
                Hora:{' '}
                <Typography
                  fontWeight={400}
                  component="span"
                  fontSize="inherit"
                >
                  {hora}
                </Typography>{' '}
              </Typography>
            </Box>
            <Typography fontWeight={600} fontSize="inherit">
              Entidad fuente:{' '}
              <Typography fontWeight={400} component="span" fontSize="inherit">
                {`${entidadPublicadoraSigla} - ${entidadPublicadoraNombre}`}
              </Typography>
            </Typography>
            <Typography fontWeight={600} fontSize="inherit">
              Entidad solicitante:{' '}
              <Typography fontWeight={400} component="span" fontSize="inherit">
                {`${entidadConsumidoraSigla} - ${entidadConsumidoraNombre}`}
              </Typography>
            </Typography>
            <Typography fontWeight={600} fontSize="inherit">
              Objeto:{' '}
              <Typography fontWeight={400} component="span" fontSize="inherit">
                {servicioObjeto}
              </Typography>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
