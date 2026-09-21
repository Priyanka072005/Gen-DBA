import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8001/products/categories"
      );

      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      (product.product_category_name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.product_category_name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">

      {/* PAGE HEADER */}
      <section className="products-header">

        <div className="products-header-content">

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

        <div className="product-count">
          <strong>
            {filteredProducts.length}
          </strong>

          <span>
            Products
          </span>
        </div>

      </section>

      {/* SEARCH + FILTER */}
      <section className="products-toolbar">

        <div className="search-box">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search by category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category
                .replace(/_/g, " ")
                .replace(/\b\w/g, (letter) =>
                  letter.toUpperCase()
                )}
            </option>
          ))}
        </select>

      </section>

      {/* PRODUCTS */}
      <section className="products-container">

        {loading ? (

          <div className="loading">

            <div className="loader"></div>

            <p>
              Loading products...
            </p>

          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="no-products">

            <div>🔍</div>

            <h2>
              No products found
            </h2>

            <p>
              Try another category or search.
            </p>

          </div>

        ) : (

          <div className="real-product-grid">

            {filteredProducts.map((product) => (

              <div
                className="real-product-card"
                key={product.product_id}
              >

                <div className="real-product-image">

                  <span className="product-badge">
                    NEW
                  </span>

                  <button
                    type="button"
                    className="product-heart"
                  >
                    ♡
                  </button>

                  <div className="product-placeholder">
                    🛍️
                  </div>

                </div>

                <div className="real-product-info">

                  <span className="real-product-category">
                    {product.product_category_name ||
                      "General"}
                  </span>

                  <h3>
                    {product.product_category_name
                      ? product.product_category_name
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (letter) =>
                            letter.toUpperCase()
                          )
                      : "Product"}
                  </h3>

                  <div className="product-meta">

                    <span>
                      Product ID
                    </span>

                    <span>
                      {product.product_id.slice(0, 8)}...
                    </span>

                  </div>

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