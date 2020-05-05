require("dotenv").config();
const Request = require("request");
const wallets = require("../models/wallets");

let previousblock = 0;
function getnewBlock() {
  Request(
    {
      url: "https://jungle.eosio.cr/v1/chain/get_info",
      method: "POST",
      json: true
    },
    (error, data) => {
      if (error) {
        console.log(error);
      }
      try {
        if (data.body.last_irreversible_block_num != undefined) {
          let latestblock = data.body.last_irreversible_block_num;
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

setInterval(getnewBlock, 50);
function getTransactionHash(blockno) {
  Request(
    {
      url: `https://jungle.eosio.cr/v1/chain/get_block`,
      method: "POST",
      json: {
        block_num_or_id: String(blockno)
      }
    },
    (error, result, body) => {
      if (body != undefined) {
        tx = body.transactions;
        if (tx != undefined) {
          for (let i = 1; i < tx.length; i++) {
            if (tx[i].status == "executed") {
              console.log("*****************************");
              console.log(tx[i].trx.transaction);
              if (tx[i].trx.transaction != undefined) {
                for (let j = 0; j < tx[i].trx.transaction.actions.length; j++)
                  getTransactionDetail(
                    tx[i].trx.transaction.actions[j].data,
                    tx[i].trx.id
                  );
              }
            }
          }
        }
      } else {
        getTransactionHash(blockno);
      }
    }
  );
}

function getTransactionDetail(txdata, txHash) {
  console.log(txdata);
  try {
    if (txdata.quantity != undefined) data = txdata.quantity.split(" ");
    else data = txdata.stake_net_quantity.split(" ");
    txdata.quantity = Number(data[0]);
    coin = data[1];
    if (txdata != undefined) {
      wallets.findOne({ "NEO.address": txdata.to }, (error, searchResult) => {
        if (error) {
          throw error;
        } else if (searchResult != null) {
          updateTransaction(txdata, searchResult.userId, coin, txHash);
        }
      });
    }
  } catch (e) {
    //console.log("Not a payment transaction");
  }
}

function updateTransaction(txn, user_id, coin, txHash) {
  try {
    let record = {
      txHash: txHash,
      from: txn.from,
      to: txn.to,
      value: txn.quantity,
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
