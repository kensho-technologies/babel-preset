const pluginLodash = require('babel-plugin-lodash')
const pluginReactRequire = require('babel-plugin-react-require').default
const presetEnv = require('babel-preset-env')
const presetStage1 = require('babel-preset-stage-1')
const presetReact = require('babel-preset-react')

const {BABEL_ENV} = process.env

const defaultOptions = {
  lodash: true,
  modules: ['cjs', 'test'].includes(BABEL_ENV) ? 'commonjs' : false,
  targets: {
    browsers: ['IE 11', 'last 2 Edge versions', 'Firefox >= 45', 'last 2 Chrome versions'],
    node: 8,
  },
}

module.exports = (context, userOptions) => {
  const options = Object.assign({}, defaultOptions, userOptions)
  return {
    plugins: [options.lodash && pluginLodash, pluginReactRequire].filter(Boolean),
    presets: [
      [presetEnv, {modules: options.modules, targets: options.targets}],
      presetStage1,
      presetReact,
    ],
  }
}
