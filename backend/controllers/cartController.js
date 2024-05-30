import userModel from "../models/userModel.js"

// add items to user cart
// Kullanıcı sepetine ürün ekleme
const addToCart = async (req,res) => {
    try {
          // Kullanıcı verilerini çek
        let userData = await userModel.findById(req.body.userId);
        // Sepet verilerini al
        let cartData = await userData.cartData;
        // Ürün sepet verilerinde yoksa ekle, varsa miktarını arttır
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
         // Güncellenmiş sepet verilerini kaydet
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        // Başarı mesajı gönder
        res.json({success:true,message:"Sepete eklendi"});
    } catch (error) {
         // Hata mesajı gönder ve hatayı konsola yazdır
        console.log(error)
        res.json({success:false,message:"Hata oluştu !"})
    }
}

// reomve items from user cart
// Kullanıcı sepetinden ürün çıkarma
const removeFromCart = async (req,res) => {
    try {
        // Kullanıcı verilerini çek
        let userData = await userModel.findById(req.body.userId);
        // Sepet verilerini al
        let cartData = await userData.cartData;
        // Ürün sepet verilerinde varsa ve miktarı 0'dan büyükse azalt
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
          // Güncellenmiş sepet verilerini kaydet
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        // Başarı mesajı gönder
        res.json({success:true,message:"Sepetten başarıla silindi !"})
    } catch (error) {
        // Hata mesajı gönder ve hatayı konsola yazdır
        console.log(error);
        res.json({success:false,message:"Hata oluştu, ürün sepetten silinmedi !"})
    }
}


// fetch user cart data
// Kullanıcı sepet verilerini çekme
const getCart = async (req,res) => {
    try {
        // Kullanıcı verilerini çek
        let userData = await userModel.findById(req.body.userId);
        // Sepet verilerini al
        let cartData = await userData.cartData;
        // Sepet verilerini gönder
        res.json({success:true,cartData})
    } catch (error) {
        // Hata mesajı gönder ve hatayı konsola yazdır
        console.log(error);
        res.json({success:false,message:"Hata oluştu !"})
    }
}

export { addToCart, removeFromCart, getCart }
