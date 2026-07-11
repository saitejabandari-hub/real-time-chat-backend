import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (request,response)=>{
    try{

        const {name,email,number,password} = request.body

        if(!name || !email || !number || !password){
            return response.status(400).json({
                message: "fill all areas"
            })
        }

        const checkEmail = await User.findOne({email})

        if(checkEmail){
            return response.status(400).json({
                message: "Email already exists"
            })
        }

        const checkNumber = await User.findOne({number})

        if(checkNumber){
            return response.status(400).json({
                message: "Number already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

      const user =   await User.create({
            name,
            email,
            number,
            password: hashedPassword
        })

        const payload = {
            userId : user._id
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "30d"})


        response.status(201).json({
            message: "created successfully",
            token
        })



    }catch(error){
        response.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const login =  async(request, response)=>{

    const {email,password}= request.body

    try{

        if(!email || !password){
            return response.status(400).json({
                 message:"Fill all fields"
            })
        }

        const checkUser = await User.findOne({email})

        if(!checkUser){
            return response.status(404).json({
                message: "email doesn't exist"
            })
        }

        const checkpassword = await bcrypt.compare(password,checkUser.password)

        if(!checkpassword){
            return response.status(400).json({
                message: "Invalid password"
            })
        }

        const payload = {
            userId : checkUser._id
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "30d"})

        response.status(200).json({
            message: "Loged In Successfull",
            token
        })



    }catch(error){
        response.status(500).json({
            message: "Internal server down"
        })
    }


}



