const Chat = require('../models/Chat');
const Player = require('../models/Player');

const getAllChats = async (req, res) => {
    try {
        Chat.find({ players: {$elemMatch: { $eq: req._id }} })
        .populate("players", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await Player.populate(results, {
                path: "latestMessage.sender",
                select: "name avatar email",
            });   

            res.status(200).json(results);
        });
    } catch (err) {
        res.status(400).json({
            "message": "Failed to fetch chats"
        });
    }
};

const createChat = async (req, res) => {
    const { playerId } = req.body;
    
    if (!playerId) {
        console.log("PlayerId param not sent with request");
        return res.status(400).json({ "message": "Player id param not sent with request" })
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { players: { $elemMatch: { $eq: req._id } } },
            { players: { $elemMatch: { $eq: playerId } } },
        ],
    })
    .populate("players", "-password")
    .populate("latestMessage");

    isChat = await Player.populate(isChat, {
        path: "latestMessage.sender",
        select: "name avatar email",
    });  

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            players: [req._id, playerId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "players",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400).json({ "message": error.message });
        }
    }
};

const createGroup = async (req, res) => {
    if (!req.body.players || !req.body.name) {
        return res.status(400).send({
            "message": "Fill all fields"
        });
    }

    let players = JSON.parse(req.body.players);

    if (players.length < 2) {
        return res.status(400).json({
            "message": "More than 2 players required to create group"
        });
    }

    players.push(req._id);
    
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            players: players,
            isGroupChat: true,
            groupAdmin: req._id
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("players", "-password")
        .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (err) {
        res.status(400).json({
            "message": err.message
        });
    }
};

const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate("players", "-password")
    .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(400).json({
            "message": "Chat not found"
        });
    } else {
        res.status(200).json(updatedChat);
    }
};

const removeFromGroup = async (req, res) => {
    const { chatId, playerId } = req.body;

    const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { players: playerId } }, { new: true })
    .populate("players", "-password")
    .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404).json({
            "message": "Can't add player to the chat"
        });
    } else {
        res.status(200).json(removed);
    }
};

const addToGroup = async (req, res) => {
    const { chatId, playerId } = req.body;

    const added = await Chat.findByIdAndUpdate(chatId, { $push: { players: playerId } }, { new: true })
    .populate("players", "-password")
    .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404).json({
            "message": "Chat not found"
        });
    } else {
        res.status(200).json(added);
    }
};

const getGameChat = async (req, res) => {
    const { chatName } = req.body;

    const chat = await Chat.find({ chatName: chatName });

    if (!chat) {
        res.status(404).json({
            "message": "Chat not found"
        });
    } else {
        res.status(200).json(chat);
    }
};

const removeChat = async (req, res) => {
    const { brothelId } = req.body;

    const chat = await Chat.find({ chatName: brothelId });
    
    if (chat) {
        try {
            await Chat.deleteOne({ chatName: brothelId });
            res.status(200).json({
                "message": "Chat removed successfully"
            });
        } catch (err) {
            res.status(400).json({
                "message": err.message
            });
        }
    } else {
        res.status(404).json({
            "message": "Chat not found"
        });
    }
};

module.exports = {
    getAllChats,
    createChat,
    createGroup,
    renameGroup,
    removeFromGroup,
    addToGroup,
    getGameChat,
    removeChat
};