import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import noImage from '@assets/images/no_image.svg'
import classNames from '@utils/classNames'

const TAG_COLORS = [
  'bg-gray-100 text-gray-800',
  'bg-red-100 text-red-800',
  'bg-yellow-100 text-yellow-800',
  'bg-green-100 text-green-800',
  'bg-blue-100 text-blue-800',
  'bg-indigo-100 text-indigo-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800'
]

const ProductsListItem = (props) => {
  const {
    name,
    imageURL,
    viewURL,
    desc = '',
    tags,
    price,
    ...restProps
  } = props

  return (
    <li
      className="bg-gray-800 text-center rounded-lg xl:text-left overflow-hidden"
      {...restProps}
    >
      <div className="space-y-6 xl:space-y-10 flex flex-col h-full">
        <div className="relative mx-auto pb-image w-full bg-white">
          <img
            className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-auto"
            src={imageURL || noImage}
            alt="Shopify Collection"
          />
        </div>
        <div className="pb-10 px-6 xl:px-10 flex flex-col flex-auto justify-between">
          <div className="xl:flex xl:items-center xl:justify-between">
            <div className="font-medium text-lg leading-6 space-y-1">
              <h3 className="text-white">{name}</h3>
              {desc.length > 0 && (
                <p className="text-sm text-gray-400 font-light">
                  {`${
                    desc.length > 80 ? desc.slice(0, 80).trim() + '...' : desc
                  }`}
                </p>
              )}
            </div>

            <ul className="flex justify-center ml-4">
              <li>
                <Link
                  to={viewURL}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <ExternalLinkIcon className="text-current h-6 w-6" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-4 flex items-center justify-center text-4xl font-extrabold text-gray-50">
            <span>${price}</span>
            <span className="ml-2 text-lg font-medium text-gray-400 mt-1">
              USD
            </span>
          </div>
          {tags.length > 0 && (
            <div className="mt-6">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={classNames(
                    TAG_COLORS[idx],
                    'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-4 mt-2'
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

ProductsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  viewURL: PropTypes.string.isRequired,
  desc: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.string.isRequired
}

export default ProductsListItem
