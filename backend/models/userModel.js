import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    cartData: {type:Object, default:{}}
}, {minimize:false})
// we have cartData as default:empty in order to make an empty set visible we need to add minimize:false

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
// if model is not created: then mongoose.models.user otherwise create new model: mongoose.model("user", userSchema)

export default userModel;