import { Theme } from '@mui/material/styles'
import { ComponentOverride } from '../types'

export const ToolbarOverrides: ComponentOverride<'MuiToolbar'> = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      height: 64,
      [theme.breakpoints.up('sm')]: {
        height: 70,
      },
      padding: theme.spacing(0, 3),
    }),
  },
}
