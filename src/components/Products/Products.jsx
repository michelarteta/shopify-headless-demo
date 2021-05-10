import ProductLayout from './ProductLayout'
import ProductsList from './ProductsList'

const Products = (props) => {
  const { id } = props.match.params
  window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div className="bg-gray-900 full-height">
      {id ? <ProductLayout handle={id} /> : <ProductsList />}
    </div>
  )
}

export default Products
