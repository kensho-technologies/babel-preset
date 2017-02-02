import test from 'ava'
import {transform} from 'babel-core'

import preset from '.'

const macro = (t, input, regexes, presetOptions = {}) => {
  const options = {presets: [[preset, presetOptions]], babelrc: false}
  const {code} = transform(input, options)
  regexes.forEach(regex => { t.regex(code, regex) })
}

test('transforms ES2015 imports/exports', macro, `
  import foo from 'foo'
  export default 5
`, [
  /require\('foo'\)/,
  /exports.default = 5/,
])

test('cherry picks lodash modules', macro, `
  import {max, range} from 'lodash'
  module.exports = max(range(5))
`, [
  /require\('lodash\/max'\)/,
  /require\('lodash\/range'\)/,
])

test('does not cherry pick lodash modules when {lodash: false}', macro, `
  import {max, range} from 'lodash'
  module.exports = max(range(5))
`, [
  /require\('lodash'\)/,
], {lodash: false})

test('requires React when JSX is present', macro, `
  export default <div />
`, [
  /require\(['"]react['"]\)/,
])

test('does not transpile imports/exports when {modules: false}', macro, `
  import foo from 'foo'
  export default foo
`, [
  /import foo from 'foo'/,
  /export default foo/,
], {modules: false})
