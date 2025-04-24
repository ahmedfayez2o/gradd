import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homee from './Pages/Homee';
import CategoryBooks from './Components/CategoryBooks/CategoryBooks';
import BookDetails from './Components/BookDetail/BookDetail';
import About from './Components/About/About';
import Popular from './Components/Popular/Popular';
import AuthPage from './Components/AuthPage/AuthPage';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';
import './App.css';

const App = () => {
    const location = useLocation();

    return (
        <div>
            {location.pathname !== '/login' && <Navbar />}
            
            <Routes>
                <Route path='/' element={<Homee />} />
                <Route path='/about' element={<About />} />
                <Route path='/my-books' element={<Wishlist />} />
                <Route path='/contact' element={<div>Contact Page</div>} />
                <Route path='/cart' element={<Cart />} />
                <Route path="/category/:category" element={<CategoryBooks />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/login" element={<AuthPage />} />
            </Routes>
        </div>
    );
};

// Wrap App with BrowserRouter
const WrappedApp = () => (
    <Router>
        <App />
    </Router>
);

export default WrappedApp;
