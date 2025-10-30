import { Theme, alpha } from '@mui/material/styles'
import { ComponentOverride } from '../types'

export const SelectOverrides: ComponentOverride<'MuiSelect'> = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      '&.MuiInputBase-root': {
        borderRadius: theme.spacing(1.5),
        transition: theme.transitions.create(
          ['border-color', 'box-shadow', 'background-color'],
          { duration: theme.transitions.duration.shorter }
        ),
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[50]
            : theme.palette.background.paper,

        '& .MuiOutlinedInput-notchedOutline': {
          borderColor:
            theme.palette.mode === 'light'
              ? theme.palette.grey[300]
              : theme.palette.divider,
          transition: theme.transitions.create([
            'border-color',
            'border-width',
          ]),
        },

        '&:hover:not(.Mui-error):not(.Mui-disabled)': {
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : alpha(theme.palette.primary.main, 0.08),
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:
              theme.palette.mode === 'light'
                ? theme.palette.primary.main
                : alpha(theme.palette.primary.light, 0.6),
          },
        },

        '&.Mui-focused:not(.Mui-error)': {
          backgroundColor: theme.palette.background.paper,
          boxShadow: `0 0 0 2px ${
            theme.palette.mode === 'light'
              ? alpha(theme.palette.primary.light, 0.4)
              : alpha(theme.palette.primary.main, 0.3)
          }`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
          },
        },

        '&.Mui-error': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
          },
          '&.Mui-focused': {
            boxShadow: `0 0 0 3px ${alpha(theme.palette.error.light, 0.3)}`,
          },
        },

        '&.Mui-disabled': {
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.palette.action.disabledBackground
              : alpha(theme.palette.background.default, 0.3),
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:
              theme.palette.mode === 'light'
                ? theme.palette.action.disabled
                : alpha(theme.palette.divider, 0.4),
          },
          '& .MuiSelect-select': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.text.disabled
                : alpha(theme.palette.text.primary, 0.5),
          },
        },

        '& .MuiSelect-select': {
          fontWeight: 400,
          color: theme.palette.text.primary,
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
    }),

    icon: ({ theme }: { theme: Theme }) => ({
      right: 12,
      color:
        theme.palette.mode === 'light'
          ? theme.palette.text.secondary
          : alpha(theme.palette.text.primary, 0.7),
      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.shorter,
      }),
      '.Mui-focused &': {
        color: theme.palette.primary.main,
      },
      '.Mui-disabled &': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.action.disabled
            : alpha(theme.palette.text.disabled, 0.4),
      },
    }),
  },
}

export const InputLabelOverrides: ComponentOverride<'MuiInputLabel'> = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      '&.MuiInputLabel-outlined': {
        '&:not(.MuiInputLabel-shrink)': {
          transform: 'translate(14px, 50%)',
        },
        transition: theme.transitions.create(
          ['transform', 'font-size', 'color'],
          { duration: theme.transitions.duration.shorter }
        ),
        color: theme.palette.text.secondary,
        fontWeight: 500,

        '&.Mui-focused': {
          transform: 'translate(14px, -6px) scale(0.75)',
          color: theme.palette.primary.main,
        },
        '&.MuiInputLabel-shrink': {
          transform: 'translate(14px, -6px) scale(0.75)',
        },
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          color:
            theme.palette.mode === 'light'
              ? theme.palette.action.disabled
              : alpha(theme.palette.text.secondary, 0.5),
        },
      },
    }),
  },
}
