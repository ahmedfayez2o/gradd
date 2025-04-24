import React from 'react';
import './Home.css'
import hand_icon from '../Images/output-onlinepngtools.png'

const Home =() =>{
    return (
      
      <div className="container">
                <div className="content">
                    <div className="text">
                    <h1>For All Your<span>Reading Needs</span></h1>
                    
                        <p>The More That You Learn, The More Places You'll Go</p>
                        <button className="explore-button">Explore Now !</button>
                    </div>
                    <div className="oval">
                        <img src={hand_icon} alt="Your Imageee" />
                    </div>
                    </div>


                    <section className="sparite-items container txtCap">
                    <div className="sparite-item">
                    <div className="sparite-icon sparite-1"></div>
        <div className="sparite-info">
          <h3>Shipping</h3>
          <p>Fast Shipping</p>
        </div>
      </div>
      <div className="sparite-item">
        <div className="sparite-icon sparite-2"></div>
        <div className="sparite-info">
          <h3>Borrow Books</h3>
          <p>With an amazing price</p>
        </div>
      </div>
      <div className="sparite-item">
        <div className="sparite-icon sparite-3"></div>
        <div className="sparite-info">
          <h3>24/7 Support</h3>
          <p>Call Us AnyTime</p>
        </div>
      </div>
    
    </section>
    
    <div className='mr'>
    </div>
<div className='o'></div>
   </div>
       

               
        );
        };
    
export default Home;