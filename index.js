const pluginLodash = require('babel-plugin-lodash')
const pluginReactRequire = require('babel-plugin-react-require').default
const presetEnv = require('babel-preset-env')
const presetStage1 = require('babel-preset-stage-1')
const presetReact = require('babel-preset-react')

const {BABEL_ENV} = process.env

const defaultOptions = {
  lodash: true,
}

module.exports = (context, userOptions) => {
  const options = Object.assign({}, defaultOptions, userOptions)
  if (options.modules === undefined) {
    if (BABEL_ENV === 'cjs') options.modules = 'commonjs'
    else if (BABEL_ENV === 'es') options.modules = false
  }
  return {
    plugins: [options.lodash && pluginLodash, pluginReactRequire].filter(Boolean),
    presets: [[presetEnv, {modules: options.modules}], presetStage1, presetReact],
  }
}
