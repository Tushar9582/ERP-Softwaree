import React, { useState, lazy, Suspense } from 'react';
import LoginPage from './Components/LoginPage';
import Sidebar from './Components/Sidebar';
import './App.css';

// Component loader with error handling
const loadComponent = (name, path) => {
  return lazy(() => import(`${path}`).catch(() => ({
    default: () => (
      <div className="component-container">
        <h1>{name}</h1>
        <p className="error-message">
          Component not implemented yet. Create file at: {path}
        </p>
      </div>
    )
  })));
};

const componentMap = {
  "Dashboard": loadComponent("Dashboard", "./Components/Dashboard"),
  "Inventory": loadComponent("Inventory", "./Components/Inventory"),
  "Order Management": loadComponent("Order Management", "./Components/OrderManagement"),
  "Client Management": loadComponent("Client Management", "./Components/ClientManagement"),
  "Invoice Generation": loadComponent("Invoice Generation", "./Components/InvoiceGeneration"),
  "Import/Export": loadComponent("Import/Export", "./Components/ImportExport"),
  "Shipping & Logistics": loadComponent("Shipping & Logistics", "./Components/ShippingLogistics"),
  "Human Resources": loadComponent("Human Resources", "./Components/HumanResources"),
  "Reports & Analytics": loadComponent("Reports & Analytics", "./Components/ReportsAnalytics"),
  "Settings": loadComponent("Settings", "./Components/Settings"),
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const handleLogin = (email, password) => {
    if (email === "demo@gmail.com" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const CurrentComponent = componentMap[activeComponent] || componentMap["Dashboard"];

  return (
    <div>
      {isLoggedIn ? (
        <div className="app-container">
          <Sidebar onMenuItemClick={setActiveComponent} />
          <main className="main-content">
            <Suspense fallback={<div>Loading...</div>}>
              <CurrentComponent />
            </Suspense>
          </main>
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;