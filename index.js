module.exports = {
  presets: [
    require('babel-preset-latest'),
    require('babel-preset-stage-1'),
    require('babel-preset-react'),
  ],
  plugins: [
    require('babel-plugin-react-require').default,
  ],
}
