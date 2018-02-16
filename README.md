# babel-preset-kensho

[![Build Status](https://travis-ci.org/kensho/babel-preset-kensho.svg?branch=master)](https://travis-ci.org/kensho/babel-preset-kensho)

This [Babel preset](http://babeljs.io/docs/plugins/#presets) transpiles ES2017+/JSX to ES5. It includes [stage >=3 proposals](https://babeljs.io/docs/plugins/preset-stage-3/) and some [extra goodies](src/index.js).

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

Optionally, configure the preset:

```json
{
  "presets": [
    ["kensho", {"lodash": false}]
  ]
}
```
