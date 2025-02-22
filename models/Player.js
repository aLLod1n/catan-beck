const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Player = new mongoose.Schema(
  {
    address: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      unique: false
    },
    password: {
      type: String
    },
    address: {
      type: String,
      required: false,
    },
    balance: Number,
    demoBalance: {
      type: Number,
      default: 1000
    },
    avatar: {
      type: String,
      default: "/images/avatar.jpg",
    },
    roles: {
      admin: Number,
      editor: Number,
      player: {
        type: Number,
        default: 2001,
      },
    },
    verificationCode: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otpEnabled: {
      type: Boolean,
      default: false,
    },
    refresh_token: String,
  },
  {
    timestamps: true,
  }
);

Player.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

Player.methods.matchPassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);

  return isMatch;
};

module.exports = mongoose.model("Player", Player);
