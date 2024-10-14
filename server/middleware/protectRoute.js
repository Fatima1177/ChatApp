import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protectRoute = async(req,res,next) => {
    try{

        const token = req.cookies.jwt 
        if(!token){
            return res.status(401).json({mes: "Unauthorizated!!! No token "})
        }

        const verify = jwt.verify(token, process.env.TOKEN_KEY)
        if(!verify){
            return res.status(401).json({mes: "Unauthorizated!!! False Token"})
        }

        const user = await User.findById(verify.userId).select("-password")
        if(!user){
            return res.status(404).json({mes: "User not found!!! "})
        }

        req.user = user
        next()
    }catch(error){
        console.log('protect Route err:' , error.message)
        res.status(500).json({mes: "Internal server error!"})
    }
}

export default protectRoute