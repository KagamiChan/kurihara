import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'
import BSTheme from 'typography-theme-bootstrap'

BSTheme.plugins = [
  new CodePlugin(),
]

const typography = new Typography(BSTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
