import test from 'ava'
import {transform} from 'babel-core'

const macro = (t, input, regexes, presetOptions = {}, NODE_ENV = 'development') => {
  process.env.NODE_ENV = NODE_ENV
  const preset = require('.')
  const options = {presets: [[preset, presetOptions]], babelrc: false}
  const {code} = transform(input, options)
  regexes.forEach(regex => {
    t.regex(code, regex)
  })
}

test('does not transpile ESM', macro, "import foo from 'foo'; export default foo", [
  /import foo from 'foo'/,
  /export default foo/,
])

test(
  "transpiles ESM when {modules: 'commonjs'}",
  macro,
  "import foo from 'foo'; export default 5",
  [/require\('foo'\)/, /exports.default = 5/],
  {modules: 'commonjs'}
)

test(
  'cherry picks lodash modules',
  macro,
  "import {max, range} from 'lodash'; module.exports = max(range(5))",
  [/from 'lodash\/max'/, /from 'lodash\/range'/]
)

test(
  'does not cherry pick lodash modules when {lodash: false}',
  macro,
  "import {max, range} from 'lodash'; module.exports = max(range(5))",
  [/from 'lodash'/],
  {lodash: false}
)

test('requires React when JSX is present', macro, 'export default <div />', [
  /import React from ['"]react['"]/,
])
