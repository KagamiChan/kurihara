import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'
import BSTheme from 'typography-theme-bootstrap'

BSTheme.plugins = [new CodePlugin()]

const typography = new Typography({
  ...BSTheme,
  baseFontSize: '20px',
  baseLineHeight: 1.75,
  headerWeight: 200,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export const { rhythm, scale } = typography

export default typography
