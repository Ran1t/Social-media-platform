import express from "express" 
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js"
import { isAuthenticated } from "../middlewares/authMiddleware.js"

const userRoutes=express.Router()

// register 

userRoutes.post("/register",registerUser)

userRoutes.post("/login",loginUser)

userRoutes.get("/me",isAuthenticated,getUser)

userRoutes.get("/logout",logoutUser)

export default userRoutes 