import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8001/products/${productId}`
      );

      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCategory = (category) => {
    if (!category) return "General";

    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="loader"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product || product.message === "Product not found") {
    return (
      <div className="product-not-found">
        <div className="not-found-icon">🔍</div>
        <h2>Product Not Found</h2>
        <p>The requested product could not be found.</p>

        <button
          type="button"
          onClick={() => navigate("/products")}
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-details-container">

        <button
          type="button"
          className="back-products-button"
          onClick={() => navigate("/products")}
        >
          ← Back to Products
        </button>

        <div className="product-details-card">

          <div className="product-details-image">
            <div className="details-image-placeholder">
              🛍️
            </div>
          </div>

          <div className="product-details-content">

            <span className="details-category">
              {formatCategory(product.product_category_name)}
            </span>

            <h1>
              {formatCategory(product.product_category_name)}
            </h1>

            <p className="details-description">
              Product information retrieved directly from the GenShop
              database.
            </p>

            <div className="details-divider"></div>

            <div className="details-grid">

              <div className="detail-item">
                <span>Product ID</span>
                <strong>{product.product_id}</strong>
              </div>

              <div className="detail-item">
                <span>Category</span>
                <strong>
                  {formatCategory(product.product_category_name)}
                </strong>
              </div>

              <div className="detail-item">
                <span>Weight</span>
                <strong>
                  {product.product_weight_g || 0} g
                </strong>
              </div>

              <div className="detail-item">
                <span>Photos</span>
                <strong>
                  {product.product_photos_qty || 0}
                </strong>
              </div>

              <div className="detail-item">
                <span>Product Length</span>
                <strong>
                  {product.product_length_cm || 0} cm
                </strong>
              </div>

              <div className="detail-item">
                <span>Product Height</span>
                <strong>
                  {product.product_height_cm || 0} cm
                </strong>
              </div>

              <div className="detail-item">
                <span>Product Width</span>
                <strong>
                  {product.product_width_cm || 0} cm
                </strong>
              </div>

              <div className="detail-item">
                <span>Description Length</span>
                <strong>
                  {product.product_description_lenght || 0}
                </strong>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;