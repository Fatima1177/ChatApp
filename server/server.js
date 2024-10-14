import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express() 
app.use(express.json())
app.use(cookieParser())
app.use(cors())

import connectToMongoDB from './db/connectToDB.js';

//env
import dotenv from 'dotenv' 
dotenv.config()

const PORT = process.env.PORT || 5000


import authRoutes from './routes/auth.routes.js'
import massageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

app.use("/api/auth", authRoutes)
app.use("/api/messages", massageRoutes)
app.use("/api/users", userRoutes)


app.get('/', (req, res) =>{
    res.json('Welcome to my server')
})


app.listen(PORT, async()=>{
    await connectToMongoDB()
    console.log(`Server is running on port ${PORT}`)
});