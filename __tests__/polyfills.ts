import {test, expect} from '@jest/globals'

import transform from '../helpers/transform'

test('narrows polyfill imports', () => {
  const code = `import 'core-js/stable'`

  expect(transform({code, env: 'development', targets: 'Chrome 90'})).toMatchInlineSnapshot(
    `import 'core-js/modules/web.immediate.js'`
  )

  expect(transform({code, env: 'production', targets: 'Chrome 90'})).toMatchInlineSnapshot(
    `import 'core-js/modules/web.immediate.js'`
  )

  expect(transform({code, env: 'esm'})).toMatchInlineSnapshot(``)

  expect(transform({code, env: 'cjs'})).toMatchInlineSnapshot(`'use strict'`)
})
