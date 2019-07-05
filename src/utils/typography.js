import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'
import BSTheme from 'typography-theme-bootstrap'

BSTheme.plugins = [new CodePlugin()]

const fontFamily = [
  'source-han-serif-sc',
  'Source Han Serif SC',
  'Times',
  'Times New Roman',
  'STSong',
  'SimSun',
  'serif',
  'system-ui',
]

const typography = new Typography({
  ...BSTheme,
  headerFontFamily: fontFamily,
  bodyFontFamily: fontFamily,
  baseFontSize: '20px',
  baseLineHeight: 1.75,
  bodyWeight: 300,
  headerWeight: 400,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export const { rhythm, scale } = typography

export default typography
