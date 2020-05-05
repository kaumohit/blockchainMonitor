require("dotenv").config();
const Request = require("request");
const wallets = require("../models/wallets");
const TronWeb = require("tronweb");

const HttpProvider = TronWeb.providers.HttpProvider; // This provider is optional, you can just use a url for the nodes instead
const fullNode = new HttpProvider("https://api.shasta.trongrid.io"); // Full node http endpoint
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io"); // Solidity node http endpoint
const eventServer = "https://api.shasta.trongrid.io/"; // Contract events http endpoint

const privateKey =
  "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0";

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

let previousblock = 0;
async function getnewBlock() {
  let block = await tronWeb.trx.getCurrentBlock();
  let blockHeader = block.block_header;
  let latestblock = block.block_header.raw_data.number;
  if (blockHeader != undefined) {
    if (latestblock > previousblock) {
      parseTransactions(block.transactions);
      console.log({ previousblock, latestblock });
      console.log("*************************");
      previousblock = latestblock;
    }
  }
}

setInterval(getnewBlock, 1000);

function parseTransactions(transactions) {
  for (tx of transactions) {
    let data = tx.raw_data.contract[0].parameter.value;
    let type = tx.raw_data.contract[0].type;
    console.log(type);
    if (type == "TransferContract") {
      let record = {
        txHash: tx.txID,
        from: data.owner_address,
        to: data.to_address,
        value: data.amount / 10 ** 6,
        coin: "TRX",
        userId: "user_id",
        status: 1
      };
      if (
        record.from != null &&
        record.from != undefined &&
        record.to != null &&
        record.to != undefined &&
        record.userId != null &&
        record.userId != undefined &&
        record.from != record.to
      ) {
        wallets.findOne({ "TRON.address": record.to }, (error, searchResult) => {
          if (error) {
            throw error;
          } else if (searchResult != null) {
            console.log(record)
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
        });
      }
    }
  }
}
