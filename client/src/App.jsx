
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerPage from './components/CustomerPage';
import  Product from './components/Product';
import { useState } from 'react';
import Stock from './components/Stock';
import Payment from './components/Payment';



function App() {
 
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  

  return (
    <Router>
    <div>
      {/* Header with Links */}
      <header>
          <div className="navbar">
            <h1 className="logo">Backoffice</h1>
            <button className="hamburger" onClick={toggleMenu}>
              ☰
            </button>
            <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
              <ul>
                <li><Link to="/" onClick={closeMenu}>Customer</Link></li>
                <li><Link to="/product" onClick={closeMenu}>Product</Link></li>
                <li><Link to="/stocks" onClick={closeMenu}>Stocks</Link></li>
                <li><Link to="/payment" onClick={closeMenu}>Payment</Link></li>
              </ul>
            </nav>
          </div>
        </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<CustomerPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/stocks" element={<Stock />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  </Router>
    
  )
}

export default App
