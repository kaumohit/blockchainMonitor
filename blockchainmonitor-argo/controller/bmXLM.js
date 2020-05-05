require("dotenv").config();
var StellarSdk = require("stellar-sdk");
var server = new StellarSdk.Server(process.env.STELLARSERVER);
const Request = require("request");
const wallets = require("../models/wallets");

let API = process.env.API;

var es = server
  .payments()
  .cursor("now")
  .stream({
    onmessage: function(txn) {
      wallets.find({ "XLM.address": txn.to }, (error, searchResult) => {
        if (error) {
          throw error;
        }
        if (searchResult.length !== 0) {
          updateTransaction(txn, searchResult[0].userId);
        }
      });
    }
  });

function updateTransaction(txn, user_id) {
  let record = {
    txHash: txn.transaction_hash,
    from: txn.from,
    to: txn.to,
    value: txn.amount,
    coin: "XLM",
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
