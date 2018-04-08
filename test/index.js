import fs from 'fs'

import test from 'ava'
import {transform} from '@babel/core'

process.env.NODE_ENV = 'development'

function snapshot(t, fixture, presetOptions = {}) {
  const filename = `${__dirname}/fixtures/${fixture}.js`
  const input = fs.readFileSync(filename, 'utf8')
  const preset = require('..')
  const options = {presets: [[preset, presetOptions]], babelrc: false}
  const result = transform(input, options)
  t.snapshot(result.code)
}

test('transforms ES2018+ syntax', snapshot, 'esnext')
test('transforms ES2018+ syntax in loose mode', snapshot, 'esnext', {loose: true})
test('does not transpile ES modules', snapshot, 'esm')
test(`transpiles ES modules when {modules: 'commonjs'}`, snapshot, 'esm', {modules: 'commonjs'})
test('cherry picks lodash modules', snapshot, 'lodash')
test('does not modify lodash imports when {lodash: false}', snapshot, 'lodash', {lodash: false})
