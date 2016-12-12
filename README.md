# babel-preset-kensho

This [Babel preset](http://babeljs.io/docs/plugins/#presets) transpiles ES2016/JSX to ES5. It also includes some experimental features (stage >= 1).

## Usage

You can set up Babel transpilation in [a number of ways](http://babeljs.io/docs/setup) (e.g. via CLI, or through webpack). After you've chosen a method and installed it, install this preset as a development dependency:

```sh
$ npm install -D babel-preset-kensho
```

Then add a `.babelrc` which includes the preset:

```json
{
  "presets": ["kensho"]
}
```
