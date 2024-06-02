import React, { useState,useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { StoreContext } from "./context/StoreContext";
import Verify from './pages/Verify/Verify'
import NotFound from './pages/NotFound/NotFound'
import { MyOrders } from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const { currentId, setCurrentId } = useContext(StoreContext); //masa no için


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
            <Route key={i + 1} path={`/masa/:massId`} element={<Home  currentId={currentId} setCurrentId={setCurrentId}/>} />
          ))}
          
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder currentId={currentId} setCurrentId={setCurrentId}/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/404' element={<NotFound/>} />
          <Route path='/myorders' element={<MyOrders/>} />

        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App