// craco.config.js
const path = require(`path`)
const SRC_DIR = path.resolve(__dirname, 'src')

const ROOT_DIRS = ['assets', 'components', 'utils', 'services', 'contexts']

const alias = Object.fromEntries(
  ROOT_DIRS.map((dir) => [`@${dir}`, path.resolve(SRC_DIR, dir)])
)

module.exports = {
  webpack: {
    alias
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  }
}
