import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Customers from "./pages/Customers";
import CustomerDetails from "./pages/CustomerDetails";

import "./App.css";


function Home() {
  const navigate = useNavigate();

  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8001/home/"
      );

      setHomeData(response.data);

    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };


  const formatCategory = (category) => {
    if (!category) {
      return "General";
    }

    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };


  const getCategoryIcon = (category) => {
    const value = (category || "").toLowerCase();

    if (
      value.includes("beauty") ||
      value.includes("perfumery")
    ) {
      return "💄";
    }

    if (
      value.includes("computer") ||
      value.includes("electronics") ||
      value.includes("telephony") ||
      value.includes("audio")
    ) {
      return "📱";
    }

    if (
      value.includes("fashion") ||
      value.includes("clothing") ||
      value.includes("shoes")
    ) {
      return "👗";
    }

    if (
      value.includes("home") ||
      value.includes("furniture") ||
      value.includes("housewares")
    ) {
      return "🏠";
    }

    if (
      value.includes("sports") ||
      value.includes("leisure")
    ) {
      return "⚽";
    }

    if (
      value.includes("books") ||
      value.includes("music")
    ) {
      return "📚";
    }

    if (
      value.includes("baby") ||
      value.includes("toys")
    ) {
      return "🧸";
    }

    if (
      value.includes("auto")
    ) {
      return "🚗";
    }

    if (
      value.includes("food") ||
      value.includes("drinks")
    ) {
      return "🍴";
    }

    return "🛍️";
  };


  const getFeaturedCategories = () => {
    if (!homeData?.categories) {
      return [];
    }

    return homeData.categories.slice(0, 8);
  };


  const getFeaturedProducts = () => {
    if (!homeData?.featured_products) {
      return [];
    }

    return homeData.featured_products;
  };


  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="loader"></div>
        <p>Loading GenShop...</p>
      </div>
    );
  }


  return (
    <div className="app">

      {/* TOP OFFER BAR */}
      <div className="offer-bar">
        <p>
          🎉 Explore products from our real business database
        </p>

        <Link to="/products">
          Shop Now →
        </Link>
      </div>


      {/* NAVBAR */}
      <header className="navbar">

        <Link to="/" className="logo">

          <span className="logo-icon">
            G
          </span>

          <span>
            Gen<span>Shop</span>
          </span>

        </Link>


        <nav className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/customers">
            Customers
          </Link>

          <a href="#categories">
            Categories
          </a>

          <Link to="/orders">
            Orders
          </Link>

        </nav>


        <div className="nav-actions">

          <button
            type="button"
            className="icon-button"
          >
            🔍
          </button>

          <button
            type="button"
            className="icon-button"
          >
            ♡
          </button>

          <button
            type="button"
            className="cart-button"
          >
            🛒
            <span>Cart</span>
            <b>0</b>
          </button>

          <button
            type="button"
            className="account-button"
          >
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
              ✨ REAL BUSINESS DATA
            </span>


            <h1>
              Everything You Need,
              <br />
              <span>All in One Place.</span>
            </h1>


            <p>
              Explore real products, customers and orders
              powered by the GenShop business database.
            </p>


            <div className="hero-buttons">

              <Link
                to="/products"
                className="primary-button"
              >
                Shop Now →
              </Link>

              <a
                href="#categories"
                className="secondary-button"
              >
                Explore Categories
              </a>

            </div>


            {/* REAL DATABASE STATISTICS */}
            <div className="hero-stats">

              <div>

                <strong>
                  {homeData?.statistics?.products?.toLocaleString() || 0}
                </strong>

                <span>
                  Products
                </span>

              </div>


              <div>

                <strong>
                  {homeData?.statistics?.customers?.toLocaleString() || 0}
                </strong>

                <span>
                  Customers
                </span>

              </div>


              <div>

                <strong>
                  {homeData?.statistics?.orders?.toLocaleString() || 0}
                </strong>

                <span>
                  Orders
                </span>

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
                📊 Real Database
              </div>


              <div className="floating-card card-two">
                ⚡ Fast API
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
                Browse categories from the real product dataset.
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

            {getFeaturedCategories().map((category) => (

              <div
                className="category-card"
                key={category}
                onClick={() => navigate("/products")}
                style={{ cursor: "pointer" }}
              >

                <div className="category-icon">
                  {getCategoryIcon(category)}
                </div>


                <div>

                  <h3>
                    {formatCategory(category)}
                  </h3>

                  <p>
                    Explore products in this category
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
                FROM DATABASE
              </span>

              <h2>
                Featured Products
              </h2>

              <p>
                Real products retrieved directly from MySQL.
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

            {getFeaturedProducts().map((product) => (

              <div
                className="product-card"
                key={product.product_id}
                onClick={() =>
                  navigate(`/products/${product.product_id}`)
                }
                style={{ cursor: "pointer" }}
              >

                <div className="product-image">

                  <span className="discount">
                    REAL DATA
                  </span>


                  <button
                    type="button"
                    className="wishlist"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    ♡
                  </button>


                  <div className="large-product-icon">
                    {getCategoryIcon(
                      product.product_category_name
                    )}
                  </div>

                </div>


                <div className="product-info">

                  <span className="product-category">

                    {formatCategory(
                      product.product_category_name
                    )}

                  </span>


                  <h3>

                    {formatCategory(
                      product.product_category_name
                    )}

                  </h3>


                  <div className="rating">

                    📦
                    <span>
                      Product ID
                    </span>

                  </div>


                  <div className="price-row">

                    <strong>
                      {product.product_weight_g || 0} g
                    </strong>

                    <span>
                      {product.product_photos_qty || 0} photos
                    </span>

                  </div>


                  <button
                    type="button"
                    className="add-cart"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(
                        `/products/${product.product_id}`
                      );
                    }}
                  >
                    View Product →
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* DATABASE INFORMATION */}
        <section className="offer-section">

          <div>

            <span className="offer-label">
              GENDATABASE
            </span>

            <h2>
              Powered by <strong>Real Data</strong>
            </h2>

            <p>
              GenShop uses real business data stored in
              MySQL and monitored by Gen-DBA.
            </p>

            <Link
              to="/products"
              className="primary-button"
            >
              Explore Products →
            </Link>

          </div>


          <div className="offer-icon">
            🗄️
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
              A realistic business application powered by
              React, FastAPI and MySQL.
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
              New Arrivals
            </Link>

            <Link to="/orders">
              Orders
            </Link>

          </div>


          <div className="footer-column">

            <h4>
              Customers
            </h4>

            <Link to="/customers">
              Customers
            </Link>

            <Link to="/customers">
              Customer Details
            </Link>

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


        {/* ORDERS */}

        <Route
          path="/orders"
          element={<Orders />}
        />


        {/* ORDER DETAILS */}

        <Route
          path="/orders/:orderId"
          element={<OrderDetails />}
        />


        {/* CUSTOMERS */}

        <Route
          path="/customers"
          element={<Customers />}
        />


        {/* CUSTOMER DETAILS */}

        <Route
          path="/customers/:customerId"
          element={<CustomerDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;