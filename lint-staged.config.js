module.exports = {
  '*.{js,jsx}': 'eslint',
  '*.md': ['yarn strip', 'prettier --write'],
  '*.{yml,yaml}': 'prettier --write',
}
