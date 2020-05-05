require("dotenv").config();
const Web3 = require("web3");
const Request = require("request");
const wallets = require("../models/wallets");
const abi = require("../config/abiSALT");

let SALTCONTRACTADDRESS = process.env.SALTCONTRACTADDRESS;
let HTTPINFURALINK = process.env.HTTPINFURALINK;
let API = process.env.API;
let ETHINTERVALTIME = process.env.ETHINTERVALTIME;

let provider = new Web3.providers.HttpProvider(HTTPINFURALINK);
let web3 = new Web3(provider);

const contract = new web3.eth.Contract(abi, SALTCONTRACTADDRESS, error => {
  console.log(error);
});

let previousRecord;
(async () => {
  let fromBlock = 6710000;
  function getnewBlock() {
    web3.eth.getBlockNumber(async (error, toBlock) => {
      if (!error) {
        if (toBlock > fromBlock) {
          console.log(toBlock)
          await getPastEvents(fromBlock, toBlock);
          fromBlock = toBlock;
        } else {
          //console.log("toBlock less than fromBlock");
        }
      } else {
        console.log("getBlock Number", error);
      }
    });
  }

  setInterval(getnewBlock, ETHINTERVALTIME);

  function getPastEvents(fromBlock, toBlock) {
    contract.getPastEvents(
      "Transfer",
      {
        fromBlock: fromBlock,
        toBlock: toBlock
      },
      function(error, events) {
        if (!error) {
          console.log(events);
          if (events != undefined || events != null) {
            if (events.length > 0) {
              events.forEach(async event => {
                wallets.findOne(
                  { "ETH.address": event.returnValues._to },
                  async (error, searchResult) => {
                    if (error) {
                      console.log("wallet error :", error);
                    } else if (searchResult == null) {
                      console.log("Wallet not found");
                    } else {
                      await updateTransaction(event, searchResult.userId);
                    }
                  }
                );
              });
            } else {
              console.log("No Events");
            }
          } else {
            console.log("Events undefined or null", events);
          }
        } else {
          console.log("Error :", error);
        }
      }
    );
  }

  function updateTransaction(event, userId) {
    web3.eth.getTransactionReceipt(event.transactionHash, function(
      err,
      result
    ) {
      if (err || result == null) {
        console.log("Error receipt :", err);
      } else {
        let record = {
          txHash: event.transactionHash,
          from: event.returnValues._from,
          to: event.returnValues._to,
          value: Number(event.returnValues._value / Math.pow(10, 8)).toFixed(8),
          coin: "SALT",
          userId: userId,
          status: result.status ? 1 : -1
        };
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
            API,
            {
              json: record
            },
            function(error, response, body) {
              console.log(error);
            }
          );
        } else {
          console.log("Record null :", record);
        }
      }
    });
  }
})();
