const pluginClassProperties = require('@babel/plugin-proposal-class-properties').default
const pluginExportNamespaceFrom = require('@babel/plugin-proposal-export-namespace-from').default
const pluginObjectRestSpread = require('@babel/plugin-proposal-object-rest-spread').default
const pluginSyntaxDynamicImport = require('@babel/plugin-syntax-dynamic-import').default
const pluginLodash = require('babel-plugin-lodash')
const pluginRemovePropTypes = require('babel-plugin-transform-react-remove-prop-types').default
const pluginRuntime = require('@babel/plugin-transform-runtime').default
const presetEnv = require('@babel/preset-env').default
const presetFlow = require('@babel/preset-flow').default
const presetReact = require('@babel/preset-react').default

module.exports = (babel, userOptions) => {
  const env = babel.getEnv()
  const defaultOptions = {
    lodash: true,
    loose: false,
    modules: env === 'cjs' || env === 'test' ? 'commonjs' : false,
    removePropTypes: env === 'production' ? 'remove' : 'wrap',
    runtime: false,
    targets: {
      browsers: ['IE 11', 'last 2 Edge versions', 'Firefox >= 45', 'last 2 Chrome versions'],
      node: 8,
    },
    useBuiltIns: true,
  }

  const options = Object.assign(defaultOptions, userOptions)
  const {lodash, loose, modules, removePropTypes, runtime, targets, useBuiltIns} = options

  const plugins = [
    [pluginClassProperties, {loose}],
    pluginExportNamespaceFrom,
    [pluginObjectRestSpread, {loose, useBuiltIns}],
    pluginSyntaxDynamicImport,
  ]
  if (lodash) plugins.push(pluginLodash)
  if (runtime) plugins.push([pluginRuntime, {polyfill: false, useBuiltIns}])
  if (removePropTypes) {
    const removeImport = removePropTypes === 'remove'
    plugins.push([pluginRemovePropTypes, {mode: removePropTypes, removeImport}])
  }

  const presets = [
    [presetEnv, {loose, modules, targets}],
    [presetFlow],
    [presetReact, {useBuiltIns}],
  ]

  return {plugins, presets}
}
