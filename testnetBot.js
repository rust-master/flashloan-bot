const Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common');
const Web3 = require('web3');
var BigNumber = require("big-number");

const customChainParams = { name: 'tBNB', chainId: 97, networkId: 97 }
const common = Common.default.forCustomChain('ropsten', customChainParams, 'petersburg');

// const abi = require("./ABIs/oldtestnetABI.json")
const abi = require("./ABIs/newtestnetABI.json")
// var contractAddress = "0xEd12df38eeD065e6BAE7248A49F7EBE1ce45CE7c";
var newContract = "0x0a3B5A528B522bBfE6428B9745f5D3EeB5B67a68";

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const addressFrom = "0x931f3600a299fd9B24cEfB3BfF79388D19804BeA";
const privateKey = Buffer.from("0d6dcaaef49272a5411896be8ad16c01c35d6f8c18873387b71fbc734759b0ab", 'hex');

let contract = new web3.eth.Contract(abi, newContract, {
  from: addressFrom
});


let pancakeSwapAbi = [
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

let pancakeSwapContract =
  "0xd99d1c33f9fc3444f8101754abc46c52416550d1".toLowerCase();

let apeSwapContract =
  "0xcde540d7eafe93ac5fe6233bee57e1270d3e330f".toLowerCase();

// BakerySwap contract: 0xcde540d7eafe93ac5fe6233bee57e1270d3e330f
// Apeswap contract: 0x3380ae82e39e42ca34ebed69af67faa0683bb5c1

const diffPercentage = 0.03;
const loanAmount = BigNumber(1000000000000000000);

const checkIfProfitable = (expectedAmountOut) => {
  const preventUnderflow = 1_000_000;
  const isOpportunity = loanAmount
    .multiply((diffPercentage / 100 + 1) * preventUnderflow)
    .divide(preventUnderflow)
    .lt(expectedAmountOut);
  return isOpportunity;
};

async function calcPrice() {
  const BNBTokenAddress = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"; //BNB
  const USDTokenAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"; //BUSD
  let bnbToSell = web3.utils.toWei("1", "ether");
  let amountOutApe;
  let amountOutPancake;
  try {
    let routerPancake = await new web3.eth.Contract(
      pancakeSwapAbi,
      pancakeSwapContract
    );
    amountOutPancake = await routerPancake.methods
      .getAmountsOut(bnbToSell, [BNBTokenAddress, USDTokenAddress])
      .call();
    amountOutPancake = parseInt(amountOutPancake[1]);

    // APESWAP
    let routerApe = await new web3.eth.Contract(
      pancakeSwapAbi,
      apeSwapContract
    );
    amountOutApe = await routerApe.methods
      .getAmountsOut(bnbToSell, [BNBTokenAddress, USDTokenAddress])
      .call();
    amountOutApe = parseInt(amountOutApe[1]);

    if (amountOutPancake < amountOutApe) {
      if (checkIfProfitable(amountOutPancake) == true) {
        console.log("Pancake profitability");
        doTranscation(USDTokenAddress, BNBTokenAddress, loanAmount, pancakeSwapContract, apeSwapContract)
      } else {
        console.log("Pancake not profitable");
      }
    } else {
      if (checkIfProfitable(amountOutApe) == true) {
        console.log("Bakeryswap profitability");
        doTranscation(USDTokenAddress, BNBTokenAddress, loanAmount, apeSwapContract, pancakeSwapContract)
      } else {
        console.log("Bakeryswap not profitable");
      }
    }
  } catch (error) { }
  console.log("PancakeSwap:", amountOutPancake, "Bakeryswap:", amountOutApe);
}

calcPrice();



async function doTranscation(address1, address2, loanAmount, dex1, dex2) {
  try {
    var factoryAddress = "0x152349604d49c2Af10ADeE94b918b051104a143E"
    let data = contract.methods.FlashLoanWithArbitrage(address1, address2, loanAmount, dex1, dex2, address2, factoryAddress).encodeABI();

    web3.eth.getTransactionCount(addressFrom, (err, txCount) => {

      const txObject = {
        from: addressFrom,
        to: newContract,
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(10000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: data,
      }

      const tx = new Tx(txObject, { common });
      tx.sign(privateKey);

      const serealizeTransaction = tx.serialize();
      const raw = '0x' + serealizeTransaction.toString('hex');

      try {


        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
          if (err) {
            console.log(err)
          }
          else {
            console.log("txHash:", txHash);
          }
        });
      }
      catch (error) {
        console.log("Error", error);
      }
    });
  }
  catch (error) {
    console.log("Error", error);
  }

}
//contributed to this
