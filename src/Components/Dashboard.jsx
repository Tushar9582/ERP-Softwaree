import React, { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          <h1>The Athletes Nutrition – TAN Downtown Dashboard</h1>
        </div>
        <div className="header-right">
          <span className="welcome-text">Welcome, Sarah Johnson @ TAN Downtown</span>
          <div className="avatar">S</div>
          <button className="dark-light">🌓</button>
          <button className="logout">🚪</button>
        </div>
      </header>

      {/* Main Content */}
      <div 
  className="dashboard-content"
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 200px)',
    paddingRight: '5px',
    width: '80vw',
    minHeight: '90vh'
  }}
>
        {/* Statistic Cards Section */}
        <section className="stat-cards">
          <div className="card green">
            <h3>Today's Sales</h3>
            <p>₹4,250 <span className="trend">(+12.5%)</span></p>
            <button>View Details</button>
          </div>
          <div className="card blue">
            <h3>Items Sold</h3>
            <p>127 <span className="trend">(+8)</span></p>
            <button>View Items</button>
          </div>
          <div className="card purple">
            <h3>Active Members</h3>
            <p>324 <span className="trend">(+3 this week)</span></p>
            <button>View Members</button>
          </div>
          <div className="card yellow">
            <h3>Low Stock Items</h3>
            <p>3 <span className="critical">(critical)</span></p>
            <button>View Stock</button>
          </div>
        </section>

        {/* Performance Insights Section */}
        <section className="performance">
          <div className="insights">
            <h2>Performance Insights</h2>
            <div className="blocks">
              <div className="block">
                <h3>Weekly Revenue</h3>
                <p>₹45,280 <span className="trend">(+12%)</span></p>
              </div>
              <div className="block">
                <h3>Transactions</h3>
                <p>127 <span className="trend">(+8%)</span></p>
              </div>
              <div className="block">
                <h3>Avg Bill</h3>
                <p>₹356 <span className="trend">(+5%)</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Layout for Bottom Sections */}
        <div className="dashboard-grid">
          {/* Customer Activity Section */}
          <section className="customer-activity">
            <h2>Customer Activity</h2>
            <div className="activity-card blue">
              <p>New Members Today: <span className="highlight">+3</span></p>
              <p>Returning Customers: <span className="highlight">18</span></p>
              <p>Customer Satisfaction: <span className="highlight">4.8 ⭐</span></p>
            </div>
          </section>

          {/* Inventory Overview Section */}
          <section className="inventory-overview">
            <h2>Inventory Overview</h2>
            <div className="inventory-grid">
              <div className="inventory-item">
                <span>TAN Fitness</span>
                <span>45 <span className="status good">Good</span></span>
              </div>
              <div className="inventory-item">
                <span>PowerMax</span>
                <span>8 <span className="status low">Low</span></span>
              </div>
              <div className="inventory-item">
                <span>VitaHealth</span>
                <span>2 <span className="status critical">Critical</span></span>
              </div>
              <div className="inventory-item">
                <span>FitGear</span>
                <span>25 <span className="status good">Good</span></span>
              </div>
            </div>
          </section>

          {/* Quick Actions Section */}
          <section className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions">
              <div className="action-btn">
                <span className="action-icon">💵</span>
                <span>New Bill</span>
              </div>
              <div className="action-btn">
                <span className="action-icon">📦</span>
                <span>Add Product</span>
              </div>
              <div className="action-btn">
                <span className="action-icon">👤</span>
                <span>Add Member</span>
              </div>
              <div className="action-btn">
                <span className="action-icon">📊</span>
                <span>View Reports</span>
              </div>
            </div>
          </section>

          {/* Top Selling Section */}
          <section className="top-selling">
            <h2>Top Selling Items</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Units</th>
                    <th>Revenue</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Whey Protein Isolate</td>
                    <td>45</td>
                    <td>₹67,500</td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td>BCAA Energy Drink</td>
                    <td>32</td>
                    <td>₹19,200</td>
                    <td>87</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Low Stock Alert Section */}
          <section className="low-stock">
            <h2>Low Stock Alert</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Current</th>
                    <th>Threshold</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pre-Workout Booster</td>
                    <td>5</td>
                    <td>20</td>
                    <td><span className="status critical">Critical</span></td>
                  </tr>
                  <tr>
                    <td>Whey Protein Isolate</td>
                    <td>12</td>
                    <td>25</td>
                    <td><span className="status low">Very Low</span></td>
                  </tr>
                  <tr>
                    <td>Vitamin D3 Tablets</td>
                    <td>18</td>
                    <td>30</td>
                    <td><span className="status low">Low</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;