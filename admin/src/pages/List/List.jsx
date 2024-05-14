import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const respone = await axios.get(`${url}/api/food/list`);
    console.log(respone.data);
    if (respone.data.success) {
      setList(respone.data.data);
    } else {
      toast.error("üzgünüm liste gözükmüyor, hata oluşutu !");
    }
  };

  

  useEffect(() => {
    fetchList();
  });

  return (
    <div className='list add flex-col'>
      <p>Ürün Listesi</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Resim</b>
          <b>Ürün Adı</b>
          <b>Katgori</b>
          <b>Fiyat</b>
          <b>İşlem</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price} ₺</p>
              <p className="cursor">X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
