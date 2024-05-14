import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Burger",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Burger",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Resim yükle</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Ürün Adı</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Ürün adını giriniz"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Ürün Açıklaması</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Lütfen ürün açıklamasını yazınız"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Ürün Kategorisi</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Burger">Burger</option>
              <option value="Tost">Tost</option>
              <option value="Pizza">Pizza</option>
              <option value="Pilav">Pilav</option>
              <option value="Tavuk">Tavuk</option>
              <option value="Köfte">Köfte</option>
              <option value="Steak">Steak</option>
              <option value="Makarna">Makarna</option>
              <option value="Balık">Balık</option>
              <option value="Salata">Salata</option>
              <option value="Tatlı">Tatlı</option>
              <option value="Soğuk İçecekler">Soğuk İçecekler</option>
              <option value="Sıcak İçecekler">Sıcak İçecekler</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Ürün Fiyatı</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="200 ₺"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Ekle
        </button>
      </form>
    </div>
  );
};

export default Add;
