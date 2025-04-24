import React, { useState, useEffect } from 'react';
import './Wishlist.css';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        // Load wishlist items from localStorage
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistItems(savedWishlist);
    }, []);

    const removeFromWishlist = (itemId) => {
        const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const moveToCart = (item) => {
        // Get current cart items
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if item already exists in cart
        const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            currentCart.push({ ...item, quantity: 1 });
        }
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(currentCart));
        
        // Remove from wishlist
        removeFromWishlist(item.id);
    };

    return (
        <div className="wishlist-container">
            <h2>My Books</h2>
            {wishlistItems.length === 0 ? (
                <div className="empty-wishlist">
                    <p>Your wishlist is empty</p>
                    <button onClick={() => window.history.back()} className="continue-browsing">
                        Continue Browsing
                    </button>
                </div>
            ) : (
                <div className="wishlist-items">
                    {wishlistItems.map(item => (
                        <div key={item.id} className="wishlist-item">
                            <img src={item.image} alt={item.title} />
                            <div className="item-details">
                                <h3>{item.title}</h3>
                                <p className="item-price">${item.price}</p>
                                <div className="item-actions">
                                    <button 
                                        onClick={() => moveToCart(item)}
                                        className="move-to-cart"
                                    >
                                        Add to Cart
                                    </button>
                                    <button 
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="remove-button"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;