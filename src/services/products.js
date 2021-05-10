import { coreInstance } from './core'

export const getAllProducts = () =>
  coreInstance.post('/graphql', {
    query: `{
      products(first: 50) {
        edges {
          node {
            handle
            description(truncateAt: 80)
            images(first: 1, maxHeight: 500, maxWidth: 600) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            title
            tags
            priceRangeV2 {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }`
  })

export const getProductByHandle = (handle) =>
  coreInstance.post('/graphql', {
    query: `query ($handle: String!) {
      productByHandle(handle: $handle) {
        id
        description
        title
        images(first: 1) {
          edges {
            node {
              originalSrc
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              storefrontId
              price
            }
          }
        }
      }
    }`,
    variables: {
      handle
    }
  })
