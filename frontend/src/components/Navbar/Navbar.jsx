import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home")

    const {getTotalCartAmount, token,setToken} = useContext (StoreContext);

    console.log("token_example",token)
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Anasayfa</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menü</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobil-Uygulamamamız</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>iletişim</a>
        </ul>

        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="sepet" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Giriş yap</button>
            :<div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
                <li><img src={assets.bag_icon} alt="" /><p>Siparişler</p></li>
                <hr />
                <li><img src={assets.logout_icon} alt="" /><p>Çıkış yap</p></li>
            </ul>
            </div>}
          
        </div>
    </div>
  )
}

export default Navbar