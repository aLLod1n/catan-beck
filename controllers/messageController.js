const Message = require('../models/Message');
const Player = require('../models/Player');
const Chat = require('../models/Chat');

const allMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "username avatar email")
            .populate("chat");
        return res.status(200).json(messages);
    } catch (err) {
        return res.status(400).json({
            "message": "Failed to fetch messages"
        });
    }
};

const sendMessage = async (req, res) => {
    const { content, chatId, msgColor } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed");
        return res.status(400).json({ "message": "Invalid data passed" })
    }

    let newMessage = {
        sender: req._id,
        content: content,
        msgColor: msgColor,
        chat: chatId
    };

    try {
        let message = await Message.create(newMessage);

        message = await message.populate("sender", "name avatar");
        message = await message.populate("chat");
        message = await Player.populate(message, {
            path: "chat.players",
            select: "name avatar email"
        });

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        })

        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
};

module.exports = {
    allMessages,
    sendMessage
};