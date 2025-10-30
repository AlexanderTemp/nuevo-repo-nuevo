import { GlobalStyles } from '@mui/material'

interface ScrollbarGlobalStylesProps {
  isDark: boolean
}

export const ScrollbarGlobalStyles = ({
  isDark,
}: ScrollbarGlobalStylesProps) => (
  <GlobalStyles
    styles={{
      html: {
        scrollBehavior: 'smooth',
      },
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: isDark ? '#4b5563 #1f2937' : '#cbd5e1 #f1f5f9',
      },
      '*::-webkit-scrollbar-button': {
        display: 'none',
        width: 0,
        height: 0,
      },
      '*::-webkit-scrollbar': {
        width: '12px',
        height: '12px',
      },
      '*::-webkit-scrollbar-track': {
        background: isDark ? '#1f2937' : '#f1f5f9',
        borderRadius: '8px',
      },
      '*::-webkit-scrollbar-thumb': {
        background: isDark ? '#4b5563' : '#cbd5e1',
        borderRadius: '8px',
        border: isDark ? '2px solid #1f2937' : '2px solid #f1f5f9',
        minHeight: '40px',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        background: isDark ? '#6b7280' : '#94a3b8',
      },
      '*::-webkit-scrollbar-thumb:active': {
        background: isDark ? '#9ca3af' : '#64748b',
      },
      '*::-webkit-scrollbar-corner': {
        background: isDark ? '#1f2937' : '#f1f5f9',
      },

      '@supports (scrollbar-width: thin)': {
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: isDark ? '#4b5563 #1f2937' : '#cbd5e1 #f1f5f9',
        },
      },

      '@supports not ((scrollbar-width: thin) or (-webkit-scrollbar-width: auto))':
        {
          '*': {
            scrollbarWidth: 'auto',
          },
        },
    }}
  />
)
