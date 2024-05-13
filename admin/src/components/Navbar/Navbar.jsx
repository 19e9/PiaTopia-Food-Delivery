import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.yonetim_logosu} alt="" />
      <img className='profile'  src={assets.profil_resmi} alt="" />
    </div>
  )
}

export default Navbar