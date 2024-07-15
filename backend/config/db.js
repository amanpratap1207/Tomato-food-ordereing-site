import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://amanpratap12july:anaponda@cluster0.fzvjeaw.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));

}