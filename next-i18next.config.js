const path = require('path')

module.exports = {
  i18n: {
    localeDetection: false,
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN']
  },
  localePath: path.resolve('public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  keySeparator: false,
  namespaceSeparator: false,
  pluralSeparator: '——',
  contextSeparator: '——'
}
