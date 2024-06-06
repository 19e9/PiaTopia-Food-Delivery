import mongose from "mongoose"

const userSchema = new mongose.Schema({
    name:{type:String,require:true},
    phone: { type: String, required: true },
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    cartData:{type:Object,default:{}},
    //role: { type: Number, default: 0 } // 0: normal user, 1: admin
},{minimize:false})

// Mevcut bir modelin olup olmadığını kontrol eder, yoksa yeni bir model oluşturur.
const userModel = mongose.model.user || mongose.model("user",userSchema);
export default userModel;