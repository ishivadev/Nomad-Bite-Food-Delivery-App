import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';

const Navbar = ( {setShowLoginData} ) => {

  const [menu, setMenu] = useState("menu");
  const navigate = useNavigate();

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

  //Logout function to remove the token and navigate to homepage
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("The user logout successfully.")
    window.location.reload() // Add this line to reload the page
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="logo" className="logo" /> </Link>
      <ul className="navbar-menu">
      <Link to='/' onClick={() => setMenu("Home")} className={menu==="Home"?"active":"null"}>Home</Link>
      <a href='#explore-menu-id' onClick={() => setMenu("Menu")} className={menu==="Menu"?"active":"null"}>Menu</a>
      <a href='#app-download-id' onClick={() => setMenu("Mobile-App")} className={menu==="Mobile-App"?"active":"null"}>Mobile App</a>
      <a href='#footer-id' onClick={() => setMenu("Contact-Us")} className={menu==="Contact-Us"?"active":"null"}>Contact Us</a>
      </ul>
    
    <div className="navbar-right">
        <img src={assets.search_icon} alt="search-icon"/>
        <div className="navbar-search-icon">
            <Link to='/cart'> <img src={assets.basket_icon} aly="basket-icon"/> </Link>
            <div className={getTotalCartAmount() > 0 ?"dot":"null"}></div>
        </div>
        {/* Check if the user is logged in (i.e., token is present) */}
        {!token
        ?<button onClick={() => setShowLoginData(true)}>Sign In</button>
        :<div className='nav-profile'>
          <img src={assets.profile_icon} alt="profile-icon" />
          <ul className='nav-profile-dropdown'>
            <li onClick={()=> navigate('/myorders')} ><img src={assets.bag_icon} alt="bag-icon" />Orders</li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="logout-icon" />Logout</li>
          </ul>
          </div>}
        
    </div>
    </div>
  )
}

export default Navbar
