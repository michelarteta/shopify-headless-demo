require('dotenv').config()

module.exports = () => {
  const {
    NODE_ENV,
    PORT,
    SHOPIFY_SHOP: SHOP,
    SHOPIFY_API_VERSION,
    SHOPIFY_API_KEY: API_KEY,
    SHOPIFY_API_PASSWORD: API_PASSWORD,
    SHOPIFY_API_TOKEN: API_TOKEN
  } = process.env

  if (!SHOP || !API_KEY || !API_PASSWORD || !API_TOKEN) {
    console.error('Invalid .env configuration provided!')
    process.exit(1)
  }

  return {
    IS_DEV: NODE_ENV !== 'production',
    PORT: parseInt(PORT, 10) || 4000,
    SHOP,
    API_VERSION: SHOPIFY_API_VERSION || '2021-04',
    API_KEY,
    API_PASSWORD,
    API_TOKEN
  }
}
