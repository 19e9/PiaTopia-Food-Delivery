import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

export const MyOrders = () => {

    const {url,token} = useContext(StoreContext)
    const [data,setData] = useState([]);

    const fetchOrders = async () => {

        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            if (response.data.success) {
                setData(response.data.data);
                console.log(response.data.data);
            } else {
                console.error('Siparişler alınamadı:', response.data.message);
            }
        } catch (error) {
            console.error('Siparişler alınırken bir hata oluştu:', error);
        }
        
    }

    useEffect(() =>{
        if (token) {
            fetchOrders();
        }
    },[token])

  return (
    <div className='my-orders'>
        <h2>Siparişlerim</h2>
        <div className="container">
        {data.length === 0 ? (
                    <p>Henüz siparişiniz bulunmamaktadır.</p>
                ) : (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Paket ikonu" />
                            <p>
                                {order.items.map((item, itemIndex) => (
                                    <span key={itemIndex}>
                                        {item.name} x {item.quantity}
                                        {itemIndex < order.items.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                            <p>{order.amount} ₺</p>
                            <p>Ürün: {order.items.length}</p>
                            <p>Masa No: {order.masaNo}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Siparişi Takip Et</button>
                        </div>
                    ))
                )}
        </div>
    </div>
  )
}
