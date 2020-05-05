require("dotenv").config();
const Request = require("request");
const wallets = require("../models/wallets");

let BCHBLOCKAPI = process.env.BCHBLOCKAPI;
let API = process.env.API;
let BCHINTERVALTIME = process.env.BCHINTERVALTIME;
let previousblock = 0;

function getnewBlock() {
  Request(
    {
      url: BCHBLOCKAPI,
      json: true
    },
    (error, response, result) => {
      if (typeof result == "object") {
        if (error) {
          console.log(error);
        } else {
          if (result.data.height > previousblock) {
            getTransactions(result.data.height);
            previousblock = result.data.height;
          }
        }
      } else {
        getnewBlock();
      }
    }
  );
}

setInterval(getnewBlock, BCHINTERVALTIME);

function getTransactions(blockno, time) {
  Request(
    {
      url: `https://bch-chain.api.btc.com/v3/block/${blockno}/tx`,
      json: true
    },
    (error, response, result) => {
      if (error) {
        console.log(error);
      } else if (typeof result == "object") {
        for (let tx of result.data.list) {
          for (add of tx.outputs) {
            if (add.addresses[0] != null && add.addresses[0] != undefined) {
              wallets.find(
                { "BCH.address": add.addresses[0] },
                (error, searchResult) => {
                  if (error) {
                    throw error;
                  }
                  if (searchResult.length !== 0) {
                    for (entry of searchResult) {
                      if (
                        entry.BCH.address !=
                        Object.values(tx.inputs[0].addresses)[0]
                      ) {
                        updateTransaction(tx, entry.userId, entry.BCH.address);
                      }
                    }
                  }
                }
              );
            }
          }
        }
      } else {
        getTransactions(blockno, time);
      }
    }
  );
}

function updateTransaction(txn, user_id, toadd) {
  let record = {
    txHash: txn.hash,
    from: Object.values(txn.inputs[0].addresses)[0],
    to: toadd,
    value: Number(txn.outputs[0].value / Math.pow(10, 8)),
    coin: "BCH",
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
