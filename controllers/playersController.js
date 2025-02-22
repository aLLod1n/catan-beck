const Player = require('../models/Player');
const { getConnectedPlayers } = require('../utils/manageRoomConnections');

const getAllPlayers = async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { username: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } }
            ]
        } : {};
    
    const players = await Player.find(keyword).find({ _id: { $ne: req._id } });
    
    if (players) {
        res.status(201).json(players);
    } else {
        res.status(401).json({
            "message": "Request failed!"
        });
    }
};

const getOnlinePlayers = async (req, res) => {
    const keyword = req.query.search;
    const players = getConnectedPlayers().filter(p => p.username.includes(keyword));

    if(players) {
        res.status(201).json(players);
    } else {
        res.status(401).json({
            "message": "Request failed!"
        })
    }
}

module.exports = {
    getAllPlayers,
    getOnlinePlayers
};