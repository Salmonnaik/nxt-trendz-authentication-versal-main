import Cookies from 'js-cookie'
import {Redirect, Link, useHistory} from 'react-router-dom'
import {useContext, useState, useEffect} from 'react'

import Header from '../Header'
import {CartContext} from '../../context/CartContext'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  const {getCartCount, getTotalPrice} = useContext(CartContext)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const history = useHistory()

  const navigateToCategory = categoryId => {
    history.push(`/category/${categoryId}`)
  }

  const getProductCategory = productId => {
    const categoryMap = {
      1: 'men',
      2: 'women',
      3: 'men',
      4: 'kids',
      5: 'electronics',
      6: 'home',
    }
    return categoryMap[productId] || 'men'
  }

  useEffect(() => {
    // Mock featured products data
    const mockFeaturedProducts = [
      {
        id: '1',
        title: 'Men Casual Shirt',
        brand: 'Allen Solly',
        price: 1200,
        imageUrl:
          'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&h=400&fit=crop',
        rating: 4.5,
      },
      {
        id: '2',
        title: 'Women Ethnic Wear',
        brand: 'Biba',
        price: 2500,
        imageUrl:
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=400&fit=crop',
        rating: 4.8,
      },
      {
        id: '3',
        title: 'Sports Shoes',
        brand: 'Nike',
        price: 3500,
        imageUrl:
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
        rating: 4.6,
      },
      {
        id: '4',
        title: 'Kids Party Wear',
        brand: 'Little Kangaroos',
        price: 1500,
        imageUrl:
          'https://tse1.mm.bing.net/th/id/OIP.LCrNmGy3V4E4Yyu_EfXSLQHaFl?pid=Api&P=0&h=180',
        rating: 4.7,
      },
      {
        id: '5',
        title: 'Smartphone',
        brand: 'Samsung',
        price: 25000,
        imageUrl:
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop',
        rating: 4.7,
      },
      {
        id: '6',
        title: 'Home Decor Lamp',
        brand: 'Philips',
        price: 1500,
        imageUrl:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop',
        rating: 4.2,
      },
    ]
    setFeaturedProducts(mockFeaturedProducts)

    // Categories data with images
    const mockCategories = [
      {
        id: 'men',
        name: 'Men',
        description: 'Shirts, Jeans, Shoes & More',
        imageUrl:
          'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=300&fit=crop',
      },
      {
        id: 'women',
        name: 'Women',
        description: 'Dresses, Tops, Ethnic Wear',
        imageUrl:
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
      },
      {
        id: 'kids',
        name: 'Kids',
        description: 'Toys, Clothes & Accessories',
        imageUrl:
          'https://images.unsplash.com/photo-1515488042364-ee5c0c79b7d2?w=400&h=300&fit=crop',
      },
      {
        id: 'home',
        name: 'Home',
        description: 'Decor, Kitchen & Living',
        imageUrl:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      },
      {
        id: 'electronics',
        name: 'Electronics',
        description: 'Mobiles, Laptops & More',
        imageUrl:
          'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      },
    ]
    setCategories(mockCategories)
  }, [])

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const cartCount = getCartCount()
  const totalPrice = getTotalPrice()

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="dresses to be noticed"
            className="home-mobile-img"
          />
          <p className="home-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>

          <div className="home-buttons">
            <Link to="/products">
              <button type="button" className="shop-now-button">
                Shop Now
              </button>
            </Link>
            {cartCount > 0 && (
              <Link to="/cart">
                <button type="button" className="view-cart-button">
                  View Cart ({cartCount})
                </button>
              </Link>
            )}
          </div>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="dresses to be noticed"
          className="home-desktop-img"
        />
      </div>

      {/* Cart Summary Widget */}
      {cartCount > 0 && (
        <div className="cart-summary-widget">
          <h3>Your Shopping Cart</h3>
          <div className="cart-stats">
            <div className="stat-item">
              <span className="stat-value">{cartCount}</span>
              <span className="stat-label">Items</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Rs {totalPrice}/-</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <Link to="/cart">
            <button type="button" className="checkout-button">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}

      {/* Shopping Categories */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <div className="category-card">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="category-image"
                />
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2 className="section-title">Featured Products</h2>
        <div className="featured-products-grid">
          {featuredProducts.map(product => (
            <div
              key={product.id}
              className="featured-card"
              onClick={() => navigateToCategory(getProductCategory(product.id))}
              role="button"
              tabIndex={0}
              onKeyPress={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigateToCategory(getProductCategory(product.id))
                }
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="featured-image"
              />
              <div className="featured-details">
                <h3 className="featured-title">{product.title}</h3>
                <p className="featured-brand">{product.brand}</p>
                <div className="featured-price-rating">
                  <span className="featured-price">Rs {product.price}/-</span>
                  <span className="featured-rating">⭐ {product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/products">
            <button type="button" className="view-all-button">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      {/* Shopping Categories */}
      {cartCount > 0 && (
        <div className="cart-summary-widget">
          <h3>Your Shopping Cart</h3>
          <div className="cart-stats">
            <div className="stat-item">
              <span className="stat-value">{cartCount}</span>
              <span className="stat-label">Items</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Rs {totalPrice}/-</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <Link to="/cart">
            <button type="button" className="checkout-button">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}

      {/* Shopping Categories */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <div className="category-card">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="category-image"
                />
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/products">
            <button type="button" className="view-all-button">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      {/* Special Offers */}
      <section className="offers-section">
        <div className="offer-card">
          <h2>Special Offer!</h2>
          <p>Get 20% off on your first order above Rs. 2000</p>
          <p className="offer-code">Use code: FIRST20</p>
          <Link to="/products">
            <button type="button" className="offer-button">
              Shop Now & Save
            </button>
          </Link>
        </div>
      </section>

      {/* Shopping Stats */}
      <section className="stats-section">
        <h2 className="section-title">Why Shop With Us?</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>1000+</h3>
            <p>Products</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Brands</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
          <div className="stat-card">
            <h3>Free</h3>
            <p>Shipping</p>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="trending-section">
        <h2 className="section-title">🔥 Trending Now</h2>
        <div className="trending-grid">
          <div
            className="trending-item"
            onClick={() => navigateToCategory('electronics')}
            role="button"
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigateToCategory('electronics')
              }
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop"
              alt="Smartphones"
              className="trending-image"
            />
            <p>Smartphones</p>
          </div>
          <div
            className="trending-item"
            onClick={() => navigateToCategory('women')}
            role="button"
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigateToCategory('women')
              }
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop"
              alt="Fashion"
              className="trending-image"
            />
            <p>Fashion</p>
          </div>
          <div
            className="trending-item"
            onClick={() => navigateToCategory('home')}
            role="button"
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigateToCategory('home')
              }
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop"
              alt="Home & Living"
              className="trending-image"
            />
            <p>Home & Living</p>
          </div>
          <div
            className="trending-item"
            onClick={() => navigateToCategory('kids')}
            role="button"
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigateToCategory('kids')
              }
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop"
              alt="Toys & Games"
              className="trending-image"
            />
            <p>Toys & Games</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews-section">
        <h2 className="section-title">⭐ Customer Reviews</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-rating">⭐⭐⭐⭐⭐</div>
            <p className="review-text">
              &quot;Amazing quality products and fast delivery! Highly recommend
              this shopping app.&quot;
            </p>
            <p className="review-author">- Sarah K.</p>
          </div>
          <div className="review-card">
            <div className="review-rating">⭐⭐⭐⭐⭐</div>
            <p className="review-text">
              &quot;Great variety of products and excellent customer service.
              Will shop again!&quot;
            </p>
            <p className="review-author">- Rahul M.</p>
          </div>
          <div className="review-card">
            <div className="review-rating">⭐⭐⭐⭐⭐</div>
            <p className="review-text">
              &quot;Love the kids collection! My children are so happy with
              their new clothes.&quot;
            </p>
            <p className="review-author">- Priya S.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
