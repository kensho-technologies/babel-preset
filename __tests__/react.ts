import {test, expect} from '@jest/globals'

import transform from '../helpers/transform'

test('transpiles JSX', () => {
  const code = `
    import {useState} from 'react'
    function MyComponent() {
      useEffect(() => {}, [])
      return (
        <button height={2} {...rest}>
          <div />
          {'foo'} bar
        </button>
      )
    }
  `

  expect(transform({code, env: 'development'})).toMatchInlineSnapshot(`
    var _jsxFileName = '/file.js',
      _s = $RefreshSig$()
    import {useState} from 'react'
    import {jsxDEV as _jsxDEV} from 'react/jsx-dev-runtime'
    function MyComponent() {
      _s()
      useEffect(function () {}, [])
      return /*#__PURE__*/ _jsxDEV(
        'button',
        Object.assign({height: 2}, rest, {
          children: [
            /*#__PURE__*/ _jsxDEV(
              'div',
              {},
              void 0,
              false,
              {fileName: _jsxFileName, lineNumber: 7, columnNumber: 11},
              this
            ),
            'foo',
            ' bar',
          ],
        }),
        void 0,
        true,
        {fileName: _jsxFileName, lineNumber: 6, columnNumber: 9},
        this
      )
    }
    _s(MyComponent, 'OD7bBpZva5O2jO+Puf00hKivP7c=')
    _c = MyComponent
    var _c
    $RefreshReg$(_c, 'MyComponent')
  `)

  expect(transform({code, env: 'production'})).toMatchInlineSnapshot(`
    import {useState} from 'react'
    import {jsx as _jsx} from 'react/jsx-runtime'
    import {jsxs as _jsxs} from 'react/jsx-runtime'
    function MyComponent() {
      useEffect(function () {}, [])
      return /*#__PURE__*/ _jsxs(
        'button',
        Object.assign({height: 2}, rest, {children: [/*#__PURE__*/ _jsx('div', {}), 'foo', ' bar']})
      )
    }
  `)

  expect(transform({code, env: 'esm'})).toMatchInlineSnapshot(`
    import {useState} from 'react'
    import {jsx as _jsx} from 'react/jsx-runtime'
    import {jsxs as _jsxs} from 'react/jsx-runtime'
    function MyComponent() {
      useEffect(() => {}, [])
      return /*#__PURE__*/ _jsxs('button', {
        height: 2,
        ...rest,
        children: [/*#__PURE__*/ _jsx('div', {}), 'foo', ' bar'],
      })
    }
  `)

  expect(transform({code, env: 'cjs'})).toMatchInlineSnapshot(`
    'use strict'
    var _react = require('react')
    var _jsxRuntime = require('react/jsx-runtime')
    function MyComponent() {
      useEffect(() => {}, [])
      return /*#__PURE__*/ (0, _jsxRuntime.jsxs)('button', {
        height: 2,
        ...rest,
        children: [/*#__PURE__*/ (0, _jsxRuntime.jsx)('div', {}), 'foo', ' bar'],
      })
    }
  `)
})
