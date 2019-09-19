# babel-preset-kensho

[![Build Status](https://travis-ci.org/kensho/babel-preset-kensho.svg?branch=master)](https://travis-ci.org/kensho/babel-preset-kensho)
[![npm](https://img.shields.io/npm/v/babel-preset-kensho.svg)](https://npm.im/babel-preset-kensho)

This [Babel 7 preset](http://babeljs.io/docs/plugins/#presets) transpiles ES2018, JSX, and selected language proposals. It also includes optimizations for specific contexts.

## Install

```
npm install -D babel-preset-kensho
```

## Usage

You can set up Babel transpilation in [several ways](http://babeljs.io/docs/setup) (e.g. via CLI, or through webpack). Choose a method, and configure Babel to include the preset, e.g. in a `.babelrc`:

```json
{
  "presets": ["kensho"]
}
```

## Options

The preset can be configured using several options. Note that some options' defaults depend on the [Babel environment](https://babeljs.io/docs/en/options#envname), which may be one of: `development` | `production` | `test` | `cjs` | `esm`

### `emotion`

`false` | [`options`](https://emotion.sh/docs/@emotion/babel-preset-css-prop#options)<br />
Default: `false`

Whether to enable support for CSS-in-JS via [Emotion](https://emotion.sh). If an `options` object is passed, it is forwarded to the [Emotion preset](https://emotion.sh/docs/@emotion/babel-preset-css-prop). This option requires an additional dependency on [`@emotion/core`](https://npm.im/@emotion/core).

### `loose`

`true` | `false`<br />
Default: `true`

Whether to enable [loose mode](http://2ality.com/2015/12/babel6-loose-mode.html) in all presets/plugins that support this option.

### `modules`

`false` | `'commonjs'`<br />
Default: `'commonjs'` in `test` and `cjs` envs, `false` otherwise

Whether to compile ESM imports/exports to another module format.

```js
// false:
import foo from './foo'

// 'commonjs' (roughly):
const foo = require('./foo')
```

### `react`

`false` | [`options`](https://babeljs.io/docs/en/babel-preset-react#options)<br />
Default: `{}`

Whether to transpile JSX expressions. If an `options` object is passed, it is forwarded to the [React preset](https://babeljs.io/docs/en/babel-preset-react).

### `runtime`

`true` | `false`<br />
Default: `true`

Whether to enable the [Babel runtime transform](https://babeljs.io/docs/en/next/babel-plugin-transform-runtime). This is encouraged to reduce bundle size, but requires adding `@babel/runtime` as a dependency.

### `targets`

See [`@babel/preset-env` options documentation](http://babeljs.io/docs/en/babel-preset-env#targets).<br />
Default: current node version in `test` environment, inferred from browserslist config otherwise

The transpilation targets to pass to `@babel/preset-env`.

### `typescript`

`false` | [`options`](https://babeljs.io/docs/en/babel-preset-typescript#options)<br />
Default: `{}`

Whether to enable TypeScript support. If an `options` object is passed, it's passed to the TypeScript preset.
