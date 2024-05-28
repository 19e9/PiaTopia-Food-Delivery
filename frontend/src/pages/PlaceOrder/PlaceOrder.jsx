import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = ({ currentId }) => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Sipariş Bilgileri</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Adınız"
            maxLength="15"
            onKeyPress={(e) => {
              const allowedChars = /[a-zA-ZçÇöÖüÜıİğĞşŞ.,\s]/;
              if (!allowedChars.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <input
            type="text"
            placeholder="Soyadınız"
            maxLength="10"
            onKeyPress={(e) => {
              const allowedChars = /[a-zA-ZçÇöÖüÜıİğĞşŞ.,\s]/;
              if (!allowedChars.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="E-posta" />
          <input
            type="tel"
            placeholder="Telefon Numaranız"
            maxLength="11"
            onKeyPress={(e) => {
              if (
                (e.target.value.length === 0 && e.key !== "5") ||
                (e.target.value.length > 0 && !/^[0-9]*$/.test(e.key)) ||
                e.target.value.length >= 10
              ) {
                e.preventDefault();
              }
            }}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Masa No"
            value={`Masa No: ${currentId}`}
            style={{ textAlign: "center" }}
            disabled
            readOnly
          />
          {/* <input type="text" /> */}
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

              <p>{(getTotalCartAmount() * 1.2).toFixed(2)} ₺</p>
            </div>
          </div>
          <button>Ödeme Yap</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
