# babel-preset-kensho

[![Build Status](https://travis-ci.org/kensho/babel-preset-kensho.svg?branch=master)](https://travis-ci.org/kensho/babel-preset-kensho)
[![npm](https://img.shields.io/npm/v/babel-preset-kensho.svg)](https://npm.im/babel-preset-kensho)

This [Babel 7 preset](http://babeljs.io/docs/plugins/#presets) transpiles ES2018, JSX, and selected language proposals to ES5. It also includes optimizations for specific contexts.

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

The preset can be configured using several options. Note that some options' defaults depend on the [Babel environment](https://babeljs.io/docs/en/options#envname), which may be one of: `development` | `production` | `test` | `cjs`

### `lodash`

`true` | `false`<br />
Default: `true`

Whether to transpile [Lodash](https://lodash.com) imports using [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) to reduce bundle size.

```js
// false:
import {map, reduce} from 'lodash'

// true:
import map from 'lodash/map'
import reduce from 'lodash/reduce'
```

### `loose`

`true` | `false`<br />
Default: `true`

Whether to enable [loose mode](http://2ality.com/2015/12/babel6-loose-mode.html) in all presets/plugins that support this option.

### `modules`

`false` | `'commonjs'`<br />
Default: `'commonjs'` in `cjs`/`test` env, `false` otherwise

Whether to compile ESM imports/exports to another module format.

```js
// false:
import foo from './foo'

// 'commonjs' (roughly):
const foo = require('./foo')
```

### `removePropTypes`

`'remove'` | `'wrap'` | `'unsafe-wrap'` | `false`<br />
Default: `'remove'` in `production` env, `'unsafe-wrap'` otherwise

Whether to remove React component `propTypes` assignment to reduce bundle size. When set to `'remove'`, also removes imports of the `prop-types` module.

```js
// false:
Foo.propTypes = {bar: PropTypes.string}

// 'wrap':
Foo.propTypes = process.env.NODE_ENV !== 'production' ? {bar: PropTypes.string} : {}

// 'unsafe-wrap':
process.env.NODE_ENV !== 'production' ? Foo.propTypes = {bar: PropTypes.string} : void 0

// 'remove':

```

### `runtime`

`true` | `false`<br />
Default: `false`

Whether to enable the [Babel runtime transform](https://babeljs.io/docs/en/next/babel-plugin-transform-runtime). This is encouraged to reduce bundle size, but requires adding `@babel/runtime` as a dependency.

### `targets`

See [`@babel/preset-env` options documentation](http://babeljs.io/docs/en/babel-preset-env#targets).<br />
Default: current node version in `test` env, recent browsers otherwise

The transpilation targets to pass to `@babel/preset-env`.

### `typescript`

`true` | `false` | [`options`](https://babeljs.io/docs/en/babel-preset-typescript#options)<br />
Default: `false`

Whether to enable TypeScript support. If an `options` object is passed, it's passed to the TypeScript preset.

### `useBuiltIns`

`true` | `false`<br />
Default: `true`

Whether to assume the presence of built-in ES2015 methods (e.g. `Object.assign`) in transpiled output rather than using helper functions. This option assumes that you will be polyfilling a global ES2015 environment if you need to support non-ES2015 browsers.
