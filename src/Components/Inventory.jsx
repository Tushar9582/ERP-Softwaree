import React, { useState } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([
    {
      id: 'PRO-001',
      name: 'Tushar Goswami',
      category: 'Protein',
      price: 450,
      cost: 478,
      stock: 4,
      unitsSold: 0,
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    cost: '',
    stock: '',
  });

  const categories = ['Protein', 'Supplements', 'Pre-Workout', 'Vitamins'];

  // Calculate derived values
  const calculateRevenue = (price, unitsSold) => price * unitsSold;
  const calculateMargin = (price, cost) => ((price - cost) / price * 100).toFixed(0);

  // Calculate summary statistics
  const totalProducts = products.length;
  const totalRevenue = products.reduce(
    (sum, product) => sum + calculateRevenue(product.price, product.unitsSold), 
    0
  );
  
  const avgMargin = products.length > 0 
    ? products.reduce(
        (sum, product) => sum + parseFloat(calculateMargin(product.price, product.cost)), 
        0
      ) / products.length
    : 0;

  // Find top seller
  const topSeller = products.length > 0 
    ? products.reduce((max, product) => 
        product.unitsSold > max.unitsSold ? product : max
      )
    : null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' || name === 'cost' || name === 'stock' 
        ? parseFloat(value) || 0 
        : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `PRO-${(products.length + 1).toString().padStart(3, '0')}`;
    const productToAdd = {
      ...newProduct,
      id: newId,
      unitsSold: 0,
    };
    
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      cost: '',
      stock: '',
    });
    setShowForm(false);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="inventory-container">
      <div className="header">
        <h1>Product Management</h1>
        <p className="subtitle">Manage inventory and product performance</p>
      </div>
      
      <div className="dashboard">
        <div className="stats-section">
          <div className="stat-card highlight">
            <h3>Total Products</h3>
            <p className="stat-value">{totalProducts}</p>
          </div>
          
          <div className="stat-card highlight">
            <h3>Total Revenue</h3>
            <p className="stat-value">£{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        
        {topSeller && (
          <div className="top-seller-card">
            <h3>Top Seller</h3>
            <div className="seller-info">
              <p className="seller-name">{topSeller.name}</p>
              <p className="units-sold">{topSeller.unitsSold} units sold</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="product-management">
        <div className="section-header">
          <h2>Product Catalog</h2>
          <button 
            className="add-product-btn" 
            onClick={() => setShowForm(true)}
          >
            + Add Product
          </button>
        </div>
        
        {showForm && (
          <div className="form-overlay">
            <div className="product-form-container">
              <div className="form-header">
                <h3>Add New Product</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowForm(false)}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Price (£)</label>
                    <input
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Cost (£)</label>
                    <input
                      type="number"
                      name="cost"
                      value={newProduct.cost}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {products.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Cost</th>
                  <th>Stock</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                  <th>Margin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const margin = calculateMargin(product.price, product.cost);
                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="product-info">
                          <span className="product-name">{product.name}</span>
                          <span className="product-id">{product.id}</span>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>£{product.price.toLocaleString()}</td>
                      <td>£{product.cost.toLocaleString()}</td>
                      <td className={`stock ${product.stock < 5 ? 'low' : ''}`}>
                        {product.stock}
                      </td>
                      <td>{product.unitsSold}</td>
                      <td>£{calculateRevenue(product.price, product.unitsSold).toLocaleString()}</td>
                      <td className={`margin ${margin < 0 ? 'negative' : 'positive'}`}>
                        {margin}%
                      </td>
                      <td>
                        <button 
                          className="action-btn delete"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No products found. Add your first product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;