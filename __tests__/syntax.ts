import {test, expect} from '@jest/globals'

import transform from '../helpers/transform'

test('class properties', () => {
  const code = `
    class Foo {
      static bar = 'abc'
      baz = (x, y) => x({...y})
      #privateMethod() {
        return 1
      }
    }
  `

  expect(transform({code})).toMatchInlineSnapshot(`
    // BABEL_ENV development, production:
    import _classPrivateFieldLooseKey from '@babel/runtime/helpers/classPrivateFieldLooseKey'
    var _privateMethod = /*#__PURE__*/ _classPrivateFieldLooseKey('privateMethod')
    var Foo = function Foo() {
      Object.defineProperty(this, _privateMethod, {value: _privateMethod2})
      this.baz = function (x, y) {
        return x(Object.assign({}, y))
      }
    }
    function _privateMethod2() {
      return 1
    }
    Foo.bar = 'abc'

    // BABEL_ENV esm:
    class Foo {
      static bar = 'abc'
      baz = (x, y) => x({...y})
      #privateMethod() {
        return 1
      }
    }

    // BABEL_ENV cjs:
    'use strict'
    class Foo {
      static bar = 'abc'
      baz = (x, y) => x({...y})
      #privateMethod() {
        return 1
      }
    }
  `)
})
