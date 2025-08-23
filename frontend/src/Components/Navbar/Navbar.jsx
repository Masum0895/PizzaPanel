import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");

    const {getTotalCartAmount,token,setToken,getTotalCartItems} = useContext(StoreContext);

const navigate = useNavigate();

const logout = () =>{
  localStorage.removeItem("token");
  setToken("");
  navigate("/")
}

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt='' className='logo'/></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu('home')} className={`navbar-menu-item ${menu==="home"?"active":""}`}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu('menu')} className={`navbar-menu-item ${menu==="menu"?"active":""}`}>menu</a>
        <a href='#app-download' onClick={()=>setMenu('mobile-app')} className={`navbar-menu-item ${menu==="mobile-app"?"active":""}`}>mobile-app</a>
        <a href='#footer' onClick={()=>setMenu('contact us')} className={`navbar-menu-item ${menu==="contact us"?"active":""}`}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link> 
            <div className={getTotalCartItems()===0?"":"dot"}>
              {getTotalCartItems() > 0 ? getTotalCartItems() : null}
            </div>
        </div>
        {!token? <button onClick={()=>setShowLogin(true)}>sign in</button>:
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt=''/>
          <ul className="nav-profile-dropdown">
            <Link to='/myorders'><li><img src={assets.bag_icon} alt="" /><p>Orders</p></li></Link>
            <hr/>
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>}
        
      </div>
    </div>
  )
}

export default Navbar
