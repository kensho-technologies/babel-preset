/* eslint-disable global-require */

const NODE_MODULES_REGEX = /node_modules/

// webpack@4 depends on a version of acorn that lacks support for optional chaining and nullish
// coalescing syntax, so, when transpiling an app, these plugins must be included
const APP_PLUGIN_INCLUDE_LIST = [
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
]

const PRECOMPILED_PACKAGES = ['core-js', 'lodash', 'react', 'react-dom', 'whatwg-fetch']
const PRECOMPILED_PACKAGES_REGEX = new RegExp(`node_modules/(${PRECOMPILED_PACKAGES.join('|')})/`)

function getDefaultTargets(env) {
  if (env === 'test') return {node: true, browsers: []}
  if (env === 'esm' || env === 'cjs') return {node: '12.16', browsers: []}
  return undefined
}

module.exports = (babel, options) => {
  const env = babel.env()
  const {
    emotion = false,
    include = env === 'development' || env === 'production' ? APP_PLUGIN_INCLUDE_LIST : [],
    loose = true,
    modules = env === 'test' || env === 'cjs' ? 'commonjs' : false,
    react = {},
    runtime = true,
    targets = getDefaultTargets(env),
    typescript = {},
  } = options
  const {reactRefresh = env === 'development' && react && {}} = options

  const nodeModules = {
    include: NODE_MODULES_REGEX,
    compact: true,
    sourceType: 'unambiguous',
  }

  const nonPrecompiledPackages = {
    exclude: PRECOMPILED_PACKAGES_REGEX,
    plugins: [
      runtime && [
        require('@babel/plugin-transform-runtime').default,
        {useESModules: !modules, version: require('@babel/runtime/package.json').version},
      ],
    ].filter(Boolean),
    presets: [
      [
        require('@babel/preset-env').default,
        {include, loose, modules, targets, bugfixes: true, corejs: 3, useBuiltIns: 'entry'},
      ],
    ],
  }

  const nonNodeModules = {
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
        {sourceMap: env === 'development', ...emotion},
      ],
    ].filter(Boolean),
  }

  return {overrides: [nodeModules, nonPrecompiledPackages, nonNodeModules]}
}
