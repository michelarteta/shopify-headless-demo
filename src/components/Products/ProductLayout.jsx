import { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { getProductByHandle } from '@services/products'
import noImage from '@assets/images/no_image.svg'
import { CartContext } from '@contexts/CartContext'

const ProductLayout = ({ handle = '' }) => {
  const [isLoading, setLoading] = useState(true)
  const [productInfo, setPorudctInfo] = useState(null)
  const { isCartLoading, addCartItem } = useContext(CartContext)

  useEffect(() => {
    setLoading(true)

    if (handle) {
      getProductByHandle(handle).then((response) => {
        if (
          response.data &&
          response.data.data &&
          response.data.data.productByHandle
        ) {
          const {
            description,
            images,
            title,
            variants
          } = response.data.data.productByHandle

          setPorudctInfo({
            id: variants.edges[0].node.storefrontId,
            title,
            desc: description,
            price: variants.edges[0].node.price,
            imageURL: images.edges[0].node.originalSrc
          })

          setLoading(false)
        }
      })
    }
  }, [handle])

  const onProductAdd = () => {
    addCartItem(productInfo.id)
  }

  return (
    !isLoading &&
    productInfo && (
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="lg:flex lg:space-x-4 lg:space-y-0 space-x-0 space-y-10 items-center">
          <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
            <div className="relative mx-auto pb-image w-full lg:w-96 bg-white rounded-md overflow-hidden max-w-xl md:pb-1/2 lg:pb-image">
              <img
                className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-auto"
                src={productInfo.imageURL || noImage}
                alt="Shopify Product"
              />
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-3xl font-bold text-gray-50">
              {productInfo.title}
            </h4>
            <div className="mt-4 flex items-center text-4xl font-extrabold text-gray-50">
              <span>${productInfo.price}</span>
              <span className="ml-2 text-lg font-medium text-gray-400 mt-1">
                USD
              </span>
            </div>
            <p className="text-gray-400">{productInfo.desc}</p>
            <button
              onClick={onProductAdd}
              disabled={isCartLoading}
              type="button"
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full lg:w-40 text-center"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    )
  )
}

ProductLayout.propTypes = {
  handle: PropTypes.string
}

export default ProductLayout
