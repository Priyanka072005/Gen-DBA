import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import "./App.css";

function Home() {
  const categories = [
    {
      icon: "💄",
      title: "Beauty",
      text: "Skincare, cosmetics & more",
    },
    {
      icon: "📱",
      title: "Electronics",
      text: "Smart gadgets & devices",
    },
    {
      icon: "🏠",
      title: "Home & Living",
      text: "Make your home beautiful",
    },
    {
      icon: "👗",
      title: "Fashion",
      text: "Latest trends & styles",
    },
  ];

  const products = [
    {
      image: "🧴",
      name: "Premium Beauty Collection",
      category: "Beauty",
      price: "₹899",
      oldPrice: "₹1,299",
      discount: "31% OFF",
    },
    {
      image: "🎧",
      name: "Wireless Headphones",
      category: "Electronics",
      price: "₹1,499",
      oldPrice: "₹2,199",
      discount: "32% OFF",
    },
    {
      image: "⌚",
      name: "Smart Watch",
      category: "Electronics",
      price: "₹2,299",
      oldPrice: "₹3,499",
      discount: "34% OFF",
    },
    {
      image: "👜",
      name: "Premium Fashion Bag",
      category: "Fashion",
      price: "₹1,199",
      oldPrice: "₹1,799",
      discount: "33% OFF",
    },
  ];

  return (
    <div className="app">

      {/* TOP OFFER BAR */}
      <div className="offer-bar">
        <p>🎉 Free shipping on orders above ₹999</p>
        <span>Shop Now →</span>
      </div>

      {/* NAVBAR */}
      <header className="navbar">

        <Link to="/" className="logo">
          <span className="logo-icon">G</span>

          <span>
            Gen<span>Shop</span>
          </span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <a href="#categories">Categories</a>
          <Link to="/orders">Orders</Link>
        </nav>

        <div className="nav-actions">

          <button className="icon-button">
            🔍
          </button>

          <button className="icon-button">
            ♡
          </button>

          <button className="cart-button">
            🛒
            <span>Cart</span>
            <b>0</b>
          </button>

          <button className="account-button">
            👤
            <span>Account</span>
          </button>

        </div>

      </header>

      {/* HERO */}
      <main>

        <section className="hero">

          <div className="hero-content">

            <span className="hero-badge">
              ✨ NEW COLLECTION 2026
            </span>

            <h1>
              Everything You Need,
              <br />
              <span>All in One Place.</span>
            </h1>

            <p>
              Discover thousands of products at amazing prices.
              Shop smarter, faster and easier with GenShop.
            </p>

            <div className="hero-buttons">

              <Link to="/products" className="primary-button">
                Shop Now →
              </Link>

              <a
                href="#categories"
                className="secondary-button"
              >
                Explore Categories
              </a>

            </div>

            <div className="hero-stats">

              <div>
                <strong>32K+</strong>
                <span>Products</span>
              </div>

              <div>
                <strong>10K+</strong>
                <span>Happy Customers</span>
              </div>

              <div>
                <strong>4.8★</strong>
                <span>Customer Rating</span>
              </div>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-circle"></div>

            <div className="hero-product-card">

              <div className="product-emoji">
                🛍️
              </div>

              <div className="floating-card card-one">
                ⭐ 4.8 Rating
              </div>

              <div className="floating-card card-two">
                🔥 Best Seller
              </div>

            </div>

          </div>

        </section>

        {/* CATEGORIES */}
        <section
          className="section"
          id="categories"
        >

          <div className="section-header">

            <div>

              <span className="section-label">
                EXPLORE
              </span>

              <h2>
                Shop by Category
              </h2>

              <p>
                Find everything you need in one place.
              </p>

            </div>

            <Link
              to="/products"
              className="view-all"
            >
              View All →
            </Link>

          </div>

          <div className="category-grid">

            {categories.map((category) => (

              <div
                className="category-card"
                key={category.title}
              >

                <div className="category-icon">
                  {category.icon}
                </div>

                <div>

                  <h3>
                    {category.title}
                  </h3>

                  <p>
                    {category.text}
                  </p>

                </div>

                <span className="arrow">
                  →
                </span>

              </div>

            ))}

          </div>

        </section>

        {/* FEATURED PRODUCTS */}
        <section className="section products-section">

          <div className="section-header">

            <div>

              <span className="section-label">
                TRENDING NOW
              </span>

              <h2>
                Featured Products
              </h2>

              <p>
                Popular products picked for you.
              </p>

            </div>

            <Link
              to="/products"
              className="view-all"
            >
              View All →
            </Link>

          </div>

          <div className="product-grid">

            {products.map((product) => (

              <div
                className="product-card"
                key={product.name}
              >

                <div className="product-image">

                  <span className="discount">
                    {product.discount}
                  </span>

                  <button className="wishlist">
                    ♡
                  </button>

                  <div className="large-product-icon">
                    {product.image}
                  </div>

                </div>

                <div className="product-info">

                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <div className="rating">
                    ⭐⭐⭐⭐⭐
                    <span>(120)</span>
                  </div>

                  <div className="price-row">

                    <strong>
                      {product.price}
                    </strong>

                    <del>
                      {product.oldPrice}
                    </del>

                  </div>

                  <button className="add-cart">
                    🛒 Add to Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* OFFER */}
        <section className="offer-section">

          <div>

            <span className="offer-label">
              LIMITED TIME OFFER
            </span>

            <h2>
              Get up to <strong>50% OFF</strong>
            </h2>

            <p>
              Don't miss out on our biggest deals of the season.
            </p>

            <Link
              to="/products"
              className="primary-button"
            >
              Shop Deals →
            </Link>

          </div>

          <div className="offer-icon">
            🛍️
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-main">

          <div className="footer-brand">

            <Link
              to="/"
              className="logo"
            >

              <span className="logo-icon">
                G
              </span>

              <span>
                Gen<span>Shop</span>
              </span>

            </Link>

            <p>
              Your trusted destination for quality
              products and great deals.
            </p>

          </div>

          <div className="footer-column">

            <h4>
              Shop
            </h4>

            <Link to="/products">
              All Products
            </Link>

            <Link to="/products">
              Categories
            </Link>

            <Link to="/products">
              Deals
            </Link>

            <Link to="/products">
              New Arrivals
            </Link>

          </div>

          <div className="footer-column">

            <h4>
              Support
            </h4>

            <a href="/">
              Contact Us
            </a>

            <a href="/">
              Help Center
            </a>

            <a href="/">
              Shipping
            </a>

            <a href="/">
              Returns
            </a>

          </div>

          <div className="footer-column">

            <h4>
              Company
            </h4>

            <a href="/">
              About Us
            </a>

            <a href="/">
              Privacy Policy
            </a>

            <a href="/">
              Terms
            </a>

            <a href="/">
              Careers
            </a>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © 2026 GenShop. All rights reserved.
          </p>

          <p>
            Built with React + FastAPI + MySQL
          </p>

        </div>

      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/products/:productId"
          element={<ProductDetails />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
         path="/orders/:orderId" element={<OrderDetails />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;