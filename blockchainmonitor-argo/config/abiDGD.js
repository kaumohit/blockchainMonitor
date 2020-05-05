const abi = [
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_owner", type: "address" }],
    name: "setOwner",
    outputs: [{ name: "success", type: "bool" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
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
    outputs: [{ name: "success", type: "bool" }],
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "a", type: "uint256" }, { name: "b", type: "uint256" }],
    name: "subtractSafely",
    outputs: [{ name: "", type: "uint256" }],
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_amount", type: "uint256" }
    ],
    name: "mint",
    outputs: [{ name: "success", type: "bool" }],
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "a", type: "uint256" }, { name: "b", type: "uint256" }],
    name: "safeToAdd",
    outputs: [{ name: "", type: "bool" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "a", type: "uint256" }, { name: "b", type: "uint256" }],
    name: "addSafely",
    outputs: [{ name: "result", type: "uint256" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "locked",
    outputs: [{ name: "", type: "bool" }],
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
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "a", type: "uint256" }, { name: "b", type: "uint256" }],
    name: "safeToSubtract",
    outputs: [{ name: "", type: "bool" }],
    type: "function"
  },
  { inputs: [], type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_from", type: "address" },
      { indexed: true, name: "_to", type: "address" },
      { indexed: false, name: "_value", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_recipient", type: "address" },
      { indexed: true, name: "_amount", type: "uint256" }
    ],
    name: "Mint",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_owner", type: "address" },
      { indexed: true, name: "_spender", type: "address" },
      { indexed: false, name: "_value", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  }
];

module.exports = abi;