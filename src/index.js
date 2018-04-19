import pluginClassProperties from '@babel/plugin-proposal-class-properties'
import pluginExportNamespaceFrom from '@babel/plugin-proposal-export-namespace-from'
import pluginObjectRestSpread from '@babel/plugin-proposal-object-rest-spread'
import pluginSyntaxDynamicImport from '@babel/plugin-syntax-dynamic-import'
import pluginLodash from 'babel-plugin-lodash'
import pluginReactRemovePropTypes from 'babel-plugin-transform-react-remove-prop-types'
import pluginRuntime from '@babel/plugin-transform-runtime'
import presetEnv from '@babel/preset-env'
import presetFlow from '@babel/preset-flow'
import presetReact from '@babel/preset-react'

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

export default (context, userOptions) => {
  const options = Object.assign({}, defaultOptions, userOptions)
  const {lodash, loose, modules, removePropTypes, runtime, targets, useBuiltIns} = options

  const plugins = [
    [pluginClassProperties, {loose}],
    pluginExportNamespaceFrom,
    [pluginObjectRestSpread, {loose, useBuiltIns}],
    pluginSyntaxDynamicImport,
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
