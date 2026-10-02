import express from "express" 
import { getUser, getUserProfile, loginUser, logoutUser, registerUser ,followUser,unfollowUser,updateProfile} from "../controllers/user.controllers.js"
import { isAuthenticated } from "../middlewares/authMiddleware.js"
import profileImageUpload from "../middlewares/uploadMiddleware.js"

const userRoutes=express.Router()

// register 

userRoutes.post("/register",registerUser)

userRoutes.post("/login",loginUser)

userRoutes.get("/me",isAuthenticated,getUser)

userRoutes.get("/logout",logoutUser)

userRoutes.get("/profile/:username",isAuthenticated,getUserProfile)

userRoutes.post("/follow/:id",isAuthenticated,followUser)

userRoutes.post("/unfollow/:id",isAuthenticated,unfollowUser)

userRoutes.post("/updateProfile",isAuthenticated,profileImageUpload.single("profileImage"),updateProfile)

export default userRoutes 

