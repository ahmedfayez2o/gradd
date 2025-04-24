import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBookContext } from '../../context/BookContext';
import { showToast } from '../../utils/apiHandler';

const BookInfo = ({ book }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart, addToWishlist, cart, wishlist } = useBookContext();

    const isInCart = cart.some(item => item.id === book.id);
    const isInWishlist = wishlist.some(item => item.id === book.id);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            showToast.warning('Please login to add items to cart');
            navigate('/login');
            return;
        }

        try {
            await addToCart(book);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleAddToWishlist = async () => {
        if (!isAuthenticated) {
            showToast.warning('Please login to add items to your wishlist');
            navigate('/login');
            return;
        }

        try {
            await addToWishlist(book);
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    return (
        <div className="book-info">
            <div className="book-info-header">
                <h2>{book.title}</h2>
                <div className="book-rating">{book.rating} ★</div>
            </div>
            <p className="book-author">By {book.authors}</p>
            <p className="book-description">{book.description}</p>
            <div className="book-price">${book.price}</div>
            
            <div className="book-actions">
                <button
                    className="cart-button"
                    onClick={handleAddToCart}
                    disabled={isInCart}
                >
                    {isInCart ? 'In Cart' : 'Add to Cart'}
                </button>
                
                <button
                    className="wishlist-button"
                    onClick={handleAddToWishlist}
                    disabled={isInWishlist}
                >
                    {isInWishlist ? 'In My Books' : 'Add to My Books'}
                </button>
            </div>
            
            <div className="book-details">
                <div className="detail-item">
                    <span className="detail-label">ISBN:</span>
                    <span className="detail-value">{book.asin}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Format:</span>
                    <span className="detail-value">{book.format}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Published:</span>
                    <span className="detail-value">{book.published}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Language:</span>
                    <span className="detail-value">{book.language}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Genre:</span>
                    <span className="detail-value">{book.genres}</span>
                </div>
            </div>
        </div>
    );
};

export default BookInfo;