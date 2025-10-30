// src/theme/overrides/Dialog.ts
import { Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { ComponentOverride } from '../types'

export const DialogOverrides: ComponentOverride<'MuiDialog'> = {
  styleOverrides: {
    root: ({}: { theme: Theme }) => ({
      '& .MuiDialog-container': {
        backdropFilter: 'blur(2px)',
      },
    }),

    paper: ({ theme }: { theme: Theme }) => ({
      borderRadius: '16px',
      boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.2)}`,
      backgroundImage: 'none',
      overflow: 'hidden',

      '&.MuiDialog-paperFullScreen': {
        borderRadius: 0,
      },

      '&.MuiDialog-paperScrollPaper': {
        maxHeight: 'calc(100% - 64px)',
      },
    }),
  },
}

export const DialogTitleOverrides: ComponentOverride<'MuiDialogTitle'> = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      padding: theme.spacing(3, 3, 1.5, 3),
      fontSize: theme.typography.pxToRem(20),
      fontWeight: 600,
      lineHeight: 1.4,
      color: theme.palette.text.primary,
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,

      '& .MuiTypography-root': {
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
      },
    }),
  },
}

export const DialogContentOverrides: ComponentOverride<'MuiDialogContent'> = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      padding: theme.spacing(2, 3),
      color: theme.palette.text.primary,

      '&:first-of-type': {
        paddingTop: theme.spacing(2),
      },

      '&:last-of-type': {
        paddingBottom: theme.spacing(2),
      },
    }),

    dividers: ({ theme }: { theme: Theme }) => ({
      padding: theme.spacing(3),
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
    }),
  },
}

export const DialogActionsOverrides: ComponentOverride<'MuiDialogActions'> = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      padding: theme.spacing(1.5, 3, 3, 3),
      gap: theme.spacing(1),
      backgroundColor: alpha(theme.palette.background.default, 0.6),
      borderTop: `1px solid ${theme.palette.divider}`,

      '& > :not(:first-of-type)': {
        marginLeft: 0,
      },

      '&.MuiDialogActions-spacing > :not(:first-of-type)': {
        marginLeft: theme.spacing(1),
      },
    }),
  },
}

export const DialogContentTextOverrides: ComponentOverride<'MuiDialogContentText'> =
  {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14),
        lineHeight: 1.6,
        marginBottom: theme.spacing(2),

        '&:last-child': {
          marginBottom: 0,
        },
      }),
    },
  }
