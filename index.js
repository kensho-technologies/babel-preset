module.exports = (babel, options) => {
  const env = babel.env()
  const {
    lodash = true,
    loose = true,
    modules = env === 'test' ? 'commonjs' : false,
    react = true,
    removePropTypes = env === 'production' ? 'remove' : 'unsafe-wrap',
    runtime = true,
    targets = env === 'test' ? {node: true, browsers: []} : undefined,
    typescript = true,
  } = options

  const plugins = [
    [require('@babel/plugin-proposal-class-properties').default, {loose}],
    [require('@babel/plugin-proposal-export-namespace-from').default],
    [require('@babel/plugin-syntax-dynamic-import').default],
    lodash && [require('babel-plugin-lodash')],
    runtime && [
      require('@babel/plugin-transform-runtime').default,
      {regenerator: false, useESModules: !modules},
    ],
    removePropTypes && [
      require('babel-plugin-transform-react-remove-prop-types').default,
      {mode: removePropTypes, removeImport: removePropTypes === 'remove'},
    ],
  ].filter(Boolean)

  const presets = [
    [
      require('@babel/preset-env').default,
      {loose, modules, targets, corejs: 3, useBuiltIns: 'entry'},
    ],
    typescript && [
      require('@babel/preset-typescript').default,
      typeof typescript === 'object' ? typescript : {},
    ],
    react && [require('@babel/preset-react').default, typeof react === 'object' ? react : {}],
  ].filter(Boolean)

  return {plugins, presets}
}
