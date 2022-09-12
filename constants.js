let ABI = [
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
  }
} 

module.exports = {
  bnb_dot,
  bnb_ankr,
  bnb_link,
  bnb_atom,
  bnb_avax,
  routers,
  ABI
}