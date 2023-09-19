import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Lookup from './components/Lookup';
import Admin from './components/Admin';

const App = () => {
  const [token, setToken] = useState(null);
  const [isAdmin, setAdmin] = useState(false);

  return (
    <Router>
      <NavBar setToken={setToken} token={token} isAdmin={isAdmin}/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<Login setAdmin={setAdmin} setToken={setToken}/>}/>
        <Route path="/lookup" element={token ? <Lookup token={token} /> : <Navigate to="/login" />}/>
        <Route path="/admin" element={isAdmin ? <Admin token={token} /> : <Navigate to="/login"/>}/>
      </Routes>
    </Router>
  );
};

export default App;

