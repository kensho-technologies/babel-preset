module.exports = (babel, options) => {
  const env = babel.env()
  const isDeps = env === 'dependencies'
  const isTest = env === 'test'
  const isDev = env === 'development'

  const {
    emotion = false,
    lodash = true,
    loose = true,
    modules = isTest ? 'commonjs' : false,
    react = {},
    runtime = true,
    targets = isTest ? {node: true, browsers: []} : undefined,
    typescript = {},
  } = options

  const plugins = [
    !isDeps && [require('@babel/plugin-proposal-class-properties').default, {loose}],
    !isDeps && [require('@babel/plugin-syntax-dynamic-import').default],
    !isDeps && lodash && [require('babel-plugin-lodash')],
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
    !isDeps && typescript && [require('@babel/preset-typescript').default, typescript],
    !isDeps && react && [require('@babel/preset-react').default, react],
    !isDeps &&
      emotion && [
        require('@emotion/babel-preset-css-prop').default,
        {autoLabel: isDev, ...emotion},
      ],
  ].filter(Boolean)

  return {plugins, presets}
}
