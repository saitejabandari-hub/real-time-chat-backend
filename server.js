import connectDB from "./config/db.js";

import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT,()=>{
    console.log("server running at port 5000")
})








