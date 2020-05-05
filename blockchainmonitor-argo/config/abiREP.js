const contractabi = [
  {
    constant: false,

    inputs: [
      {
        name: "_spender",

        type: "address"
      },

      {
        name: "_value",

        type: "uint256"
      }
    ],

    name: "approve",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    constant: true,

    inputs: [],

    name: "totalSupply",

    outputs: [
      {
        name: "",

        type: "uint256"
      }
    ],

    payable: false,

    stateMutability: "view",

    type: "function"
  },

  {
    constant: true,

    inputs: [],

    name: "getTotalTheoreticalSupply",

    outputs: [
      {
        name: "",

        type: "uint256"
      }
    ],

    payable: false,

    stateMutability: "view",

    type: "function"
  },

  {
    constant: false,

    inputs: [
      {
        name: "_from",

        type: "address"
      },

      {
        name: "_to",

        type: "address"
      },

      {
        name: "_value",

        type: "uint256"
      }
    ],

    name: "transferFrom",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    constant: false,

    inputs: [
      {
        name: "_destination",

        type: "address"
      },

      {
        name: "_attotokens",

        type: "uint256"
      }
    ],

    name: "migrateOut",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    constant: true,

    inputs: [
      {
        name: "_who",

        type: "address"
      }
    ],

    name: "balanceOf",

    outputs: [
      {
        name: "",

        type: "uint256"
      }
    ],

    payable: false,

    stateMutability: "view",

    type: "function"
  },

  {
    constant: true,

    inputs: [],

    name: "getUniverse",

    outputs: [
      {
        name: "",

        type: "address"
      }
    ],

    payable: false,

    stateMutability: "view",

    type: "function"
  },

  {
    constant: false,

    inputs: [
      {
        name: "_source",

        type: "address"
      },

      {
        name: "_destination",

        type: "address"
      },

      {
        name: "_attotokens",

        type: "uint256"
      }
    ],

    name: "trustedFeeWindowTransfer",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    constant: true,

    inputs: [],

    name: "getTotalMigrated",

    outputs: [
      {
        name: "",

        type: "uint256"
      }
    ],

    payable: false,

    stateMutability: "view",

    type: "function"
  },

  {
    constant: false,

    inputs: [
      {
        name: "_reporter",

        type: "address"
      },

      {
        name: "_attotokens",

        type: "uint256"
      }
    ],

    name: "migrateIn",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    constant: false,

    inputs: [
      {
        name: "_to",

        type: "address"
      },

      {
        name: "_value",

        type: "uint256"
      }
    ],

    name: "transfer",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    constant: false,

    inputs: [
      {
        name: "_source",

        type: "address"
      },

      {
        name: "_destination",

        type: "address"
      },

      {
        name: "_attotokens",

        type: "uint256"
      }
    ],

    name: "trustedReportingParticipantTransfer",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    constant: false,

    inputs: [
      {
        name: "_universe",

        type: "address"
      }
    ],

    name: "initialize",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    constant: false,

    inputs: [
      {
        name: "_amountMigrated",

        type: "uint256"
      }
    ],

    name: "mintForReportingParticipant",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    constant: true,

    inputs: [],

    name: "getTypeName",

    outputs: [
      {
        name: "",

        type: "bytes32"
      }
    ],

    payable: false,

    stateMutability: "view",

    type: "function"
  },

  {
    constant: true,

    inputs: [
      {
        name: "_owner",

        type: "address"
      },

      {
        name: "_spender",

        type: "address"
      }
    ],

    name: "allowance",

    outputs: [
      {
        name: "",

        type: "uint256"
      }
    ],

    payable: false,

    stateMutability: "view",

    type: "function"
  },

  {
    constant: false,

    inputs: [
      {
        name: "_source",

        type: "address"
      },

      {
        name: "_destination",

        type: "address"
      },

      {
        name: "_attotokens",

        type: "uint256"
      }
    ],

    name: "trustedMarketTransfer",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    constant: false,

    inputs: [
      {
        name: "_source",

        type: "address"
      },

      {
        name: "_destination",

        type: "address"
      },

      {
        name: "_attotokens",

        type: "uint256"
      }
    ],

    name: "trustedUniverseTransfer",

    outputs: [
      {
        name: "",

        type: "bool"
      }
    ],

    payable: false,

    stateMutability: "nonpayable",

    type: "function"
  },

  {
    anonymous: false,

    inputs: [
      {
        indexed: true,

        name: "owner",

        type: "address"
      },

      {
        indexed: true,

        name: "spender",

        type: "address"
      },

      {
        indexed: false,

        name: "value",

        type: "uint256"
      }
    ],

    name: "Approval",

    type: "event"
  },

  {
    anonymous: false,

    inputs: [
      {
        indexed: true,

        name: "from",

        type: "address"
      },

      {
        indexed: true,

        name: "to",

        type: "address"
      },

      {
        indexed: false,

        name: "value",

        type: "uint256"
      }
    ],

    name: "Transfer",

    type: "event"
  }
];

module.exports = contractabi;