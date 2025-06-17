import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './MainLayout.css';

const Dashboard = lazy(() => import('./Dashboard'));
const Inventory = lazy(() => import('./Inventory'));

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="content-area">
        <Suspense fallback={<div className="loader"></div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;