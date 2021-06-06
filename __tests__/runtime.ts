import {test, expect} from '@jest/globals'

import transform from '../helpers/transform'

const code = `const {foo, ...rest} = obj`
const targets = 'IE 11' // ensures that a helper is required to transpile the rest operator

test('imports external runtime helpers by default', () => {
  const options = {targets}
  const development = transform({code, options, env: 'development'})
  const production = transform({code, options, env: 'production'})
  const esm = transform({code, options, env: 'esm'})
  const cjs = transform({code, options, env: 'cjs'})

  expect(development).toMatchInlineSnapshot(`
    import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/objectWithoutPropertiesLoose'
    var _obj = obj,
      foo = _obj.foo,
      rest = _objectWithoutPropertiesLoose(_obj, ['foo'])
  `)

  expect(production).toBe(development)
  expect(esm).toBe(development)

  expect(cjs).toMatchInlineSnapshot(`
    'use strict'
    var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault').default
    var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
      require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
    )
    var _obj = obj,
      foo = _obj.foo,
      rest = (0, _objectWithoutPropertiesLoose2.default)(_obj, ['foo'])
  `)
})

test('injects runtime helpers when `runtime` is disabled', () => {
  const options = {targets, runtime: false}
  const development = transform({code, options, env: 'development'})
  const production = transform({code, options, env: 'production'})
  const esm = transform({code, options, env: 'esm'})
  const cjs = transform({code, options, env: 'cjs'})

  expect(development).toMatchInlineSnapshot(`
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {}
      var target = {}
      var sourceKeys = Object.keys(source)
      var key, i
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i]
        if (excluded.indexOf(key) >= 0) continue
        target[key] = source[key]
      }
      return target
    }
    var _obj = obj,
      foo = _obj.foo,
      rest = _objectWithoutPropertiesLoose(_obj, ['foo'])
  `)

  expect(production).toBe(development)
  expect(esm).toBe(development)

  expect(cjs).toMatchInlineSnapshot(`
    'use strict'
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {}
      var target = {}
      var sourceKeys = Object.keys(source)
      var key, i
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i]
        if (excluded.indexOf(key) >= 0) continue
        target[key] = source[key]
      }
      return target
    }
    var _obj = obj,
      foo = _obj.foo,
      rest = _objectWithoutPropertiesLoose(_obj, ['foo'])
  `)
})
