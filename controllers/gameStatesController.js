const Stats = require("../models/Stats");
// const mongoose = require("mongoose");

const allGameStates = async (req, res) => {
  try {
    const states = await Stats.find();
    res.status(200).json(states);
  } catch (err) {
    res.status(400).json({
      message: "Failed to fetch game states",
    });
  }
};

const getLeaderBoard = async (req, res) => {
  try {
    let leaderboard = await Stats.aggregate([
      {
        $group: {
          _id: "$userId",
          totalAmount: { $sum: "$amount" },
          totalGainedXp: { $sum: "$xpGained" },
          totalPoint: { $sum: "$point" },
          totalUserFee: { $sum: "$userFee" },
        },
      },
    ]);

    res.status(200).json(leaderboard);
  } catch (err) {
    leaderboard;
    res.status(400).json({
      message: "Failed to fetch game states",
    });
  }
};

const addGameStates = async (req, res) => {
  try {
    const userFee = (20 / 100) * req.body.amount;

    const {
      userId,
      gameId,
      xpGained,
      point,
      amount,
      firstBid,
      finalBid,
      place,
    } = req.body;
    const states = {
      userId,
      gameId,
      xpGained,
      point,
      amount,
      firstBid,
      finalBid,
      place,
      userFee,
    };

    const gameStates = await Stats.create(states);
    res.status(200).json(gameStates);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  allGameStates,
  addGameStates,
  getLeaderBoard,
};
