import { Theme, alpha } from '@mui/material/styles'
import { ComponentOverride } from '../types'

export const TextFieldOverrides: ComponentOverride<'MuiTextField'> = {
  defaultProps: {
    variant: 'outlined',
    size: 'small',
  },
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      '&.MuiTextField-root': {
        '& .MuiOutlinedInput-root': {
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
            '& .MuiInputBase-input': {
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.text.disabled
                  : alpha(theme.palette.text.primary, 0.5),
            },
          },
        },

        '& .MuiInputLabel-root': {
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

          '&.MuiFormLabel-filled': {
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

        '& .MuiInputBase-input': {
          fontWeight: 400,
          color: theme.palette.text.primary,

          '&::placeholder': {
            color: theme.palette.text.disabled,
            opacity: 1,
          },
        },

        '& .MuiInputBase-inputMultiline': {
          padding: 0,
        },

        '& .MuiInputAdornment-root': {
          color: theme.palette.text.secondary,

          '& .MuiIconButton-root': {
            padding: theme.spacing(1),
            borderRadius: theme.spacing(1),
            transition: theme.transitions.create(['background-color', 'color']),

            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'light'
                  ? theme.palette.action.hover
                  : alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
            },
          },
        },

        '& .MuiFormHelperText-root': {
          marginLeft: theme.spacing(1.5),
          marginTop: theme.spacing(0.5),
          fontSize: '0.75rem',
        },
      },
    }),
  },
}
