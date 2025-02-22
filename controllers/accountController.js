const Player = require("../models/Player");
const verificationHelper = require("../utils/verificationHelper");
const bcrypt = require("bcrypt");

const updatePlayer = async (req, res) => {
  try {
    const { _id, username, password, email } = req.body;
    let set = {};

    if (username) set.username = username;
    
    if (email) {
      set.email = email;
      set.verified = false;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);

      set.password = hashedPassword;
    }
    
    await Player.findOneAndUpdate({
      _id: _id,
    }, { $set: set });

    let player =  await Player.findById({ _id });
    
    return res.status(200).json({ player });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendVerificationEmail = async (req, res) => {
  try {
    let { email, verificationCode } = req.body;

    await verificationHelper.sendVerificationCode(
      email,
      verificationCode
    );

    return res.status(200).json({ message: "Verification code sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  updatePlayer,
  sendVerificationEmail
};
