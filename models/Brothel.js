const mongoose = require("mongoose");

const Brothel = mongoose.Schema(
  {
    numberOfPlayers: {
      type: Number,
      default: null,
    },
    brothelName: {
      type: String,
      trim: true,
    },
    brothelAdmin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    players: [],
    gameState: {},
    isPublic: {
      type: Boolean,
      default: false,
    },
    password: String,
    betAmount: {
      type: Number,
      default: 0,
    },
    isDemo: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Brothel", Brothel);
