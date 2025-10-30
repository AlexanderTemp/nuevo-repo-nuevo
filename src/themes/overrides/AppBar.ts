import { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { ComponentOverride } from '../types'

export const AppBarOverrides: ComponentOverride<'MuiAppBar'> = {
  defaultProps: {
    elevation: 0,
    position: 'fixed',
  },
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
      boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.1)}`,
      transition: theme.transitions.create(
        ['background-color', 'box-shadow', 'color'],
        {
          duration: theme.transitions.duration.short,
        }
      ),
      '&.MuiAppBar-positionSticky': {
        backdropFilter: 'blur(10px)',
      },
      '&.MuiAppBar-positionFixed': {
        backdropFilter: 'blur(10px)',
      },
    }),
  },
}
