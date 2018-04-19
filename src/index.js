import pluginClassProperties from '@babel/plugin-proposal-class-properties'
import pluginExportNamespaceFrom from '@babel/plugin-proposal-export-namespace-from'
import pluginObjectRestSpread from '@babel/plugin-proposal-object-rest-spread'
import pluginSyntaxDynamicImport from '@babel/plugin-syntax-dynamic-import'
import pluginLodash from 'babel-plugin-lodash'
import pluginRemovePropTypes from 'babel-plugin-transform-react-remove-prop-types'
import pluginRuntime from '@babel/plugin-transform-runtime'
import presetEnv from '@babel/preset-env'
import presetFlow from '@babel/preset-flow'
import presetReact from '@babel/preset-react'

export default (babel, userOptions) => {
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
