import { styles } from './styles';

export const theme = {
  styles,
  fonts: {
    body: `'Karla', sans-serif`,
    heading: `esmeraldapro, -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";`,
    mono: 'Menlo, monospace',
  },
  colors: {
    text: {
      default: 'white',
      _dark: '#22261F',
    },
    dark: {
      700: '#595e56',
    },
    primary: '#FFFCF1',
    primaryShade: '#F9ECC8',
    primaryGlare: '#F6E2AA',
    primaryDark: '#22261F',
    primaryDarkGlare: '#292D25',
    primaryDarkGlare2: '#595e56',
    primaryGold: '#DAB636',
    primaryRed: '#9B2C2C',
    crownlands: {
      light: '',
      dark: '#a65348',
      gradient: '',
    },
    westerlands: {
      light: '',
      default: '#c1463d',
      gradient: '',
    },
    reach: {
      light: '',
      default: '#768f33',
      gradient: '',
    },
    stormlands: {
      light: '',
      default: '#daaf3c',
      gradient: '',
    },
    vale: {
      light: '',
      default: '#96d4dd',
      gradient: '',
    },
    dorne: {
      light: '',
      default: '#bf6946',
      gradient: '',
    },
    theWall: {
      light: '',
      default: '#231f20',
      gradient: '',
    },
    north: {
      light: '',
      default: '#a89d95',
      gradient: '',
    },
    riverlands: {
      light: '',
      default: '#4c8aaa',
      gradient: '',
    },
    ironIslands: {
      light: '',
      default: '#666666',
      gradient: '',
    },
    beyondTheWall: {
      light: '',
      default: '#6c4a67',
      gradient: '',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'none',
      },
      variants: {
        primaryBlack: {
          backgroundColor: 'primaryDark',
          color: 'white',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'normal',
      },
    },
  },
};
