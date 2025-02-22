const Rates = require("../models/Rates");
const Player = require('../models/Player');
const Transactions = require("../models/Transactions");
const rpcURL = "https://bsc-dataseed.binance.org/";
const axios = require("axios");

async function checkLatestTransactions(req, res) {
  const address = "0xE72C1054C1900FC6c266feC9bedc178e72793A35";
  let startBlock = 0;
  let url = "https://api-testnet.bscscan.com/";
  //   let url = "https://api.bscscan.com/";

  let apiUrl = `${url}api?module=account&action=txlist&startblock=${startBlock}&address=${address}&to=${address}&sort=desc&page=1&offset=1&apikey=${process.env.BSC_API_KEY};
`;
  let apiAxios = await axios.get(apiUrl);
  res.status(200).json(123123);
}

const getRates = async (req, res) => {
  const rates = await Rates.find({});
  return res.status(200).json(rates);
};

const sendTransaction = async (req, res) => {
  let { receipt, amount, playerId } = req.body;

  try {
    const trans = await Transactions.create({
      receipt,
      playerId,
      amount,
      status: "approved"
    });

    if (trans) {
      let player = await Player.findByIdAndUpdate(playerId, {
        $inc: { balance: amount }
      }, { new: true });

      res.status(200).json({ 
        message: "Transaction approved",
        balance: player.balance
      });
    }
  } catch (err) {
    res.status(400).json({ "message": err.message });
  }
};

module.exports = { 
  checkLatestTransactions,
  sendTransaction,
  getRates
};
