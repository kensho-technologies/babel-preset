import {transformSync} from '@babel/core'

import preset from '..'

interface TransformConfig {
  code: string
  env: string
  filename?: string
  options?: Record<string, unknown>
  targets?: string
}

export default function transform(config: TransformConfig): string | undefined {
  const {code, env, filename = 'file.js', options, ...rest} = config
  const result = transformSync(code, {
    envName: env,
    presets: [[preset, options]],
    filename: `/${filename}`,
    babelrc: false,
    compact: true,
    ...rest,
  })
  if (typeof result?.code !== 'string') throw new Error()
  return result.code
}
