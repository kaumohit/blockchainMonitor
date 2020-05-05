require("dotenv").config();
const Web3 = require("web3");
const Request = require("request");
const wallets = require("../models/wallets");

let HTTPINFURALINK = process.env.HTTPINFURALINK;
let API = process.env.API;
let ETHINTERVALTIME = process.env.ETHINTERVALTIME;
let previousblock = 0;

let provider = new Web3.providers.HttpProvider(HTTPINFURALINK);
let web3 = new Web3(provider);

function getnewBlock() {
  web3.eth.getBlockNumber((error, latestblock) => {
    if (!error) {
      if (latestblock > previousblock) {
        getTransactionHash(latestblock);
        previousblock = latestblock;
      }
    }
  });
}

setInterval(getnewBlock, ETHINTERVALTIME);
function getTransactionHash(blockno) {
  web3.eth.getBlock(blockno, (error, block) => {
    if (block != null) {
      for (let tx of block.transactions) {
        getTransactionDetail(tx);
      }
    } else {
      getTransactionHash(blockno);
    }
  });
}

function getTransactionDetail(tx, time) {
  web3.eth.getTransaction(tx, (error, txn) => {
    let found = 0;
    if (txn != null) {
      if (txn.to != null) {
        wallets.find({ "ETH.address": txn.to }, (error, searchResult) => {
          if (error) {
            throw error;
          }
          if (searchResult.length !== 0) {
            found = 1;
            updateTransaction(txn, searchResult[0].userId);
          }
        });
      }
    } else {
      getTransactionDetail(tx);
    }
  });
}
function updateTransaction(txn, user_id) {
  let record = {
    txHash: txn.hash,
    from: txn.from,
    to: txn.to,
    value: Number(txn.value / Math.pow(10, 18)),
    coin: "ETH",
    userId: user_id,
    status: 1
  };
  if (
    record.from != null &&
    record.from != undefined &&
    record.to != null &&
    record.to != undefined &&
    record.userId != null &&
    record.userId != undefined
  ) {
    Request.post(
      API,
      {
        json: record
      },
      function(error, response, body) {
        console.log(error);
      }
    );
  }
}
