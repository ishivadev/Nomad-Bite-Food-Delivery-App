import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true}
})

// Create or retrieve the ***food*** model
// Check if the 'food' model already exists in mongoose.models
// If it does, use the existing model, otherwise create a new one
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;