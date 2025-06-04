import React, { useState } from "react";
import LoginPage from "./Components/LoginPage";
import MainApp from "./Components/MainApp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    if (email === "demo@gmail.com" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      {isLoggedIn ? <MainApp /> : <LoginPage onLogin={handleLogin} />}
    </div>
  );
}

export default App;
