/* eslint-disable global-require */

const NODE_MODULES_REGEX = /node_modules/

const PRECOMPILED_PACKAGES = ['core-js', 'lodash', 'react', 'react-dom', 'whatwg-fetch']
const PRECOMPILED_PACKAGES_REGEX = new RegExp(`node_modules/(${PRECOMPILED_PACKAGES.join('|')})/`)

function getDefaultTargets(env) {
  if (env === 'test') return {node: true, browsers: []}
  if (env === 'esm' || env === 'cjs') return {node: '14.14', browsers: []}
  return undefined
}

module.exports = (babel, options) => {
  const env = babel.env()
  const {
    emotion = false,
    include,
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

  const reactRuntime = (emotion && emotion.runtime) || (react && react.runtime) || 'automatic'
  const isEmotionPluginEnabled = emotion && reactRuntime === 'automatic'
  const isEmotionPresetEnabled = emotion && reactRuntime !== 'automatic'

  const nonNodeModules = {
    exclude: NODE_MODULES_REGEX,
    plugins: [
      [require('@babel/plugin-proposal-class-properties').default, {loose}],
      reactRefresh && [require('react-refresh/babel'), {skipEnvCheck: true, ...reactRefresh}],
      isEmotionPluginEnabled && [require('@emotion/babel-plugin').default, {...emotion}],
    ].filter(Boolean),
    presets: [
      typescript && [require('@babel/preset-typescript').default, typescript],
      react && [
        require('@babel/preset-react').default,
        {
          development: env === 'development',
          importSource: emotion ? '@emotion/react' : undefined,
          useSpread: true,
          ...react,
          runtime: reactRuntime,
        },
      ],
      isEmotionPresetEnabled && [
        require('@emotion/babel-preset-css-prop').default,
        {useSpread: true, ...react, ...emotion, runtime: undefined},
      ],
    ].filter(Boolean),
  }

  return {overrides: [nodeModules, nonPrecompiledPackages, nonNodeModules]}
}
