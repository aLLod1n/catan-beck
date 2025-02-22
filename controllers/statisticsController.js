const { PlayerStats, GameStats, DiceStats, RankingStats } = require("../models/Statistics");
// const mongoose = require("mongoose");

const allGameStates = async (req, res) => {
  try {
    const states = await PlayerStats.find();
    res.status(200).json(states);
  } catch (err) {
    res.status(400).json({
      message: "Failed to fetch game states",
    });
  }
};


const getLeaderBoard = async (req, res) => {
  try {
    let leaderboard = await PlayerStats.aggregate([
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
    // leaderboard;
    res.status(400).json({
      message: "Failed to fetch game states",
    });
  }
};

const addGameStats = async (req, res) => {
  try {
    const {
      gameId,
      brothelName,
      gameTime,
      diseRolled,
      trades,
      usedDevelopers,
      usedRoads,
      cytiesBuilt,
      sattelmentsBuilt,
    } = req.body;

    const gStates = {
      gameId,
      brothelName,
      gameTime,
      diseRolled,
      trades,
      usedDevelopers,
      usedRoads,
      cytiesBuilt,
      sattelmentsBuilt,
    }
    const gameStats = await GameStats.create(gStates);
  
    res.status(200).json(gameStats);

  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const addPlayerStats = async (req, res) => {
  try {
    const {
      id,
      name,
      place,
      points,
      amount,
      progress,
      trophy,
      authority,
      cyties,
      sattlements,
      roads,
      robbed,
      saccessfullTrades,
      firstBid,
      finalBid,
      userFee,
    } = req.body;
    const pStates = {
      id,
      name,
      place,
      points,
      amount,
      progress,
      trophy,
      authority,
      cyties,
      sattlements,
      roads,
      robbed,
      saccessfullTrades,
      firstBid,
      finalBid,
      userFee,
    };

    const playerStats = await PlayerStats.create(pStates);

    res.status(200).json(playerStats);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const addDiceStats = async (req, res) => {
  try {
    const {
     num,
     quantity
    } = req.body;

    const dStates = {
      num,
      quantity
    };
    const diceStats = await DiceStats.create(dStates);

    res.status(200).json(diceStats);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const addRankingStats = async (req, res) => {
  try {
    const {
      id,
      name,
      place,
      points,
      amount,
      progress,
      trophy,
      autority
    } = req.body;

    const rStates = {
      id,
      name,
      place,
      points,
      amount,
      progress,
      trophy,
      autority
    };
    const rankingStats = await RankingStats.create(rStates);

    res.status(200).json(rankingStats);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


module.exports = {
  allGameStates,
  addPlayerStats,
  getLeaderBoard,
  addGameStats,
  addDiceStats,
  addRankingStats,
};
