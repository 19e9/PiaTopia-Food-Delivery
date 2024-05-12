import mongoose from "mongoose";


// DB Connect Control
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://adminpietopia:cNbVUVxYPeH4oFmN@pietopia.l5fpl6x.mongodb.net/Pietopia').then(()=> console.log("DB Connected"))
}

