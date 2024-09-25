import mongoose from 'mongoose'

//If we don't set minimize as false then this cartData will not created
const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    cartData:{type:Object, default:{}}
},{minimize:false})


//mongoose.models.user tries to retrieve a model named "user" from the mongoose.models object.    **mongoose.model() is used to create a new model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;