import User from "../models/User.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id

        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password")

        if (!filteredUsers) 
            return res.status(404).json({ mes: "users not found" })

        res.status(200).json(filteredUsers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}