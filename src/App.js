import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import ProductAdmin from './components/ProductAdmin';
import Footer from './components/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
library.add(faEdit);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/admin" element={<ProductAdmin />} />
              </Routes>
              <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
