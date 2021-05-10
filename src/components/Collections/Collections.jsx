import { useState, useEffect } from 'react'
import CollectionItem from './CollectionItem'
import {
  getAllCollections,
  getCollectionProductsByHandle
} from '@services/collections'
import { ProductsListItem } from '@components/Products'

const Collections = (props) => {
  const { id } = props.match.params
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [collectionInfo, setCollectionInfo] = useState(null)

  useEffect(() => {
    setLoading(true)
    setCollectionInfo(null)
    setData(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (id) {
      getCollectionProductsByHandle(id).then((response) => {
        if (
          response.data &&
          response.data.data &&
          response.data.data.collectionByHandle
        ) {
          const {
            products: { edges },
            title,
            description: desc
          } = response.data.data.collectionByHandle

          setCollectionInfo({
            desc,
            title
          })
          const collectionsData = edges.map(({ node }) => ({
            key: node.handle,
            name: node.title,
            imageURL: node.images && node.images.edges[0].node.originalSrc,
            viewURL: `/products/${node.handle}`,
            desc: node.description,
            tags: node.tags,
            price: node.priceRangeV2.minVariantPrice.amount
          }))

          setData(collectionsData)
          setLoading(false)
        }
      })
    } else {
      getAllCollections()
        .then((response) => {
          if (
            response.data &&
            response.data.data &&
            response.data.data.collections.edges
          ) {
            const { edges } = response.data.data.collections

            const collectionsData = edges.map(({ node }) => ({
              key: node.handle,
              name: node.title,
              imageURL: node.image && node.image.originalSrc,
              viewURL: `/collections/${node.handle}`,
              desc: node.description
            }))

            setData(collectionsData)
            setLoading(false)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [id])

  return (
    <div className="bg-gray-900 full-height">
      {!isLoading && (
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              {id && collectionInfo ? (
                <>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                    Products for {collectionInfo.title} collection
                  </h2>
                  {collectionInfo.desc && (
                    <p className="text-xl text-gray-300">
                      {collectionInfo.desc}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                    All collections
                  </h2>
                  <p className="text-xl text-gray-300">
                    Ornare sagittis, suspendisse in hendrerit quis. Sed dui
                    aliquet lectus sit pretium egestas vel mattis neque.
                  </p>
                </>
              )}
            </div>
            <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
              {data &&
                (data[0].price
                  ? data.map((item) => <ProductsListItem {...item} />)
                  : data.map((item) => <CollectionItem {...item} />))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Collections
