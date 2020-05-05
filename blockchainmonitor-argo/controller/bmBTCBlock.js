require("dotenv").config();
const Request = require("request");
const wallets = require("../models/wallets");
let TPI = process.env.API;

let base = "https://chain.so/api/v2/";
network = "BTC";

if (process.env.BTC_NETWORK == 'testnet') {
  network = "BTCTEST";
}

(async () => {
  let previousBlock = 0;
  function getnewBlock() {
    let API = base + "get_info/" + network;
    Request.get(API, function(error, response, body) {
      if (!error) {
        try {
          body = JSON.parse(body);
          let blockHeight = body.data.blocks;
         // console.log(blockHeight);
          if (previousBlock < blockHeight) {
            getTransactions(blockHeight);
          //  console.log({ previousBlock, blockHeight });
            previousBlock = blockHeight;
          }
        } catch (error) {
          console.log("No new block");
        }
      } else {
        console.log("waiting for new block");
      }
    });
  }

  setInterval(getnewBlock, 10000);

  function getTransactions(blockHeight) {
    let API = base + "/block/" + network + "/" + blockHeight;
    Request.get(API, function(error, response, body) {
      if (!error) {
        body = JSON.parse(body);
        let txs = body.data.txs;
        for (let i = 1; i < txs.length; i++) {
          let txn = {
            txHash: txs[0].txid,
            from: txs[0].inputs[0].address,
            to: [],
            value: []
          };
          for (let j = 0; j < txs[i].outputs.length; j++) {
            txn.to.push(txs[i].outputs[j].address);
            txn.value.push(Number(txs[i].outputs[j].value));
          }
          checkDB(txn);
        }
      } else {
        console.log(error);
      }
    });
  }

  function checkDB(txn) {
    for (tx of txn.to) {
        wallets.findOne(
          { "BTC.address": tx },
          async (error, searchResult) => {
            //console.log(searchResult);
            if (error) {
              console.log("wallet error :", error);
            } else if (searchResult == null) {
              //console.log("Wallet not found");
            } else {
             // console.log("got it", txn);
              updateTransaction(txn, tx, searchResult.userId);
            }
          }
        );
      }
  }

  function updateTransaction(txn, tx, userId) {
    let i=0;
    for(let j=0;j<txn.to.length;j++){
      if(txn.to[j]==tx){
        i==j
      }
    }
    let record = {
      txHash: txn.txHash,
      from: txn.from,
      to: txn.to[i],
      value: txn.value[i],
      coin: "BTC",
      userId: userId,
      status: 1
    };
    console.log(record);
    console.log("*******************");
    if (
      record.from != null &&
      record.from != undefined &&
      record.to != null &&
      record.to != undefined &&
      record.userId != null &&
      record.userId != undefined &&
      record.value != null
    ) {
      Request.post(
        TPI,
        {
          json: record
        },
        function(error, response, body) {
          console.log(body);
        }
      );
    }
  }
})();

