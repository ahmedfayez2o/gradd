import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Load cart items from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    useEffect(() => {
        // Calculate total price whenever cart items change
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button onClick={() => window.history.back()} className="continue-shopping">
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title} />
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p className="item-price">${item.price}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-button">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <div className="summary-details">
                            <p>Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
                            <p>Total Price: ${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="cart-actions">
                            <button onClick={clearCart} className="clear-cart">Clear Cart</button>
                            <button className="checkout-button">Proceed to Checkout</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;