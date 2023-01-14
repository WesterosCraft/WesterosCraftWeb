import { styles } from './styles';
import { type ThemeConfig } from '@chakra-ui/react';
import localFont from '@next/font/local';
import { Karla } from '@next/font/google';

const karla = Karla({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const esmerelda = localFont({
  src: [
    { path: './fonts/EsmeraldaPro-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/EsmeraldaPro-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/EsmeraldaPro-Regular.woff', weight: '400', style: 'normal' },
  ],
  display: 'swap',
});

export const theme: ThemeConfig = {
  // @ts-ignore
  styles,
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    body: karla.style.fontFamily,
    heading: `${esmerelda.style.fontFamily}, -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";`,
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
    primaryDarkGlare: '#333333',
    primaryDarkGlare2: '#595e56',
    primaryGold: '#daaf3c',
    primaryRed: '#9B2C2C',
    primaryBrown: '#292823',
    crownlands: {
      light: '',
      default: '#a65348',
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
    Progress: {
      variants: {
        crownlands: {
          filledTrack: {
            bg: 'crownlands.default',
          },
        },
        westerlands: {
          filledTrack: {
            bg: 'westerlands.default',
          },
        },
        reach: {
          filledTrack: {
            bg: 'reach.default',
          },
        },
        stormlands: {
          filledTrack: {
            bg: 'stormlands.default',
          },
        },
        vale: {
          filledTrack: {
            bg: 'vale.default',
          },
        },
        dorne: {
          filledTrack: {
            bg: 'dorne.default',
          },
        },
        theWall: {
          filledTrack: {
            bg: 'theWall.default',
          },
        },
        north: {
          filledTrack: {
            bg: 'north.default',
          },
        },
        riverlands: {
          filledTrack: {
            bg: 'riverlands.default',
          },
        },
        ironIslands: {
          filledTrack: {
            bg: 'ironIslands.default',
          },
        },
        beyondTheWall: {
          filledTrack: {
            bg: 'beyondTheWall.default',
          },
        },
      },
    },
  },
};
