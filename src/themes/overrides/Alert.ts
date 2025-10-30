import { Theme } from '@mui/material/styles'
import type { ComponentOverride } from '../types'

export const AlertOverrides: ComponentOverride<'MuiAlert'> = {
  defaultProps: {
    variant: 'standard',
    iconMapping: {},
  },
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      borderRadius: theme.spacing(1.5),
      padding: theme.spacing(1.5, 2),
      fontSize: '0.875rem',
      fontWeight: 500,
      border: '1px solid',
    }),

    standardSuccess: ({ theme }: { theme: Theme }) => ({
      backgroundColor:
        theme.palette.mode === 'light'
          ? `${theme.palette.success.light}15`
          : `${theme.palette.success.dark}20`,
      borderColor: `${theme.palette.success.main}40`,
      color:
        theme.palette.mode === 'light'
          ? theme.palette.success.dark
          : theme.palette.success.light,

      '& .MuiAlert-icon': {
        color: theme.palette.success.main,
      },
    }),

    standardError: ({ theme }: { theme: Theme }) => ({
      backgroundColor:
        theme.palette.mode === 'light'
          ? `${theme.palette.error.light}15`
          : `${theme.palette.error.dark}20`,
      borderColor: `${theme.palette.error.main}40`,
      color:
        theme.palette.mode === 'light'
          ? theme.palette.error.dark
          : theme.palette.error.light,

      '& .MuiAlert-icon': {
        color: theme.palette.error.main,
      },
    }),

    standardWarning: ({ theme }: { theme: Theme }) => ({
      backgroundColor:
        theme.palette.mode === 'light'
          ? `${theme.palette.warning.light}15`
          : `${theme.palette.warning.dark}20`,
      borderColor: `${theme.palette.warning.main}40`,
      color:
        theme.palette.mode === 'light'
          ? theme.palette.warning.dark
          : theme.palette.warning.light,

      '& .MuiAlert-icon': {
        color: theme.palette.warning.main,
      },
    }),

    standardInfo: ({ theme }: { theme: Theme }) => ({
      backgroundColor:
        theme.palette.mode === 'light'
          ? `${theme.palette.info.light}15`
          : `${theme.palette.info.dark}20`,
      borderColor: `${theme.palette.info.main}40`,
      color:
        theme.palette.mode === 'light'
          ? theme.palette.info.dark
          : theme.palette.info.light,

      '& .MuiAlert-icon': {
        color: theme.palette.info.main,
      },
    }),

    filled: ({}: { theme: Theme }) => ({
      fontWeight: 600,
    }),

    filledSuccess: ({ theme }: { theme: Theme }) => ({
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
      borderColor: theme.palette.success.dark,
    }),

    filledError: ({ theme }: { theme: Theme }) => ({
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      borderColor: theme.palette.error.dark,
    }),

    filledWarning: ({ theme }: { theme: Theme }) => ({
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
      borderColor: theme.palette.warning.dark,
    }),

    filledInfo: ({ theme }: { theme: Theme }) => ({
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText,
      borderColor: theme.palette.info.dark,
    }),

    outlined: ({ theme }: { theme: Theme }) => ({
      borderWidth: '1.5px',
      backgroundColor: theme.palette.background.paper,
    }),

    outlinedSuccess: ({ theme }: { theme: Theme }) => ({
      borderColor: theme.palette.success.main,
      color:
        theme.palette.mode === 'light'
          ? theme.palette.success.dark
          : theme.palette.success.light,

      '& .MuiAlert-icon': {
        color: theme.palette.success.main,
      },
    }),

    outlinedError: ({ theme }: { theme: Theme }) => ({
      borderColor: theme.palette.error.main,
      color:
        theme.palette.mode === 'light'
          ? theme.palette.error.dark
          : theme.palette.error.light,

      '& .MuiAlert-icon': {
        color: theme.palette.error.main,
      },
    }),

    outlinedWarning: ({ theme }: { theme: Theme }) => ({
      borderColor: theme.palette.warning.main,
      color:
        theme.palette.mode === 'light'
          ? theme.palette.warning.dark
          : theme.palette.warning.light,

      '& .MuiAlert-icon': {
        color: theme.palette.warning.main,
      },
    }),

    outlinedInfo: ({ theme }: { theme: Theme }) => ({
      borderColor: theme.palette.info.main,
      color:
        theme.palette.mode === 'light'
          ? theme.palette.info.dark
          : theme.palette.info.light,

      '& .MuiAlert-icon': {
        color: theme.palette.info.main,
      },
    }),

    icon: ({ theme }: { theme: Theme }) => ({
      fontSize: '1.5rem',
      padding: theme.spacing(0.5, 0),
      marginRight: theme.spacing(1.5),
      opacity: 1,
    }),

    message: ({ theme }: { theme: Theme }) => ({
      padding: theme.spacing(0.5, 0),
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1.5,
    }),

    action: ({ theme }: { theme: Theme }) => ({
      paddingTop: 0,
      paddingBottom: 0,
      marginRight: theme.spacing(-0.5),

      '& .MuiIconButton-root': {
        padding: theme.spacing(0.75),
        borderRadius: theme.spacing(1),
      },
    }),
  },
}
