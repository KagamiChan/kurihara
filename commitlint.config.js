/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */

const { get } = require('lodash')
const conventional = require('@commitlint/config-conventional')

const types = get(conventional, ['rules', 'type-enum', 2], [])

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', types.concat('content')],
  },
}
