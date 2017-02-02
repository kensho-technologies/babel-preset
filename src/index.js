import pluginLodash from 'babel-plugin-lodash'
import pluginReactRequire from 'babel-plugin-react-require'
import presetLatest from 'babel-preset-latest'
import presetStage1 from 'babel-preset-stage-1'
import presetReact from 'babel-preset-react'

const defaultOptions = {
  lodash: true,
  modules: 'commonjs',
}

export default (context, userOptions) => {
  const options = {...defaultOptions, ...userOptions}
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
