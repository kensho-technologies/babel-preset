const pluginExportDefault = require('@babel/plugin-proposal-export-default-from')
const pluginExportNamespace = require('@babel/plugin-proposal-export-namespace-from')
const pluginLodash = require('babel-plugin-lodash')
const pluginReactRequire = require('babel-plugin-react-require').default
const pluginRuntime = require('@babel/plugin-transform-runtime')
const presetEnv = require('@babel/preset-env')
const presetStage3 = require('@babel/preset-stage-3')
const presetReact = require('@babel/preset-react')

const {BABEL_ENV, NODE_ENV} = process.env

const defaultOptions = {
  lodash: true,
  loose: false,
  modules: BABEL_ENV === 'cjs' || NODE_ENV === 'test' ? 'commonjs' : false,
  runtime: false,
  targets: {
    browsers: ['IE 11', 'last 2 Edge versions', 'Firefox >= 45', 'last 2 Chrome versions'],
    node: 8,
  },
  useBuiltIns: true,
}

module.exports = (context, userOptions) => {
  const options = Object.assign({}, defaultOptions, userOptions)
  const {lodash, loose, modules, runtime, targets, useBuiltIns} = options

  const plugins = [pluginExportDefault, pluginExportNamespace, pluginReactRequire]
  if (lodash) plugins.push(pluginLodash)
  if (runtime) plugins.push([pluginRuntime, {polyfill: false, useBuiltIns}])

  const presets = [
    [presetEnv, {loose, modules, targets}],
    [presetStage3, {loose, useBuiltIns}],
    [presetReact, {useBuiltIns}],
  ]

  return {plugins, presets}
}
