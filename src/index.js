import pluginReactRequire from 'babel-plugin-react-require';
import presetLatest from 'babel-preset-latest';
import presetStage1 from 'babel-preset-stage-1';
import react from 'babel-preset-react';

export default () => {
  return {
    plugins: [
      pluginReactRequire,
    ],
    presets: [
      presetLatest,
      presetStage1,
      presetReact,
    ]
  }
}
