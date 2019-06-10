import fs from 'fs'

import test from 'ava'
import {transform} from '@babel/core'

import preset from '.'

function snapshot(t, fixture, presetOptions = {}, envName = 'development') {
  const filename = `${__dirname}/fixtures/${fixture}`
  const input = fs.readFileSync(filename, 'utf8')
  t.snapshot(input, 'input')
  const options = {envName, presets: [[preset, presetOptions]], filename, babelrc: false}
  const result = transform(input, options)
  t.snapshot(result.code, 'output')
}

snapshot.title = (provided, fixture, options, envName) => {
  const when = options ? `when ${JSON.stringify(options)}` : 'by default'
  const inEnv = envName ? ` in ${envName} environment` : ''
  return `${provided} ${when}${inEnv}`
}

test('transpiles ES2018+ syntax', snapshot, 'esnext.js')
test('transpiles ES2018+ syntax for node', snapshot, 'esnext.js', undefined, 'test')
test('transpiles ES2018+ syntax for specific targets', snapshot, 'esnext.js', {
  targets: 'last 2 Chrome versions',
})
test('transpiles ES2018+ syntax strictly', snapshot, 'esnext.js', {loose: false})

test('transpiles standard JS in node_modules', snapshot, 'node_modules/dependency.js')

test('does not transpile ES modules', snapshot, 'esm.js')
test('transpiles ES modules', snapshot, 'esm.js', {modules: 'commonjs'})
test('transpiles ES modules', snapshot, 'esm.js', undefined, 'test')

test('uses external ESM helpers', snapshot, 'esm-helpers.js')
test('does not use external helpers', snapshot, 'esm-helpers.js', {runtime: false})
test('uses external CJS helpers', snapshot, 'esm-helpers.js', {modules: 'commonjs'})

test('transpiles TSX', snapshot, 'react.tsx')
test('transpiles TSX with custom pragma', snapshot, 'react.tsx', {react: {pragma: 'jsx'}})
test('supports TS dynamic import syntax', snapshot, 'dynamic-imports.ts')

test('replaces generic polyfill with env-targeted polyfills', snapshot, 'polyfills.ts')

test('replaces pragma and optimizes styles', snapshot, 'emotion.js', {emotion: true})
test('optimizes generated class names', snapshot, 'emotion.js', {emotion: true}, 'production')
