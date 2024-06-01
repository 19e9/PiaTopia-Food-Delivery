import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = ({ currentId }) => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    masaNo: currentId,
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // bilgileri odeme sayfasına göndermek
  const placeOrder = async(event) => {
    
  }

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Sipariş Bilgileri</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
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
          name="lastName"
          onChange={onChangeHandler}
          value={data.lastName}
            type="text"
            placeholder="Soyadınız"
            maxLength="20"
            onKeyPress={(e) => {
              const allowedChars = /[a-zA-ZçÇöÖüÜıİğĞşŞ.,\s]/;
              if (!allowedChars.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className="multi-fields">
          <input name="email" onChange={onChangeHandler} value={data.email} type="text" placeholder="E-posta" />
          <input
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
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
          name="masaNo"
            type="text"
            placeholder="Masa No"
            value={`Masa No: ${data.masaNo}`}
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
              <p>Ürün Fiyatı </p>
              <p>{(getTotalCartAmount() * 0.82).toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>KDV</p>
              <p>{(getTotalCartAmount() * 0.18).toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>Toplam</p>

              <p>{getTotalCartAmount().toFixed(2)} ₺</p>
            </div>
          </div>
          <button>Ödeme Yap</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
