import {test, expect} from '@jest/globals'

import transform from '../helpers/transform'

test('strips type annotations in .ts files', () => {
  const filename = 'file.ts'
  const code = `var one: number = 1`

  expect(transform({code, filename, env: 'development'})).toMatchInlineSnapshot(`var one = 1`)
  expect(transform({code, filename, env: 'production'})).toMatchInlineSnapshot(`var one = 1`)
  expect(transform({code, filename, env: 'esm'})).toMatchInlineSnapshot(`var one = 1`)
  expect(transform({code, filename, env: 'cjs'})).toMatchInlineSnapshot(`
    'use strict'
    var one = 1
  `)
})

test('strips type annotations in .tsx files', () => {
  const filename = 'file.tsx'
  const code = `var one: number = 1`

  expect(transform({code, filename, env: 'development'})).toMatchInlineSnapshot(`var one = 1`)
  expect(transform({code, filename, env: 'production'})).toMatchInlineSnapshot(`var one = 1`)
  expect(transform({code, filename, env: 'esm'})).toMatchInlineSnapshot(`var one = 1`)
  expect(transform({code, filename, env: 'cjs'})).toMatchInlineSnapshot(`
    'use strict'
    var one = 1
  `)
})
