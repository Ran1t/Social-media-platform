import express from "express" 
import { loginUser, registerUser } from "../controllers/user.controllers.js"

const userRoutes=express.Router()

// register 

userRoutes.post("/register",registerUser)
userRoutes.post("/login",loginUser)


export default userRoutes 