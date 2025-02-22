const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const auth = require("./routes/auth");
const account = require("./routes/account");
const transactions = require("./routes/transactions");
const verify = require("./routes/verify");
const players = require("./routes/players");
const chat = require("./routes/chat");
const message = require("./routes/message");
const refresh = require("./routes/refresh");
const brothel = require("./routes/brothel");
const gamestatistics = require("./routes/gamestatistics");
const {notFound, errorHandler} = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const verifyJWT = require("./middleware/verifyJWT");
const Brothel = require("./models/Brothel");
const {initGame, rollDice, makeMove} = require("./controllers/gameController");
const {
  addBrothel,
  getActiveBrothels,
  findPlayerById,
} = require("./utils/manageRoomConnections");
const {
  findAndSwitchPlayer,
  findAndActiveSettlment,
  findAndUpgradeSettlment,
  findAndActiveRoad,
  exchangeResourceWithPlayers,
  exchangeResourceWithBank,
  exchangeResourceCounterOffer,
  getResourceCards,
  synchronizeBrothel,
  buyDevCard,
} = require("./utils/brothelHelper");

connectDB();
const app = express();
dotenv.config();

const PORT = process.env.DEV_PORT || 3001;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", auth);
app.use("/refresh", refresh);
app.use("/verify", verify);

app.use(verifyJWT);

app.use("/account", account);
app.use("/players", players);
app.use("/chat", chat);
app.use("/message", message);
app.use("/brothel", brothel);
app.use("/gamestatistics", gamestatistics);
app.use("/account", account);
app.use("/transactions", transactions);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, console.log("Server running on port 3001"));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

global.io = io;
let roomIntervals = {};
let broadcasterSocketId;
let watcherSocketId;

io.on("connection", (socket) => {
  console.log("con to socket.io: ", socket.client.id);

  socket.on("setup", (player) => {
    socket.join(player._id);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("Player joined room", room);
  });

  socket.on("join brothel", (brothel, playerId) => {
    socket.join(brothel._id);

    addBrothel(brothel._id, playerId, socket.id);
    io.in(brothel._id).emit("brothel connection", brothel);
  });

  socket.on("brothels", (brothels) => {
    socket.broadcast.emit("new brothels received", brothels);
  });

  socket.on("check if player in the game", async (playerId) => {
    let brothelId = findPlayerById(playerId, socket.id);

    if (brothelId !== null) {
      let brothel = await Brothel.findById(brothelId);

      socket.join(brothelId);

      if (brothel) {
        socket.emit("player found in game", brothel);
      }
    }
  });

  socket.on("new message", (newMsgRecieved) => {
    let chat = newMsgRecieved.chat;

    if (!chat.players) return console.log("chat.players not defined");

    chat.players.forEach((player) => {
      if (player._id == newMsgRecieved.sender._id) return;
      socket.to(player._id).emit("recieved", newMsgRecieved);
    });
  });

  socket.on("send emoji", (data) => {
    const {player, brothel, saveImg} = data;
    io.in(brothel._id).emit("display emoji", data);
  });

  socket.on("switch active player", (brothel, revert) => {
    let players = findAndSwitchPlayer(brothel.players, revert);

    brothel.players = players;

    synchronizeBrothel(brothel);
    io.in(brothel._id).emit("update brothel", brothel);
  });

  socket.on("player move road", (data) => {
    const {roadIndex, slotIndex, playerId, brothel} = data;
    let broth = findAndActiveRoad(roadIndex, slotIndex, playerId, brothel);

    synchronizeBrothel(broth);
    io.in(broth._id).emit("update brothel", broth, slotIndex);
  });

  socket.on("player set settlment", (data) => {
    const {slotIndex, setIndex, playerId, brothel} = data;
    let broth = findAndActiveSettlment(slotIndex, setIndex, playerId, brothel);

    synchronizeBrothel(broth);
    io.in(broth._id).emit("update brothel", broth, slotIndex);
  });

  //Here starts not finished sockets

  socket.on("buy dev card", (brothel, playerId) => {
    let broth = buyDevCard(brothel, playerId);
    synchronizeBrothel(broth);

    io.in(brothel._id).emit("bought dev card", broth);
  });

  socket.on("move knight", (brothel, num) => {
    let players = brothel.players.filter((p) => {
      p.devCardPlayed = false;
      p.curDevCardPlayed = "";

      return p;
    });

    brothel.players = players;

    synchronizeBrothel(brothel);
    io.in(brothel._id).emit("moved knight", brothel, num);
  });

  socket.on("block slot", (brothel, number, slotIndex) => {
    synchronizeBrothel(brothel);
    io.in(brothel._id).emit("moved knight", brothel);
  });

  socket.on("start game", (data) => {
    // socket.on('change card', data => {
    //     console.log('hello')
    //     recalculateCards(data);
    // });

    //setTimer(0, 2000, data.brothel._id);

    let broth = data.brothel;
    broth.brothelAdmin = data.admin;

    let players = broth.players.filter((p) => {
      p.initSettlment1 = {};
      p.initSettlment2 = {};
      return p;
    });

    broth.players = players;
    synchronizeBrothel(broth);

    io.in(broth._id).emit("brothel connection", broth);
  });

  socket.on("dice numbers", (data) => {
    data.brothel.gameState.diceNumber1 = data.diceNumber1;
    data.brothel.gameState.diceNumber2 = data.diceNumber2;
    synchronizeBrothel(data.brothel);

    io.to(data.brothel._id).emit("set dice numbers", data.brothel);
  });

  socket.on("activate dev card", (brothel, cardName, playerId, cardIndex) => {
    let players = brothel?.players?.filter((p) => {
      if (p._id === playerId) {
        let playedCards = p.playedCards;

        if (playedCards[cardName][cardIndex]) {
          p.playedCards[cardName][cardIndex] = "played";
          p.devCardPlayed = true;
          p.curDevCardPlayed = cardName;
        }
      }

      return p;
    });

    brothel.players = players;
    synchronizeBrothel(brothel);

    io.to(brothel._id).emit("dev card activated", brothel);
  });

  socket.on("roll dice", (brothel, rolled) => {
    brothel.gameState.dice = rolled;

    if (rolled === "timer") {
      let updatedResources = getResourceCards(brothel);
      brothel = updatedResources;
    }

    if (rolled === "static") {
      let players = findAndSwitchPlayer(brothel.players, false);

      brothel.gameState.diceNumber1 = 0;
      brothel.gameState.diceNumber2 = 0;

      players.filter((p) => {
        let playedCards = p.playedCards;

        // p.devCardPlayed = false;
        // p.curDevCardPlayed = '';

        for (let key of Object.keys(playedCards)) {
          if (p.playedCards[key].length > 0) {
            for (let i = 0; i < playedCards[key].length; i++) {
              if (playedCards[key][i] !== "played") {
                p.playedCards[key][i] = true;
              }
            }
          }
        }

        return p;
      });

      brothel.players = players;

      //clearInterval(roomIntervals[brothel._id]);
      //setTimer(0, 2000, brothel);
    }

    synchronizeBrothel(brothel);
    io.to(brothel._id).emit("dice rolled", brothel);
  });

  socket.on("player upgrade settlment", (data) => {
    const {slotIndex, setIndex, playerId, brothel} = data;
    let broth = findAndUpgradeSettlment(slotIndex, setIndex, playerId, brothel);
    let roadsCount = 0;

    broth.gameState.roads.filter((slot) => {
      slot.filter((road) => {
        if (road.active) roadsCount++;
        return;
      });
      return;
    });

    if (roadsCount > 5) {
      let newPlayers = broth?.players?.filter((p) => {
        if (p._id === playerId) {
          if (p.cards["prostitute"] > 2 && p.cards["alcohol"] > 1) {
            p.cards["prostitute"] = p.cards["prostitute"] - 3;
            p.cards["alcohol"] = p.cards["alcohol"] - 2;
            broth.gameState.cards["prostitute"] =
              broth.gameState.cards["prostitute"] + 3;
            broth.gameState.cards["alcohol"] =
              broth.gameState.cards["alcohol"] + 2;
          }
        }
        return p;
      });
      broth.players = newPlayers;
    }

    synchronizeBrothel(broth);
    io.in(brothel._id).emit("player upgraded settlment", broth);
  });

  socket.on("join watcher", (brothel) => {
    socket.join(brothel._id);
    watcherSocketId = socket.id;

    synchronizeBrothel(brothel);
    io.in(watcherSocketId).emit("watcher connected to room", brothel);
  });

  socket.on("trade resource to bank", (data) => {
    const {brothel, tradeToBank, detectSender, bankResources} = data;
    const updatedCards = exchangeResourceWithBank(
      tradeToBank.iGive,
      tradeToBank.iWant,
      detectSender[0].cards,
      bankResources
    );

    brothel.players.filter((p) => {
      if (p._id === detectSender[0]._id) {
        p.cards = updatedCards.senderOwnResource;
      }
      return p;
    });

    brothel.gameState.cards = updatedCards.resoursesInBank;
    synchronizeBrothel(brothel);

    io.in(brothel._id).emit("update resources in bank and for player", brothel);
  });

  socket.on("trade resource to others", (data) => {
    const {brothel, tradeToOthers, detectSender, player} = data;
    broadcasterSocketId = socket.id;
    socket.join(brothel._id);

    synchronizeBrothel(brothel);
    socket.broadcast.to(brothel._id).emit("offered resources to others", data);
  });

  socket.on("counteroffer", (data) => {
    synchronizeBrothel(data.brothel);
    io.to(broadcasterSocketId).emit("recived counter offer", data);
  });

  socket.on("response from client", (data) => {
    synchronizeBrothel(data.brothel);
    io.to(broadcasterSocketId).emit("sender received responses", data);
  });

  socket.on("final confirmation", (data) => {
    const {brothel, tradeToOthers, detectSender, player} = data;
    let updatedCards = exchangeResourceWithPlayers(
      tradeToOthers.iGive,
      tradeToOthers.iWant,
      detectSender[0].cards,
      player.cards
    );
    brothel.players.filter((p) => {
      if (p._id === detectSender[0]._id) {
        p.cards = updatedCards.senderOwnResource;
      }
    });
    brothel.players.filter((p) => {
      if (p._id === player._id) {
        p.cards = updatedCards.clientOwnResource;
      }
    });
    synchronizeBrothel(brothel);

    io.in(brothel._id).emit("update player cards", brothel);
  });

  socket.on("final confirmation counter offer", (data) => {
    const {brothel, tradeToOthers, detectSender, player} = data;
    let updatedCards = exchangeResourceCounterOffer(
      tradeToOthers.iGive,
      tradeToOthers.iWant,
      detectSender[0].cards,
      player.cards
    );
    brothel.players.filter((p) => {
      if (p._id === detectSender[0]._id) {
        p.cards = updatedCards.senderOwnResource;
      }
    });
    brothel.players.filter((p) => {
      if (p._id === player._id) {
        p.cards = updatedCards.clientOwnResource;
      }
    });
    synchronizeBrothel(brothel);

    io.in(brothel._id).emit("update player cards", brothel);
  });

  socket.on("clear offer", (data) => {
    synchronizeBrothel(data.brothel);
    socket.broadcast.emit("offer is clered", data);
  });

  socket.on("reset timer", (brothelId) => {
    if (brothelId) {
      clearInterval(roomIntervals[brothelId]);
      delete roomIntervals[brothelId];
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    // const updatedBrothel = removePlayerFromBrothel(socket.id);
    // socket.broadcast.emit("recconect", updatedBrothel);
    // if (updatedBrothel) {
    //   io.in(updatedBrothel._id).emit("player disconnected", updatedBrothel);
    // }
    // setTimer(0, 2000, brothels, 15);
  });

  socket.on("logout", (data) => {
    const {brothel, playerId} = data;

    const updatedPlayers = brothel.players.map((p) => {
      if (p._id === playerId) p.joined = false;
      return p;
    });

    brothel.players = updatedPlayers;

    io.in(brothel._id).emit("player disconnected", {
      brothel,
      playerId,
    });

    socket.broadcast.to(brothel._id).emit("player disconnected", {
      brothel,
      playerId,
    });
  });
});

const setTimer = (time, duration, brothelId) => {
  roomIntervals[brothelId] = setInterval(() => {
    time += 1;

    io.in(brothelId).emit("timer", time);

    if (time === 20) {
      clearInterval(roomIntervals[brothelId]);
      setTimer(0, 2000, brothelId);
    }
  }, duration);
};
