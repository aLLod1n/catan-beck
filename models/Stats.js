const mongoose = require("mongoose");

const Stats = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    gameId: {
      type: String,
      required: [true, "Game ID is required"],
    },
    xpGained: {
      type: Number,
      required: [true, "XP gained is required"],
    },
    point: {
      type: Number,
      required: [true, "Point is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    firstBid: {
      type: Number,
      required: [true, "First bid is required"],
    },
    finalBid: {
      type: Number,
      required: [true, "Final bid is required"],
    },
    place: {
      type: Number,
      required: [true, "Place is required"],
    },
    userFee: {
      type: Number,
      required: [true, "User fee is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stats", Stats);
