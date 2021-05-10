import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import noImage from '@assets/images/no_image.svg'

const CollectionItem = (props) => {
  const { name, imageURL, viewURL, desc = '', ...restProps } = props

  return (
    <li
      className="bg-gray-800 text-center rounded-lg xl:text-left overflow-hidden"
      {...restProps}
    >
      <div className="space-y-6 xl:space-y-10">
        <div className="relative mx-auto pb-image w-full bg-white">
          <img
            className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-auto"
            src={imageURL || noImage}
            alt="Shopify Collection"
          />
        </div>
        <div className="pb-10 px-6 xl:px-10">
          <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
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

            <ul className="flex justify-center space-x-5">
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
        </div>
      </div>
    </li>
  )
}

CollectionItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  viewURL: PropTypes.string.isRequired,
  desc: PropTypes.string
}

export default CollectionItem
