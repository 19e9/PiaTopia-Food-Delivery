import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import LoginPopup from './components/LoginPopup/LoginPopup'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [currentId, SetCurrentId] = useState(null)

  return (

    // Footer'de components'ta bir hata vermemsi için bir tane boş tag açtım bütün tagları orda aktardım.

    <>
      {/* showLogin isimli bir boolean değer true ise, <LoginPopup/> bileşenini ekranda gösterir, aksi halde boş bir HTML parçası (<></>) gösterilir */}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          {/*<Route path='/' element={<Home />} />}
          
          {/* Masa No */}
          {Array.from({ length: 10 }, (_, i) => (
            <Route key={i + 1} path={`/masa/:massId`} element={<Home  currentId={currentId} SetCurrentId={SetCurrentId}/>} />
          ))}
          
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder currentId={currentId} SetCurrentId={SetCurrentId}/>} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App