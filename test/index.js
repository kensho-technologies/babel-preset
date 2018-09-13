import fs from 'fs'

import test from 'ava'
import {transform} from '@babel/core'

import preset from '..'

function snapshot(t, fixture, presetOptions = {}, envName = 'development') {
  const filename = `${__dirname}/fixtures/${fixture}.js`
  const input = fs.readFileSync(filename, 'utf8')
  const options = {envName, presets: [[preset, presetOptions]], babelrc: false}
  const result = transform(input, options)
  t.snapshot(result.code)
}

snapshot.title = (provided, fixture, options, envName) => {
  const when = options ? `when ${JSON.stringify(options)}` : 'by default'
  const inEnv = envName ? ` in ${envName} environment` : ''
  return `${provided} ${when}${inEnv}`
}

test('transpiles ES2018+ syntax', snapshot, 'esnext')
test('transpiles ES2018+ syntax for node', snapshot, 'esnext', undefined, 'test')
test('transpiles ES2018+ syntax strictly', snapshot, 'esnext', {loose: false})

test('does not transpile ES modules', snapshot, 'esm')
test('transpiles ES modules', snapshot, 'esm', {modules: 'commonjs'})
test('transpiles ES modules', snapshot, 'esm', undefined, 'test')

test('does not use external helpers', snapshot, 'esm-helpers')
test('uses external ESM helpers', snapshot, 'esm-helpers', {runtime: true})
test('uses external CJS helpers', snapshot, 'esm-helpers', {modules: 'commonjs', runtime: true})

test('cherry picks lodash modules', snapshot, 'lodash')
test('does not cherry pick lodash modules', snapshot, 'lodash', {lodash: false})

test('wraps prop types assignment', snapshot, 'prop-types')
test('wraps prop types assignment', snapshot, 'prop-types', {removePropTypes: 'unsafe-wrap'})
test('wraps prop types value', snapshot, 'prop-types', {removePropTypes: 'wrap'})
test('removes prop types', snapshot, 'prop-types', undefined, 'production')
test('removes prop types', snapshot, 'prop-types', {removePropTypes: 'remove'})
test('does not remove prop types', snapshot, 'prop-types', {removePropTypes: false})

test('inlines React elements', snapshot, 'component', undefined, 'production')
test('does not inline React elements', snapshot, 'component')
test(
  'does not inline React elements',
  snapshot,
  'component',
  {inlineReactElements: false},
  'production'
)
test(
  'inlines React elements with external helper',
  snapshot,
  'component',
  {runtime: true},
  'production'
)
