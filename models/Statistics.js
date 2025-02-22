const mongoose = require("mongoose");

const playerStatisticsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Required"],
    },
    name: {
      type: String,
      required: [true, "Required"],
    },
    place: {
      type: String,
      required: [true, "Required"],
    },
    points: {
      type: String,
      required: [true, "Required"],
    },
    amount: {
      type: String,
      required: [true, "Required"],
    },
    progress: {
      type: String,
      required: [true, "Required"],
    },
    trophy: {
      type: String,
      required: [true, "Required"],
    },
    authority: {
      type: String,
      required: [true, "Required"],
    },
    cyties: {
      type: Number,
      required: [true, "Required"],
    },
    sattlements: {
      type: Number,
      required: [true, "Required"],
    },
    roads: {
      type: Number,
      required: [true, "Required"],
    },
    robbed: {
      type: Number,
      required: [true, "Required"],
    },
    saccessfullTrades: {
      type: Number,
      required: [true, "Required"],
    },
    firstBid: {
      type: Number,
      required: [true, "Required"],
    },
    finalBid: {
      type: Number,
      required: [true, "Required"],
    },
    userFee: {
      type: Number,
      required: [true, "Required"],
    },
  },
  {
    timestamps: true,
  }
);

const GameStats = new mongoose.Schema(
  {
    gameId: {
      type: Number,
      required: [true, "Required"],
    },
    brothelName: {
      type: String,
      required: [true, "required"],
    },
    gameTime: {
      type: String,
      required: [true, "required"],
    },
    diseRolled: {
      type: String,
      required: [true, "required"],
    },
    trades: {
      type: String,
      required: [true, "required"],
    },
    usedDevelopers: {
      type: String,
      required: [true, "required"],
    },
    usedRoads: {
      type: String,
      required: [true, "required"],
    },
    cytiesBuilt: {
      type: String,
      required: [true, "required"],
    },
    sattelmentsBuilt: {
      type: String,
      required: [true, "required"],
    },
  },
  {
    timestamps: true,
  }
);

const DiceStats = new mongoose.Schema(
  {
    num: {
      type: Number,
      required: [true, "diceee"],
    },
    quantity: {
      type: Number,
      required: [true, "diceee"],
    },
  },
  {
    timestamps: true,
  }
);

const RankingStats = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "diceee"],
    },
    name: {
      type: String,
      required: [true, "diceee"],
    },
    place: {
      type: String,
      required: [true, "diceee"],
    },
    points: {
      type: String,
      required: [true, "diceee"],
    },
    amount: {
      type: String,
      required: [true, "diceee"],
    },
    progress: {
      type: String,
      required: [true, "diceee"],
    },
    trophy: {
      type: String,
      required: [true, "diceee"],
    },
    autority: {
      type: String,
      required: [true, "diceee"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  PlayerStats: mongoose.model("PlayerStatistics", playerStatisticsSchema),
  GameStats: mongoose.model("GameStats", GameStats),
  DiceStats: mongoose.model("DiceStats", DiceStats),
  RankingStats: mongoose.model("RankingStats", RankingStats),
};
