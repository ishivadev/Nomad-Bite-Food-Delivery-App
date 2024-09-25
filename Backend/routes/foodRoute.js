import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

// Create a new router instance
const foodRouter = express.Router();

// Image Storage Engine
// Define a storage engine for Multer
// This will store the uploaded files on the disk
const storageData = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) => { // Generate a unique filename for each uploaded file
        return cb(null,`${Date.now()}${file.originalname}`) // Use the current timestamp and the original filename
    }
})

// Create a Multer instance with the storage engine
const upload = multer({storage:storageData})

//Define a route for handling file uploads, Multer instance to handle the file upload, Call the "addFood" controller function after the file has been uploaded successfully
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)
export default foodRouter;