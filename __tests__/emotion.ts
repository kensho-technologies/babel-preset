import {test, expect} from '@jest/globals'

import transform from '../helpers/transform'

test('transpiles JSX using Emotion pragma', () => {
  const code = `
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
  const options = {emotion: true}

  expect(transform({code, options})).toMatchInlineSnapshot(`
    // BABEL_ENV development:
    var _jsxFileName = '/file.js'
    function _EMOTION_STRINGIFIED_CSS_ERROR__() {
      return "You have tried to stringify object returned from \`css\` function. It isn't supposed to be used directly (e.g. as value of the \`className\` prop), but rather handed to emotion so it can handle it (e.g. as value of \`css\` prop)."
    }
    import {css} from '@emotion/react'
    import {jsxDEV as _jsxDEV} from '@emotion/react/jsx-dev-runtime'
    var cssObj =
      process.env.NODE_ENV === 'production'
        ? {name: 'hwfcu5', styles: 'color:red'}
        : {
            name: 'aslxie-cssObj',
            styles: 'color:red;label:cssObj;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRW1CIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG4gICAgY29uc3QgY3NzT2JqID0gY3NzKHtjb2xvcjogJ3JlZCd9KVxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15Q29tcG9uZW50KCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3tjb2xvcjogJ2JsdWUnfX0+XG4gICAgICAgICAgPGRpdiBjc3M9e2Nzc09ian0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAiXX0= */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    var _ref =
      process.env.NODE_ENV === 'production'
        ? {name: '117wnve', styles: 'color:blue'}
        : {
            name: 'fveiva-MyComponent',
            styles: 'color:blue;label:MyComponent;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS2EiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdcbiAgICBjb25zdCBjc3NPYmogPSBjc3Moe2NvbG9yOiAncmVkJ30pXG4gICAgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlDb21wb25lbnQoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17e2NvbG9yOiAnYmx1ZSd9fT5cbiAgICAgICAgICA8ZGl2IGNzcz17Y3NzT2JqfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICJdfQ== */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    export default function MyComponent() {
      return _jsxDEV(
        'div',
        {
          css: _ref,
          children: _jsxDEV(
            'div',
            {css: cssObj},
            void 0,
            false,
            {fileName: _jsxFileName, lineNumber: 7, columnNumber: 11},
            this
          ),
        },
        void 0,
        false,
        {fileName: _jsxFileName, lineNumber: 6, columnNumber: 9},
        this
      )
    }
    _c = MyComponent
    var _c
    $RefreshReg$(_c, 'MyComponent')

    // BABEL_ENV production:
    function _EMOTION_STRINGIFIED_CSS_ERROR__() {
      return "You have tried to stringify object returned from \`css\` function. It isn't supposed to be used directly (e.g. as value of the \`className\` prop), but rather handed to emotion so it can handle it (e.g. as value of \`css\` prop)."
    }
    import {css} from '@emotion/react'
    import {jsx as _jsx} from '@emotion/react/jsx-runtime'
    var cssObj =
      process.env.NODE_ENV === 'production'
        ? {name: 'hwfcu5', styles: 'color:red'}
        : {
            name: 'aslxie-cssObj',
            styles: 'color:red;label:cssObj;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRW1CIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG4gICAgY29uc3QgY3NzT2JqID0gY3NzKHtjb2xvcjogJ3JlZCd9KVxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15Q29tcG9uZW50KCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3tjb2xvcjogJ2JsdWUnfX0+XG4gICAgICAgICAgPGRpdiBjc3M9e2Nzc09ian0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAiXX0= */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    var _ref =
      process.env.NODE_ENV === 'production'
        ? {name: '117wnve', styles: 'color:blue'}
        : {
            name: 'fveiva-MyComponent',
            styles: 'color:blue;label:MyComponent;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS2EiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdcbiAgICBjb25zdCBjc3NPYmogPSBjc3Moe2NvbG9yOiAncmVkJ30pXG4gICAgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlDb21wb25lbnQoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17e2NvbG9yOiAnYmx1ZSd9fT5cbiAgICAgICAgICA8ZGl2IGNzcz17Y3NzT2JqfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICJdfQ== */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    export default function MyComponent() {
      return _jsx('div', {css: _ref, children: _jsx('div', {css: cssObj})})
    }

    // BABEL_ENV esm:
    function _EMOTION_STRINGIFIED_CSS_ERROR__() {
      return "You have tried to stringify object returned from \`css\` function. It isn't supposed to be used directly (e.g. as value of the \`className\` prop), but rather handed to emotion so it can handle it (e.g. as value of \`css\` prop)."
    }
    import {css} from '@emotion/react'
    import {jsx as _jsx} from '@emotion/react/jsx-runtime'
    const cssObj =
      process.env.NODE_ENV === 'production'
        ? {name: 'hwfcu5', styles: 'color:red'}
        : {
            name: 'aslxie-cssObj',
            styles: 'color:red;label:cssObj;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRW1CIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG4gICAgY29uc3QgY3NzT2JqID0gY3NzKHtjb2xvcjogJ3JlZCd9KVxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15Q29tcG9uZW50KCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3tjb2xvcjogJ2JsdWUnfX0+XG4gICAgICAgICAgPGRpdiBjc3M9e2Nzc09ian0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAiXX0= */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    var _ref =
      process.env.NODE_ENV === 'production'
        ? {name: '117wnve', styles: 'color:blue'}
        : {
            name: 'fveiva-MyComponent',
            styles: 'color:blue;label:MyComponent;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS2EiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdcbiAgICBjb25zdCBjc3NPYmogPSBjc3Moe2NvbG9yOiAncmVkJ30pXG4gICAgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlDb21wb25lbnQoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17e2NvbG9yOiAnYmx1ZSd9fT5cbiAgICAgICAgICA8ZGl2IGNzcz17Y3NzT2JqfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICJdfQ== */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    export default function MyComponent() {
      return _jsx('div', {css: _ref, children: _jsx('div', {css: cssObj})})
    }

    // BABEL_ENV cjs:
    'use strict'
    Object.defineProperty(exports, '__esModule', {value: true})
    exports.default = MyComponent
    var _react = require('@emotion/react')
    var _jsxRuntime = require('@emotion/react/jsx-runtime')
    function _EMOTION_STRINGIFIED_CSS_ERROR__() {
      return "You have tried to stringify object returned from \`css\` function. It isn't supposed to be used directly (e.g. as value of the \`className\` prop), but rather handed to emotion so it can handle it (e.g. as value of \`css\` prop)."
    }
    const cssObj =
      process.env.NODE_ENV === 'production'
        ? {name: 'hwfcu5', styles: 'color:red'}
        : {
            name: 'aslxie-cssObj',
            styles: 'color:red;label:cssObj;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRW1CIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG4gICAgY29uc3QgY3NzT2JqID0gY3NzKHtjb2xvcjogJ3JlZCd9KVxuICAgIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15Q29tcG9uZW50KCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e3tjb2xvcjogJ2JsdWUnfX0+XG4gICAgICAgICAgPGRpdiBjc3M9e2Nzc09ian0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAiXX0= */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    var _ref =
      process.env.NODE_ENV === 'production'
        ? {name: '117wnve', styles: 'color:blue'}
        : {
            name: 'fveiva-MyComponent',
            styles: 'color:blue;label:MyComponent;',
            map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS2EiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdcbiAgICBjb25zdCBjc3NPYmogPSBjc3Moe2NvbG9yOiAncmVkJ30pXG4gICAgZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlDb21wb25lbnQoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17e2NvbG9yOiAnYmx1ZSd9fT5cbiAgICAgICAgICA8ZGl2IGNzcz17Y3NzT2JqfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICJdfQ== */',
            toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
          }
    function MyComponent() {
      return (0, _jsxRuntime.jsx)('div', {
        css: _ref,
        children: (0, _jsxRuntime.jsx)('div', {css: cssObj}),
      })
    }
  `)
})
