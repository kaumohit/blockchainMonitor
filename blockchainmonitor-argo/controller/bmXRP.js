require("dotenv").config();
const WebSocket = require("ws");
const wallets = require("../models/wallets");
const RippleAPI = require("ripple-lib").RippleAPI;
const Request = require("request");
let ws = new WebSocket(process.env.RIPPLEWEBSOCKET);
let API = process.env.API;

let establishConnection = () => {
  ws = new WebSocket(process.env.RIPPLEWEBSOCKET);
  ws.onopen = function(event) {
    ws.send(JSON.stringify({ id: 1, command: "ledger_current" }));
  };
  ws.onclose = function(event) {
    establishConnection();
  };
};

establishConnection();

const api = new RippleAPI({
  server: process.env.RIPPLEWEBSOCKET // Public rippled server hosted by Ripple, Inc.
});
api.on("error", (errorCode, errorMessage) => {
  console.log(errorCode + ": " + errorMessage);
});
api.on("Connected", () => {});
api.on("Disconnected", code => {
  api.connect();
});
api
  .connect()
  .then(() => {
    api.isConnected();
  })
  .catch(console.error);

const getAdrArray = () => {
  return new Promise((resolve, reject) => {
    wallets.find({}, async (err, accounts) => {
      if (err) reject(err);
      else {
        let accountEntries = [];
        for (entry of accounts) {
          //console.log(entry);
          if(entry.XRP.address!=null)
          accountEntries.push(entry.XRP.address);
        }
        //console.log(accountEntries);
        resolve(accountEntries);
      }
    });
  });
};

ws.onopen = async function(event) {
  let addresses;

  try {
    addresses = await getAdrArray();
  } catch (e) {
    console.log(`Exception thrown while fetching addresses from DB : ` + e);
  }
  //console.log(addresses);
  ws.send(
    JSON.stringify({
      id: 1,
      command: "subscribe",
      accounts: addresses,
      streams: ["ledger"]
    })
  );

  ws.onmessage = function(event) {
    let tx = JSON.parse(event.data);
    //console.log(tx);
    let res = tx["engine_result"];
    //console.log(res);
    if (res != undefined) {
      let txHash = tx["transaction"]["hash"];
      
      getTransactionDetails(txHash);
    }
  };
  ws.onclose = function(event) {
    establishConnection();
  };
};

setInterval(ws.onopen, 300000);

let getTransactionDetails = hash => {
  if (api.isConnected()) {
    return api.getTransaction(hash).then(transaction => {
      let outcome = transaction.outcome.result;
      if (outcome == "tesSUCCESS") {
        let currency = transaction.specification.source.maxAmount.currency;
        if (currency == "XRP") {
         // console.log(hash);
          let from = transaction.specification.source.address;
          let amount = transaction.specification.source.maxAmount.value;
          let to = transaction.specification.destination.address;
          wallets.find({ "XRP.address": to }, function(err, user) {
            if (err) {
              console.log(err);
            } else if (user.length != 0) {
              let record = {
                txHash: hash,
                from: from,
                to: to,
                value: amount,
                coin: "XRP",
                userId: user[0].userId,
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
          });
        }
      }
    });
  } else {
    api.connect();
  }
};
