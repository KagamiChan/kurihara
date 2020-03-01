/* eslint-disable @typescript-eslint/no-var-requires */

require('@babel/register')({
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-typescript'),
  ],
  extensions: ['.js', '.ts', '.tsx'],
})

const { createPages, onCreateNode } = require('./gatsby/node')

const node = {
  createPages,
  onCreateNode,
}

module.exports = node
