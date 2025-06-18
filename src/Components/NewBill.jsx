import React, { useState, useEffect } from "react";
import "./NewBill.css";

// Sample products (you can fetch this from backend later)
const products = [
  { id: 1, name: "Product 1", category: "Vitamins", price: 1974 },
  { id: 2, name: "Product 2", category: "Equipment", price: 1530 },
  { id: 3, name: "Product 3", category: "Supplements", price: 1917 },
  { id: 4, name: "Product 4", category: "Pre-Workout", price: 2898 },
];

// Categories (you can fetch from backend later)
const Categories = ["All Categories", "Vitamins", "Equipment", "Supplements", "Pre-Workout"];

function NewBill() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [customer, setCustomer] = useState({ name: "", phone: "", id: "" });
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add product to the bill
  const handleAddProduct = (product) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Update Customer
  const handleAddNewCustomer = () => {
    console.log("Add new Customer.");
  };
  
  const handleGuestPurchase = () => {
    setCustomer({ name: "Guest Customer", phone: "", id: "GUEST" });
  };
  
  // Payment
  const handleSelectPayment = (type) => setPaymentMethod(type);

  // Bill Summary
  const totalQty = selectedProducts.reduce((acc, p) => acc + p.qty, 0);
  const subTotal = selectedProducts.reduce((acc, p) => acc + p.qty * p.price, 0);
  const gst = subTotal * 0.12;
  const total = subTotal + gst;

  // Proceed to Bill
  const handleProceedToBill = () => {
    if (selectedProducts.length === 0) {
      return alert("Add at least 1 product.");
    }
    const invoice = {
      customer,
      products: selectedProducts,
      totalQty,
      subTotal,
      gst,
      total,
      paymentMethod,
      date: new Date().toISOString()
    };
    console.log("Invoice generated", invoice);
    setSelectedProducts([]);
  };

  // Save as Draft
  const handleSaveAsDraft = () => {
    console.log("Save as Draft.");
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (filterCategory !== "All Categories" && p.category !== filterCategory) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (isMobile) {
    return (
      <div className="new-bill mobile">
        {/* Mobile Header */}
        <div className="mobile-header">
          <h1>New Bill</h1>
          <div className="header-actions">
            <span>Bill # TAN-2024-005</span>
          </div>
        </div>

        {/* Mobile Customer Section */}
        <div className="mobile-section customer-section">
          <input
            type="text"
            placeholder="Search customer"
            className="mobile-input"
          />
          <div className="mobile-buttons">
            <button onClick={handleAddNewCustomer}>With Customer</button>
            <button onClick={handleGuestPurchase}>Quick Sale</button>
          </div>
        </div>

        {/* Mobile Product Search */}
        <div className="mobile-section search-section">
          <input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mobile-input"
          />
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            className="mobile-select"
          >
            {Categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Mobile Product Grid */}
        <div className="mobile-product-grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="mobile-product-item" onClick={() => handleAddProduct(p)}>
              <div className="product-icon">📦</div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-category">{p.category}</div>
                <div className="product-price">₹{p.price}</div>
              </div>
              <button className="mobile-add-btn">+</button>
            </div>
          ))}
        </div>

        {/* Mobile Selected Products */}
        <div className="mobile-selected-products">
          <h3>Selected Items ({selectedProducts.length})</h3>
          {selectedProducts.map((p) => (
            <div key={p.id} className="selected-item">
              <span>{p.name} x{p.qty}</span>
              <span>₹{(p.qty * p.price).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Mobile Summary */}
        <div className="mobile-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{subTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>GST (12%):</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {/* Mobile Payment */}
          <div className="mobile-payment">
            <h3>Payment Method</h3>
            <div className="payment-buttons">
              {["Cash", "Card", "UPI"].map((pm) => (
                <button
                  key={pm}
                  onClick={() => handleSelectPayment(pm)}
                  className={paymentMethod === pm ? "active" : ""}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="mobile-actions">
            <button className="draft-btn" onClick={handleSaveAsDraft}>Save Draft</button>
            <button className="proceed-btn" onClick={handleProceedToBill}>Proceed to Bill</button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop View (original code with minor adjustments)
  return (
    <div className="new-bill desktop">
      {/* Header Section */}
      <div className="header">
        <h1>New Bill — Create a new billing transaction</h1>
        <div className="header-actions">
          <button onClick={handleAddNewCustomer}>
            With Customer
          </button>
          <button onClick={handleGuestPurchase}>
            Quick Sale
          </button>
          <span>Bill # TAN-2024-005</span>
        </div>
      </div>

      {/* Customer Section */}
      <div className="section">
        <input
          type="text"
          placeholder="Search customer by name, phone, or ID"
        />
        <div className="actions">
          <button onClick={handleAddNewCustomer}>
            Add New Customer
          </button>
          <button onClick={handleGuestPurchase}>
            Guest Purchase
          </button>
        </div>
      </div>

      {/* Product Section */}
      <div className="section products">
        <input
          type="text"
          placeholder="Search products by name or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {Categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="product-grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="product-item">
              <div className="product-icon">📦</div>
              <div>{p.name}</div>
              <div>{p.category}</div>
              <div>₹{p.price}</div>
              <button onClick={() => handleAddProduct(p)}>+</button>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Summary Section */}
      <div className="section summary">
        <h2>Bill Summary</h2>
        <div>Items: {selectedProducts.length}</div>
        <div>Qty: {totalQty}</div>
        <div>Subtotal: ₹{subTotal.toFixed(2)}</div>
        <div>GST (12%): ₹{gst.toFixed(2)}</div>
        <div>Total: <span>₹{total.toFixed(2)}</span></div>

        {/* Payment Method Section */}
        <div className="payment">
          <h3>Select Payment Method</h3>
          {["Cash", "Card", "UPI", "Bank transfer"].map((pm) => (
            <button
              key={pm}
              onClick={() => handleSelectPayment(pm)}
              className={paymentMethod === pm ? "active" : ""}
            >
              {pm}
            </button>
          ))}
        </div>

        {/* Final Actions */}
        <div className="actions">
          <button onClick={handleProceedToBill}>
            Proceed to Bill
          </button>
          <button onClick={handleSaveAsDraft}>
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewBill;
