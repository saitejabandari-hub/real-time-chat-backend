import conversation from "../models/Conversation.js"
import message from "../models/Message.js"


export const sendMessage = async (request ,response)=>{

    const {receiverId,message,image,file} = request.body
    const {userId} = request.user 

    try{

        let conversationData 

        const existingConversation = await conversation.findOne({participants : {
                                                                                    $all: [userId,receiverId]
                                                                                    }})

        if(!existingConversation){

           const newConversation =  await conversation.create({  participants:[userId,receiverId],
                                        lastMessage: message
            })

            conversationData = newConversation

        }else{

            conversationData = existingConversation

        }

        const newMessage = await message.create({
            conversationId: conversationData._id,
            sender: userId,
            receiver: receiverId,
            message,
            image
        })

        const lastMessage = message? message : image? "📸 Image" : file 

        const updateconversation = await conversation.updateOne({_id : conversationData._id},{lastMessage})

        response.status(200).json({
            lastMessage:updateconversation.lastMessage,
            message:"Message sent successfull"
        })

        

    }catch(error){
        response.status(500).json({
            message: "Internal Server Down"
        })
    }

}

