module.exports = {
  presets: [require.resolve('babel-preset-gatsby')],
  plugins: [
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    ...['@babel/plugin-proposal-optional-chaining'].map(plugin =>
      require.resolve(plugin),
    ),
  ],
}
