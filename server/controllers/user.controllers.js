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

    res.status(200).json({ message: "User Logged In",userData:user});
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

export const getUserProfile= async(req,res)=>{
  try{
    const {username} = req.params

    const user= await User.findOne({username})

    if(!user){
      return res.status(404).json({message:"User Not Found"})
    }
    return res.status(200).json({message:"User Found", profileData: user})
  }
  catch(error){
    return res.status(500).json({message:"Internal Server Error", error})
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, username, email, bio } = req.body
    const updates = {}

    if (name !== undefined) updates.name = name.trim()
    if (username !== undefined) updates.username = username.trim()
    if (email !== undefined) updates.email = email.trim()
    if (bio !== undefined) updates.bio = bio
    if (req.file) updates.profileImage = `/uploads/profile/${req.file.filename}`
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password")

    if (!user) return res.status(404).json({ message: "User Not Found" })
    return res.status(200).json({ message: "Profile Updated", user })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Username or email already exists" })
    }
    return res.status(500).json({ message: "Internal Server Error", error })
  }
}

// follow controller

export const followUser=async(req,res)=>{
  try{
    const currentUserId = req.user._id

    const targetUserId =req.params.id

    const targetUser = await User.findById(targetUserId)

    if (!targetUser) {
      return res.status(404).json({ message: "User Not Found" })
    }

    // Do all the validations 

    const alreadyFollowing = targetUser.followers.some((id)=>id.toString()===currentUserId.toString())

    if(alreadyFollowing){
      return res.status(409).json({message:"User Already Following"})
    }

    if(currentUserId.toString() == targetUserId.toString()){
      return res.status(409).json({message:"You cannot follow yourself"})
    }

    await User.findByIdAndUpdate(currentUserId,{
      $addToSet : {followings : targetUserId}
    })

    await User.findByIdAndUpdate(targetUserId,{
      $addToSet : {followers : currentUserId}
    })

    return res.status(201).json({message:"User Followed"})

  }
  catch(error){
    res.status(500).json({message:"Internal Server Error",error:error})
  }
}

// unfollow controller

export const unfollowUser=async(req,res)=>{
  try{
    const currentUserId = req.user._id

    const targetUserId =req.params.id

    const targetUser = await User.findById(targetUserId)

    // Do all the validations 

    if (!targetUser) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    const alreadyFollowing = targetUser.followers.some((id)=>id.toString()===currentUserId.toString())

    if(!alreadyFollowing){
      return res.status(409).json({message:"User Already is Unfollowed"})
    }

    if(currentUserId.toString() == targetUserId.toString()){
      return res.status(409).json({message:"You cannot unfollow yourself"})
    }

    await User.findByIdAndUpdate(currentUserId,{
      $pull : {followings : targetUserId}         // pull is used to remove from set
    })

    await User.findByIdAndUpdate(targetUserId,{
      $pull : {followers : currentUserId}
    })

    return res.status(201).json({message:"User unFollowed"})

  }
  catch(error){
    res.status(500).json({message:"Internal Server Error",error:error})
  }
}
