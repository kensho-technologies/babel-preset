module.exports = (babel, options) => {
  const env = babel.env()
  const {
    lodash = true,
    loose = true,
    modules = env === 'test' ? 'commonjs' : false,
    react = {},
    runtime = true,
    targets = env === 'test' ? {node: true, browsers: []} : undefined,
    typescript = {},
  } = options

  const plugins = [
    [require('@babel/plugin-proposal-class-properties').default, {loose}],
    [require('@babel/plugin-syntax-dynamic-import').default],
    lodash && [require('babel-plugin-lodash')],
    runtime && [
      require('@babel/plugin-transform-runtime').default,
      {regenerator: false, useESModules: !modules},
    ],
  ].filter(Boolean)

  const presets = [
    [
      require('@babel/preset-env').default,
      {loose, modules, targets, corejs: 3, useBuiltIns: 'entry'},
    ],
    typescript && [require('@babel/preset-typescript').default, typescript],
    react && [require('@babel/preset-react').default, react],
  ].filter(Boolean)

  return {plugins, presets}
}
