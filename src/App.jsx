import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Component loader with error handling
const loadComponent = (name, path) => {
  return lazy(() => import(`${path}`).catch(() => ({
    default: () => (
      <div className="component-error">
        <h2>{name}</h2>
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
  "OrderManagement": loadComponent("Order Management", "./Components/OrderManagement"),
  "ClientManagement": loadComponent("Client Management", "./Components/ClientManagement"),
  "InvoiceGeneration": loadComponent("Invoice Generation", "./Components/InvoiceGeneration"),
  "ImportExport": loadComponent("Import/Export", "./Components/ImportExport"),
  "ShippingLogistics": loadComponent("Shipping & Logistics", "./Components/ShippingLogistics"),
  "HumanResources": loadComponent("Human Resources", "./Components/HumanResources"),
  "ReportsAnalytics": loadComponent("Reports & Analytics", "./Components/ReportsAnalytics"),
  "Settings": loadComponent("Settings", "./Components/Settings")
};

const LoginPage = lazy(() => import('./Components/LoginPage'));
const Sidebar = lazy(() => import('./Components/Sidebar'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('erp_auth') === 'true';
  });
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const handleLogin = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = email === "demo@gmail.com" && password === "1234";
        if (success) {
          localStorage.setItem('erp_auth', 'true');
          setIsAuthenticated(true);
        }
        resolve(success);
      }, 500);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('erp_auth');
    setIsAuthenticated(false);
  };

  const MainLayout = () => {
    const CurrentComponent = componentMap[activeComponent] || componentMap["Dashboard"];
    
    return (
      <div className="app-container">
        <Sidebar 
          activeItem={activeComponent}
          onMenuItemClick={setActiveComponent}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <Suspense fallback={<div className="loader"></div>}>
            <CurrentComponent />
          </Suspense>
        </main>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : (
            <Suspense fallback={<div className="fullscreen-loader"></div>}>
              <LoginPage onLogin={handleLogin} />
            </Suspense>
          )
        } />
        <Route path="/*" element={
          isAuthenticated ? (
            <Suspense fallback={<div className="fullscreen-loader"></div>}>
              <MainLayout />
            </Suspense>
          ) : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;