import React from 'react';
import { Link } from 'react-router-dom'; 
import './Item.css';

const Item = (props) => {
  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = currentCart.find(item => item.id === props.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.new_price,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(currentCart));
    alert('Added to cart successfully!');
  };

  const addToWishlist = () => {
    const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const existingItem = currentWishlist.find(item => item.id === props.id);
    
    if (!existingItem) {
      currentWishlist.push({
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.new_price
      });
      localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
      alert('Added to My Books successfully!');
    } else {
      alert('This book is already in My Books!');
    }
  };

  return (
    <div className="item">
      <Link to={`/book/${props.id}`} className="image-frame">
        <img src={props.image} alt="Book Cover" />
      </Link>

      <p className="item-title">{props.title}</p> 

      <div className="item-price">
        <button>${props.new_price}</button>
      </div>

      <div className="item-buttons">
        <button onClick={addToCart} className="borrow-button">Add to Cart</button>
        <button onClick={addToWishlist} className="wishlist-button">Add to My Books</button>
      </div>
    </div>
  );
};

export default Item;





