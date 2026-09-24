import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8001/customers/?skip=0&limit=50"
      );

      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase();

    return (
      customer.customer_id.toLowerCase().includes(searchValue) ||
      customer.customer_unique_id.toLowerCase().includes(searchValue) ||
      customer.customer_city.toLowerCase().includes(searchValue) ||
      customer.customer_state.toLowerCase().includes(searchValue)
    );
  });

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

          <span className="section-label">
            CUSTOMER MANAGEMENT
          </span>

          <h1>Customers</h1>

          <p>
            View real customer information from the business database.
          </p>

        </div>

        <div className="order-count">
          <strong>{filteredCustomers.length}</strong>
          <span>Customers</span>
        </div>
      </section>

      <section className="orders-toolbar">

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search by ID, city or state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </section>

      <section className="orders-container">

        {loading ? (

          <div className="loading">
            <div className="loader"></div>
            <p>Loading customers...</p>
          </div>

        ) : filteredCustomers.length === 0 ? (

          <div className="no-products">
            <div>👤</div>
            <h2>No customers found</h2>
            <p>
              Try another customer ID, city, or state.
            </p>
          </div>

        ) : (

          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Unique ID</th>
                  <th>City</th>
                  <th>State</th>
                  <th>ZIP Code</th>
                </tr>
              </thead>

              <tbody>

                {filteredCustomers.map((customer) => (

                  <tr key={customer.customer_id}>

                    <td>
                        <button
                            type="button"
                            className="order-id-button"
                            onClick={() =>
                              navigate(`/customers/${customer.customer_id}`)
                            }
                        >
                        {customer.customer_id.slice(0, 12)}...
                        </button>
                    </td>

                    <td>
                      <span className="customer-id">
                        {customer.customer_unique_id.slice(0, 12)}...
                      </span>
                    </td>

                    <td>
                      {customer.customer_city}
                    </td>

                    <td>
                      {customer.customer_state}
                    </td>

                    <td>
                      {customer.customer_zip_code_prefix}
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

export default Customers;