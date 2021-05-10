const hapi = require('@hapi/hapi')
const getServerConfigs = require('./config')
const getServerRoutes = require('./routes')

const SERVER_CONFIGS = getServerConfigs()

const SERVER_PLUGINS = [
  require('@hapi/h2o2'),
  !SERVER_CONFIGS.IS_DEV && require('@hapi/inert')
].filter(Boolean)

const SERVER_OPTIONS = {
  port: SERVER_CONFIGS.PORT,
  routes: SERVER_CONFIGS.IS_DEV
    ? {
        cors: {
          origin: ['*']
        }
      }
    : {
        files: {
          relativeTo: require('path').join(__dirname, '../build')
        }
      }
}

const start = async () => {
  const server = hapi.server(SERVER_OPTIONS)

  try {
    await server.register(SERVER_PLUGINS)

    server.route(getServerRoutes(SERVER_CONFIGS))

    await server.start()

    console.log(`Server started at:  ${server.info.uri}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
