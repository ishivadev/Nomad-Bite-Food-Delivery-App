import foodModel from "../models/foodModel.js";
import fs from 'fs';


// Add food item (API)
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename 
    })
    try {
        await food.save();
        res.json({success:true, message:"Food Added Successfully"})
    } catch (error) {
        let errorMessage = "";
        switch (true) {
            case !req.body.name:
              errorMessage += "Name is required. ";
              break;
            case !req.body.description:
              errorMessage += "Description is required. ";
              break;
            case  !req.body.price:
              errorMessage += "Price is required. ";
              break;
            case !req.body.category:
              errorMessage += "Category is required. ";
              break;
            default:
              errorMessage += "Error is adding food. ";
          }    
          res.json({success:false, message:{ error:errorMessage } }) //Returing the message for client side handling
    }

}


// All Food List (API)
const listFood = async (req,res) => {

    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:{ message:"Error", error:error.message } })   
    }
}


// Remove food item (API)
const removeFood = async (req, res) => {

    try {
        const foodID = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${foodID.image}`, ()=> {})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Food deleted."})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:{ message:"Error", error:error.message } }) 
        
    }
} 


export {addFood, listFood, removeFood}