import express from "express"
import { loginUser, registerUser, userList } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/list", userList)


export default userRouter;