import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { genToken } from "../utils/generateTokens.js";

// Register Controller

const cookiesOptions = {
  httpOnly:true,
  secure:true
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    // all fields present
    // if the email or username already exists
    // password should be greater than 6 characters

    if (!username || !email || !password || !name) {
      return res.status(400).json({ message: "All fields Required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password Length should be greater than 6" });
    }

    const userNameExists = await User.findOne({ username });

    if (userNameExists) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(409).json({ message: "Email Already Exists" });
    }

  // password security

    const salt=await bcrypt.genSalt(10)
    const hashedpassword=await bcrypt.hash(password,salt)

    const newUser = await User.create({
      name,
      username,
      email,
      password : hashedpassword
    });

    // token -jwt --> access token
    const token = genToken(newUser._id)

    res.cookie("token",token,cookiesOptions)

    res.status(201).json({ message: "User Registered", user: newUser });
  } catch (error) {
    res.status(500).json({message:"Internal Server Error",error:error})
  }
};


export const loginUser=async(req,res)=>{
  try{
    const {email,password} = req.body

    const user=await User.findOne({email})

    if(!user){
      return res.status(404).json({ message: "User Not Found"});
    }


    const passwordCheck=await bcrypt.compare(password,user.password)

    if(!passwordCheck){
      return res.status(400).json({ message: "Wrong Password"});
    }

    const token= genToken(user._id)
    res.cookie("token",token,cookiesOptions)

    res.status(200).json({ message: "User Logged In"});
  }
  catch(error){
    res.status(500).json({message:"Internal Server Error",error:error})
  }
}

export const getUser=async(req,res)=>{
  res.status(200).json({message:"User Authenticated",userData:req.user})
}

export const logoutUser=async(req,res)=>{
    res.clearCookie("token",cookiesOptions)
    res.status(200).json({"message":"Logged out Successfully"})
}