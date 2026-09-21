import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8001/orders/${orderId}`
      );

      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return date;
    }

    return formattedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="loader"></div>
        <p>Loading order...</p>
      </div>
    );
  }

  if (!order || order.message === "Order not found") {
    return (
      <div className="product-not-found">
        <div className="not-found-icon">📦</div>

        <h2>Order Not Found</h2>

        <p>
          The requested order could not be found in the database.
        </p>

        <button
          type="button"
          onClick={() => navigate("/orders")}
        >
          ← Back to Orders
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
          onClick={() => navigate("/orders")}
        >
          ← Back to Orders
        </button>

        <div className="product-details-card">

          <div className="product-details-image">
            <div className="details-image-placeholder">
              📦
            </div>
          </div>

          <div className="product-details-content">

            <span className="details-category">
              ORDER DETAILS
            </span>

            <h1>Order Information</h1>

            <p className="details-description">
              Order information retrieved directly from the
              GenShop business database.
            </p>

            <div className="details-divider"></div>

            <div className="details-grid">

              <div className="detail-item">
                <span>Order ID</span>
                <strong>{order.order_id}</strong>
              </div>

              <div className="detail-item">
                <span>Customer ID</span>
                <strong>{order.customer_id}</strong>
              </div>

              <div className="detail-item">
                <span>Order Status</span>
                <strong>
                  {formatStatus(order.order_status)}
                </strong>
              </div>

              <div className="detail-item">
                <span>Purchase Date</span>
                <strong>
                  {formatDate(order.order_purchase_timestamp)}
                </strong>
              </div>

              <div className="detail-item">
                <span>Approved Date</span>
                <strong>
                  {formatDate(order.order_approved_at)}
                </strong>
              </div>

              <div className="detail-item">
                <span>Carrier Delivery</span>
                <strong>
                  {formatDate(
                    order.order_delivered_carrier_date
                  )}
                </strong>
              </div>

              <div className="detail-item">
                <span>Customer Delivery</span>
                <strong>
                  {formatDate(
                    order.order_delivered_customer_date
                  )}
                </strong>
              </div>

              <div className="detail-item">
                <span>Estimated Delivery</span>
                <strong>
                  {formatDate(
                    order.order_estimated_delivery_date
                  )}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;