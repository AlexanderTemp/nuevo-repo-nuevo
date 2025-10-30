import { Components, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const AccordionOverrides: Components<
  Omit<Theme, 'components'>
>['MuiAccordion'] = {
  styleOverrides: {
    root: {
      boxShadow: 'none',
      border: '1px solid',
      borderColor: alpha('#000', 0.22),
      borderRadius: '8px',
    },
  },
}

export const AccordionSummaryOverrides: Components<
  Omit<Theme, 'components'>
>['MuiAccordionSummary'] = {
  styleOverrides: {
    root: {
      height: '44px',
      borderRadius: '8px',
    },
    content: {},
    expandIconWrapper: {},
  },
}

export const AccordionDetailsOverrides: Components<
  Omit<Theme, 'components'>
>['MuiAccordionDetails'] = {
  styleOverrides: {
    root: {
      borderRadius: '8px',
    },
  },
}
