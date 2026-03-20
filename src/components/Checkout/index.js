import {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Header from '../Header'
import {CartContext} from '../../context/CartContext'
import './index.css'

const Checkout = () => {
  const {cartItems, getTotalPrice, clearCart} = useContext(CartContext)
  const history = useHistory()
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = getTotalPrice()
  const deliveryCharge = subtotal > 1000 ? 0 : 50
  const tax = Math.round(subtotal * 0.18)
  const totalAmount = subtotal + deliveryCharge + tax

  const handleInputChange = e => {
    const {name, value} = e.target
    setBillingDetails(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const {name, email, phone, address, city, state, pincode} = billingDetails
    return (
      name &&
      email &&
      phone &&
      address &&
      city &&
      state &&
      pincode &&
      phone.length === 10 &&
      pincode.length === 6
    )
  }

  const generateOrderId = () =>
    `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`

  const handlePlaceOrder = e => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      setError('Please fill all the required fields correctly')
      return
    }

    const newOrderId = generateOrderId()
    setOrderId(newOrderId)
    setOrderPlaced(true)

    // Clear cart after successful order
    setTimeout(() => {
      clearCart()
    }, 2000)
  }

  const handleContinueShopping = () => {
    history.push('/')
  }

  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className="order-success-container">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for shopping with us.</p>
            <div className="order-details">
              <p>
                <strong>Order ID:</strong> {orderId}
              </p>
              <p>
                <strong>Total Amount:</strong> Rs {totalAmount}/-
              </p>
              <p>
                <strong>Payment Method:</strong>{' '}
                {billingDetails.paymentMethod === 'cod'
                  ? 'Cash on Delivery'
                  : 'Online Payment'}
              </p>
              <p>
                <strong>Estimated Delivery:</strong> 5-7 business days
              </p>
            </div>
            <button
              type="button"
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="checkout-container">
        <div className="checkout-content">
          <div className="billing-section">
            <h1 className="checkout-heading">Billing Details</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handlePlaceOrder} className="billing-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={billingDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={billingDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={billingDetails.phone}
                    onChange={handleInputChange}
                    maxLength="10"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={billingDetails.pincode}
                    onChange={handleInputChange}
                    maxLength="6"
                    pattern="[0-9]{6}"
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={billingDetails.address}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={billingDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={billingDetails.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <div>Payment Method *</div>
                <div className="payment-options">
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="payment-cod"
                      name="paymentMethod"
                      value="cod"
                      checked={billingDetails.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="payment-cod">Cash on Delivery</label>
                  </div>
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="payment-online"
                      name="paymentMethod"
                      value="online"
                      checked={billingDetails.paymentMethod === 'online'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="payment-online">Online Payment</label>
                  </div>
                </div>
              </div>

              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </form>
          </div>

          <div className="order-summary-section">
            <h1 className="summary-heading">Order Summary</h1>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="order-item-image"
                  />
                  <div className="order-item-details">
                    <h4>{item.title}</h4>
                    <p>by {item.brand}</p>
                    <p>
                      Qty: {item.quantity} × Rs {item.price}
                    </p>
                  </div>
                  <p className="order-item-price">
                    Rs {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>Rs {subtotal}</span>
              </div>
              <div className="price-row">
                <span>Delivery Charge</span>
                <span>
                  {deliveryCharge === 0 ? 'FREE' : `Rs ${deliveryCharge}`}
                </span>
              </div>
              <div className="price-row">
                <span>Tax (18%)</span>
                <span>Rs {tax}</span>
              </div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span>Rs {totalAmount}</span>
              </div>
            </div>

            <div className="delivery-info">
              <h3>Delivery Information</h3>
              <p>📦 Estimated delivery: 5-7 business days</p>
              <p>
                💳 Payment:{' '}
                {billingDetails.paymentMethod === 'cod'
                  ? 'Cash on Delivery'
                  : 'Online Payment'}
              </p>
              <p>🔄 Easy returns within 30 days</p>
              <p>📞 24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
