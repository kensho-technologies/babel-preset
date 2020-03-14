/* eslint-disable global-require */

const NODE_MODULES_REGEX = /node_modules/

const PRECOMPILED_PACKAGES = ['core-js', 'lodash', 'react', 'react-dom', 'whatwg-fetch']
const PRECOMPILED_PACKAGES_REGEX = new RegExp(`node_modules/(${PRECOMPILED_PACKAGES.join('|')})/`)

module.exports = (babel, options) => {
  const env = babel.env()
  const {
    emotion = false,
    loose = true,
    modules = env === 'test' || env === 'cjs' ? 'commonjs' : false,
    react = {},
    runtime = true,
    targets = env === 'test' ? {node: true, browsers: []} : undefined,
    typescript = {},
  } = options
  const {reactRefresh = env === 'development' && react && {}} = options

  const plugins = [
    runtime && [
      require('@babel/plugin-transform-runtime').default,
      {useESModules: !modules, version: require('@babel/runtime/package.json').version},
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
      include: NODE_MODULES_REGEX,
      compact: true,
    },
    {
      exclude: NODE_MODULES_REGEX,
      plugins: [
        [require('@babel/plugin-proposal-class-properties').default, {loose}],
        reactRefresh && [require('react-refresh/babel'), {skipEnvCheck: true, ...reactRefresh}],
      ].filter(Boolean),
      presets: [
        typescript && [require('@babel/preset-typescript').default, typescript],
        react && [
          require('@babel/preset-react').default,
          {development: env === 'development', useSpread: true, ...react},
        ],
        emotion && [
          require('@emotion/babel-preset-css-prop').default,
          {autoLabel: env === 'development', sourceMap: env === 'development', ...emotion},
        ],
      ].filter(Boolean),
    },
  ]

  return {exclude: PRECOMPILED_PACKAGES_REGEX, plugins, presets, overrides}
}
