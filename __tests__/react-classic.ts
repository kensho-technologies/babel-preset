import {test, expect} from '@jest/globals'

import transform from '../helpers/transform'

test('transpiles JSX using classic runtime', () => {
  const options = {react: {runtime: 'classic'}}
  const code = `
    import * as React from 'react'
    function MyComponent() {
      React.useEffect(() => {}, [])
      return (
        <button height={2} {...rest}>
          <div />
          {'foo'} bar
        </button>
      )
    }
  `

  expect(transform({code, options})).toMatchInlineSnapshot(`
    // development:
    var _jsxFileName = '/file.js',
      _s = $RefreshSig$()
    import * as React from 'react'
    function MyComponent() {
      _s()
      React.useEffect(function () {}, [])
      return /*#__PURE__*/ React.createElement(
        'button',
        Object.assign({height: 2}, rest, {
          __self: this,
          __source: {fileName: _jsxFileName, lineNumber: 6, columnNumber: 9},
        }),
        /*#__PURE__*/ React.createElement('div', {
          __self: this,
          __source: {fileName: _jsxFileName, lineNumber: 7, columnNumber: 11},
        }),
        'foo',
        ' bar'
      )
    }
    _s(MyComponent, 'OD7bBpZva5O2jO+Puf00hKivP7c=')
    _c = MyComponent
    var _c
    $RefreshReg$(_c, 'MyComponent')

    // production:
    import * as React from 'react'
    function MyComponent() {
      React.useEffect(function () {}, [])
      return /*#__PURE__*/ React.createElement(
        'button',
        Object.assign({height: 2}, rest),
        /*#__PURE__*/ React.createElement('div', null),
        'foo',
        ' bar'
      )
    }

    // esm:
    import * as React from 'react'
    function MyComponent() {
      React.useEffect(() => {}, [])
      return /*#__PURE__*/ React.createElement(
        'button',
        {height: 2, ...rest},
        /*#__PURE__*/ React.createElement('div', null),
        'foo',
        ' bar'
      )
    }

    // cjs:
    'use strict'
    var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard').default
    var React = _interopRequireWildcard(require('react'))
    function MyComponent() {
      React.useEffect(() => {}, [])
      return /*#__PURE__*/ React.createElement(
        'button',
        {height: 2, ...rest},
        /*#__PURE__*/ React.createElement('div', null),
        'foo',
        ' bar'
      )
    }
  `)
})
