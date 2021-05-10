import { useCallback } from 'react'
import cartService from '@services/cart'
import { flattenGQLResponse } from '@utils/shopify'
import { createContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

const CartProvider = ({ children }) => {
  const [isCartLoading, setCartLoading] = useState(true)
  const [cart, setCart] = useState({
    id: null,
    email: null,
    webUrl: null,
    note: null,
    subtotalPriceV2: {
      amount: null,
      currencyCode: null
    },
    lineItems: []
  })

  const fetchCartData = useCallback(async () => {
    setCartLoading(true)

    let id = localStorage.getItem('__g_cart_id')

    if (!id) {
      createCart()
      return
    }

    const response = await cartService.getCartData(id)

    const {
      email,
      webUrl,
      note,
      subtotalPriceV2,
      lineItems
    } = flattenGQLResponse(response)

    setCart({
      id,
      email,
      webUrl,
      note,
      subtotalPriceV2,
      lineItems
    })

    setCartLoading(false)
  }, [setCartLoading, setCart])

  useEffect(() => {
    fetchCartData()
  }, [fetchCartData])

  const createCart = async () => {
    setCartLoading(true)

    const response = await cartService.createCart({})

    if (
      !response.data ||
      !response.data.data ||
      !response.data.data.checkoutCreate ||
      !response.data.data.checkoutCreate.checkout
    ) {
      console.error('Unable to create new cart!')
    }

    const {
      id,
      email,
      webUrl,
      note,
      subtotalPriceV2,
      lineItems
    } = flattenGQLResponse(response.data.data.checkoutCreate.checkout)

    if (!id) {
      console.error('Unable to fetch cart data!')
      return
    }

    localStorage.setItem('__g_cart_id', id)

    setCart({
      id,
      email,
      webUrl,
      note,
      subtotalPriceV2,
      lineItems
    })

    setCartLoading(false)
  }

  const addCartItem = async (variantId, quantity = 1) => {
    setCartLoading(true)

    if (!cart.id) {
      console.error('Cart is not found!')
      return
    }

    const foundLineItem = cart.lineItems.find(
      ({ variant: { id } }) => id === variantId
    )

    if (!foundLineItem) {
      const response = await cartService.addCartItem(cart.id, [
        {
          variantId,
          quantity
        }
      ])

      if (
        !response.data ||
        !response.data.data ||
        !response.data.data.checkoutLineItemsAdd ||
        !response.data.data.checkoutLineItemsAdd.checkout
      ) {
        console.error('Unable to add item to the cart!')
        return
      }

      const { subtotalPriceV2, lineItems } = flattenGQLResponse(
        response.data.data.checkoutLineItemsAdd.checkout
      )

      setCart((prevCart) => ({
        ...prevCart,
        subtotalPriceV2,
        lineItems
      }))
    } else {
      return updateCartItem(foundLineItem.id, foundLineItem.quantity + quantity)
    }

    setCartLoading(false)
  }

  const updateCartItem = async (id, quantity) => {
    setCartLoading(true)

    if (!cart.id) {
      console.error('Cart is not found!')
      return
    }

    if (!cart.lineItems.find(({ id: _id }) => _id === id)) {
      console.error('Invalid line item id!')
      setCartLoading(false)
      return
    }

    const response = await cartService.updateCartItem(cart.id, [
      {
        id,
        quantity
      }
    ])

    if (
      !response.data ||
      !response.data.data ||
      !response.data.data.checkoutLineItemsUpdate ||
      !response.data.data.checkoutLineItemsUpdate.checkout
    ) {
      console.error('Unable to update the cart item!')
      return
    }

    const { subtotalPriceV2, lineItems } = flattenGQLResponse(
      response.data.data.checkoutLineItemsUpdate.checkout
    )

    setCart((prevCart) => ({
      ...prevCart,
      subtotalPriceV2,
      lineItems
    }))

    setCartLoading(false)
  }

  const removeCartItem = async (id) => {
    setCartLoading(true)

    if (!cart.id) {
      console.error('Cart is not found!')
      return
    }

    if (!cart.lineItems.find(({ id: _id }) => _id === id)) {
      console.error('Invalid line item id!')
      setCartLoading(false)
      return
    }

    const response = await cartService.removeCartItem(cart.id, [id])

    if (
      !response.data ||
      !response.data.data ||
      !response.data.data.checkoutLineItemsRemove ||
      !response.data.data.checkoutLineItemsRemove.checkout
    ) {
      console.error('Unable to remove the cart item!')
      return
    }

    const { subtotalPriceV2, lineItems } = flattenGQLResponse(
      response.data.data.checkoutLineItemsRemove.checkout
    )

    setCart((prevCart) => ({
      ...prevCart,
      subtotalPriceV2,
      lineItems
    }))

    setCartLoading(false)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartLoading,
        addCartItem,
        updateCartItem,
        removeCartItem
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
