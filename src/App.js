import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Homee from './Pages/Homee';
import CategoryBooks from './Components/CategoryBooks/CategoryBooks';
import BookDetails from './Components/BookDetail/BookDetail';
import About from './Components/About/About';
import Popular from './Components/Popular/Popular';
import AuthPage from './Components/AuthPage/AuthPage';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const location = useLocation();

    return (
        <div>
            {location.pathname !== '/login' && <Navbar />}
            <Routes>
                <Route path='/' element={<Homee />} />
                <Route path='/about' element={<About />} />
                <Route path='/my-books' element={
                    <ProtectedRoute>
                        <Wishlist />
                    </ProtectedRoute>
                } />
                <Route path='/contact' element={<div>Contact Page</div>} />
                <Route path='/cart' element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                } />
                <Route path="/category/:category" element={<CategoryBooks />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/login" element={<AuthPage />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

// Wrap App with BrowserRouter, AuthProvider, and BookProvider
const WrappedApp = () => (
    <Router>
        <AuthProvider>
            <BookProvider>
                <App />
            </BookProvider>
        </AuthProvider>
    </Router>
);

export default WrappedApp;
