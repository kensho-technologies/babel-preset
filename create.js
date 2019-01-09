module.exports = (babel, userOptions, env, typeOptions) => {
  const defaultOptions = {
    lodash: true,
    loose: true,
    modules: env === 'cjs' || env === 'test' ? 'commonjs' : false,
    removePropTypes: env === 'production' ? 'remove' : 'unsafe-wrap',
    runtime: false,
    typescript: false,
    useBuiltIns: true,
  }
  const {
    lodash,
    loose,
    modules,
    removePropTypes,
    runtime,
    targets,
    typescript,
    useBuiltIns,
  } = Object.assign(defaultOptions, typeOptions, userOptions)

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
    [require('@babel/preset-env').default, {loose, modules, targets}],
    !typescript && [require('@babel/preset-flow').default],
    typescript && [
      require('@babel/preset-typescript').default,
      typeof typescript === 'object' ? typescript : {},
    ],
    [require('@babel/preset-react').default, {useBuiltIns}],
  ].filter(Boolean)

  return {plugins, presets}
}
