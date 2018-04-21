module.exports = (babel, userOptions) => {
  const env = babel.getEnv()
  const defaultOptions = {
    lodash: true,
    loose: false,
    modules: env === 'cjs' || env === 'test' ? 'commonjs' : false,
    removePropTypes: env === 'production' ? 'remove' : 'wrap',
    runtime: false,
    targets: {
      browsers: env !== 'test' && ['IE 11', 'Firefox ESR', 'last 2 Chrome versions'],
      node: env === 'test' || '8.11.1',
    },
    useBuiltIns: true,
  }

  const options = Object.assign(defaultOptions, userOptions)
  const {lodash, loose, modules, removePropTypes, runtime, targets, useBuiltIns} = options

  const plugins = [
    [require('@babel/plugin-proposal-class-properties').default, {loose}],
    [require('@babel/plugin-proposal-export-namespace-from').default],
    [require('@babel/plugin-proposal-object-rest-spread').default, {loose, useBuiltIns}],
    [require('@babel/plugin-syntax-dynamic-import').default],
    lodash && [require('babel-plugin-lodash')],
    runtime && [require('@babel/plugin-transform-runtime').default, {polyfill: false, useBuiltIns}],
    removePropTypes && [
      require('babel-plugin-transform-react-remove-prop-types').default,
      {mode: removePropTypes, removeImport: removePropTypes === 'remove'},
    ],
  ].filter(Boolean)

  const presets = [
    [require('@babel/preset-env').default, {loose, modules, targets}],
    [require('@babel/preset-flow').default],
    [require('@babel/preset-react').default, {useBuiltIns}],
  ]

  return {plugins, presets}
}
