const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

router.post("/", transactionsController.checkLatestTransactions);
router.get("/get-rates", transactionsController.getRates);
router.post("/send-transaction", transactionsController.sendTransaction);

module.exports = router;
