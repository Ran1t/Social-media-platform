import express from "express" 
import { getUser, getUserProfile, loginUser, logoutUser, registerUser ,followUser} from "../controllers/user.controllers.js"
import { isAuthenticated } from "../middlewares/authMiddleware.js"

const userRoutes=express.Router()

// register 

userRoutes.post("/register",registerUser)

userRoutes.post("/login",loginUser)

userRoutes.get("/me",isAuthenticated,getUser)

userRoutes.get("/logout",logoutUser)

userRoutes.get("/profile/:username",isAuthenticated,getUserProfile)

userRoutes.post("/follow/:id",isAuthenticated,followUser)

export default userRoutes 