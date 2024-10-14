import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reciverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message:{
        type: String,
        required: true,
    }

}, {timestamps: true})

const Message = mongoose.model("Message", messagesSchema)

export default Message