require("dotenv").config();
const Request = require("request");
const wallets = require("../models/wallets");

let previousblock = 0;
function getnewBlock() {
  Request(
    {
      url: "https://neoscan-testnet.io/api/test_net/v1/get_height",
      method: "GET",
      json: true
    },
    (error, data) => {
      if (error) {
        console.log(error);
      }
      try {
        if (data.body.height != undefined) {
          let latestblock = data.body.height;
          if (latestblock > previousblock) {
            getTransactionHash(latestblock);
            console.log({ previousblock, latestblock });
            console.log("*************************");
            previousblock = latestblock;
          }
        }
      } catch (err) {
        //console.log(err);
      }
    }
  );
}

setInterval(getnewBlock, 5000);
function getTransactionHash(blockno) {
  Request(
    {
      url: `https://neoscan-testnet.io/api/test_net/v1/get_block/${blockno}`,
      method: "GET",
      json: true
    },
    (error, result, body) => {
      if (body != undefined) {
        tx = body.transactions;
        for (let i = 1; i < tx.length; i++) {
          console.log("Transaction Hash ", tx[i]);
          getTransactionDetail(tx[i]);
        }
      } else {
        getTransactionHash(blockno);
      }
    }
  );
}

function getTransactionDetail(txHash) {
  Request(
    {
      url: `https://neoscan-testnet.io/api/test_net/v1/get_transaction/${txHash}`,
      method: "GET",
      json: true
    },
    (error, result, body) => {
      if (body != undefined) {
        output = body.vouts;
        for (let i = 0; i < output.length; i++) {
          if (output[i].asset == "NEO" || output[i].asset == "neo") {
            wallets.findOne(
              { "NEO.address": output[i].address_hash },
              (error, searchResult) => {
                if (error) {
                  throw error;
                } else if (searchResult != null) {
                  updateTransaction(body, output[i], searchResult.userId,"NEO");
                }
              }
            );
          }
          else if (output[i].asset == "GAS" || output[i].asset == "gas") {
            wallets.findOne(
              { "GAS.address": output[i].address_hash },
              (error, searchResult) => {
                if (error) {
                  throw error;
                } else if (searchResult != null) {
                  updateTransaction(body, output[i], searchResult.userId,"GAS");
                }
              }
            );
          }
        }
      } else {
        getTransactionDetail(txHash);
      }
    }
  );
}

function updateTransaction(txn, output, user_id,coin) {
  try {
    let record = {
      txHash: txn.txid,
      from: txn.vin[0].address_hash,
      to: output.address_hash,
      value: Number(output.value),
      coin: coin,
      userId: user_id,
      status: 1
    };
    console.log(record);
    console.log("*************************");
    if (
      record.from != null &&
      record.from != undefined &&
      record.to != null &&
      record.to != undefined &&
      record.userId != null &&
      record.userId != undefined &&
      record.from != record.to
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
  } catch (error) {
    //console.log("**************");
  }
}
