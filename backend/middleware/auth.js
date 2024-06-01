import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next) => {
    const {token} = req.headers;
    if (!token) {
        return res.status(401).json({success:false,message:"Yetkisiz, tekrar giriş yapın !"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId =token_decode.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token Süresi bitti !' });
        }
        console.log(error);
        res.json({success:false,message:"Bir Hata oluştu !"})
    }
}

export default authMiddleware;
