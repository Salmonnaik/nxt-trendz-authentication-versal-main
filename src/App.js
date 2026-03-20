import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Category from './components/Category'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import {CartProvider} from './context/CartContext'

import './App.css'

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute
          exact
          path="/category/:categoryId"
          component={Category}
        />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/checkout" component={Checkout} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </BrowserRouter>
  </CartProvider>
)

export default App
