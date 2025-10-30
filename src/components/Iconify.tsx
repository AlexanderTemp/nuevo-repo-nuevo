import { forwardRef } from 'react'
import { Icon } from '@iconify/react'
import { Box, BoxProps } from '@mui/material'
import { IconifyProps } from '@/types/icon.types'

interface Props extends BoxProps {
  icon: IconifyProps
}

const Iconify = forwardRef<SVGElement, Props>(
  ({ icon, width = 20, color = 'inherit', sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{
        width,
        height: width,
        color,
        ...sx,
      }}
      {...other}
    />
  )
)

Iconify.displayName = 'Iconify'

export default Iconify
