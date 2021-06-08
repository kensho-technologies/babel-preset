import {test, expect} from '@jest/globals'

import transform from '../helpers/transform'

test('static imports', () => {
  const code = `
    import defaultExport, {namedExport} from 'foo'
    import * as namespace from 'bar'
    console.log(defaultExport, namedExport, namespace)
  `

  expect(transform({code})).toMatchInlineSnapshot(`
    // BABEL_ENV development, production, esm:
    import defaultExport, {namedExport} from 'foo'
    import * as namespace from 'bar'
    console.log(defaultExport, namedExport, namespace)

    // BABEL_ENV cjs:
    'use strict'
    var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard').default
    var _foo = _interopRequireWildcard(require('foo'))
    var namespace = _interopRequireWildcard(require('bar'))
    console.log(_foo.default, _foo.namedExport, namespace)
  `)
})

test('dynamic imports', () => {
  const code = `import('foo')`

  expect(transform({code})).toMatchInlineSnapshot(`
    // BABEL_ENV development, production, esm:
    import('foo')

    // BABEL_ENV cjs:
    'use strict'
    var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault').default
    var _interopRequireWildcard2 = _interopRequireDefault(
      require('@babel/runtime/helpers/interopRequireWildcard')
    )
    Promise.resolve().then(() => (0, _interopRequireWildcard2.default)(require('foo')))
  `)
})

test('static exports', () => {
  const code = `
    const foo = 1
    export default foo
    export {foo}
    export {bar} from 'other'
    export * as baz from 'other'
  `

  expect(transform({code})).toMatchInlineSnapshot(`
    // BABEL_ENV development, production:
    var foo = 1
    export default foo
    export {foo}
    export {bar} from 'other'
    import * as _baz from 'other'
    export {_baz as baz}

    // BABEL_ENV esm:
    const foo = 1
    export default foo
    export {foo}
    export {bar} from 'other'
    export * as baz from 'other'

    // BABEL_ENV cjs:
    'use strict'
    var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard').default
    Object.defineProperty(exports, '__esModule', {value: true})
    Object.defineProperty(exports, 'bar', {
      enumerable: true,
      get: function () {
        return _baz.bar
      },
    })
    exports.baz = exports.foo = exports.default = void 0
    var _baz = _interopRequireWildcard(require('other'))
    exports.baz = _baz
    const foo = 1
    exports.foo = foo
    var _default = foo
    exports.default = _default
  `)
})
