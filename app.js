const create = require('./create')

module.exports = (babel, userOptions) => {
  const env = babel.env()
  const appOptions = {
    targets: {
      browsers: env === 'test' ? undefined : ['IE 11', 'Firefox ESR', 'last 2 Chrome versions'],
      node: env === 'test' || '10.0.0',
    },
  }

  return create(babel, userOptions, env, appOptions)
}
