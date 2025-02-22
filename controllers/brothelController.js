const {set} = require("mongoose");
const Brothel = require("../models/Brothel");
const {initGame} = require("./gameController");

const getAllBrothel = async (req, res) => {
  const {account} = req.query;

  try {
    let brothels;

    if (account === "true") {
      brothels = await Brothel.find({isDemo: true});
    }

    if (account === "false") {
      brothels = await Brothel.find({isDemo: false});
    }

    res.status(200).json(brothels);
  } catch (err) {
    res.status(400).json({
      message: "Failed to fetch brothel",
    });
  }
};

const joinBrothel = async (req, res) => {
  const {player, brothelId, pix} = req.body;
  const colors = [
    "#500998",
    "#E94560",
    "#4D9D9B",
    "#DAAE6D",
    "#FD00FE",
    "#585268",
  ];

  const exists = await Brothel.findById(brothelId, null, {new: true})
    .populate("players")
    .then((data) => {
      let newPlayer = data.players[pix];
      let existing = data.players.find((p) => p._id === player._id);

      if (existing === undefined && !newPlayer.joined) return false;

      return true;
    });

  try {
    if (exists) {
      res.status(200).json({
        status: "failed",
        message: "This player is already joined brothel",
      });
    } else {
      let setter = {};
      setter[`players.${pix}`] = {
        color: colors[pix],
        avatar: player.avatar,
        username: player.username,
        movesCounter: 0,
        joined: true,
        _id: player._id,
        active: false,
        cards: {
          drugs: 1,
          alcohol: 3,
          prostitute: 3,
          slaves: 1,
          weapon: 1,
          police: 0,
          roadBuilding: 0,
          monopoly: 0,
          resources: 0,
          victory: 0,
        },
        playedCards: {
          police: [],
          roadBuilding: [],
          monopoly: [],
          resources: [],
          victory: [],
        },
        mat: {
          roads: 15,
          settlment: 5,
          upgrade: 4,
        },
        longestRoad: [],
        set1: {
          status: false,
          object: {
            x: 0,
          },
        },
        set2: {
          status: false,
          object: {
            x: 0,
          },
        },
        road1: {
          status: false,
          object: {
            x: 0,
          },
        },
        road2: {
          status: false,
          object: {
            x: 0,
          },
        },
        revert: false,
        devCardPlayed: false,
        curDevCardPlayed: "",
      };

      const brothel = await Brothel.findByIdAndUpdate(
        brothelId,
        {
          $set: setter,
        },
        {new: true}
      );

      const brothels = await Brothel.find({});

      global.io.emit("brothels", brothels);
      global.io.emit("update state", brothel);

      res.status(200).json({
        status: "success",
        message: `Player ${player.username} joined`,
        brothel: brothel,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Failed to join brothel",
    });
  }
};

const exitBrothel = async (req, res) => {
  const {player, brothelId} = req.body;

  try {
    const brothel = await Brothel.findById(brothelId);

    const playerIndex = brothel.players.findIndex((p) => p._id === player._id);

    if (playerIndex !== -1) {
      brothel.players[playerIndex]._id = null;
      brothel.players[playerIndex].color = null;
      brothel.players[playerIndex].avatar = "avatar.jpg";
      brothel.players[playerIndex].username = "Waiting...";
      brothel.players[playerIndex].joined = false;

      brothel.markModified("players");

      await brothel.save();

      const brothels = await Brothel.find({});

      global.io.emit("brothels", brothels);
      global.io.emit("update state", brothel);

      res.status(200).json({
        status: "success",
        message: `Player ${player.username} exited`,
        brothel: brothel,
      });
    } else {
      res.status(400).json({
        message: "Player not found in the brothel",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Failed to exit brothel",
    });
  }
};

const createBrothel = async (req, res) => {
  let players = [];
  const {
    numberOfPlayers,
    brothelName,
    isPublic,
    _id,
    avatar,
    username,
    password,
    betAmount,
    isDemo,
  } = req.body;

  if (!numberOfPlayers && !name) {
    return res.status(400).send({
      message: "Fill all fields",
    });
  }

  for (let i = 0; i < numberOfPlayers; i++) {
    players.push({
      _id: i === 0 ? _id : null,
      color: i === 0 && "#500998",
      avatar: i === 0 ? avatar : "avatar.jpg",
      username: i === 0 ? username : "Waiting...",
      movesCounter: 0,
      joined: i === 0 ? true : false,
      active: i === 0 ? true : false,
      cards: {
        drugs: 0,
        alcohol: 10,
        prostitute: 10,
        slaves: 10,
        weapon: 0,
        police: 0,
        roadBuilding: 0,
        monopoly: 0,
        resources: 0,
        victory: 0,
      },
      playedCards: {
        police: [],
        roadBuilding: [],
        monopoly: [],
        resources: [],
        victory: [],
      },
      mat: {
        roads: 15,
        settlment: 5,
        upgrade: 4,
      },
      longestRoad: [],
      set1: {
        status: false,
        object: {
          x: 0,
        },
      },
      set2: {
        status: false,
        object: {
          x: 0,
        },
      },
      road1: {
        status: false,
        object: {
          x: 0,
        },
      },
      road2: {
        status: false,
        object: {
          x: 0,
        },
      },
      revert: false,
      devCardPlayed: false,
      curDevCardPlayed: "",
    });
  }

  try {
    const brothelRoom = await Brothel.create({
      brothelName: brothelName,
      players: players,
      numberOfPlayers: numberOfPlayers,
      brothelAdmin: _id,
      isPublic: isPublic,
      gameState: initGame(numberOfPlayers),
      password: password,
      betAmount: betAmount,
      isDemo: isDemo,
    });

    const fullBrothel = await Brothel.findOne({_id: brothelRoom._id})
      .populate("players", "-password")
      .populate("brothelAdmin", "-password");

    const brothels = await Brothel.find({});

    global.io.emit("brothels", brothels);

    res.status(200).json(fullBrothel);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const updateBrothel = async (req, res) => {
  const {brothel} = req.body;

  let players = brothel.players;
  let gameState = brothel.gameState;

  const updatedBrothel = await Brothel.findByIdAndUpdate(
    brothel._id,
    {
      gameState,
      players,
    },
    {new: true}
  );

  if (!updatedBrothel) {
    res.status(400).json({
      message: "Brothel not found",
    });
  } else {
    res.status(200).json(updatedBrothel);
  }
};

const renameBrothel = async (req, res) => {
  const {brothelId, brothelName} = req.body;

  const updatedBrothel = await Brothel.findByIdAndUpdate(
    brothelId,
    {brothelName},
    {new: true}
  )
    .populate("players", "-password")
    .populate("brothelAdmin", "-password");

  if (!updatedBrothel) {
    res.status(400).json({
      message: "Brothel not found",
    });
  } else {
    res.status(200).json(updatedBrothel);
  }
};

const removeBrothel = async (req, res) => {
  const {brothelId} = req.body;
  const broth = await Brothel.findOne({_id: brothelId});

  if (broth) {
    try {
      await Brothel.deleteOne({_id: brothelId});
      res.status(200).json({
        message: "Brothel removed successfully",
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  } else {
    res.status(404).json({
      message: "Brothel not found",
    });
  }
};

const removeFromBrothel = async (req, res) => {
  const {brothelId, playerId} = req.body;

  const removed = await Brothel.findByIdAndUpdate(
    brothelId,
    {$pull: {players: playerId}},
    {new: true}
  )
    .populate("players", "-password")
    .populate("brothelAdmin", "-password");

  if (!removed) {
    res.status(404).json({
      message: "Can't add player to the brothel",
    });
  } else {
    res.status(200).json(removed);
  }
};

module.exports = {
  createBrothel,
  renameBrothel,
  removeFromBrothel,
  getAllBrothel,
  joinBrothel,
  removeBrothel,
  updateBrothel,
  exitBrothel,
};
