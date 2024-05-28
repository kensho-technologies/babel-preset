import * as fs from 'fs'

import {test, expect} from '@jest/globals'
import {transformSync} from '@babel/core'

import preset from './index'

// the 'test' environment is excluded because it targets the currently running version of Node
// since our CI runs multiple Node versions, a snapshot for 'test' might not match one of them
const NON_TEST_ENVIRONMENTS = ['development', 'production', 'esm', 'cjs']

function macro(title: string, fixture: string, presetOptions = {}, topLevelOptions = {}): void {
  const presetOptionsString = JSON.stringify(presetOptions)
  const topLevelOptionsString = JSON.stringify(topLevelOptions)
  test(`${title} given ${presetOptionsString}, ${topLevelOptionsString}`, () => {
    const file = `${__dirname}/fixtures/${fixture}`
    const input = fs.readFileSync(file, 'utf8')
    expect(input).toMatchSnapshot('input')

    NON_TEST_ENVIRONMENTS.forEach((envName) => {
      const result = transformSync(input, {
        envName,
        presets: [[preset, presetOptions]],
        filename: `/${fixture}`,
        babelrc: false,
        ...topLevelOptions,
      })
      expect(result?.code).toMatchSnapshot(`output (${envName})`)
    })
  })
}

macro('transpiles ES2020+ syntax', 'syntax.js')
macro('transpiles ES2020+ syntax', 'syntax.js', undefined, {targets: 'Chrome 125'})
macro('transpiles ES2020+ syntax', 'syntax.js', {runtime: false})
macro('transpiles ES2020+ syntax', 'syntax.js', {modules: 'commonjs'})
macro('transpiles ES2020+ syntax', 'syntax.js', undefined, {
  assumptions: {enumerableModuleMeta: true},
})

macro('transpiles React', 'react.js')
macro('transpiles TSX', 'typescript.tsx')
macro('transpiles Emotion', 'emotion.js', {emotion: true})

macro('replaces generic polyfill with env-targeted polyfills', 'polyfills.js')
macro('replaces generic polyfill with env-targeted polyfills', 'polyfills.js', undefined, {
  targets: 'Chrome 125',
})

macro('transpiles ESM in node_modules', 'vendor/node_modules/my-pkg/index.js')
macro('transpiles CJS in node_modules', 'vendor/node_modules/my-pkg/cjs.js')
macro('avoids transpiling known precompiled packages', 'vendor/node_modules/react/index.js')
