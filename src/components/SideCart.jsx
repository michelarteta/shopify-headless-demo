import { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from '@contexts/CartContext'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import classNames from '@utils/classNames'
import Spinner from './Spinner'

const SideCart = ({ isOpen = false, onClose }) => {
  const { cart, isCartLoading, updateCartItem, removeCartItem } = useContext(
    CartContext
  )

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-40 inset-0 overflow-hidden"
        open={isOpen}
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md relative">
                {isCartLoading && (
                  <div className="absolute top-0 left-0 w-full flex justify-center items-center h-full bg-white z-40">
                    <Spinner />
                  </div>
                )}

                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                  <div className="p-6 z-50">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-2xl tracking-wide font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {cart.lineItems.length < 1 ? (
                    <h1 className="absolute w-full text-center top-1/2 transform -translate-y-1/2 text-xl text-gray-500">
                      Your shopping cart is empty {':('}
                    </h1>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {cart.lineItems.map((item) => (
                        <li key={item.id} className="px-6 py-5 relative">
                          <div className="group flex justify-between items-center">
                            <a href="#" className="-m-1 p-1 block">
                              <div
                                className="absolute inset-0 group-hover:bg-gray-50"
                                aria-hidden="true"
                              />
                              <div className="flex-1 flex items-center min-w-0 relative">
                                <span className="flex-shrink-0 inline-block relative">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={item.variant.image.originalSrc}
                                    alt="Product"
                                  />
                                  <span
                                    className="bg-gray-700 absolute top-0 right-0 flex items-center justify-center text-center h-4 w-4 rounded-full ring-2 ring-white text-white text-xs"
                                    aria-hidden="true"
                                  >
                                    {item.quantity}
                                  </span>
                                </span>
                                <div className="ml-4 truncate">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {item.title}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {`$${item.variant.priceV2.amount} ${item.variant.priceV2.currencyCode}`}
                                  </p>
                                </div>
                              </div>
                            </a>
                            <Menu
                              as="div"
                              className="ml-2 relative inline-block text-left"
                            >
                              {({ open }) => (
                                <>
                                  <Menu.Button className="group relative w-8 h-8 bg-white rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span className="sr-only">
                                      Open options menu
                                    </span>
                                    <span className="flex items-center justify-center h-full w-full rounded-full">
                                      <DotsVerticalIcon
                                        className="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Menu.Button>
                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      static
                                      className="origin-top-right absolute z-50 top-0 right-9 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={() =>
                                                updateCartItem(
                                                  item.id,
                                                  ++item.quantity
                                                )
                                              }
                                              className={classNames(
                                                active
                                                  ? 'bg-gray-100 text-gray-900'
                                                  : 'text-gray-700',
                                                'block px-4 py-2 text-sm w-full text-left'
                                              )}
                                            >
                                              Increace quantity
                                            </button>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={() =>
                                                updateCartItem(
                                                  item.id,
                                                  --item.quantity
                                                )
                                              }
                                              className={classNames(
                                                active
                                                  ? 'bg-gray-100 text-gray-900'
                                                  : 'text-gray-700',
                                                'block px-4 py-2 text-sm w-full text-left'
                                              )}
                                            >
                                              Decreace quantity
                                            </button>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              onClick={() =>
                                                removeCartItem(item.id)
                                              }
                                              className={classNames(
                                                active
                                                  ? 'bg-gray-100 text-gray-900'
                                                  : 'text-gray-700',
                                                'block px-4 py-2 text-sm w-full text-left'
                                              )}
                                            >
                                              Remove product
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </>
                              )}
                            </Menu>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {cart.lineItems.length > 0 && (
                    <div className="text-lg mt-auto flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6 flex justify-between items-center">
                      <div className="space-x-2 my-auto">
                        <span>Subtotal:</span>
                        <span className="font-bold">{`$${cart.subtotalPriceV2.amount} ${cart.subtotalPriceV2.currencyCode}`}</span>
                      </div>
                      <div className="space-x-3 flex justify-end">
                        <a
                          href={cart.webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm w-36 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          CHECKOUT
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

SideCart.prototype = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default SideCart
