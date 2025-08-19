import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Masum:0795@cluster0.osxnrsh.mongodb.net/PizzaPanel').then (()=>console.log("DB Connected"))
}