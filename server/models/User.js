import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 16,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 16,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    gender:{
        type: String,
        required: true,
        enum:["male", "female"],
    },
    profilePic:{
        type: String,
        default: "",
    },
}, {timestamps: true})


const User = mongoose.model('User', UserSchema)
export default User