module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    "airbnb",
  ],
  'parser': 'babel-eslint',
  'plugins': [
    'import',
    'react',
  ],
  'rules': {
    'semi': ['error', 'never'],
    'react/jsx-filename-extension': 'off',
    'no-underscore-dangle': ['error', { 'allow': ['__'], 'allowAfterThis': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'no-confusing-arrow': 'off',
    'no-console': ['error', {allow: ['warn', 'error']}],
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.es'],
        'paths': [__dirname],
      },
    },
  },
}
