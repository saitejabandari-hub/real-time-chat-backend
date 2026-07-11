import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },

    email :{
        type: String,
        required: true,
        unique: true,
    },

    number :{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required : true,
    }

})

const User = mongoose.model("User",userSchema) // with out model we can't do model talk to mangoDB



export default User