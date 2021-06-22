import {transformSync} from '@babel/core'
// eslint-disable-next-line import/no-extraneous-dependencies
import {format, resolveConfig} from 'prettier'

import preset from '..'

import groupBy from './groupBy'

const prettierConfig = resolveConfig.sync(__dirname)
if (!prettierConfig) throw new Error()

interface TransformConfig {
  code: string
  envs?: string[]
  filename?: string
  options?: Record<string, unknown>
  targets?: string
}

const defaultEnvs = ['development', 'production', 'esm', 'cjs']

/**
 * Transforms input code using the Babel preset. Supports additional configuration, including a list of Babel envs.
 *
 * @returns A string containing the transform results, grouped by Babel env.
 */
export default function transform(config: TransformConfig): string {
  const {code, envs = defaultEnvs, filename = 'file.js', options, ...rest} = config

  // transform the input using each env, and group the envs by the result
  const resultGroups = groupBy(envs, (env) => {
    const result = transformSync(code, {
      envName: env,
      presets: [[preset, options]],
      filename: `/${filename}`,
      babelrc: false,
      compact: true,
      ...rest,
    })
    if (typeof result?.code !== 'string') throw new Error()
    return format(result.code, {...prettierConfig, parser: 'babel'}).trim()
  })

  // return a string containing each env group and its transform result
  return [...resultGroups]
    .map((group) => `// BABEL_ENV ${group[1].join(', ')}:\n${group[0]}`.trim())
    .join('\n\n')
}
