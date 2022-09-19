/* eslint-disable global-require */

const NODE_MODULES_REGEX = /node_modules/

const PRECOMPILED_PACKAGES = ['core-js', 'lodash', 'react', 'react-dom', 'whatwg-fetch']
const PRECOMPILED_PACKAGES_REGEX = new RegExp(`node_modules/(${PRECOMPILED_PACKAGES.join('|')})/`)

// by default, enable most advanced optimizations to roughly match the behavior of `loose` mode,
// trading off on absolute spec compliance for output size and efficiency
const assumptions = {
  constantSuper: true,
  ignoreFunctionLength: true,
  ignoreToPrimitiveHint: true,
  mutableTemplateObject: true,
  noClassCalls: true,
  noDocumentAll: true,
  noNewArrows: true,
  objectRestNoSymbols: true,
  privateFieldsAsProperties: true,
  pureGetters: true,
  setClassMethods: true,
  setComputedProperties: true,
  setPublicClassFields: true,
  setSpreadProperties: true,
  skipForOfIteratorClosing: true,
  superIsCallableConstructor: true,
}

const SUPPORTED_ENVIRONMENTS = ['development', 'production', 'esm', 'cjs', 'test']

function getUnsupportedEnvMessage(env) {
  const supportedEnvsString = SUPPORTED_ENVIRONMENTS.join(', ')
  return `Unexpected Babel environment: \`${env}\`. This preset supports: ${supportedEnvsString}.`
}

function getDefaultTargets(env) {
  if (env === 'test') return {node: true, browsers: []}
  if (env === 'esm' || env === 'cjs') return {node: '16.13', browsers: []}
  return undefined
}

module.exports = (babel, options) => {
  const env = babel.env()

  if (!SUPPORTED_ENVIRONMENTS.includes(env)) {
    throw new Error(getUnsupportedEnvMessage(env))
  }

  const {
    emotion = false,
    modules = env === 'test' || env === 'cjs' ? 'commonjs' : false,
    react = {},
    reactRefresh = env === 'development' && react && {},
    runtime = true,
    targets = getDefaultTargets(env),
    typescript = {},
    ...rest
  } = options

  const nodeModules = {
    include: NODE_MODULES_REGEX,
    compact: true,
    sourceType: 'unambiguous',
  }

  const nonPrecompiledPackages = {
    exclude: PRECOMPILED_PACKAGES_REGEX,
    assumptions,
    plugins: [
      runtime && [
        require('@babel/plugin-transform-runtime').default,
        {version: require('@babel/runtime/package.json').version},
      ],
    ].filter(Boolean),
    presets: [
      [
        require('@babel/preset-env').default,
        {...rest, modules, targets, bugfixes: true, corejs: 3, useBuiltIns: 'entry'},
      ],
    ],
  }

  const nonNodeModules = {
    exclude: NODE_MODULES_REGEX,
    plugins: [
      reactRefresh && [require('react-refresh/babel'), {skipEnvCheck: true, ...reactRefresh}],
      [require('@emotion/babel-plugin').default, {...emotion}],
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
          runtime: 'automatic',
        },
      ],
    ].filter(Boolean),
  }

  return {overrides: [nodeModules, nonPrecompiledPackages, nonNodeModules]}
}
