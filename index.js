const {BABEL_ENV, NODE_ENV} = process.env

const defaultOptions = {
  lodash: true,
  loose: false,
  modules: BABEL_ENV === 'cjs' || NODE_ENV === 'test' ? 'commonjs' : false,
  targets: {
    browsers: ['IE 11', 'last 2 Edge versions', 'Firefox >= 45', 'last 2 Chrome versions'],
    node: 8,
  },
}

module.exports = (context, userOptions) => {
  const {lodash, loose, modules, targets} = Object.assign({}, defaultOptions, userOptions)

  const plugins = [require('babel-plugin-react-require').default]
  if (lodash) plugins.push(require('babel-plugin-lodash'))

  const presets = [
    [require('@babel/preset-env'), {loose, modules, targets}],
    [require('@babel/preset-stage-1'), {loose, useBuiltIns: true}],
    [require('@babel/preset-react'), {useBuiltIns: true}],
  ]

  return {plugins, presets}
}
