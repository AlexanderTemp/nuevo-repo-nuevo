import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { theme, darkTheme } from './theme'
import { useMediaQuery } from '@mui/material'
import { useDebouncedCallback } from 'use-debounce'
import { guardarCookie, leerCookie } from '../utils/cookies'
import { imprimir } from '../utils/imprimir'
import { ScrollbarGlobalStyles } from './GlobalCssStyle'

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'

export type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  themeMode: ThemeMode
  toggleTheme: () => void
  guardarModoOscuro: () => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
export const useThemeContext = () => useContext(ThemeContext)

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const isDarkOS = useMediaQuery(DARK_SCHEME_QUERY)
  const isMountRef = useRef(false)

  const [themeMode, setThemeMode] = useState<ThemeMode>(
    isDarkOS ? 'dark' : 'light'
  )

  const debounced = useDebouncedCallback(() => {
    isMountRef.current = true
  }, 500)

  const guardarModoOscuro = () => {
    setThemeMode('dark')
    guardarCookie('themeMode', 'dark')
    imprimir('🌙')
  }

  const guardarModoClaro = () => {
    setThemeMode('light')
    guardarCookie('themeMode', 'light')
    imprimir('☀️')
  }

  const guardarModoAutomatico = () => {
    setThemeMode(isDarkOS ? 'dark' : 'light')
    guardarCookie('themeMode', isDarkOS ? 'dark' : 'light')
    imprimir('isDarkOS: ', isDarkOS ? '🌙' : '☀️')
  }

  const toggleTheme = () => {
    switch (themeMode) {
      case 'light':
        guardarModoOscuro()
        break
      case 'dark':
        guardarModoClaro()
        break
      default:
        break
    }
  }

  useEffect(() => {
    const themeModeSaved = leerCookie('themeMode')
    imprimir('themeMode', themeModeSaved)

    if (!themeModeSaved) {
      guardarModoAutomatico()
      isMountRef.current = false
      return
    }

    switch (themeModeSaved) {
      case 'dark':
        guardarModoOscuro()
        break
      case 'light':
        guardarModoClaro()
        break
      default:
        guardarModoClaro()
        break
    }
    isMountRef.current = false
  }, [])

  useEffect(() => {
    if (isMountRef.current) {
      guardarModoAutomatico()
    }
    debounced()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS])

  return (
    <ThemeContext.Provider
      value={{ themeMode, toggleTheme, guardarModoOscuro }}
    >
      <ThemeProvider theme={themeMode === 'light' ? theme : darkTheme}>
        <ScrollbarGlobalStyles isDark={themeMode === 'dark'} />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
