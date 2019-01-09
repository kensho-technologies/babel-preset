module.exports = (babel, userOptions) => {
  const env = babel.env()
  const defaultOptions = {
    loose: true,
    modules: env === 'cjs' || env === 'test' ? 'commonjs' : false,
    targets: {
      browsers: env === 'test' ? undefined : ['IE 11', 'Firefox ESR', 'last 2 Chrome versions'],
      node: env === 'test' || '10.0.0',
    },
  }
  const {loose, modules, targets} = Object.assign(defaultOptions, userOptions)

  const plugins = [
    [require('@babel/plugin-syntax-dynamic-import').default],
    [
      require('@babel/plugin-transform-runtime').default,
      {regenerator: false, useESModules: !modules},
    ],
  ]

  const presets = [[require('@babel/preset-env').default, {loose, modules, targets}]]

  return {plugins, presets}
}
