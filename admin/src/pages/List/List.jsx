import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const respone = await axios.get(`${url}/api/food/list`);
    //console.log(respone.data);
    if (respone.data.success) {
      setList(respone.data.data);
    } else {
      toast.error("Üzgünüm liste gözükmüyor, bir hata oluştu !");
    }
  };

  const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList(); 
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else{
      toast.error("Üzgünüm ürün silinemedi, bir hata oluştu !")
    }
  }

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
              <p onClick={() => removeFood(item._id)} className="cursor">X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
