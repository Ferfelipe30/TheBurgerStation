import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MenuPage from './pages/MenuPage';
import SidesDrinksPage from './pages/SidesDrinksPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path='/sides-drinks' element={<SidesDrinksPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/order-success' element={<OrderSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
