import { createTheme, PaletteOptions, ThemeOptions } from '@mui/material/styles'
import { componentOverrides } from './ index'

// export const PoppinsFont = Gantari({
//   subsets: ['latin'],
//   style: ['normal'],
//   weight: ['300', '400', '500', '600', '700', '800', '900'],
//   display: 'swap',
// })

const typography: ThemeOptions['typography'] = {
  fontFamily:
    '"Gantari", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  // fontFamily: PoppinsFont.style.fontFamily,
  h1: {
    // fontFamily: PoppinsFont.style.fontFamily,
    fontSize: 35,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    // fontFamily: PoppinsFont.style.fontFamily,
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h3: {
    // fontFamily: PoppinsFont.style.fontFamily,
    fontSize: 26,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    // fontFamily: PoppinsFont.style.fontFamily,
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h5: {
    // fontFamily: PoppinsFont.style.fontFamily,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h6: {
    // fontFamily: PoppinsFont.style.fontFamily,
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  button: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.66,
  },
  overline: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 2.66,
    textTransform: 'uppercase',
  },
}

const commonColors: PaletteOptions = {
  error: {
    main: '#FF6B6B',
    light: '#FF8E8E',
    dark: '#E65252',
  },
  warning: {
    main: '#FFB84D',
    light: '#FFD699',
    dark: '#FF9F2E',
  },
  info: {
    main: '#64B5F6',
    light: '#87C8F8',
    dark: '#4B9FE1',
  },
  success: {
    main: '#66BB6A',
    light: '#89CB8D',
    dark: '#4DA751',
  },
}

const theme = createTheme({
  typography,
  palette: {
    mode: 'light',
    primary: {
      main: '#179BAE',
      light: '#5BC7D2',
      dark: '#106A77',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7E3FA3',
      light: '#B36BD6',
      dark: '#4A0072',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F4F4F4',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F271B',
      secondary: '#4A4E69',
    },
    ...commonColors,
  },
  components: componentOverrides,
})

const darkTheme = createTheme({
  typography,
  palette: {
    mode: 'dark',
    primary: {
      main: '#17B1C1',
      light: '#5EDAE5',
      dark: '#116F80',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A569BD',
      light: '#D2A5E6',
      dark: '#7D3C98',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0B1224',
      paper: '#1B2437',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#A3A3A3',
    },
    ...commonColors,
  },

  components: componentOverrides,
})

export { theme, darkTheme }
