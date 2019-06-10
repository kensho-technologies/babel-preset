module.exports = (babel, options) => {
  const env = babel.env()
  const {
    emotion = false,
    loose = true,
    modules = env === 'test' ? 'commonjs' : false,
    react = {},
    runtime = true,
    targets = env === 'test' ? {node: true, browsers: []} : undefined,
    typescript = {},
  } = options

  const plugins = [
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
  ]

  const overrides = [
    {
      exclude: /node_modules/,
      plugins: [
        [require('@babel/plugin-proposal-class-properties').default, {loose}],
        [require('@babel/plugin-syntax-dynamic-import').default],
      ],
      presets: [
        typescript && [require('@babel/preset-typescript').default, typescript],
        react && [
          require('@babel/preset-react').default,
          {development: env === 'development', ...react},
        ],
        emotion && [
          require('@emotion/babel-preset-css-prop').default,
          {autoLabel: env === 'development', ...emotion},
        ],
      ].filter(Boolean),
    },
  ]

  return {plugins, presets, overrides}
}
