require("dotenv").config();
let Socket = require("blockchain.info/Socket");
require("events").EventEmitter.prototype._maxListeners = process.env.LISTENERS;
let wallet = require("../models/wallets");
let request = require("request");
let cron = require("node-cron");
let apiURL = process.env.API;
let testnetwork = process.env.testNetwork;
let Transactions = require("../models/transaction");
let mySocket;

let establishConnection = () => {
  if (testnetwork == true) mySocket = new Socket({ network: 3 });
  else mySocket = new Socket();
};

establishConnection();

mySocket.onOpen(() => {
  console.log("Connected to Blockchain.info!");
});

mySocket.onClose(() => {
  console.log("Connection to Blockchain.info closed.");
  establishConnection();
});

let addressesArray = [];
let addressesObject = {};

/** For Testing */
// let addressesArray = ['2Mvj6DMe9RB6WFKbZkxf1fcEXn9LqessTAC'];
// addressesObject['2Mvj6DMe9RB6WFKbZkxf1fcEXn9LqessTAC'] = 'kgjhjmhkjhkjh'
// addAddr = () => {
//   addressesArray.push('2Mvj6DMe9RB6WFKbZkxf1fcEXn9LqessTAC');
//   addressesObject['2Mvj6DMe9RB6WFKbZkxf1fcEXn9LqessTAC'] = 'kgjhjmhkjhkjh'
// }

//Object for storing data
Data = function(hash, from, to, amount, id) {
  this.txHash = hash;
  this.from = from;
  this.to = to;
  this.value = amount;
  this.coin = "BTC";
  this.userId = id;
  this.status = 0;
};

let getAddresses = () => {
  return new Promise((resolve, reject) => {
    let query = wallet.find({}).select("BTC userId");
    query.exec((err, res) => {
      if (err) {
        console.log("Error occured while executing query", query);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

//Cron will run every 5 minutes and fetch addresses from DB
cron.schedule("*/5 * * * *", function() {
  addressesArray = [];
  getAddresses()
    .then(res => {
      for (let i = 0; i <= res.length - 1; i++) {
        let addr = res[i].BTC.address;
        let id = res[i].userId;
        if (addr !== null) {
          addressesObject[addr] = id;
          addressesArray.push(addr);
        }
      }
    })
    .then(() => {
      console.log(addressesArray);
      listenForTx();
    });
});

//Runs at initial start
getAddresses()
  .then(res => {
    for (let i = 0; i <= res.length - 1; i++) {
      let addr = res[i].BTC.address;
      let id = res[i].userId;
      if (addr !== null) {
        addressesObject[addr] = id;
        addressesArray.push(addr);
      }
    }
  })
  .then(() => {
    listenForTx();
  });

//Will catch all the transactions of all addresses
let listenForTx = () => {
  mySocket.onTransaction(
    res => {
      let hash = res.hash;
      let from;
      let to;
      let amount;
      let id;
      let IAr = [];

      //input
      from = res.inputs[0].prev_out.addr;

      for (let j = 0; j < res.inputs.length; j++) {
        let input = res.inputs[j];
        IAr.push(input.prev_out.addr);
      }

      //output
      for (let i = 0; i < res.out.length; i++) {
        let ouput = res.out[i];
        let OA = ouput.addr;
        if (IAr.indexOf(OA) === -1 && addressesObject[OA]) {
          to = OA;
          amount = ouput.value / 10 ** 8;
          id = addressesObject[to];
        }
      }
      let txData = new Data(hash, from, to, amount, id);
     
          if (txData.from != null &&
            txData.from != undefined &&
            txData.to != null &&
            txData.to != undefined &&
            txData.userId != null &&
            txData.userId != undefined
          ) {
            request(
              {
                url: apiURL,
                method: "POST",
                json: true,
                body: txData
              },
              (error, response, body) => {});
            }
    },
    { addresses: addressesArray }
  );
};