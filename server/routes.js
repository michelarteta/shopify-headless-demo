const getServerRoutes = ({
  IS_DEV,
  SHOP,
  API_VERSION,
  API_KEY,
  API_PASSWORD,
  API_TOKEN
}) => {
  const SHOP_BASE_URL = `https://${API_KEY}:${API_PASSWORD}@${SHOP}`
  const SHOP_ADMIN_API = `${SHOP_BASE_URL}/admin/api/${API_VERSION}/{resource}`
  const SHOP_STOREFRONT_API = `https://${SHOP}/api/${API_VERSION}`

  const routes = [
    {
      method: 'POST',
      path: '/api/{resource}',
      handler: {
        proxy: {
          uri: SHOP_ADMIN_API,
          passThrough: true
        }
      }
    },
    {
      method: 'POST',
      path: '/storefront/{resource}',
      handler: {
        proxy: {
          mapUri: (req) => {
            req.headers = {
              ...req.headers,
              'X-Shopify-Storefront-Access-Token': API_TOKEN
            }

            return {
              uri: `${SHOP_STOREFRONT_API}/${req.params.resource || ''}`
            }
          },
          passThrough: true
        }
      }
    }
  ]

  if (!IS_DEV) {
    const clientRoutes = ['/collections/{any*}', '/products/{any*}']

    routes.push(
      {
        method: 'GET',
        path: '/{path*}',
        handler: {
          directory: {
            path: '.',
            redirectToSlash: true,
            index: true
          }
        }
      },
      ...clientRoutes.map((path) => ({
        method: 'GET',
        path,
        config: {
          handler: (_, res) => res.file('index.html')
        }
      }))
    )
  }

  return routes
}

module.exports = getServerRoutes
