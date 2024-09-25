import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


  //One user data [API]
const userList = async (req,res) => {
    try {
        const users_list = await userModel.findOne({ "_id": "66e06a45d7f8fde23d9296d4" });
        res.json({success:true, data:users_list})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:{ message:"Error", error:error.message } })   
    }
}


// Login user [API]
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        //console.log(user);
        
        //Checking the user exists or not
        if (!user) {
            return res.json({success:false, message:"User does not exists."})
        }

        //Checking the stored password with the untered password
        const isMatch = await bcrypt.compare(password, user.password)

        //
        if (!isMatch) {
            return res.json({success:false, message:"Not valid credentials."})
        }

        const token = createToken(user._id)
        res.json({success:true, message:{message:"User logged-in successfully", token:token}})

    } catch (error) {
        console.log(error); 
        res.json({success:false, message:error})
    }
}

//Create Token ('id' self generated in MongoDB, '_id' will be receive from Register API)
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


// Register user [API]
const registerUser = async (req,res) => {
    const {name, password, email} = req.body;

    try {
        //Checking, Is the user already exists or not
        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({success:false, message:"User already exists."})
        }

        //Validating email format & strong password
        if(!validator.isEmail(email)) {
            return res.json({success:false, message:"Please entera valid email."})
        }

        //Checking the password length
        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong password." })
        }

        //Hashing user password
        const salt = await bcrypt.genSalt(8)
        const hashedPAssword = await  bcrypt.hash(password, salt)

        //Creating new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPAssword
        })

        //Save the user in DB, Generate and send the Token
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, message:{message:"User registered successfully", token:token}})

    } catch (error) {
        console.log(error); 
        res.json({success:false, message:error})
    }

}

export {loginUser, registerUser, userList}