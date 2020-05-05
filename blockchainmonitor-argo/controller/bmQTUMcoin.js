require("dotenv").config();
const Request = require("request");
const wallets = require("../models/wallets");
//let TPI = process.env.API;
let TPI = 'https://uatapi.argoworld.io/v1/crypto/BM/bmCryptoTxn';
// let base = "https://qtum.org/insight-api/"

// if(process.env.QTUM_NETWORK == 'testnet'){
   base = "https://testnet.qtum.org/insight-api/";
//}

(async () => {
  let previousBlock = 0;
  function getnewBlock() {

    let API = base+"status?q=getLastBlockHash";

    Request.get(API, function(error, response, body) {
      if (!error) {
        try {
          //console.log(body)
          body = JSON.parse(body)
          let blockHash = body.lastblockhash;
          console.log(blockHash)
          if (previousBlock != blockHash) {
            getTransactions(blockHash);
            previousBlock = blockHash;
          }
        } catch (error) {
          console.log(error)
          console.log("No new block");
        }
      }else{
       // console.log("a");
      }
    });
  }

  setInterval(getnewBlock, 10000);

  function getTransactions(blockHash) {
    let API = base+"txs/?block="+blockHash;
    Request.get(API, function(error, response, body) {
      if (!error) {
        body = JSON.parse(body);
        for (let i = 0; i < body.txs.length; i++) {
          let txn = {
            txHash: body.txs[i].txid,
            from: body.txs[i].vin[0].addr,
            to: [],
            value: []
          };
          for (let j = 0; j < body.txs[i].vout.length; j++) {
            try {
              let addr = body.txs[i].vout[j].scriptPubKey.addresses[0];
              if (addr != txn.from){ txn.to.push(addr);
              txn.value.push(Number(body.txs[i].vout[j].value));
              }
            } catch (error) {
              //console.log("Malformed transaction");
            }
          }
          checkDB(txn);
        }
      }
    });
  }

  function checkDB(txn) {
    //console.log(txn);
    for (tx of txn.to) {
      wallets.findOne(
        { "QTUM.address": tx },
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
      coin: "QTUM",
      userId: userId,
      status: 1
    };
    console.log(record);
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