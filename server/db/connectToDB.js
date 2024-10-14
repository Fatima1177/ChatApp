import mongoose from "mongoose";

const connectToMongoDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('MongoDB Connected');
    }catch(err){
        console.log('MongoDB NOT Connected!!!', err.message);
    }
}

export default connectToMongoDB