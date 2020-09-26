import * as fs from 'fs'

import {PluginItem, transform, TransformOptions} from '@babel/core'

import preset from '.'

function macro(
  title: string,
  fixture: string,
  presetOptions: {[key: string]: unknown} = {},
  envName = 'development'
): void {
  const when = presetOptions ? `when ${JSON.stringify(presetOptions)}` : 'by default'
  const inEnv = envName ? ` in ${envName} environment` : ''
  const testName = `${title} ${when}${inEnv}`
  test(testName, () => {
    const file = `${__dirname}/fixtures/${fixture}`
    const input = fs.readFileSync(file, 'utf8')
    expect(input).toMatchSnapshot('input')
    const presets: PluginItem[] = [[preset, presetOptions]]
    const options: TransformOptions = {envName, presets, filename: `/${fixture}`, babelrc: false}
    const result = transform(input, options)
    expect(result?.code).toMatchSnapshot('output')
  })
}

macro('transpiles ES2018+ syntax', 'esnext.js')
macro('transpiles ES2018+ syntax for node', 'esnext.js', undefined, 'test')
macro('transpiles ES2018+ syntax for libraries', 'esnext.js', undefined, 'esm')
macro('transpiles ES2018+ syntax for specific targets', 'esnext.js', {
  targets: 'last 2 Chrome versions',
})
macro('transpiles ES2018+ syntax strictly', 'esnext.js', {loose: false})

macro('transpiles standard JS in node_modules', 'node_modules/my-pkg/index.js')
macro('transpiles CJS in node_modules', 'node_modules/my-pkg/cjs.js')
macro('avoids transpiling known precompiled packages', 'node_modules/react/index.js')

macro('does not transpile ES modules', 'esm.js')
macro('transpiles ES modules', 'esm.js', {modules: 'commonjs'})
macro('transpiles ES modules', 'esm.js', undefined, 'cjs')
macro('transpiles ES modules', 'esm.js', undefined, 'test')

macro('uses external ESM helpers', 'esm-helpers.js')
macro('does not use external helpers', 'esm-helpers.js', {runtime: false})
macro('uses external CJS helpers', 'esm-helpers.js', {modules: 'commonjs'})

macro('transpiles experimental TS features', 'experimental.tsx')

macro('transpiles TSX', 'react.tsx')
macro('transpiles TSX with custom pragma', 'react.tsx', {react: {pragma: 'jsx'}})
macro('supports TS dynamic import syntax', 'dynamic-imports.ts')

macro('replaces generic polyfill with env-targeted polyfills', 'polyfills.ts')

macro('replaces pragma and optimizes styles', 'emotion.js', {emotion: true})
macro('optimizes generated class names', 'emotion.js', {emotion: true}, 'production')
