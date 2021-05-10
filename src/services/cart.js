import { storefrontInstace } from './core'

const createCart = (input) =>
  storefrontInstace.post('/graphql', {
    query: `mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          email
          webUrl
          note
          subtotalPriceV2 {
            amount
            currencyCode
          }
          lineItems(first: 1) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  image(maxWidth: 40, maxHeight: 40) {
                    originalSrc
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }`,
    variables: {
      input
    }
  })

const getCartData = (id) =>
  storefrontInstace.post('/graphql', {
    query: `query ($id: ID!) {
      node(id: $id) {
        ... on Checkout {
          email
          webUrl
          note
          subtotalPriceV2 {
            amount
          }
          lineItems(first: 250) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  image(maxWidth: 40, maxHeight: 40) {
                    originalSrc
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }`,
    variables: {
      id
    }
  })

const addCartItem = (checkoutId, lineItems) =>
  storefrontInstace.post('/graphql', {
    query: `mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          subtotalPriceV2 {
            amount
            currencyCode
          }
          lineItems(first: 250) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  image(maxWidth: 40, maxHeight: 40) {
                    originalSrc
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }`,
    variables: {
      checkoutId,
      lineItems
    }
  })

const updateCartItem = (checkoutId, lineItems) =>
  storefrontInstace.post('/graphql', {
    query: `mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
      checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          subtotalPriceV2 {
            amount
            currencyCode
          }
          lineItems(first: 250) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  image(maxWidth: 40, maxHeight: 40) {
                    originalSrc
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }`,
    variables: {
      checkoutId,
      lineItems
    }
  })

const removeCartItem = (checkoutId, lineItemIds) =>
  storefrontInstace.post('/graphql', {
    query: `mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
      checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
        checkout {
          subtotalPriceV2 {
            amount
            currencyCode
          }
          lineItems(first: 250) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  image(maxWidth: 40, maxHeight: 40) {
                    originalSrc
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }`,
    variables: {
      checkoutId,
      lineItemIds
    }
  })

const cartService = {
  createCart,
  getCartData,
  addCartItem,
  updateCartItem,
  removeCartItem
}

export default cartService
