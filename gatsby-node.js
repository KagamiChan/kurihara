/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

require('@babel/register')({
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-typescript'),
  ],
  extensions: ['.js', '.ts', '.tsx'],
})

const {
  createPages,
  onCreateNode,
  onCreateWebpackConfig,
  onCreateBabelConfig,
} = require('./gatsby/node')

const node = {
  createPages,
  onCreateNode,
  onCreateWebpackConfig,
  onCreateBabelConfig,
}

module.exports = node
