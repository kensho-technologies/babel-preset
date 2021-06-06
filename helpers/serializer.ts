// eslint-disable-next-line import/no-extraneous-dependencies
import {format, resolveConfig} from 'prettier'

const prettierConfig = resolveConfig.sync(__dirname)
if (!prettierConfig) throw new Error()

module.exports = {
  test: (val: string) => typeof val === 'string',
  serialize: (val: string) => format(val, {...prettierConfig, parser: 'babel'}).trim(),
}
