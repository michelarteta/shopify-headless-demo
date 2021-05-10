import { getAllProducts } from '@services/products'
import { useState, useEffect } from 'react'
import ProductsListItem from './ProductsListItem'

const ProductsList = () => {
  const [isLoading, setLoading] = useState(true)
  const [productsList, setPoductsList] = useState([])

  useEffect(() => {
    getAllProducts().then((response) => {
      if (response.data && response.data.data && response.data.data.products) {
        const { edges } = response.data.data.products

        if (edges) {
          const data = edges.map(({ node }) => ({
            key: node.handle,
            name: node.title,
            imageURL: node.images && node.images.edges[0].node.originalSrc,
            viewURL: `/products/${node.handle}`,
            desc: node.description,
            tags: node.tags,
            price: node.priceRangeV2.minVariantPrice.amount
          }))

          setPoductsList(data)
          setLoading(false)
        }
      }
    })
  }, [])

  return (
    !isLoading &&
    productsList && (
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              All products
            </h2>
            <p className="text-xl text-gray-300">
              Ornare sagittis, suspendisse in hendrerit quis. Sed dui aliquet
              lectus sit pretium egestas vel mattis neque.
            </p>
          </div>
          <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
            {productsList.map((item) => (
              <ProductsListItem {...item} />
            ))}
          </ul>
        </div>
      </div>
    )
  )
}

export default ProductsList
