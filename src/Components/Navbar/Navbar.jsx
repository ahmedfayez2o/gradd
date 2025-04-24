import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import './Navbar.css'; 
import logo from '../Images/IQRAA__1_-removebg-preview.png'; 
import cart_icon from '../Images/shopping-cart.png'; 
import bell from '../Images/bell.png'; 
import search from '../Images/search-interface-symbol.png';  

const Navbar = () => {     
    const [activeMenu, setActiveMenu] = useState("Home");

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToFooter = () => {
        const footerSection = document.getElementById('footer');
        if (footerSection) {
            footerSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (         
        <div className='navbar'>             
            <div className='nav-logo'>                 
                <img src={logo} alt="Logo" />             
            </div>             
            <ul className='nav-menu'>                 
                <li onClick={() => setActiveMenu("Home")}>
                    <Link 
                        style={{textDecoration:'none', color:'#3e7a48'}} 
                        to='/'
                    >
                        Home
                    </Link>
                    {activeMenu === "Home" && <hr className="active-line" />}
                </li>                 
                <li onClick={() => {setActiveMenu("About"); scrollToAbout();}}>
                    <a 
                        style={{textDecoration:'none', color:'#3e7a48'}}
                    >
                        About
                    </a>
                    {activeMenu === "About" && <hr className="active-line" />}
                </li>                 
                <li onClick={() => setActiveMenu("My Books")}>
                    <Link 
                        style={{textDecoration:'none', color:'#3e7a48'}} 
                        to='/my-books'
                    >
                        My Books
                    </Link>
                    {activeMenu === "My Books" && <hr className="active-line" />}
                </li>                 
                <li onClick={() => {setActiveMenu("Contact"); scrollToFooter();}}>
                    <a 
                        style={{textDecoration:'none', color:'#3e7a48'}}
                    >
                        Contact
                    </a>
                    {activeMenu === "Contact" && <hr className="active-line" />}
                </li>             
            </ul>             
            <div className='search-box'>                 
                <img src={search} alt="Search" />                 
                <input type='text' placeholder='Search' />                 
                <Link to='/cart' className="nav-icon-link">                     
                    <img src={cart_icon} alt="Cart" />                 
                </Link>                 
                <img src={bell} alt="Notifications" />                 
                <Link to='/login'>                     
                    <button>Login</button>                 
                </Link>             
            </div>         
        </div>     
    ); 
};

export default Navbar;





