/* eslint-disable @typescript-eslint/no-var-requires */

require('ts-node').register({ files: true, project: './tsconfig.cli.json' })

const { createPages, onCreateNode } = require('./gatsby/node')

const node = {
  createPages,
  onCreateNode,
}

module.exports = node
