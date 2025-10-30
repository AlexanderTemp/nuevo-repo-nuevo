import { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { ComponentOverride } from '../types'

export const ListItemButtonOverrides: ComponentOverride<'MuiListItemButton'> = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      borderRadius: 15,
      margin: '4px 8px',
      transition: theme.transitions.create(['background-color', 'box-shadow'], {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
      '&.Mui-selected': {
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
      },
    }),
  },
}
