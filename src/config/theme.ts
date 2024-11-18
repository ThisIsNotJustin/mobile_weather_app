import { dimensions, height, width } from 'src/utils/dimensions'
import { Theme } from '@react-navigation/native';

/**
 * Theme For Styled Components
 * -
 */
export const appTheme = {
  background: '#222',
  primary: '#FFF',
  secondary: '#CCC',
  highlight: '#FF2353',
  size: dimensions,
  windowHeight: `${height}px`,
  windowWidth: `${width}px`,
  fontFamily: 'System',
}

/**
 * Theme For Expo Navigation Header
 * -
 */
export const navTheme: Theme = {
  dark: false,
  colors: {
    background: appTheme.background,
    border: appTheme.secondary,
    card: appTheme.background,
    notification: appTheme.highlight,
    primary: appTheme.primary,
    text: appTheme.primary
  },
  fonts: {
    regular: {
      fontFamily: 'helvetica',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'helvetica',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'helvetica',
      fontWeight: 'bold',
    },
    heavy: {
      fontFamily: 'helvetica',
      fontWeight: '900',
    },
  },
};