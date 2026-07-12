import mongoose from "mongoose";


const conversationSchema = new mongoose.Schema({
    
        participants:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            }
        ],
        lastMessage: {
            type:String,
            default:''
        }
    },
    {
        timestamps: true
    
})

const conversation = mongoose.model("Conversation",conversationSchema)

export default conversation