import React, { useState } from 'react'
import './Orders.css'
import {toast} from "react-toastify"
import { useEffect } from 'react';
import axios from "axios"
import { assets } from '../../assets/assets';

const Orders = ({url}) => {
  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Hata oluştu !")
    }
  }

  const statusHandler = async (event,orderId) => {
    //console.log(event,orderId);
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() =>{
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
        <h3>Siparişler</h3>
        <div className="order-list">
          {orders.map((order,index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                    {order.items.map((item,index) => {
                      if (index === order.items.length -1) {
                        return item.name + " x " + item.quantity
                      }
                      else{
                        return item.name + " x " + item.quantity + ", "
                      }
                    })}
                </p>
                <p className='order-item-table-no'>{"Masa No:" +order.masaNo}</p>
                {/* <p className='order-item-name'>{order.firstName+ " " + order.lastName}</p> */}
                <p>{"Sipariş tutarı :" + order.amount} ₺</p>
                <p>{"Ödeme durumu: " + (order.payment ? "Ödendi" : "Ödenmedi")}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                  <option value="Food Processing">Siparişiniz hazılanıyor</option>
                  <option value="your order came to the table">Siparişiniz masaya geldi</option>
                </select>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Orders