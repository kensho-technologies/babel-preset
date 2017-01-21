import pluginLodash from 'babel-plugin-lodash';
import pluginReactRequire from 'babel-plugin-react-require';
import presetLatest from 'babel-preset-latest';
import presetStage1 from 'babel-preset-stage-1';
import presetReact from 'babel-preset-react';

const defaultOptions = {
  lodash: true,
}

export default (context, options) => {
  options = {...defaultOptions, ...options}
  return {
    plugins: [
      options.lodash && pluginLodash,
      pluginReactRequire,
    ].filter(Boolean),
    presets: [
      presetLatest,
      presetStage1,
      presetReact,
    ]
  }
}
