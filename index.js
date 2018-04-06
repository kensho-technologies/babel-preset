const pluginClassProperties = require('@babel/plugin-proposal-class-properties')
const pluginExportNamespaceFrom = require('@babel/plugin-proposal-export-namespace-from')
const pluginObjectRestSpread = require('@babel/plugin-proposal-object-rest-spread')
const pluginLodash = require('babel-plugin-lodash')
const pluginReactRemovePropTypes = require('babel-plugin-transform-react-remove-prop-types')
const pluginRuntime = require('@babel/plugin-transform-runtime')
const presetEnv = require('@babel/preset-env')
const presetFlow = require('@babel/preset-flow')
const presetReact = require('@babel/preset-react')

const {BABEL_ENV, NODE_ENV} = process.env

const defaultOptions = {
  lodash: true,
  loose: false,
  modules: BABEL_ENV === 'cjs' || NODE_ENV === 'test' ? 'commonjs' : false,
  removePropTypes: 'wrap',
  runtime: false,
  targets: {
    browsers: ['IE 11', 'last 2 Edge versions', 'Firefox >= 45', 'last 2 Chrome versions'],
    node: 8,
  },
  useBuiltIns: true,
}

module.exports = (context, userOptions) => {
  const options = Object.assign({}, defaultOptions, userOptions)
  const {lodash, loose, modules, removePropTypes, runtime, targets, useBuiltIns} = options

  const plugins = [
    [pluginClassProperties, {loose}],
    pluginExportNamespaceFrom,
    [pluginObjectRestSpread, {loose, useBuiltIns}],
  ]
  if (lodash) plugins.push(pluginLodash)
  if (removePropTypes) plugins.push([pluginReactRemovePropTypes, {mode: removePropTypes}])
  if (runtime) plugins.push([pluginRuntime, {polyfill: false, useBuiltIns}])

  const presets = [
    [presetEnv, {loose, modules, targets}],
    [presetFlow],
    [presetReact, {useBuiltIns}],
  ]

  return {plugins, presets}
}
