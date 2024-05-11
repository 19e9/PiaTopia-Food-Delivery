import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Ürün</p>
          <p>Ürün Adı</p>
          <p>Fiyat</p>
          <p>Adet</p>
          <p>Toplam</p>
          <p>İşlem</p>
        </div>
        <br />
        <br />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} />
                  <p>{item.name}</p>
                  <p>{item.price} ₺</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]} ₺</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>

            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Sipariş Özeti</h2>
          <div>
            <div className="cart-total-details">
              <p>Ürün Toplamı (KDV Hariç)</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>KDV Oranı</p>
              <p>% 20</p>
            </div>
            <div className="cart-total-details">
              <p>Toplam</p>
              
              <p>{(getTotalCartAmount() * 1.20).toFixed(2)} ₺</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Sepeti Onayla</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>İndirim Kodum var</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='İndirim Kodu Gir' />
              <button>Uygula</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart