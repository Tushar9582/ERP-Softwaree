import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.loginBox}>
      <h2>Login to Textile ERP</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={() => onLogin(email, password)} style={styles.button}>
        Login
      </button>
    </div>
  );
}

const styles = {
  loginBox: {
    maxWidth: "300px",
    margin: "100px auto",
    padding: "20px",
    background: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "maroon",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default LoginPage;
