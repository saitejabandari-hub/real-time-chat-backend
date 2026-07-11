import jwt from 'jsonwebtoken'

const authMiddleware = (request, response,next) =>{

    const headertoken = request.headers.authorization

    if(!headertoken){
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    const token = headertoken.split(" ")[1]

   try{

     const decode = jwt.verify(token, process.env.JWT_SECRET)


    request.user = decode

    next()

   }catch(error){

    response.status(401).json({
        message: error.message
    })

   }


}

export default authMiddleware