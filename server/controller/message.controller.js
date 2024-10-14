import Conversation from '../models/conversation.js'
import Message from '../models/message.js'


export const sendMessage = async (req, res) => {
    try {

        const { message } = req.body
        const reciverId = req.params.id
        const senderId = req.user._id


        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, reciverId]
            })
        }

        let newMessage = new Message({
            senderId,
            reciverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage)
        }

        //await conversation.save()
        //await newMessage.save()

        await Promise.all([conversation.save(),newMessage.save()])

        res.status(201).json({mes:"Message sended"})

    } catch (err) {
        res.status(500).json({ message: error.message })
    }

}

export const getMessages = async (req, res) => {
    try {

        const reciverId = req.params.id
        const senderId = req.user._id


        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        }).populate('messages')

        if(!conversation) 
           return res.status(200).json([])
        

        res.status(200).json(conversation.messages)

    } catch (err) {
        res.status(500).json({ message: error.message })
    }
}


