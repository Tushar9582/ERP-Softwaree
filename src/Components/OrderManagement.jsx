import React, { useState } from 'react';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      orderId: "ORD-1001",
      customer: "John Doe",
      date: "2024-06-10",
      items: 3,
      total: "¥12,450",
      status: "Processing",
      payment: "Paid"
    },
    {
      orderId: "ORD-1002",
      customer: "Jane Smith",
      date: "2024-06-12",
      items: 5,
      total: "¥18,750",
      status: "Shipped",
      payment: "Paid"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate dashboard metrics
  const totalOrders = orders.length;
  const processingOrders = orders.filter(o => o.status === "Processing").length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  const totalRevenue = orders.reduce((sum, o) => sum + parseInt(o.total.replace(/[^0-9]/g, '')), 0);

  const handleAddOrder = () => {
    setCurrentOrder(null);
    setShowForm(true);
  };

  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = Object.fromEntries(formData.entries());

    if (currentOrder) {
      // Update existing order
      setOrders(orders.map(o => 
        o.orderId === currentOrder.orderId ? { ...o, ...orderData } : o
      ));
    } else {
      // Add new order
      const newOrderId = `ORD-${1000 + orders.length + 1}`;
      setOrders([...orders, { ...orderData, orderId: newOrderId }]);
    }
    setShowForm(false);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const importedOrders = JSON.parse(event.target.result);
        setOrders(importedOrders);
      } catch (error) {
        alert("Error importing file. Please check the format.");
      }
    };
    
    reader.readAsText(file);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(orders, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'orders-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="order-management">
      <h1>Order Management</h1>
      <p className="subtitle">Track and manage customer orders</p>
      
      <div className="dashboard">
        <div className="card">
          <h3>Total Orders</h3>
          <p className="value">{totalOrders}</p>
        </div>
        <div className="card">
          <h3>Processing</h3>
          <p className="value">{processingOrders}</p>
        </div>
        <div className="card">
          <h3>Completed</h3>
          <p className="value">{completedOrders}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p className="value">¥{totalRevenue.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="actions">
        <button onClick={handleAddOrder} className="btn primary">Create Order</button>
        <div className="file-actions">
          <label htmlFor="import-file" className="btn secondary">Import</label>
          <input 
            id="import-file" 
            type="file" 
            accept=".json" 
            onChange={handleImport}
            style={{ display: 'none' }} 
          />
          <button onClick={handleExport} className="btn secondary">Export</button>
        </div>
        <div className="search">
          <input 
            type="text" 
            placeholder="Search orders, customers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td><strong>{order.orderId}</strong></td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.items}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <span className={`payment-badge ${order.payment.toLowerCase()}`}>
                    {order.payment}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleEditOrder(order)}
                    className="btn small"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{currentOrder ? "Edit Order" : "Create New Order"}</h2>
            <form onSubmit={handleSubmit}>
              {currentOrder && (
                <div className="form-group">
                  <label>Order ID</label>
                  <input 
                    type="text" 
                    name="orderId" 
                    defaultValue={currentOrder?.orderId || ""} 
                    disabled
                  />
                </div>
              )}
              <div className="form-group">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  name="customer" 
                  defaultValue={currentOrder?.customer || ""} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Order Date</label>
                <input 
                  type="date" 
                  name="date" 
                  defaultValue={currentOrder?.date || ""} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Number of Items</label>
                <input 
                  type="number" 
                  name="items" 
                  defaultValue={currentOrder?.items || ""} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Total Amount (¥)</label>
                <input 
                  type="text" 
                  name="total" 
                  defaultValue={currentOrder?.total || ""} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  name="status" 
                  defaultValue={currentOrder?.status || "Processing"}
                  required
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-group">
                <label>Payment Status</label>
                <select 
                  name="payment" 
                  defaultValue={currentOrder?.payment || "Paid"}
                  required
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} className="btn">
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  {currentOrder ? "Update" : "Create"} Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;