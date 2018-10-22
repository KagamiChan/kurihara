import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'
import BSTheme from 'typography-theme-bootstrap'

BSTheme.plugins = [new CodePlugin()]

const typography = new Typography({
  ...BSTheme,
  bodyFontFamily: [
    'Open Sans',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'Noto Sans SC',
    'Noto Sans SC Sliced',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif',
  ],
  baseFontSize: '20px',
  baseLineHeight: 1.75,
  bodyWeight: 300,
  headerWeight: 200,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export const { rhythm, scale } = typography

export default typography
