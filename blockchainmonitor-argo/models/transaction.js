const mongoose = require("mongoose");

const STATUS = ["1", "0", "-1"];
const PROVIDER = ["SHAPE_SHIFT", "ARGO", "BM"];

var TxnSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  orderId: String,
  serviceProvider: {
    type: String,
    enum: PROVIDER
  },
  txnHash: String,
  from: String,
  to: String,
  value: Number,
  fee: Number,
  memo: String,
  coin: String,
  status: {
    type: String,
    enum: STATUS
  },
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model("Transaction", TxnSchema);
