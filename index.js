const create = require('./create')

module.exports = (babel, userOptions) => {
  const env = babel.env()
  const libOptions = {
    targets: {
      browsers: env === 'test' ? undefined : ['Firefox ESR', 'last 2 Chrome versions'],
      node: env === 'test' || '10.0.0',
    },
  }

  return create(babel, userOptions, env, libOptions)
}
