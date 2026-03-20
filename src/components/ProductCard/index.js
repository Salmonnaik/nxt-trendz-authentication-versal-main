import './index.css'
import {useContext} from 'react'
import {CartContext} from '../../context/CartContext'

const ProductCard = props => {
  const {productData} = props
  const {title, brand, imageUrl, rating, price, id} = productData
  const {addToCart} = useContext(CartContext)

  const handleAddToCart = () => {
    addToCart({...productData, id})
  }

  return (
    <li className="product-item">
      <img src={imageUrl} alt="product" className="thumbnail" />
      <h1 className="title">{title}</h1>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
      <button
        type="button"
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </li>
  )
}
export default ProductCard
