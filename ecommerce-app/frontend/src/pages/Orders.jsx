import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8001/orders/?skip=0&limit=50"
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      order.order_id.toLowerCase().includes(searchValue) ||
      order.customer_id.toLowerCase().includes(searchValue);

    const matchesStatus =
      selectedStatus === "All" ||
      order.order_status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <div className="orders-page">

      <section className="orders-header">
        <div className="orders-header-content">

          <button
            type="button"
            className="back-home-button"
            onClick={() => navigate("/")}
          >
            <span className="back-arrow">←</span>
            <span>Back to Home</span>
          </button>

          <span className="section-label">ORDER MANAGEMENT</span>

          <h1>Orders</h1>

          <p>
            View and monitor real orders from the business database.
          </p>

        </div>

        <div className="order-count">
          <strong>{filteredOrders.length}</strong>
          <span>Orders</span>
        </div>
      </section>

      <section className="orders-toolbar">

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search by order ID or customer ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="category-select"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="delivered">Delivered</option>
          <option value="shipped">Shipped</option>
          <option value="canceled">Canceled</option>
          <option value="unavailable">Unavailable</option>
          <option value="invoiced">Invoiced</option>
          <option value="processing">Processing</option>
          <option value="created">Created</option>
          <option value="approved">Approved</option>
        </select>

      </section>

      <section className="orders-container">

        {loading ? (
          <div className="loading">
            <div className="loader"></div>
            <p>Loading orders...</p>
          </div>

        ) : filteredOrders.length === 0 ? (

          <div className="no-products">
            <div>📦</div>
            <h2>No orders found</h2>
            <p>
              Try another order ID, customer ID, or status.
            </p>
          </div>

        ) : (

          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer ID</th>
                  <th>Status</th>
                  <th>Purchase Date</th>
                  <th>Estimated Delivery</th>
                </tr>
              </thead>

              <tbody>

                {filteredOrders.map((order) => (

                  <tr key={order.order_id}>

                    <td>
                      <button
                        type="button"
                        className="order-id-button"
                        onClick={() =>
                          navigate(`/orders/${order.order_id}`)
                        }
                      >
                        {order.order_id.slice(0, 12)}...
                      </button>
                    </td>

                    <td>
                      <span className="customer-id">
                        {order.customer_id.slice(0, 12)}...
                      </span>
                    </td>

                    <td>
                      <span
                        className={`order-status status-${order.order_status}`}
                      >
                        {formatStatus(order.order_status)}
                      </span>
                    </td>

                    <td>
                      {order.order_purchase_timestamp}
                    </td>

                    <td>
                      {order.order_estimated_delivery_date}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>
  );
}

export default Orders;