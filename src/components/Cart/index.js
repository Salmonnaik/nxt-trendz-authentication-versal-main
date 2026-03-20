import {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Header from '../Header'
import {CartContext} from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {cartItems, removeFromCart, updateQuantity, getTotalPrice} = useContext(
    CartContext,
  )
  const history = useHistory()

  const handleRemoveItem = productId => {
    removeFromCart(productId)
  }

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity, 10))
  }

  const handleProceedToCheckout = () => {
    history.push('/checkout')
  }

  const totalPrice = getTotalPrice()

  return (
    <>
      <Header />
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
              alt="cart"
              className="cart-img"
            />
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart!</p>
          </div>
        ) : (
          <div className="cart-content">
            <h1 className="cart-heading">My Cart</h1>
            <ul className="cart-items-list">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <p className="cart-item-brand">by {item.brand}</p>
                    <p className="cart-item-price">Rs {item.price}/-</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <p>
                Total Items:{' '}
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
              <p className="total-price">Total Price: Rs {totalPrice}/-</p>
              <button
                type="button"
                className="checkout-btn"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
