import defaultImport, {namedImport} from 'foo'
import * as namespaceImport from 'bar'

const dynamicImport = import('baz')

class Foo {
  static bar = 'abc'
  baz = (x, y) => x({...y})
}

const obj = {a: 1, b: 2}

const spread = {...obj, b: 2, c: 3}
const {a, ...rest} = spread

const nullishCoalescing = obj ?? 1
const optionalChaining = obj?.b

export default obj
export {obj}