import React from "react";
import Sidebar from "./Sidebar"; // Import Sidebar

function MainApp() {
  return (
    <div style={styles.container}>
      <Sidebar /> {/* Sidebar used here */}
      <main style={styles.content}>
        <h1>Welcome to the Textile ERP System</h1>
        {/* Add routing or content here */}
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f9f9f9",
  },
};

export default MainApp;
