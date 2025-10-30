// src/theme/Button.ts
import { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { ComponentOverride } from '../types'

export const ButtonOverrides: ComponentOverride<'MuiButton'> = {
  defaultProps: {
    disableElevation: true,
    size: 'small',
  },
  styleOverrides: {
    root: ({ ownerState, theme }: { ownerState: any; theme: Theme }) => ({
      borderRadius: '8px',
      textTransform: 'none',
      fontWeight: 500,
      lineHeight: '26px',
      transition: theme.transitions.create(
        ['background-color', 'box-shadow', 'border-color', 'color'],
        {
          duration: theme.transitions.duration.short,
        }
      ),

      ...(ownerState.size === 'small' && {
        padding: theme.spacing(1, 1.5),
        fontSize: theme.typography.pxToRem(13),
      }),
      ...(ownerState.size === 'medium' && {
        padding: theme.spacing(1.1, 2),
        fontSize: theme.typography.pxToRem(14),
      }),
      ...(ownerState.size === 'large' && {
        padding: theme.spacing(2, 3),
        fontSize: theme.typography.pxToRem(16),
      }),

      '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
      },

      '&.MuiLoadingButton-root': {
        borderRadius: '8px',
        textTransform: 'none',
        fontWeight: 500,
        lineHeight: '26px',
        '& .MuiButton-label': {
          visibility: 'hidden',
        },
        '& .MuiCircularProgress-root': {
          color: theme.palette.primary.main,
          width: 20,
          height: 20,
        },
      },
    }),

    contained: ({ theme }: { theme: Theme }) => ({
      color: '#FFFFFF',
      boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.1)}`,
      '&:hover': {
        boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.2)}`,
      },
      '&:active': {
        boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.3)}`,
      },
    }),

    outlined: ({ theme }: { theme: Theme }) => ({
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
      },
    }),

    text: ({ theme }: { theme: Theme }) => ({
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
      },
    }),

    containedPrimary: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          props.theme.palette.primary.dark,
      },
    },
    containedSecondary: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          props.theme.palette.secondary.dark,
      },
    },
    containedError: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          props.theme.palette.error.dark,
      },
    },
    containedWarning: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          props.theme.palette.warning.dark,
      },
    },
    containedInfo: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          props.theme.palette.info.dark,
      },
    },
    containedSuccess: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          props.theme.palette.success.dark,
      },
    },

    outlinedPrimary: {
      '&:hover': {
        borderColor: (props: { theme: Theme }) =>
          props.theme.palette.primary.dark,
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.primary.main, 0.04),
      },
    },
    textPrimary: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.primary.main, 0.04),
      },
    },
    outlinedSecondary: {
      '&:hover': {
        borderColor: (props: { theme: Theme }) =>
          props.theme.palette.secondary.dark,
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.secondary.main, 0.04),
      },
    },
    textSecondary: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.secondary.main, 0.04),
      },
    },
    outlinedError: {
      '&:hover': {
        borderColor: (props: { theme: Theme }) =>
          props.theme.palette.error.dark,
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.error.main, 0.04),
      },
    },
    textError: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.error.main, 0.04),
      },
    },
    outlinedWarning: {
      '&:hover': {
        borderColor: (props: { theme: Theme }) =>
          props.theme.palette.warning.dark,
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.warning.main, 0.04),
      },
    },
    textWarning: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.warning.main, 0.04),
      },
    },
    outlinedInfo: {
      '&:hover': {
        borderColor: (props: { theme: Theme }) => props.theme.palette.info.dark,
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.info.main, 0.04),
      },
    },
    textInfo: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.info.main, 0.04),
      },
    },
    outlinedSuccess: {
      '&:hover': {
        borderColor: (props: { theme: Theme }) =>
          props.theme.palette.success.dark,
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.success.main, 0.04),
      },
    },
    textSuccess: {
      '&:hover': {
        backgroundColor: (props: { theme: Theme }) =>
          alpha(props.theme.palette.success.main, 0.04),
      },
    },
  },
}
