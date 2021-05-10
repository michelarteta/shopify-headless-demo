import { coreInstance } from './core'

export const getAllCollections = () =>
  coreInstance.post('/graphql', {
    query: `{
      collections(first: 20) {
        edges {
          node {
            handle
            image(maxHeight: 500, maxWidth: 600) {
              originalSrc
            }
            title
            description(truncateAt: 80)
          }
        }
      }
    }`
  })

export const getCollectionProductsByHandle = (handle) =>
  coreInstance.post('/graphql', {
    query: `query ($handle: String!) {
      collectionByHandle(handle: $handle) {
        description
        title
        products(first: 20) {
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
      }
    }`,
    variables: {
      handle
    }
  })
