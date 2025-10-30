// src/theme/Card.ts
import { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { ComponentOverride } from '../types'

export const CardOverrides: ComponentOverride<'MuiCard'> = {
  defaultProps: {
    elevation: 0,
    variant: 'outlined',
  },
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderRadius: 15,
      padding: theme.spacing(2),
      transition: theme.transitions.create([
        'background-color',
        'box-shadow',
        'backdrop-filter',
      ]),
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    }),
  },
}
