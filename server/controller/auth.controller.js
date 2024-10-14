import User from "../models/User.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async(req, res) => {
    //check body 
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body
        if(password !== confirmPassword) return res.status(400).json({mes: 'Password dont match'})

        
        const findUser = await User.findOne().where('username').equals(username)

        if(findUser) return res.status(409).json({mes: 'This username has alredy taken!'})


        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const profilePic = `https://avatar.iran.liara.run/public/${gender==='female' ? 'girl' :'boy'}?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic
        })

        
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)

            const saveUser = await newUser.save()
            if(!saveUser) return res.status(400).json({mes:'User not added'})
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        }
        

    }catch(err){
        return res.status(500).json({mes: 'Internal server error', err: err.message})
    }

}

export const login = async(req, res) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"})
        }
        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })

    }catch(error){
        console.log('Error in login controller ', error.message);
        return res.status(500).json({mes: 'Internal server error', err: err.message})

    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge:0 })
        res.status(200).json({mes: "Logged out seccesfully"})


    }catch(error){

        console.log('Error in logout controller ', error.message);
        return res.status(500).json({mes: 'Internal server error', err: err.message})
    }
}
