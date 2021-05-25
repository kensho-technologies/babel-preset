/* eslint-disable global-require */

const NODE_MODULES_REGEX = /node_modules/

// webpack@4 depends on versions of acorn and terser that lack support for certain modern syntax,
// so, when transpiling an app, these plugins must be included
const APP_PLUGIN_INCLUDE_LIST = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-private-methods',
  '@babel/plugin-proposal-logical-assignment-operators',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-optional-chaining',
]

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

const SUPPORTED_ENVIRONMENTS = [
  'development',
  'production',
  'esm',
  'cjs',
  'test',
  'development-modern',
  'production-modern',
]

function getUnsupportedEnvMessage(env) {
  const supportedEnvsString = SUPPORTED_ENVIRONMENTS.join(', ')
  return `Unexpected Babel environment: \`${env}\`. This preset supports: ${supportedEnvsString}.`
}

function getDefaultTargets(env) {
  if (env === 'test') return {node: true, browsers: []}
  if (env === 'esm' || env === 'cjs') return {node: '14.14', browsers: []}
  return undefined // targets will be overridden using the browserslistEnv preset-env config
}

module.exports = (babel, options) => {
  const env = babel.env()

  if (!SUPPORTED_ENVIRONMENTS.includes(env)) {
    throw new Error(getUnsupportedEnvMessage(env))
  }

  const isModern = env === 'development-modern' || env === 'production-modern'
  const isDevelopment = env === 'development' || env === 'development-modern'
  const isProduction = env === 'production' || env === 'production-modern'

  const {
    browserslistEnv = isModern ? 'modern' : undefined,
    emotion = false,
    include = isDevelopment || isProduction ? APP_PLUGIN_INCLUDE_LIST : [],
    modules = env === 'test' || env === 'cjs' ? 'commonjs' : false,
    react = {},
    reactRefresh = isDevelopment && react && {},
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
        {
          ...rest,
          browserslistEnv,
          include,
          modules,
          targets,
          bugfixes: true,
          corejs: 3,
          useBuiltIns: 'entry',
        },
      ],
    ],
  }

  const reactRuntime = (emotion && emotion.runtime) || (react && react.runtime) || 'automatic'
  const isEmotionPluginEnabled = emotion && reactRuntime === 'automatic'
  const isEmotionPresetEnabled = emotion && reactRuntime !== 'automatic'

  const nonNodeModules = {
    exclude: NODE_MODULES_REGEX,
    plugins: [
      reactRefresh && [require('react-refresh/babel'), {skipEnvCheck: true, ...reactRefresh}],
      isEmotionPluginEnabled && [require('@emotion/babel-plugin').default, {...emotion}],
    ].filter(Boolean),
    presets: [
      typescript && [require('@babel/preset-typescript').default, typescript],
      react && [
        require('@babel/preset-react').default,
        {
          development: isDevelopment,
          importSource: emotion && reactRuntime === 'automatic' ? '@emotion/react' : undefined,
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
