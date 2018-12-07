module.exports = {
  '*.{js,jsx}': 'eslint',
  '*.md': ['yarn strip', 'prettier --write', 'git add'],
}
