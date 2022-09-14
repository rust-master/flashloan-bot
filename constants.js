let RouterABI = [
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let FactoryABI = [
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "getPair",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

let PoolABI = [
  {
      "constant": true,
      "inputs": [],
      "name": "getReserves",
      "outputs": [
          { "internalType": "uint112", "name": "_reserve0", "type": "uint112" },
          { "internalType": "uint112", "name": "_reserve1", "type": "uint112" },
          {
              "internalType": "uint32",
              "name": "_blockTimestampLast",
              "type": "uint32"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
]

// Pairs
// BNB - DOT : Pancake, ApeSwap, Biswap
// BNB - ANKR: Pancake, ApeSwap
// BNB - LINK: Pancake, ApeSwap, Biswap
// BNB - ATOM: Pancake, Biswap
// BNB - AVAX: Pancake, ApeSwap, Biswap

const bnb_dot = {
  address1: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  symbol1: "BNB",
  address2: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
  symbol2: "DOT"
}

const bnb_ankr = {
  address1: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  symbol1: "BNB",
  address2: "0xf307910A4c7bbc79691fD374889b36d8531B08e3",
  symbol2: "ANKR"
}

const bnb_link = {
  address1: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  symbol1: "BNB",
  address2: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
  symbol2: "LINK"
}

const bnb_atom = {
  address1: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  symbol1: "BNB",
  address2: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
  symbol2: "ATOM"
}

const bnb_avax = {
  address1: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  symbol1: "BNB",
  address2: "0x1CE0c2827e2eF14D5C4f29a091d735A204794041",
  symbol2: "AVAX"
}

const bnb_usdt = {
  address1: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  symbol1: "BNB",
  address2: "0x55d398326f99059fF775485246999027B3197955",
  symbol2: "USDT"
}

// file tokens
const dot_usdt = {
  address1: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
  symbol1: "DOT",
  address2: "0x55d398326f99059fF775485246999027B3197955",
  symbol2: "USDT"
}

// -- DEXs Router Address --
// Pancake: 0x10ED43C718714eb63d5aA57B78B54704E256024E
// ApeSwap: 0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7
// Biswap: 0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8
// BakerySwap Router: 0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F

const routers = {
  pancake: {
    address: "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase(),
    dex: "pancake"
  },
  apeswap: {
    address: "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7".toLowerCase(),
    dex: "apeswap"
  },
  biswap: {
    address: "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8".toLowerCase(),
    dex: "biswap"
  },
  bakeryswap: {
    address: "0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F".toLowerCase(),
    dex: "bakery"
  },
  mdex: {
    address: "0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8".toLowerCase(),
    dex: "mdex"
  }
}

const factory = {
  pancake: {
    address: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73".toLowerCase(),
    lp: "pancake"
  },
  apeswap: {
    address: "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6".toLowerCase(),
    lp: "apeswap"
  },
  biswap: {
    address: "0x858E3312ed3A876947EA49d572A7C42DE08af7EE".toLowerCase(),
    lp: "biswap"
  },
  bakeryswap: {
    address: "0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7".toLowerCase(),
    lp: "bakery"
  },
  mdex: {
    address: "0x3cd1c46068daea5ebb0d3f55f6915b10648062b8".toLowerCase(),
    lp: "mdex"
  }
}

module.exports = {
  bnb_dot,
  bnb_ankr,
  bnb_link,
  bnb_atom,
  bnb_avax,
  bnb_usdt,
  dot_usdt,
  routers,
  RouterABI,
  factory,
  FactoryABI,
  PoolABI
}