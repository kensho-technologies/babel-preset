module.exports = (babel, userOptions) => {
  const env = babel.env()
  const defaultOptions = {
    lodash: true,
    loose: true,
    modules: env === 'cjs' || env === 'test' ? 'commonjs' : false,
    react: true,
    removePropTypes: env === 'production' ? 'remove' : 'unsafe-wrap',
    runtime: true,
    targets: {
      browsers: env === 'test' ? undefined : ['IE 11', 'Firefox ESR', 'last 2 Chrome versions'],
      node: env === 'test' || '10.0.0',
    },
    typescript: true,
    useBuiltIns: true,
  }
  const {
    lodash,
    loose,
    modules,
    react,
    removePropTypes,
    runtime,
    targets,
    typescript,
    useBuiltIns,
  } = Object.assign(defaultOptions, userOptions)

  const plugins = [
    [require('@babel/plugin-proposal-class-properties').default, {loose}],
    [require('@babel/plugin-proposal-export-namespace-from').default],
    [require('@babel/plugin-proposal-object-rest-spread').default, {loose, useBuiltIns}],
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
    react && [
      require('@babel/preset-react').default,
      typeof react === 'object' ? {useBuiltIns, ...react} : {useBuiltIns},
    ],
  ].filter(Boolean)

  return {plugins, presets}
}
