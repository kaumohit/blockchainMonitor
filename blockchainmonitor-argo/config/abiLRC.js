const abi = [
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "approve",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "bonusPercentages",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "DECIMALS",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "BLOCKS_PER_PHASE",
    outputs: [{ name: "", type: "uint16" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "MAX_UNSOLD_RATIO",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "HARD_CAP",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "BASE_RATE",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "close",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "saleStarted",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "issueIndex",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "recipient", type: "address" }],
    name: "issueToken",
    outputs: [],
    payable: true,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_firstblock", type: "uint256" }],
    name: "start",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "hardCapReached",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "saleEnded",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "unsoldTokenIssued",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "price",
    outputs: [{ name: "tokens", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "GOAL",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "NAME",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalEthReceived",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "saleDue",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "target",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "NUM_OF_PHASE",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "firstblock",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "SYMBOL",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    type: "function"
  },
  {
    inputs: [{ name: "_target", type: "address" }],
    payable: false,
    type: "constructor"
  },
  { payable: true, type: "fallback" },
  { anonymous: false, inputs: [], name: "SaleStarted", type: "event" },
  { anonymous: false, inputs: [], name: "SaleEnded", type: "event" },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "caller", type: "address" }],
    name: "InvalidCaller",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "msg", type: "bytes" }],
    name: "InvalidState",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "issueIndex", type: "uint256" },
      { indexed: false, name: "addr", type: "address" },
      { indexed: false, name: "ethAmount", type: "uint256" },
      { indexed: false, name: "tokenAmount", type: "uint256" }
    ],
    name: "Issue",
    type: "event"
  },
  { anonymous: false, inputs: [], name: "SaleSucceeded", type: "event" },
  { anonymous: false, inputs: [], name: "SaleFailed", type: "event" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  }
];

module.exports = abi;