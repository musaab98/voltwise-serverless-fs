import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import ProductAdmin from './components/ProductAdmin';
import Footer from './components/Footer';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<ProductAdmin />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
