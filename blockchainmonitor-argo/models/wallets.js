require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
var WalletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  ETH: {
    address: {
      type: String,
      default: null
    },
    utcFile: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  BTC: {
    address: {
      type: String,
      default: null
    },
    privateKey: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  QTUM: {
    address: {
      type: String,
      default: null
    },
    privateKey: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  LTC: {
    address: {
      type: String,
      default: null
    },
    privateKey: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  BCH: {
    address: {
      type: String,
      default: null
    },
    privateKey: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  XRP: {
    address: {
      type: String,
      default: null
    },
    privateKey: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  XLM: {
    address: {
      type: String,
      default: null
    },
    privateKey: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  EOS: {
    address: {
      type: String,
      default: null
    },
    privateKey: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  NEO: {
    address: {
      type: String,
      default: null
    },
    privateKey: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  TRON: {
    address: {
      type: String,
      default: null
    },
    privateKey: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: false
    }
  }
});

//let LINK = process.env.REMOTEMONGOLINK;
let LINK = 'mongodb://kartikn:kartikn@35.164.215.91:2727/argowallet'
mongoose.connect(
  LINK,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB connected successfully");
    }
  }
);

module.exports = mongoose.model("wallets", WalletSchema);
