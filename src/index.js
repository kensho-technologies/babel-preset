import pluginLodash from 'babel-plugin-lodash'
import pluginReactRequire from 'babel-plugin-react-require'
import presetLatest from 'babel-preset-latest'
import presetStage1 from 'babel-preset-stage-1'
import presetReact from 'babel-preset-react'

const defaultOptions = {
  lodash: true,
}

export default (context, userOptions) => {
  const options = {...defaultOptions, ...userOptions}
  if (options.modules === undefined) {
    if (process.env.BABEL_ENV === 'cjs') options.modules = 'commonjs'
    else if (process.env.BABEL_ENV === 'es') options.modules = false
  }
  return {
    plugins: [
      options.lodash && pluginLodash,
      pluginReactRequire,
    ].filter(Boolean),
    presets: [
      [presetLatest, {es2015: {modules: options.modules}}],
      presetStage1,
      presetReact,
    ],
  }
}
