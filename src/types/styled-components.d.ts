import 'styled-components/native'
import { appTheme } from '../config/theme'

type AppTheme = typeof appTheme

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
