
import { createMuiTheme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appBar: {
      height: React.CSSProperties['height']
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appBar?: {
      height: React.CSSProperties['height']
    }
  }
}

const customTheme = createMuiTheme({
  spacing: 4, 
  palette: {
    common: {
      black: 'rgb(26, 26, 26)',
      white: 'rgb(249, 249, 249)'
    },
    primary: {
      main: 'rgb(0, 143, 238)',
    },
    secondary: {
      main: 'rgb(251, 49, 92)',
    },
    background: {
        default: 'rgb(249, 249, 249)',
        paper: 'rgb(249, 249, 249)'
    }
  },
  direction: 'ltr',
  appBar: {
    height: '80px'
  }
});

export default customTheme
