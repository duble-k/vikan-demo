import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Lookup from "./components/Lookup";
import Admin from "./components/Admin";

const App = () => {
  
  const [isAdmin, setAdmin] = useState(false);

  const cookieExists = () => {
    const hasCookie = document.cookie.includes("userToken");
    return hasCookie;
  };

  return (
    <Router>
      <NavBar  isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<Login setAdmin={setAdmin}  />}
        />
        <Route
          path="/lookup"
          element={
           cookieExists ? (
              <Lookup  />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAdmin && cookieExists ? (
              <Admin  />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
