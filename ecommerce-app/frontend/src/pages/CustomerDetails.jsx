import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CustomerDetails() {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8001/customers/${customerId}`
      );

      setCustomer(response.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="loader"></div>
        <p>Loading customer...</p>
      </div>
    );
  }

  if (!customer || customer.message === "Customer not found") {
    return (
      <div className="product-not-found">
        <div className="not-found-icon">👤</div>

        <h2>Customer Not Found</h2>

        <p>
          The requested customer could not be found in the database.
        </p>

        <button
          type="button"
          onClick={() => navigate("/customers")}
        >
          ← Back to Customers
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
          onClick={() => navigate("/customers")}
        >
          ← Back to Customers
        </button>

        <div className="product-details-card">

          <div className="product-details-image">
            <div className="details-image-placeholder">
              👤
            </div>
          </div>

          <div className="product-details-content">

            <span className="details-category">
              CUSTOMER DETAILS
            </span>

            <h1>Customer Information</h1>

            <p className="details-description">
              Customer information retrieved directly from the
              GenShop business database.
            </p>

            <div className="details-divider"></div>

            <div className="details-grid">

              <div className="detail-item">
                <span>Customer ID</span>
                <strong>{customer.customer_id}</strong>
              </div>

              <div className="detail-item">
                <span>Customer Unique ID</span>
                <strong>{customer.customer_unique_id}</strong>
              </div>

              <div className="detail-item">
                <span>City</span>
                <strong>{customer.customer_city}</strong>
              </div>

              <div className="detail-item">
                <span>State</span>
                <strong>{customer.customer_state}</strong>
              </div>

              <div className="detail-item">
                <span>ZIP Code</span>
                <strong>{customer.customer_zip_code_prefix}</strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerDetails;