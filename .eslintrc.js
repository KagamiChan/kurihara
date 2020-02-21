//@ts-check

/** @type { import("@types/eslint").Linter.Config } */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'react', 'prettier', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-underscore-dangle': ['error', { allow: ['__'], allowAfterThis: true }],
    'no-confusing-arrow': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react/prefer-stateless-function': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'prettier/prettier': 'error',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
  },
  globals: {
    graphql: true,
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
  },
}
