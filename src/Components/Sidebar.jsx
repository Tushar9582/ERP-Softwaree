import React, { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaBox, 
  FaUsers,
  FaFileInvoice, 
  FaChartLine, 
  FaCog, 
  FaSignOutAlt,
  FaClipboardList,
  FaExchangeAlt,
  FaTruck,
  FaUserTie,
  FaChartBar
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ activeItem, onMenuItemClick, onLogout }) => {
  const menuItems = [
    { id: "Dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { id: "Inventory", icon: <FaBox />, label: "Inventory" },
    { id: "OrderManagement", icon: <FaClipboardList />, label: "Order Management" },
    { id: "ClientManagement", icon: <FaUsers />, label: "Client Management" },
    { id: "InvoiceGeneration", icon: <FaFileInvoice />, label: "Invoice Generation" },
    { id: "ImportExport", icon: <FaExchangeAlt />, label: "Import/Export" },
    { id: "ShippingLogistics", icon: <FaTruck />, label: "Shipping & Logistics" },
    { id: "HumanResources", icon: <FaUserTie />, label: "Human Resources" },
    { id: "ReportsAnalytics", icon: <FaChartBar />, label: "Reports & Analytics" },
    { id: "Settings", icon: <FaCog />, label: "Settings" }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="https://via.placeholder.com/50" alt="Logo" className="logo" />
        <div>
          <h2>Textile ERP</h2>
          <p>Import-Export System</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={activeItem === item.id ? 'active' : ''}
              onClick={() => onMenuItemClick(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;