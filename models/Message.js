import mongoose from "mongoose";


const messageschema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    message:{
        type:String,
        default:''
    },

    image:{
        type: String,
        default:""
    },
    status:{
        type: String,
        enum:[
            "sent",
            "delivered",
            "Seen"
        ],
        default:"sent"
    },
    },
    {
    timestamps: true

})


const message = mongoose.model("Usermessage",messageschema)


export default message