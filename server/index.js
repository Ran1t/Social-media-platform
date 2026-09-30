import express from "express"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express()
const PORT=8089

dotenv.config()

const dbUrl = process.env.dbUrl || process.env.MONGODB_URI || process.env.DB_URL

if (!dbUrl) {
    console.error("MongoDB URL is missing. Set dbUrl or MONGODB_URI in .env")
    process.exit(1)
}

mongoose.connect(dbUrl).then(() => {
    console.log("DB Connected")
}).catch((err) => {
    console.log("MongoDB connection error:", err.message)
    process.exit(1)
})

app.use(cors({
    origin: "http://localhost:5173",              // allows request from this port
    credentials:true                               // can accept token/cookie
}))

app.use(express.json())
app.use(cookieParser())
app.use("/users",userRoutes)


app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`)
})
