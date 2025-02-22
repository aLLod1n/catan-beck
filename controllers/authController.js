const Player = require("../models/Player");
const generateToken = require("../config/generateToken");
const verificationHelper = require("../utils/verificationHelper");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please enter all fields!",
    });
  }

  const playerExists = await Player.findOne({ email });

  if (playerExists) {
    return res.status(400).json({
      message: "Player already exists!",
    });
  }

  let verificationCode = await verificationHelper.generateVerificationCode();

  const player = await Player.create({
    username,
    email,
    password,
    avatar: '',
    verificationCode,
    address: '',
    balance: 0,
    demoBalance: 1000
  });

  if (player) {
    await verificationHelper.sendVerificationCode(
      email,
      verificationCode
    );
      
    return res.status(200).json({
      _id: player._id,
      username: player.username,
      email: player.email,
      avatar: player.avatar,
      address: player.address,
      verified: player.verified,
      balance: player.balance,
      demoBalance: player.demoBalance
    });
  } else {
    return res.status(500).json({
      message: "Failed to create player!",
    });
  }
};

const authWithAddress = async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({
      message: "You are not logged in!",
    });
  }

  const playerExists = await Player.findOne({ address });

  if (playerExists) {
    const roles = Object.values(playerExists.roles).filter(Boolean);

    const access_token = generateToken(
      {
        UserInfo: {
          _id: playerExists._id,
          roles: roles,
        },
      },
      "access_token",
      "30d"
    );

    const refresh_token = generateToken(
      {
        UserInfo: {
          _id: playerExists._id,
          roles: roles,
        },
      },
      "refresh_token",
      "30d"
    );

    await Player.updateOne(
      { address: playerExists.address },
      {
        $set: {
          refresh_token: refresh_token,
        },
      }
    );

    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: `Welcome back, ${playerExists.username !== "" ? playerExists.username : "guest"}!`,
      player: {
        _id: playerExists._id,
        access_token: access_token,
        username: playerExists.username,
        email: playerExists.email,
        avatar: playerExists.avatar,
        address: playerExists.address,
        verified: playerExists.verified,
        roles: playerExists.roles,
        balance: playerExists.balance,
        demoBalance: playerExists.demoBalance
      }
    });
  }

  let verificationCode = await verificationHelper.generateVerificationCode();

  const player = await Player.create({
    username: "",
    email: "",
    password: "",
    avatar: "",
    verificationCode,
    address,
    refresh_token: "",
    balance: 0,
    demoBalance: 1000
  });

  if (player) {
    const roles = Object.values(player.roles).filter(Boolean);

    const access_token = generateToken(
      {
        UserInfo: {
          _id: player._id,
          roles: roles,
        },
      },
      "access_token",
      "30d"
    );

    const refresh_token = generateToken(
      {
        UserInfo: {
          _id: player._id,
          roles: roles,
        },
      },
      "refresh_token",
      "30d"
    );

    await Player.updateOne(
      { address: player.address },
      {
        $set: {
          refresh_token: refresh_token,
        },
      }
    );

    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Welcome, to dirty catan!",
      player: {
        _id: player._id,
        access_token: access_token,
        username: player.username,
        email: player.email,
        avatar: player.avatar,
        address: player.address,
        verified: player.verified,
        roles: player.roles,
        balance: player.balance,
        demoBalance: player.demoBalance
      }
    });
  } else {
    return res.status(500).json({
      message: "Failed to create player!",
    });
  }
};

const auth = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") return res.status(400).json({ message: "Username and password are required." });

  let player = await Player.findOne({ email });

  if (!player) return res.status(401).json({ message: "Unauthorized" });

  if (player && (await player.matchPassword(password))) {
    const roles = Object.values(player.roles).filter(Boolean);
    
    const access_token = generateToken(
      {
        UserInfo: {
          _id: player._id,
          roles: roles,
        },
      },
      "access_token",
      "30d"
    );

    const refresh_token = generateToken(
      {
        UserInfo: {
          _id: player._id,
          roles: roles,
        },
      },
      "refresh_token",
      "30d"
    );

    await Player.updateOne(
      { email: player.email },
      {
        $set: {
          refresh_token: refresh_token,
        },
      }
    );

    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      _id: player._id,
      access_token: access_token,
      roles: roles,
      username: player.username,
      avatar: player.avatar,
      email: player.email,
      address: player.address,
      verified: player.verified,
      balance: player.balance,
      demoBalance: player.demoBalance
    });
  } else {
    res.status(401).json({
      message: "Invalid email or password!",
    });
  }
};

module.exports = {
  auth,
  authWithAddress,
  register
};
