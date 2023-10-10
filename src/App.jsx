import React from "react";
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
import { useSessionStorageContext } from "./SessionStorageContext"; // Import your custom context hook

const App = () => {
  
  const {isAdmin, hasCookie} = useSessionStorageContext();

  return (
    <Router>
      <NavBar isAdmin={isAdmin}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/lookup"
          element={
           hasCookie ? (
              <Lookup  />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAdmin && hasCookie ? (
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
