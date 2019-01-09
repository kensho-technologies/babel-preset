import fs from 'fs'

import test from 'ava'
import {transform} from '@babel/core'

import libPreset from '..'

import appPreset from '../app'

function snapshot(t, fixture, preset = libPreset, presetOptions = {}, envName = 'development') {
  const filename = `${__dirname}/fixtures/${fixture}`
  const input = fs.readFileSync(filename, 'utf8')
  t.snapshot(input, 'input')
  const options = {envName, presets: [[preset, presetOptions]], filename, babelrc: false}
  const result = transform(input, options)
  t.snapshot(result.code, 'output')
}

snapshot.title = (provided, fixture, preset, options, envName) => {
  const withPreset = preset ? `with the app preset` : `with the lib preset`
  const when = options ? ` when ${JSON.stringify(options)}` : ' by default'
  const inEnv = envName ? ` in ${envName} environment` : ''
  return `${provided} ${withPreset}${when}${inEnv}`
}

test('transpiles ES2018+ syntax for ES2015', snapshot, 'esnext.js')
test('transpiles ES2018+ syntax for node', snapshot, 'esnext.js', undefined, undefined, 'test')
test('transpiles ES2018+ syntax strictly', snapshot, 'esnext.js', undefined, {loose: false})
test('transpiles ES2018+ syntax for ES5', snapshot, 'esnext.js', appPreset)

test('does not transpile ES modules', snapshot, 'esm.js')
test('transpiles ES modules', snapshot, 'esm.js', undefined, {modules: 'commonjs'})
test('transpiles ES modules', snapshot, 'esm.js', undefined, undefined, 'test')

test('does not use external helpers', snapshot, 'esm-helpers.js')
test('uses external ESM helpers', snapshot, 'esm-helpers.js', undefined, {runtime: true})
test('uses external CJS helpers', snapshot, 'esm-helpers.js', undefined, {
  modules: 'commonjs',
  runtime: true,
})

test('cherry picks lodash modules', snapshot, 'lodash.js')
test('does not cherry pick lodash modules', snapshot, 'lodash.js', undefined, {lodash: false})

test('wraps prop types assignment', snapshot, 'prop-types.js')
test('wraps prop types assignment', snapshot, 'prop-types.js', undefined, {
  removePropTypes: 'unsafe-wrap',
})
test('wraps prop types value', snapshot, 'prop-types.js', undefined, {removePropTypes: 'wrap'})
test('removes prop types', snapshot, 'prop-types.js', undefined, undefined, 'production')
test('removes prop types', snapshot, 'prop-types.js', undefined, {removePropTypes: 'remove'})
test('does not remove prop types', snapshot, 'prop-types.js', undefined, {removePropTypes: false})

test('transpiles TSX', snapshot, 'react.tsx', undefined, {typescript: true})
test('supports TS dynamic import syntax', snapshot, 'dynamic-imports.ts', undefined, {
  typescript: true,
})
