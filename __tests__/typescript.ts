import {test, expect} from '@jest/globals'

import transform from '../helpers/transform'

test('strips type annotations in .ts files', () => {
  const code = `var one: number = 1`
  const filename = 'file.ts'

  expect(transform({code, filename})).toMatchInlineSnapshot(`
    // BABEL_ENV development, production, esm:
    var one = 1

    // BABEL_ENV cjs:
    'use strict'
    var one = 1
  `)
})

test('strips type annotations in .tsx files', () => {
  const code = `var one: number = 1`
  const filename = 'file.tsx'

  expect(transform({code, filename})).toMatchInlineSnapshot(`
    // BABEL_ENV development, production, esm:
    var one = 1

    // BABEL_ENV cjs:
    'use strict'
    var one = 1
  `)
})
