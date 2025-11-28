import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
export default function App(){
  return (
    <BrowserRouter>
      <div className="header">
        <h2 style={{margin:0}}>HydroShield</h2>
      </div>
      <div className="container">
        <nav style={{marginBottom:12}}>
          <Link to="/" style={{marginRight:12}}>Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
