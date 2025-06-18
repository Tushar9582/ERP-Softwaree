import React, { useState } from 'react';
import { FiDownload, FiHelpCircle, FiMessageSquare, FiRefreshCw } from 'react-icons/fi';

const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('last30');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Sample data
  const financialData = {
    revenue: 1250000,
    expenses: 850000,
    profit: 400000,
    growth: 12.5,
  };

  const inventoryData = [
    { id: 1, name: 'Product A', stock: 450, threshold: 100, category: 'Electronics' },
    { id: 2, name: 'Product B', stock: 320, threshold: 150, category: 'Furniture' },
    { id: 3, name: 'Product C', stock: 90, threshold: 200, category: 'Office Supplies' },
    { id: 4, name: 'Product D', stock: 210, threshold: 50, category: 'Electronics' },
    { id: 5, name: 'Product E', stock: 500, threshold: 300, category: 'Furniture' },
    { id: 6, name: 'Product F', stock: 75, threshold: 100, category: 'Office Supplies' },
  ];

  const salesTrends = [
    { month: 'Jan', sales: 120000 },
    { month: 'Feb', sales: 150000 },
    { month: 'Mar', sales: 180000 },
    { month: 'Apr', sales: 210000 },
    { month: 'May', sales: 240000 },
    { month: 'Jun', sales: 270000 },
  ];

  const departmentPerformance = [
    { name: 'Sales', target: 100, achieved: 115, color: '#4FD1C5' },
    { name: 'Marketing', target: 80, achieved: 75, color: '#F6AD55' },
    { name: 'Operations', target: 90, achieved: 92, color: '#F687B3' },
    { name: 'Finance', target: 95, achieved: 98, color: '#63B3ED' },
  ];

  const regions = [
    { name: 'East', sales: 35, color: '#4299E1' },
    { name: 'West', sales: 45, color: '#667EEA' },
    { name: 'North', sales: 12, color: '#9F7AEA' },
    { name: 'South', sales: 8, color: '#D6BCFA' },
  ];

  const topProducts = [
    { name: 'Product X', sales: 245000, category: 'Electronics' },
    { name: 'Product Y', sales: 198000, category: 'Furniture' },
    { name: 'Product Z', sales: 156000, category: 'Office Supplies' },
    { name: 'Product A', sales: 112000, category: 'Electronics' },
  ];

  const trainingProgress = [
    { name: 'Safety Training', progress: 85, color: '#68D391' },
    { name: 'Compliance', progress: 72, color: '#63B3ED' },
    { name: 'Skills Development', progress: 65, color: '#F6AD55' },
    { name: 'Leadership', progress: 45, color: '#F687B3' },
  ];

  // Refresh data
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  // Styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#F8FAFC',
      color: '#2D3748',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: 'hidden',
      overflowY: 'auto',
      width: '80vw'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      position: 'sticky',
      top: 0
    },
    headerTitle: {
      fontSize: '1.5rem',
      color: '#2D3748',
      fontWeight: '700',
      margin: 0,
      background: 'linear-gradient(90deg, #667EEA 0%, #764BA2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    headerControls: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    selector: {
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '1px solid #E2E8F0',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontSize: '0.875rem',
      color: '#4A5568',
      outline: 'none',
      transition: 'all 0.2s ease',
      ':hover': {
        borderColor: '#CBD5E0'
      },
      ':focus': {
        borderColor: '#667EEA',
        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.2)'
      }
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#667EEA',
      color: 'white',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#5A67D8',
        transform: 'translateY(-1px)'
      },
      ':active': {
        transform: 'translateY(0)'
      }
    },
    refreshButton: {
      backgroundColor: 'transparent',
      color: '#4A5568',
      border: '1px solid #E2E8F0',
      ':hover': {
        backgroundColor: '#EDF2F7'
      }
    },
    tabs: {
      display: 'flex',
      backgroundColor: 'white',
      borderBottom: '1px solid #E2E8F0',
      padding: '0 2rem',
      position: 'sticky',
      top: '64px',
      zIndex: 5
    },
    tabButton: {
      padding: '1rem 1.5rem',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      color: '#718096',
      position: 'relative',
      transition: 'all 0.2s ease',
      fontSize: '0.875rem',
      ':hover': {
        color: '#4A5568'
      }
    },
    activeTab: {
      color: '#667EEA',
      fontWeight: '600'
    },
    activeTabIndicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '3px',
      backgroundColor: '#667EEA',
      borderRadius: '3px 3px 0 0'
    },
    content: {
      flex: 1,
      padding: '2rem',
      overflowY: 'auto',
      background: 'linear-gradient(135deg, #F8FAFC 0%, #EDF2F7 100%)'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }
    },
    metricCard: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    },
    metricTitle: {
      fontSize: '0.875rem',
      color: '#718096',
      marginBottom: '0.5rem',
      fontWeight: '500'
    },
    metricValue: {
      fontSize: '1.875rem',
      fontWeight: '700',
      margin: '0.5rem 0',
      color: '#2D3748'
    },
    metricGrowth: {
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    positiveGrowth: {
      color: '#38A169'
    },
    negativeGrowth: {
      color: '#E53E3E'
    },
    metricSubtext: {
      fontSize: '0.875rem',
      color: '#718096'
    },
    revenueCard: {
      borderLeft: '4px solid #38A169'
    },
    expensesCard: {
      borderLeft: '4px solid #E53E3E'
    },
    profitCard: {
      borderLeft: '4px solid #667EEA'
    },
    inventoryCard: {
      borderLeft: '4px solid #DD6B20'
    },
    chartContainer: {
      position: 'relative'
    },
    chartTitle: {
      fontSize: '1rem',
      color: '#4A5568',
      marginBottom: '1rem',
      fontWeight: '600'
    },
    barChart: {
      display: 'flex',
      height: '200px',
      alignItems: 'flex-end',
      gap: '1rem',
      paddingTop: '1rem'
    },
    barContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      height: '100%'
    },
    bar: {
      width: '100%',
      borderRadius: '4px 4px 0 0',
      transition: 'all 0.3s ease',
      background: 'linear-gradient(to top, #667EEA, #764BA2)'
    },
    barLabel: {
      marginTop: '0.5rem',
      fontSize: '0.75rem',
      color: '#718096'
    },
    performanceBars: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    performanceItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    deptName: {
      width: '100px',
      fontSize: '0.875rem',
      color: '#4A5568'
    },
    performanceBarContainer: {
      flex: 1,
      height: '12px',
      backgroundColor: '#EDF2F7',
      borderRadius: '6px',
      position: 'relative',
      overflow: 'hidden'
    },
    performanceBar: {
      position: 'absolute',
      height: '100%',
      borderRadius: '6px'
    },
    targetBar: {
      backgroundColor: '#CBD5E0',
      opacity: 0.5
    },
    achievedBar: {
      backgroundColor: '#667EEA'
    },
    percentage: {
      width: '40px',
      textAlign: 'right',
      fontWeight: '600',
      fontSize: '0.875rem',
      color: '#4A5568'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    summaryCard: {
      display: 'flex',
      flexDirection: 'column',
      padding: '1.25rem',
      borderRadius: '10px',
      background: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    summaryTitle: {
      fontSize: '0.875rem',
      color: '#718096',
      marginBottom: '0.5rem'
    },
    summaryValue: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2D3748'
    },
    pieChart: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      position: 'relative',
      margin: '2rem auto',
      backgroundColor: '#EDF2F7',
      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)'
    },
    pieSegment: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%)',
      transition: 'all 0.5s ease'
    },
    pieCenter: {
      position: 'absolute',
      width: '60%',
      height: '60%',
      backgroundColor: 'white',
      borderRadius: '50%',
      top: '20%',
      left: '20%',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
    },
    pieLegend: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '1rem'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.75rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      backgroundColor: '#F7FAFC',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    legendColor: {
      display: 'inline-block',
      width: '12px',
      height: '12px',
      borderRadius: '3px'
    },
    expenseBars: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    expenseItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    expenseBarContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    expenseBar: {
      height: '12px',
      borderRadius: '6px',
      background: 'linear-gradient(90deg, #667EEA, #764BA2)'
    },
    alertText: {
      color: '#E53E3E'
    },
    tableContainer: {
      overflow: 'hidden',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white'
    },
    tableHeader: {
      padding: '0.75rem 1rem',
      textAlign: 'left',
      backgroundColor: '#F7FAFC',
      fontWeight: '600',
      color: '#4A5568',
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    tableCell: {
      padding: '0.75rem 1rem',
      textAlign: 'left',
      borderBottom: '1px solid #EDF2F7',
      fontSize: '0.875rem'
    },
    lowStockRow: {
      backgroundColor: '#FFF5F5'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.5rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    alertBadge: {
      backgroundColor: '#FED7D7',
      color: '#E53E3E'
    },
    okBadge: {
      backgroundColor: '#C6F6D5',
      color: '#38A169'
    },
    viewAllButton: {
      marginTop: '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: 'white',
      border: '1px solid #667EEA',
      color: '#667EEA',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      ':hover': {
        backgroundColor: '#EBF4FF'
      }
    },
    turnoverChart: {
      height: '200px',
      position: 'relative',
      marginTop: '2rem'
    },
    turnoverLine: {
      position: 'absolute',
      bottom: '40px',
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#CBD5E0'
    },
    turnoverPoint: {
      position: 'absolute',
      width: '12px',
      height: '12px',
      backgroundColor: '#667EEA',
      borderRadius: '50%',
      transform: 'translate(-50%, 50%)',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.2)',
      transition: 'all 0.3s ease'
    },
    chartAxis: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '0.5rem',
      fontSize: '0.75rem',
      color: '#718096'
    },
    mapChart: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: '1rem',
      height: '250px'
    },
    region: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      fontWeight: '600',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)'
    },
    lineChart: {
      height: '200px',
      position: 'relative',
      marginTop: '2rem'
    },
    line: {
      position: 'absolute',
      bottom: '40px',
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#667EEA',
      transition: 'all 0.5s ease'
    },
    dataPoint: {
      position: 'absolute',
      width: '10px',
      height: '10px',
      backgroundColor: '#667EEA',
      borderRadius: '50%',
      transform: 'translate(-50%, 50%)',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.2)'
    },
    topProducts: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    productItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    productName: {
      width: '120px',
      fontSize: '0.875rem',
      color: '#4A5568'
    },
    salesBarContainer: {
      flex: 1,
      height: '12px',
      backgroundColor: '#EDF2F7',
      borderRadius: '6px',
      overflow: 'hidden'
    },
    salesBar: {
      height: '100%',
      borderRadius: '6px',
      background: 'linear-gradient(90deg, #667EEA, #764BA2)'
    },
    salesValue: {
      width: '80px',
      textAlign: 'right',
      fontWeight: '600',
      fontSize: '0.875rem',
      color: '#4A5568'
    },
    distributionChart: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      position: 'relative',
      margin: '2rem auto',
      backgroundColor: '#EDF2F7',
      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)'
    },
    attendanceChart: {
      display: 'flex',
      height: '200px',
      alignItems: 'flex-end',
      gap: '1rem',
      paddingTop: '1rem'
    },
    attendanceBar: {
      flex: 1,
      borderRadius: '4px 4px 0 0',
      background: 'linear-gradient(to top, #667EEA, #764BA2)',
      transition: 'all 0.5s ease'
    },
    trainingProgress: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    progressItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    progressBar: {
      flex: 1,
      height: '8px',
      backgroundColor: '#EDF2F7',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      borderRadius: '4px',
      transition: 'all 0.5s ease'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'white',
      borderTop: '1px solid #E2E8F0',
      fontSize: '0.875rem',
      color: '#718096'
    },
    footerLinks: {
      display: 'flex',
      gap: '1.5rem'
    },
    footerLink: {
      color: '#667EEA',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      ':hover': {
        color: '#5A67D8'
      }
    },
    loadingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      backdropFilter: 'blur(2px)'
    },
    spinner: {
      border: '4px solid rgba(102, 126, 234, 0.2)',
      borderTop: '4px solid #667EEA',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite'
    },
    gridLayout: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '1.5rem'
    },
    gridSpan2: {
      gridColumn: 'span 2'
    },
    gridSpan3: {
      gridColumn: 'span 3'
    },
    gridSpan4: {
      gridColumn: 'span 4'
    },
    gridRowSpan2: {
      gridRow: 'span 2'
    },
    highlightCard: {
      background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
      color: 'white'
    },
    highlightText: {
      color: 'white'
    },
    highlightSubtext: {
      color: 'rgba(255, 255, 255, 0.8)'
    },
    tooltip: {
      position: 'absolute',
      backgroundColor: '#2D3748',
      color: 'white',
      padding: '0.5rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      zIndex: 10,
      pointerEvents: 'none',
      opacity: 0,
      transition: 'opacity 0.2s ease'
    }
  };

  // Add animation keyframes
  const animationStyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={styles.container}>
      <style>{animationStyles}</style>
      
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
        </div>
      )}

      <header style={styles.header}>
        <h1 style={styles.headerTitle}>ERP Analytics Dashboard</h1>
        <div style={styles.headerControls}>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            style={styles.selector}
          >
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last Quarter</option>
            <option value="last365">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <select 
            value={selectedDepartment} 
            onChange={(e) => setSelectedDepartment(e.target.value)}
            style={styles.selector}
          >
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="operations">Operations</option>
            <option value="finance">Finance</option>
          </select>
          <button 
            style={{...styles.button, ...styles.refreshButton}}
            onClick={refreshData}
          >
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button style={styles.button}>
            <FiDownload size={16} />
            Export
          </button>
        </div>
      </header>

      <nav style={styles.tabs}>
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'overview' && styles.activeTab)
          }}
          onClick={() => setActiveTab('overview')}
        >
          Overview
          {activeTab === 'overview' && <span style={styles.activeTabIndicator}></span>}
        </button>
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'financial' && styles.activeTab)
          }}
          onClick={() => setActiveTab('financial')}
        >
          Financial
          {activeTab === 'financial' && <span style={styles.activeTabIndicator}></span>}
        </button>
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'inventory' && styles.activeTab)
          }}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
          {activeTab === 'inventory' && <span style={styles.activeTabIndicator}></span>}
        </button>
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'sales' && styles.activeTab)
          }}
          onClick={() => setActiveTab('sales')}
        >
          Sales
          {activeTab === 'sales' && <span style={styles.activeTabIndicator}></span>}
        </button>
        <button 
          style={{
            ...styles.tabButton,
            ...(activeTab === 'hr' && styles.activeTab)
          }}
          onClick={() => setActiveTab('hr')}
        >
          HR Analytics
          {activeTab === 'hr' && <span style={styles.activeTabIndicator}></span>}
        </button>
      </nav>

      <main style={styles.content}>
        {activeTab === 'overview' && (
          <>
            <div style={styles.gridLayout}>
              <div style={{...styles.card, ...styles.metricCard, ...styles.revenueCard}}>
                <h3 style={styles.metricTitle}>Revenue</h3>
                <p style={styles.metricValue}>${(financialData.revenue / 1000).toFixed(0)}K</p>
                <p style={{...styles.metricGrowth, ...styles.positiveGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  {financialData.growth}% from last period
                </p>
              </div>
              
              <div style={{...styles.card, ...styles.metricCard, ...styles.expensesCard}}>
                <h3 style={styles.metricTitle}>Expenses</h3>
                <p style={styles.metricValue}>${(financialData.expenses / 1000).toFixed(0)}K</p>
                <p style={{...styles.metricGrowth, ...styles.negativeGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                  8.2% from last period
                </p>
              </div>
              
              <div style={{...styles.card, ...styles.metricCard, ...styles.profitCard}}>
                <h3 style={styles.metricTitle}>Profit</h3>
                <p style={styles.metricValue}>${(financialData.profit / 1000).toFixed(0)}K</p>
                <p style={{...styles.metricGrowth, ...styles.positiveGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  15.3% from last period
                </p>
              </div>
              
              <div style={{...styles.card, ...styles.metricCard, ...styles.inventoryCard}}>
                <h3 style={styles.metricTitle}>Low Stock Items</h3>
                <p style={styles.metricValue}>{inventoryData.filter(item => item.stock < item.threshold).length}</p>
                <p style={styles.metricSubtext}>Requires immediate attention</p>
              </div>
            </div>
            
            <div style={styles.gridLayout}>
              <div style={{...styles.card, ...styles.gridSpan2}}>
                <h3 style={styles.chartTitle}>Sales Trend</h3>
                <div style={styles.barChart}>
                  {salesTrends.map((item, index) => {
                    const barHeight = (item.sales / 300000) * 100;
                    return (
                      <div key={index} style={styles.barContainer}>
                        <div 
                          style={{
                            ...styles.bar,
                            height: `${barHeight}%`
                          }}
                        ></div>
                        <span style={styles.barLabel}>{item.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.chartTitle}>Department Performance</h3>
                <div style={styles.performanceBars}>
                  {departmentPerformance.map((dept, index) => (
                    <div key={index} style={styles.performanceItem}>
                      <span style={styles.deptName}>{dept.name}</span>
                      <div style={styles.performanceBarContainer}>
                        <div 
                          style={{
                            ...styles.performanceBar,
                            ...styles.targetBar,
                            width: `${dept.target}%`
                          }}
                        ></div>
                        <div 
                          style={{
                            ...styles.performanceBar,
                            ...styles.achievedBar,
                            width: `${dept.achieved}%`,
                            backgroundColor: dept.color
                          }}
                        ></div>
                      </div>
                      <span style={styles.percentage}>{dept.achieved}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'financial' && (
          <>
            <h2 style={styles.sectionTitle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              Financial Overview
            </h2>
            
            <div style={styles.gridLayout}>
              <div style={{...styles.card, ...styles.highlightCard}}>
                <h3 style={{...styles.metricTitle, ...styles.highlightSubtext}}>Net Profit</h3>
                <p style={{...styles.metricValue, ...styles.highlightText}}>${(financialData.profit / 1000).toFixed(0)}K</p>
                <p style={{...styles.metricGrowth, ...styles.highlightText}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  {financialData.growth}% growth
                </p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Gross Revenue</h3>
                <p style={styles.metricValue}>${(financialData.revenue / 1000).toFixed(0)}K</p>
                <p style={{...styles.metricGrowth, ...styles.positiveGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  12.5% growth
                </p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Operating Expenses</h3>
                <p style={styles.metricValue}>${(financialData.expenses / 1000).toFixed(0)}K</p>
                <p style={{...styles.metricGrowth, ...styles.negativeGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                  8.2% increase
                </p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Profit Margin</h3>
                <p style={styles.metricValue}>{((financialData.profit / financialData.revenue) * 100).toFixed(1)}%</p>
                <p style={{...styles.metricGrowth, ...styles.positiveGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  1.8% improvement
                </p>
              </div>
            </div>
            
            <div style={styles.gridLayout}>
              <div style={styles.card}>
                <h3 style={styles.chartTitle}>Revenue Breakdown</h3>
                <div style={styles.pieChart}>
                  <div style={{...styles.pieSegment, backgroundColor: '#4299E1', transform: 'rotate(0.35turn)'}}></div>
                  <div style={{...styles.pieSegment, backgroundColor: '#48BB78', transform: 'rotate(0.5turn)'}}></div>
                  <div style={{...styles.pieSegment, backgroundColor: '#F56565', transform: 'rotate(0.75turn)'}}></div>
                  <div style={{...styles.pieSegment, backgroundColor: '#ED8936', transform: 'rotate(0.85turn)'}}></div>
                  <div style={{...styles.pieSegment, backgroundColor: '#9F7AEA', transform: 'rotate(0.9turn)'}}></div>
                  <div style={styles.pieCenter}></div>
                </div>
                <div style={styles.pieLegend}>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#4299E1'}}></span> Product A (35%)</div>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#48BB78'}}></span> Product B (15%)</div>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#F56565'}}></span> Product C (25%)</div>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#ED8936'}}></span> Product D (10%)</div>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#9F7AEA'}}></span> Product E (5%)</div>
                </div>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.chartTitle}>Expense Distribution</h3>
                <div style={styles.expenseBars}>
                  <div style={styles.expenseItem}>
                    <span>Payroll</span>
                    <div style={styles.expenseBarContainer}>
                      <div style={{...styles.expenseBar, width: '65%'}}></div>
                      <span>65%</span>
                    </div>
                  </div>
                  <div style={styles.expenseItem}>
                    <span>Operations</span>
                    <div style={styles.expenseBarContainer}>
                      <div style={{...styles.expenseBar, width: '20%'}}></div>
                      <span>20%</span>
                    </div>
                  </div>
                  <div style={styles.expenseItem}>
                    <span>Marketing</span>
                    <div style={styles.expenseBarContainer}>
                      <div style={{...styles.expenseBar, width: '10%'}}></div>
                      <span>10%</span>
                    </div>
                  </div>
                  <div style={styles.expenseItem}>
                    <span>Misc</span>
                    <div style={styles.expenseBarContainer}>
                      <div style={{...styles.expenseBar, width: '5%'}}></div>
                      <span>5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'inventory' && (
          <>
            <h2 style={styles.sectionTitle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v5c0 .75.4 1.38 1 1.73V19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-3.28c.59-.35 1-.99 1-1.72V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5z"></path>
              </svg>
              Inventory Analytics
            </h2>
            
            <div style={styles.gridLayout}>
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Total SKUs</h3>
                <p style={styles.metricValue}>1,245</p>
                <p style={styles.metricSubtext}>Across all categories</p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Low Stock Items</h3>
                <p style={{...styles.metricValue, ...styles.alertText}}>18</p>
                <p style={styles.metricSubtext}>Needs reordering</p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Overstock Items</h3>
                <p style={styles.metricValue}>32</p>
                <p style={styles.metricSubtext}>Potential discount</p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Inventory Value</h3>
                <p style={styles.metricValue}>$2.8M</p>
                <p style={styles.metricSubtext}>Current stock value</p>
              </div>
            </div>
            
            <div style={styles.gridLayout}>
              <div style={{...styles.card, ...styles.gridSpan3}}>
                <h3 style={styles.chartTitle}>Inventory Status</h3>
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.tableHeader}>Product ID</th>
                        <th style={styles.tableHeader}>Product Name</th>
                        <th style={styles.tableHeader}>Category</th>
                        <th style={styles.tableHeader}>Current Stock</th>
                        <th style={styles.tableHeader}>Reorder Level</th>
                        <th style={styles.tableHeader}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryData.map(item => (
                        <tr key={item.id} style={item.stock < item.threshold ? styles.lowStockRow : null}>
                          <td style={styles.tableCell}>{item.id}</td>
                          <td style={styles.tableCell}>{item.name}</td>
                          <td style={styles.tableCell}>{item.category}</td>
                          <td style={styles.tableCell}>{item.stock}</td>
                          <td style={styles.tableCell}>{item.threshold}</td>
                          <td style={styles.tableCell}>
                            {item.stock < item.threshold ? (
                              <span style={{...styles.statusBadge, ...styles.alertBadge}}>Reorder</span>
                            ) : (
                              <span style={{...styles.statusBadge, ...styles.okBadge}}>OK</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button style={styles.viewAllButton}>
                    View All Inventory
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.chartTitle}>Inventory Turnover</h3>
                <div style={styles.turnoverChart}>
                  <div style={styles.turnoverLine}></div>
                  <div style={{...styles.turnoverPoint, left: '10%', bottom: '20%'}}></div>
                  <div style={{...styles.turnoverPoint, left: '30%', bottom: '35%'}}></div>
                  <div style={{...styles.turnoverPoint, left: '50%', bottom: '60%'}}></div>
                  <div style={{...styles.turnoverPoint, left: '70%', bottom: '45%'}}></div>
                  <div style={{...styles.turnoverPoint, left: '90%', bottom: '75%'}}></div>
                </div>
                <div style={styles.chartAxis}>
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'sales' && (
          <>
            <h2 style={styles.sectionTitle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Sales Analytics
            </h2>
            
            <div style={styles.gridLayout}>
              <div style={{...styles.card, ...styles.highlightCard}}>
                <h3 style={{...styles.metricTitle, ...styles.highlightSubtext}}>Total Sales</h3>
                <p style={{...styles.metricValue, ...styles.highlightText}}>${(financialData.revenue / 1000).toFixed(0)}K</p>
                <p style={{...styles.metricGrowth, ...styles.highlightText}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  {financialData.growth}% growth
                </p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Total Orders</h3>
                <p style={styles.metricValue}>2,450</p>
                <p style={{...styles.metricGrowth, ...styles.positiveGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  8.7% growth
                </p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Avg. Order Value</h3>
                <p style={styles.metricValue}>$510</p>
                <p style={{...styles.metricGrowth, ...styles.positiveGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  3.2% increase
                </p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Conversion Rate</h3>
                <p style={styles.metricValue}>3.2%</p>
                <p style={{...styles.metricGrowth, ...styles.positiveGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  0.4% improvement
                </p>
              </div>
            </div>
            
            <div style={styles.gridLayout}>
              <div style={styles.card}>
                <h3 style={styles.chartTitle}>Sales by Region</h3>
                <div style={styles.mapChart}>
                  {regions.map((region, index) => {
                    const height = region.sales;
                    return (
                      <div 
                        key={index} 
                        style={{
                          ...styles.region,
                          backgroundColor: region.color,
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: `${height}%`,
                          backgroundColor: region.color,
                          transition: 'all 0.5s ease'
                        }}></div>
                        {region.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.chartTitle}>Monthly Sales Trend</h3>
                <div style={styles.lineChart}>
                  {salesTrends.map((item, index) => (
                    <div 
                      key={index} 
                      style={{
                        ...styles.dataPoint,
                        left: `${(index / (salesTrends.length - 1)) * 100}%`,
                        bottom: `${(item.sales / 300000) * 100}%`
                      }}
                    ></div>
                  ))}
                  <div style={styles.line}></div>
                </div>
                <div style={styles.chartAxis}>
                  {salesTrends.map(item => (
                    <span key={item.month}>{item.month}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={styles.gridLayout}>
              <div style={{...styles.card, ...styles.gridSpan2}}>
                <h3 style={styles.chartTitle}>Top Selling Products</h3>
                <div style={styles.topProducts}>
                  {topProducts.map((product, index) => {
                    const salesPercentage = (product.sales / 300000) * 100;
                    return (
                      <div key={index} style={styles.productItem}>
                        <span style={styles.productName}>{product.name}</span>
                        <div style={styles.salesBarContainer}>
                          <div 
                            style={{
                              ...styles.salesBar,
                              width: `${salesPercentage}%`
                            }}
                          ></div>
                        </div>
                        <span style={styles.salesValue}>${product.sales.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'hr' && (
          <>
            <h2 style={styles.sectionTitle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              HR Analytics
            </h2>
            
            <div style={styles.gridLayout}>
              <div style={{...styles.card, ...styles.highlightCard}}>
                <h3 style={{...styles.metricTitle, ...styles.highlightSubtext}}>Total Employees</h3>
                <p style={{...styles.metricValue, ...styles.highlightText}}>245</p>
                <p style={{...styles.metricGrowth, ...styles.highlightText}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  12 new hires
                </p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Turnover Rate</h3>
                <p style={styles.metricValue}>8.2%</p>
                <p style={{...styles.metricGrowth, ...styles.negativeGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                  1.5% increase
                </p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Avg. Tenure</h3>
                <p style={styles.metricValue}>3.2 yrs</p>
                <p style={{...styles.metricGrowth, ...styles.positiveGrowth}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  0.4 improvement
                </p>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.metricTitle}>Open Positions</h3>
                <p style={{...styles.metricValue, ...styles.alertText}}>12</p>
                <p style={styles.metricSubtext}>Active recruitment</p>
              </div>
            </div>
            
            <div style={styles.gridLayout}>
              <div style={styles.card}>
                <h3 style={styles.chartTitle}>Employee Distribution</h3>
                <div style={styles.distributionChart}>
                  <div style={{...styles.pieSegment, backgroundColor: '#4FD1C5', transform: 'rotate(0.35turn)'}}></div>
                  <div style={{...styles.pieSegment, backgroundColor: '#F6AD55', transform: 'rotate(0.5turn)'}}></div>
                  <div style={{...styles.pieSegment, backgroundColor: '#F687B3', transform: 'rotate(0.75turn)'}}></div>
                  <div style={{...styles.pieSegment, backgroundColor: '#63B3ED', transform: 'rotate(0.85turn)'}}></div>
                  <div style={{...styles.pieSegment, backgroundColor: '#9F7AEA', transform: 'rotate(0.9turn)'}}></div>
                  <div style={styles.pieCenter}></div>
                </div>
                <div style={styles.pieLegend}>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#4FD1C5'}}></span> Sales (35%)</div>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#F6AD55'}}></span> Marketing (15%)</div>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#F687B3'}}></span> Operations (25%)</div>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#63B3ED'}}></span> Finance (10%)</div>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#9F7AEA'}}></span> HR (5%)</div>
                  <div style={styles.legendItem}><span style={{...styles.legendColor, backgroundColor: '#68D391'}}></span> IT (10%)</div>
                </div>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.chartTitle}>Attendance Trend</h3>
                <div style={styles.attendanceChart}>
                  {[80, 85, 82, 88, 90, 92, 95].map((value, index) => (
                    <div key={index} style={{...styles.attendanceBar, height: `${value}%`}}></div>
                  ))}
                </div>
                <div style={styles.chartAxis}>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
            
            <div style={styles.gridLayout}>
              <div style={{...styles.card, ...styles.gridSpan2}}>
                <h3 style={styles.chartTitle}>Training Completion</h3>
                <div style={styles.trainingProgress}>
                  {trainingProgress.map((training, index) => (
                    <div key={index} style={styles.progressItem}>
                      <span>{training.name}</span>
                      <div style={styles.progressBar}>
                        <div 
                          style={{
                            ...styles.progressFill,
                            width: `${training.progress}%`,
                            backgroundColor: training.color
                          }}
                        ></div>
                      </div>
                      <span>{training.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <footer style={styles.footer}>
        <p>Last updated: {lastUpdated.toLocaleString()}</p>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.footerLink}>
            <FiHelpCircle size={16} />
            Help
          </a>
          <a href="#" style={styles.footerLink}>
            <FiMessageSquare size={16} />
            Feedback
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ReportsAnalytics;