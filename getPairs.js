let ABI = [
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

const Web3 = require("web3");
const web3 = new Web3("https://bsc-dataseed1.binance.org");
const consts = require("./constants");

// const pancakeFactoryAddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
// const apeAddress = "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6";
const biswapAddress = "0x858E3312ed3A876947EA49d572A7C42DE08af7EE";
// const bakeryAddress = "0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7";x


async function getPair() {
  let contract = await new web3.eth.Contract(ABI, biswapAddress);

  let pair = await contract.methods
    .getPair(consts.bnb_ankr.address1, consts.bnb_ankr.address2)
    .call();
  
  console.log("Pair: ", pair)
}

getPair()