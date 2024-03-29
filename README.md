# babel-preset

[![Build Status](https://img.shields.io/github/actions/workflow/status/kensho-technologies/babel-preset/ci.yml?branch=main)](https://github.com/kensho-technologies/babel-preset/actions)
[![npm](https://img.shields.io/npm/v/@kensho-technologies/babel-preset.svg)](https://npm.im/@kensho-technologies/babel-preset)

This [Babel 7 preset](http://babeljs.io/docs/plugins/#presets) transpiles ES2020, JSX, and selected language proposals. It also includes optimizations for specific contexts.

## Install

```sh
$ npm install -D @kensho-technologies/babel-preset
```

## Usage

You can set up Babel transpilation in [several ways](http://babeljs.io/docs/setup). Choose a method, and configure Babel to include the preset, e.g. in a `babel.config.json`:

```json
{
  "presets": ["@kensho-technologies/babel-preset"]
}
```

## Options

The preset can be configured using several options. Note that some options' defaults depend on the [Babel environment](https://babeljs.io/docs/en/options#envname), which may be one of the following:

| Environment   | Purpose                                                              |
| ------------- | -------------------------------------------------------------------- |
| `development` | Transpiling an app for development.                                  |
| `production`  | Transpiling an app for production.                                   |
| `test`        | Transpiling an app or library to run in the current version of Node. |
| `cjs`         | Transpiling a library for distribution as CJS.                       |
| `esm`         | Transpiling a library for distribution as ESM.                       |

The present extends [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env), and forwards all additional options to that preset.

### `emotion`

`false` | [`options`](https://emotion.sh/docs/@emotion/babel-preset-css-prop#options)<br />
Default: `false`

Whether to enable support for CSS-in-JS via [Emotion](https://emotion.sh). If an `options` object is passed, it is forwarded to the [Emotion plugin](https://emotion.sh/docs/@emotion/babel-plugin). This option requires an additional dependency on [`@emotion/react`](https://npm.im/@emotion/react).

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

### `reactRefresh`

`false` | `options`<br />
Default: `{}` in `development` env if `react` is enabled

Whether to transform React function components for fast refresh. If an `options` object is passed, it is forwarded to the [React Refresh plugin](https://github.com/facebook/react/tree/3c1efa0d771d3dfb2666b7f4a4392cc851146d44/packages/react-refresh). The list of available options is not currently documented.

This option should only ever be enabled in development. It also requires [bundler integration](https://github.com/pmmmwh/react-refresh-webpack-plugin) because the output code references global variables containing the Refresh runtime. If this integration cannot be added to a project's development environment, this option should be disabled.

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

## License

Licensed under the Apache 2.0 License. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

Copyright 2020-present Kensho Technologies, LLC. The present date is determined by the timestamp of the most recent commit in the repository.
