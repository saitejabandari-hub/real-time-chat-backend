import User from "../models/User.js"

export const getprofile = async (request,response)=>{
    const {userId} = request.user

    try{

        const getuser = await User.findOne({_id: userId},{password:0})

    if(!getuser){
        return response.status(404).json({
            message: "User Not Found"
        })
    }

    response.status(200).json({
        user: getuser
    })

    }catch(error){
        response.status(500).json({
            message: "Internal server down"
        })
    }

}