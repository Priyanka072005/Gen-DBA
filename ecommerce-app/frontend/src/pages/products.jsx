import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8001/products/?skip=0&limit=40"
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    (product.product_category_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="products-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="products-header">

        <div className="products-header-content">

          {/* BACK TO HOME */}
          <button
            type="button"
            className="back-home-button"
            onClick={() => navigate("/")}
          >
            <span className="back-arrow">←</span>
            <span>Back to Home</span>
          </button>

          <span className="section-label">
            OUR COLLECTION
          </span>

          <h1>
            Explore Products
          </h1>

          <p>
            Discover products from our extensive collection.
          </p>

        </div>

        {/* PRODUCT COUNT */}

        <div className="product-count">
          <strong>
            {filteredProducts.length}
          </strong>

          <span>
            Products
          </span>
        </div>

      </section>

      {/* =========================
          SEARCH / FILTER BAR
      ========================= */}

      <section className="products-toolbar">

        <div className="search-box">

          <span>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search by category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <button
          type="button"
          className="filter-button"
        >
          ⚙ Filters
        </button>

      </section>

      {/* =========================
          PRODUCTS
      ========================= */}

      <section className="products-container">

        {loading ? (

          /* LOADING */

          <div className="loading">

            <div className="loader"></div>

            <p>
              Loading products...
            </p>

          </div>

        ) : filteredProducts.length === 0 ? (

          /* NO PRODUCTS */

          <div className="no-products">

            <div>
              🔍
            </div>

            <h2>
              No products found
            </h2>

            <p>
              Try searching for another category.
            </p>

          </div>

        ) : (

          /* PRODUCT GRID */

          <div className="real-product-grid">

            {filteredProducts.map((product) => (

              <div
                className="real-product-card"
                key={product.product_id}
              >

                {/* PRODUCT IMAGE */}

                <div className="real-product-image">

                  <span className="product-badge">
                    NEW
                  </span>

                  <button
                    type="button"
                    className="product-heart"
                    aria-label="Add to wishlist"
                  >
                    ♡
                  </button>

                  <div className="product-placeholder">
                    🛍️
                  </div>

                </div>

                {/* PRODUCT INFORMATION */}

                <div className="real-product-info">

                  {/* CATEGORY */}

                  <span className="real-product-category">

                    {product.product_category_name ||
                      "General"}

                  </span>

                  {/* PRODUCT NAME */}

                  <h3>

                    {product.product_category_name
                      ? product.product_category_name
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (letter) =>
                            letter.toUpperCase()
                          )
                      : "Product"}

                  </h3>

                  {/* PRODUCT ID */}

                  <div className="product-meta">

                    <span>
                      Product ID
                    </span>

                    <span>
                      {product.product_id.slice(0, 8)}...
                    </span>

                  </div>

                  {/* PRODUCT DETAILS */}

                  <div className="product-details">

                    <span>
                      📦 {product.product_weight_g || 0}g
                    </span>

                    <span>
                      📷 {product.product_photos_qty || 0}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Products;