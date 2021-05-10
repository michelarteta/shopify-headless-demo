import '@assets/tailwind.scss'
import { CartProvider } from '@contexts/CartContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Collections from './Collections'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import Products from './Products'

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/collections/:id?" component={Collections} />
          <Route path="/products/:id?" component={Products} />
        </Switch>
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default App
