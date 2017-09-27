const ES = process.env.BABEL_ENV === 'es'

module.exports = {
  presets: [
    [
      'env',
      ES
        ? {
            modules: false,
          }
        : {},
    ],
    'react',
    'stage-2',
  ],
}
