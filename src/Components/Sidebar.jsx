import React, { useState } from "react";
import { FaTachometerAlt, FaBoxes, FaFileInvoice, FaExchangeAlt, FaTruck, FaUsers, FaClipboardList, FaCog, FaChartBar, FaUserTie } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Inventory", icon: <FaBoxes /> },
    { name: "Order Management", icon: <FaClipboardList /> },
    { name: "Client Management", icon: <FaUsers /> },
    { name: "Invoice Generation", icon: <FaFileInvoice /> },
    { name: "Import/Export", icon: <FaExchangeAlt /> },
    { name: "Shipping & Logistics", icon: <FaTruck /> },
    { name: "Human Resources", icon: <FaUserTie /> },
    { name: "Reports & Analytics", icon: <FaChartBar /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-box">
        <img src="https://via.placeholder.com/50" alt="Logo" />
        <h2>Textile ERP</h2>
        <p>Import-Export System</p>
      </div>
      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={activeItem === item.name ? "active" : ""}
            onClick={() => setActiveItem(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
