import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// plscing user order for frontend 
const placeOrder = async (req,res) => {

    const frontend_url = "http://localhost:5174"

    try {

        // amount alanının kontrolü
        if (!req.body.amount) {
            return res.status(400).json({ success: false, message: "Amount is required" });
        }

        const newOrder = new orderModel({
            userId:req.body.userId,
            masaNo:req.body.masaNo,
            items:req.body.items,
            amount:req.body.amount
        })
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "try",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Fiyatı kuruş cinsine dönüştürür
            },
            quantity: item.quantity
        }));

        // line_items.push({
        //     price_data:{
        //         currency:"try",
        //         product_data:{
        //             name:"Delivery Charges"
        //         },
        //         unit_amount:2*100
        //     },
        //     quantity:1
        // })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({ success: true, session_url: session.url });
    } catch (error) {
          // Hata durumunda yanıt gönderme
          console.error(error);
          res.status(500).json({ success: false, message: "Sunucu Hatası" });
    }
}


const verifyOrder = async(req,res) =>{
    const {orderId,success} = req.body;
    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Ödeme Başarılı"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Ödemeniz iptal edilmiştir"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Bir hata oluştu, lütfen daha sonra tekrar deneyiniz."})
    }
}

// Kullancı Sipariş Frontend
const userOrder = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Siparişler alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin !"})
    }
}

// Admin paneli için butun siparişleri gösterme
const listOrder = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Hata !!!!"})
    }
} 

// api sipariş durumunu değiştirme
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Sipariş durumu başarıyla güncllendi."})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Hata oluştu, Sipariş durumu güncllenmedi."})
    }
}


export {placeOrder, verifyOrder,userOrder,listOrder,updateStatus}

