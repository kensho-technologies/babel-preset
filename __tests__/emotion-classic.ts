import {test, expect} from '@jest/globals'

import transform from '../helpers/transform'

test('transpiles JSX using Emotion pragma in classic runtime', () => {
  const code = `
    import * as React from 'react'
    import {css} from '@emotion/react'
    const cssObj = css({color: 'red'})
    export default function MyComponent() {
      return (
        <div css={{color: 'blue'}}>
          <div css={cssObj} />
        </div>
      )
    }
  `
  const options = {emotion: true, react: {runtime: 'classic'}}

  expect(transform({code, options})).toMatchInlineSnapshot(`
    // BABEL_ENV development:
    var _jsxFileName = '/file.js'
    function _EMOTION_STRINGIFIED_CSS_ERROR__() {
      return "You have tried to stringify object returned from \`css\` function. It isn't supposed to be used directly (e.g. as value of the \`className\` prop), but rather handed to emotion so it can handle it (e.g. as value of \`css\` prop)."
    }
    import * as React from 'react'
    import {css} from '@emotion/react'
    import {jsx as ___EmotionJSX} from '@emotion/react'
    var cssObj =
      process.env.NODE_ENV === 'production'
        ? {name: 'hwfcu5', styles: 'color:red'}
        : {
            name: 'aslxie-cssObj',
            styles: 'color:red;label:cssObj;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR21CIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbiAgICBpbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG4gICAgY29uc3QgY3NzT2JqID0gY3NzKHtjb2xvcjogJ3JlZCd9KVxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15Q29tcG9uZW50KCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3tjb2xvcjogJ2JsdWUnfX0+XG4gICAgICAgICAgPGRpdiBjc3M9e2Nzc09ian0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAiXX0= */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    var _ref =
      process.env.NODE_ENV === 'production'
        ? {name: '117wnve', styles: 'color:blue'}
        : {
            name: 'fveiva-MyComponent',
            styles: 'color:blue;label:MyComponent;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTWEiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuICAgIGltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdcbiAgICBjb25zdCBjc3NPYmogPSBjc3Moe2NvbG9yOiAncmVkJ30pXG4gICAgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlDb21wb25lbnQoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17e2NvbG9yOiAnYmx1ZSd9fT5cbiAgICAgICAgICA8ZGl2IGNzcz17Y3NzT2JqfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICJdfQ== */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    export default function MyComponent() {
      return ___EmotionJSX(
        'div',
        {css: _ref, __self: this, __source: {fileName: _jsxFileName, lineNumber: 7, columnNumber: 9}},
        ___EmotionJSX('div', {
          css: cssObj,
          __self: this,
          __source: {fileName: _jsxFileName, lineNumber: 8, columnNumber: 11},
        })
      )
    }
    _c = MyComponent
    var _c
    $RefreshReg$(_c, 'MyComponent')

    // BABEL_ENV production:
    function _EMOTION_STRINGIFIED_CSS_ERROR__() {
      return "You have tried to stringify object returned from \`css\` function. It isn't supposed to be used directly (e.g. as value of the \`className\` prop), but rather handed to emotion so it can handle it (e.g. as value of \`css\` prop)."
    }
    import * as React from 'react'
    import {css} from '@emotion/react'
    import {jsx as ___EmotionJSX} from '@emotion/react'
    var cssObj =
      process.env.NODE_ENV === 'production'
        ? {name: 'hwfcu5', styles: 'color:red'}
        : {
            name: 'aslxie-cssObj',
            styles: 'color:red;label:cssObj;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR21CIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbiAgICBpbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG4gICAgY29uc3QgY3NzT2JqID0gY3NzKHtjb2xvcjogJ3JlZCd9KVxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15Q29tcG9uZW50KCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3tjb2xvcjogJ2JsdWUnfX0+XG4gICAgICAgICAgPGRpdiBjc3M9e2Nzc09ian0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAiXX0= */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    var _ref =
      process.env.NODE_ENV === 'production'
        ? {name: '117wnve', styles: 'color:blue'}
        : {
            name: 'fveiva-MyComponent',
            styles: 'color:blue;label:MyComponent;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTWEiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuICAgIGltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdcbiAgICBjb25zdCBjc3NPYmogPSBjc3Moe2NvbG9yOiAncmVkJ30pXG4gICAgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlDb21wb25lbnQoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17e2NvbG9yOiAnYmx1ZSd9fT5cbiAgICAgICAgICA8ZGl2IGNzcz17Y3NzT2JqfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICJdfQ== */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    export default function MyComponent() {
      return ___EmotionJSX('div', {css: _ref}, ___EmotionJSX('div', {css: cssObj}))
    }

    // BABEL_ENV esm:
    function _EMOTION_STRINGIFIED_CSS_ERROR__() {
      return "You have tried to stringify object returned from \`css\` function. It isn't supposed to be used directly (e.g. as value of the \`className\` prop), but rather handed to emotion so it can handle it (e.g. as value of \`css\` prop)."
    }
    import * as React from 'react'
    import {css} from '@emotion/react'
    import {jsx as ___EmotionJSX} from '@emotion/react'
    const cssObj =
      process.env.NODE_ENV === 'production'
        ? {name: 'hwfcu5', styles: 'color:red'}
        : {
            name: 'aslxie-cssObj',
            styles: 'color:red;label:cssObj;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR21CIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbiAgICBpbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG4gICAgY29uc3QgY3NzT2JqID0gY3NzKHtjb2xvcjogJ3JlZCd9KVxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15Q29tcG9uZW50KCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3tjb2xvcjogJ2JsdWUnfX0+XG4gICAgICAgICAgPGRpdiBjc3M9e2Nzc09ian0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAiXX0= */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    var _ref =
      process.env.NODE_ENV === 'production'
        ? {name: '117wnve', styles: 'color:blue'}
        : {
            name: 'fveiva-MyComponent',
            styles: 'color:blue;label:MyComponent;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTWEiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuICAgIGltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdcbiAgICBjb25zdCBjc3NPYmogPSBjc3Moe2NvbG9yOiAncmVkJ30pXG4gICAgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlDb21wb25lbnQoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17e2NvbG9yOiAnYmx1ZSd9fT5cbiAgICAgICAgICA8ZGl2IGNzcz17Y3NzT2JqfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICJdfQ== */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    export default function MyComponent() {
      return ___EmotionJSX('div', {css: _ref}, ___EmotionJSX('div', {css: cssObj}))
    }

    // BABEL_ENV cjs:
    'use strict'
    var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard').default
    Object.defineProperty(exports, '__esModule', {value: true})
    exports.default = MyComponent
    var React = _interopRequireWildcard(require('react'))
    var _react2 = require('@emotion/react')
    function _EMOTION_STRINGIFIED_CSS_ERROR__() {
      return "You have tried to stringify object returned from \`css\` function. It isn't supposed to be used directly (e.g. as value of the \`className\` prop), but rather handed to emotion so it can handle it (e.g. as value of \`css\` prop)."
    }
    const cssObj =
      process.env.NODE_ENV === 'production'
        ? {name: 'hwfcu5', styles: 'color:red'}
        : {
            name: 'aslxie-cssObj',
            styles: 'color:red;label:cssObj;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR21CIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCdcbiAgICBpbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG4gICAgY29uc3QgY3NzT2JqID0gY3NzKHtjb2xvcjogJ3JlZCd9KVxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15Q29tcG9uZW50KCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3tjb2xvcjogJ2JsdWUnfX0+XG4gICAgICAgICAgPGRpdiBjc3M9e2Nzc09ian0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAiXX0= */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    var _ref =
      process.env.NODE_ENV === 'production'
        ? {name: '117wnve', styles: 'color:blue'}
        : {
            name: 'fveiva-MyComponent',
            styles: 'color:blue;label:MyComponent;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTWEiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuICAgIGltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdcbiAgICBjb25zdCBjc3NPYmogPSBjc3Moe2NvbG9yOiAncmVkJ30pXG4gICAgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlDb21wb25lbnQoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17e2NvbG9yOiAnYmx1ZSd9fT5cbiAgICAgICAgICA8ZGl2IGNzcz17Y3NzT2JqfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICJdfQ== */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    function MyComponent() {
      return (0, _react2.jsx)('div', {css: _ref}, (0, _react2.jsx)('div', {css: cssObj}))
    }
  `)
})
