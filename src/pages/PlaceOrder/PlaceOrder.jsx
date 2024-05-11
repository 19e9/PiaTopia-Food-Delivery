import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  
    const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <form className='place-order'>
        <div className="place-order-left">
          <p className="title">Sipariş Bilgileri</p>
          <div className="multi-fields">
            <input type="text" placeholder='Adınız' />
            <input type="text" placeholder='Soyadınız'/>
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='E-posta' />
            <input type="text" placeholder='Telefon No' />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='Masa No' />
            <input type="text" />
          </div>
        </div>
        <div className="place-order-right">
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
          <button>Ödeme Yap</button>
        </div>
        </div>
    </form>
  )
}

export default PlaceOrder