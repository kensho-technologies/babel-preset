import fs from 'fs'

import test from 'ava'
import {transform} from '@babel/core'

function snapshot(t, fixture, presetOptions = {}, env = 'development') {
  process.env.BABEL_ENV = env
  const filename = `${__dirname}/fixtures/${fixture}.js`
  const input = fs.readFileSync(filename, 'utf8')
  const preset = require('..')
  const options = {presets: [[preset, presetOptions]], babelrc: false}
  const result = transform(input, options)
  t.snapshot(result.code)
}

test('transpiles ES2018+ syntax', snapshot, 'esnext')
test('transpiles ES2018+ syntax in test env', snapshot, 'esnext', undefined, 'test')
test(`transpiles ES2018+ syntax strictly when {loose: false}`, snapshot, 'esnext', {loose: false})

test('does not transpile ES modules', snapshot, 'esm')
test(`transpiles ES modules when {modules: 'commonjs'}`, snapshot, 'esm', {modules: 'commonjs'})
test(`transpiles ES modules in test env`, snapshot, 'esm', undefined, 'test')

test('cherry picks lodash modules', snapshot, 'lodash')
test('does not modify lodash imports when {lodash: false}', snapshot, 'lodash', {lodash: false})

test('wraps prop types', snapshot, 'prop-types')
test('removes prop types in production env', snapshot, 'prop-types', undefined, 'production')
