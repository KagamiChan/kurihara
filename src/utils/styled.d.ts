// import original module declarations
import 'styled-components'

import { theme } from './style'

// and extend them!
declare module 'styled-components' {
  export type DefaultTheme = theme
}
