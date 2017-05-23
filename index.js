const pluginLodash = require('babel-plugin-lodash')
const pluginReactRequire = require('babel-plugin-react-require').default
const presetLatest = require('babel-preset-latest')
const presetStage1 = require('babel-preset-stage-1')
const presetReact = require('babel-preset-react')

const defaultOptions = {
  lodash: true,
}

module.exports = (context, userOptions) => {
  const options = Object.assign({}, defaultOptions, userOptions)
  if (options.modules === undefined) {
    if (process.env.BABEL_ENV === 'cjs') options.modules = 'commonjs'
    else if (process.env.BABEL_ENV === 'es') options.modules = false
  }
  return {
    plugins: [
      options.lodash && pluginLodash,
      pluginReactRequire,
    ].filter(Boolean),
    presets: [
      [presetLatest, {es2015: {modules: options.modules}}],
      presetStage1,
      presetReact,
    ],
  }
}
