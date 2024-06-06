import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login user 
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false,message:"Üyeliğiniz bulunamadı, lütfen üye olun !"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.json({success:false,message:"Girdiniz şifre hatalıdır, lütfen tekrar deneyiniz !"})
        }

        const token = createToken(user._id)
        //console.log(token);
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Giriş işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz !"})
    }
};

    const createToken = (id) => {
        return jwt.sign({ id },process.env.JWT_SECRET, { expiresIn: '30m' }); // 30 dakikalık erişim tokenı

    }

// Register user
const registerUser = async (req, res) => {
    const {name, password, email, phone} = req.body;
    try {

        // Kullanıcının zaten kayıtlı olup olmadığını kontrol et
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"Kullacnı Zaten Kayıtlı !"})
        }

        // Telefon numarasının geçerliliğini doğrula
        const phonePattern = /^5\d{9}$/;
        if (!phonePattern.test(phone)) {
            return res.json({ success: false, message: "Lütfen geçerli bir telefon numarası giriniz! (Sıfırla başlamayan, 10 karakter uzunluğunda olmalı)" });
        }

        // Email formatını ve şifre gücünü doğrula
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Lütfen geçerli bir e-posta giriniz !"})
        }
    
        // Şifrenin en az 8 karakter uzunluğunda olup olmadığını kontrol et
        if (password.length < 8) {
            return res.json({success:false,message:"Lütfen güçlü bir şifre giriniz !"})
        }

         // Kullanıcının şifresini hash'le
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // Yeni kullanıcı oluştur
        const newUser = new userModel({
            name:name,
            phone:phone,
            email:email,
            password:hashedPassword,
            //role: 0 // Normal kullanıcı olarak başlat
        })

         // Yeni kullanıcıyı veritabanına kaydet
        const user = await newUser.save()

        // Yeni kullanıcı için bir token oluştur
        const token = createToken(user._id)
        

         // Token ile yanıt gönder
         res.json({success:true,token});
    } catch (error) {
        res.json({success:false,message:"Bilgileri eksik ya da hatalı girdiniz, lütfen tekrar deneyiniz !"})
    }
};

export { loginUser, registerUser };
