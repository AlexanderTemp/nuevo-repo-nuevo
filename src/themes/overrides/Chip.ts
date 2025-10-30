import { Theme } from '@mui/material/styles'
import { ComponentOverride } from '../types'

export const ChipOverrides: ComponentOverride<'MuiChip'> = {
  defaultProps: {
    variant: 'outlined',
  },
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      borderRadius: 15,
      padding: theme.spacing(1, 2),
      transition: theme.transitions.create([
        'background-color',
        'border-color',
      ]),
      '& .MuiChip-label': {
        fontWeight: 600,
      },
    }),
  },
}
