require("dotenv").config();
const Request = require("request");
const WebSocket = require("ws");
const wallets = require("../models/wallets");

let LTCSOCKETLINK = process.env.LTCSOCKETLINK;
let API = process.env.API;
let ws;

function establishConnection() {
  ws = new WebSocket(LTCSOCKETLINK);
  ws.onopen = event => {
    ws.send(JSON.stringify({ event: "confirmed-tx" }));
  };

  ws.onmessage = event => {
    var trans = JSON.parse(event.data);
    for (txin of trans.outputs) {
      if (txin.addresses != undefined && txin.addresses != null) {
        wallets.find(
          { "LTC.address": txin.addresses },
          (error, searchResult) => {
            if (error) {
              throw error;
            }
            if (searchResult.length !== 0) {
              for (entry of searchResult) {
                if (
                  entry.LTC.address !=
                  Object.values(trans.inputs[0].addresses)[0]
                ) {
                  updateTransaction(trans, entry.userId, entry.LTC.address);
                }
              }
            }
          }
        );
      }
    }
  };
  ws.onclose = event => {
    establishConnection();
  };
}

establishConnection();

function updateTransaction(txn, user_id, toadd) {
  let record = {
    txHash: txn.hash,
    from: Object.values(txn.inputs[0].addresses)[0],
    to: toadd,
    value: Number(txn.outputs[0].value / Math.pow(10, 8)),
    coin: "LTC",
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
