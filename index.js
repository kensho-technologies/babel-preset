const {BABEL_ENV, NODE_ENV} = process.env

const defaultOptions = {
  lodash: true,
  modules: BABEL_ENV === 'cjs' || NODE_ENV === 'test' ? 'commonjs' : false,
  targets: {
    browsers: ['IE 11', 'last 2 Edge versions', 'Firefox >= 45', 'last 2 Chrome versions'],
    node: 8,
  },
}

module.exports = (context, userOptions) => {
  const options = Object.assign({}, defaultOptions, userOptions)

  const plugins = [
    // ensure that React is imported if JSX is used
    require('babel-plugin-react-require').default,
  ]

  if (options.lodash) plugins.push(require('babel-plugin-lodash'))

  const presets = [
    [require('@babel/preset-env'), {modules: options.modules, targets: options.targets}],
    [require('@babel/preset-stage-1'), {useBuiltIns: true}],
    [require('@babel/preset-react'), {useBuiltIns: true}],
  ]

  return {plugins, presets}
}
