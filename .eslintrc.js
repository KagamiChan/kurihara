// @ts-check

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
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'react', 'prettier', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-underscore-dangle': ['error', { allow: ['__'], allowAfterThis: true }],
    'no-confusing-arrow': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'react/prefer-stateless-function': 'off',
    'prettier/prettier': 'error',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-shadow': 'off',
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
  },
  globals: {
    graphql: true,
    page: true,
    browser: true,
    context: true,
  },
  overrides: [
    {
      files: ['specs/**/*.ts', 'playwright.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
