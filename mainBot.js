var cron = require("node-cron");
const consts = require('./constants');
const { utils } = require("ethers");
const Web3 = require('web3');
const web3 = new Web3("https://bsc-dataseed1.binance.org");
const nullAddress = "0x0000000000000000000000000000000000000000";

async function getPrice(dex1, dex2, factory1, factory2, pair, amount) {
  const pairGet1 = await getPair(factory1.address, pair.address1, pair.address2)
  const pairGet2 = await getPair(factory2.address, pair.address1, pair.address2)


  if (nullAddress == pairGet1 && nullAddress == pairGet2) {
    console.log(`${pair.symbol1} - ${pair.symbol2} no pair exists at ${factory1.lp}\n`, `${pair.symbol1} -  ${pair.symbol2} no pair exists at ${factory2.lp}\n`)
  }
  else if (nullAddress == pairGet1) {
    console.log(`${pair.symbol1} - ${pair.symbol2} no pair exists at ${factory1.lp}`);
  }
  else if (nullAddress == pairGet2) {
    console.log(`${pair.symbol1} - ${pair.symbol2} no pair exists at ${factory2.lp}\n`)
  }
  else {
    console.log("Coin 1: ", pair.symbol1);
    console.log("Coin 2: ", pair.symbol2);
    console.log("Loan Amount: ", amount);

    console.log("\n-----Pair Exists Liquidity Pool Addresses----")
    console.log(`${pair.symbol1} - ${pair.symbol2} exists on ${factory1.lp} liquidity pool (${pairGet1})`);
    console.log(`${pair.symbol1} - ${pair.symbol2} exists on ${factory2.lp} liquidity pool (${pairGet2})\n`);

    const priceImpact1 = await getPriceImpact(pair, pairGet1, factory1.lp)
    const priceImpact2 = await getPriceImpact(pair, pairGet2, factory2.lp)

    const coinAddress1 = pair.address1;
    const coinAddress2 = pair.address2;

    console.log("\n-----Price at DEX----")

    let coin1ToSell = web3.utils.toWei(`${amount}`, "ether");
    let amountOutDex1;
    let amountOutDex2;

    try {
      let routerDex1 = await new web3.eth.Contract(
        consts.RouterABI,
        dex1.address
      );

      amountOutDex1 = await routerDex1.methods
        .getAmountsOut(coin1ToSell, [coinAddress1, coinAddress2])
        .call();

      // amountOutDex1 = parseInt(amountOutDex1[1]);
      amountOutDex1 = web3.utils.fromWei(amountOutDex1[1]);


      let routerApe = await new web3.eth.Contract(
        consts.RouterABI,
        dex2.address
      );

      amountOutDex2 = await routerApe.methods
        .getAmountsOut(coin1ToSell, [coinAddress1, coinAddress2])
        .call();

      // amountOutDex2 = parseInt(amountOutDex2[1]);
      amountOutDex2 = web3.utils.fromWei(amountOutDex2[1]);

      console.log(`${dex1.dex} - ${amount} ${pair.symbol1} Price: `, amountOutDex1, ` ${pair.symbol2}`, `\n${dex2.dex} - ${amount} ${pair.symbol1} Price: `, amountOutDex2, ` ${pair.symbol2}\n`);
    }
    catch (error) {
      console.log("error: ", error);
    }
  }


}

async function getPair(factoryAddress, pairAddress1, pairAddress2) {
  let contract = await new web3.eth.Contract(consts.FactoryABI, factoryAddress);

  let pair = await contract.methods
    .getPair(pairAddress1, pairAddress2)
    .call();
  return pair;
}

async function getPriceImpact(pair, poolAddress, lp) {
  console.log(`\n----Price Impact at ${lp}----`);
  console.log(`${lp} pool address: `, poolAddress);
  let contract = await new web3.eth.Contract(consts.PoolABI, poolAddress);
  let reserves = await contract.methods.getReserves().call()

  let reserve_a_initial = parseFloat(utils.formatUnits(reserves._reserve0));
  let reserve_b_initial = parseFloat(utils.formatUnits(reserves._reserve1));
  console.log(`${pair.symbol1} in pool: ${reserve_a_initial}`);
  console.log(`${pair.symbol2} in pool: ${reserve_b_initial}`);

  const fee = 0.0025;
  let max_price_impact = 0.01;
  let amount_traded_coin1 = reserve_a_initial * max_price_impact / ((1 - max_price_impact) * (1 - fee));
  let amount_traded_coin2 = reserve_b_initial * max_price_impact / ((1 - max_price_impact) * (1 - fee));
  console.log(`Given a max price impact of ${max_price_impact * 100}%, the max amount of ${pair.symbol1} tradeable is ${amount_traded_coin1}`);
  console.log(`Given a max price impact of ${max_price_impact * 100}%, the max amount of ${pair.symbol2} tradeable is ${amount_traded_coin2}`);

  let amountInCOIN1 = amount_traded_coin1 * (1 - fee);
  let amountInCOIN2 = amount_traded_coin2 * (1 - fee);
  let price_impact_trade_coin1 = amountInCOIN1 / (reserve_a_initial + amountInCOIN1);
  let price_impact_trade_coin2 = amountInCOIN2 / (reserve_b_initial + amountInCOIN2);
  console.log(`Price impact when trading ${amount_traded_coin1} ${pair.symbol1}: ${price_impact_trade_coin1 * 100}%`);
  console.log(`Price impact when trading ${amount_traded_coin2} ${pair.symbol2}: ${price_impact_trade_coin2 * 100}%`);
}

// getPrice(consts.routers.pancake, consts.routers.apeswap, consts.bnb_dot, 1)

getPrice(consts.routers.pancake, consts.routers.biswap, consts.factory.pancake, consts.factory.biswap, consts.bnb_dot, 1)

// getPrice(consts.routers.pancake, consts.routers.apeswap, consts.bnb_ankr, 1)

// getPrice(consts.routers.pancake, consts.routers.apeswap, consts.bnb_link, 1)

// getPrice(consts.routers.pancake, consts.routers.biswap, consts.bnb_link, 1)

// getPrice(consts.routers.pancake, consts.routers.apeswap, consts.bnb_atom, 1)
// getPrice(consts.routers.pancake, consts.routers.biswap, consts.bnb_atom, 1)

// getPrice(consts.routers.pancake, consts.routers.apeswap, consts.factory.pancake, consts.factory.apeswap, consts.bnb_avax, 1)


// getPrice(consts.routers.pancake, consts.routers.biswap, consts.factory.pancake, consts.factory.biswap, consts.bnb_avax, 1)


// cron.schedule("*/0.5 * * * * *", () => {
//   getPrice(consts.routers.pancake, consts.routers.biswap, consts.factory.pancake, consts.factory.biswap, consts.bnb_avax, 1)
// });

// getPrice(consts.routers.pancake, consts.routers.mdex, consts.bnb_usdt, 1)

// getPrice(consts.routers.pancake, consts.routers.mdex, consts.factory.pancake, consts.factory.mdex, consts.dot_usdt, 1)








// -- DEXs Router Address --
// Pancake: 0x10ED43C718714eb63d5aA57B78B54704E256024E
// ApeSwap: 0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7
// Biswap: 0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8
// BakerySwap Router: 0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F
// Mdex Router: 0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8

// -- DEXs Factory Address --
// PancakeFactory address: 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73
// Apeswap Factory Address: 0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6
// Biswap Factory Address: 0x858E3312ed3A876947EA49d572A7C42DE08af7EE
// BakerySwapFactory: 0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7
// Mdex factory: 0x3cd1c46068daea5ebb0d3f55f6915b10648062b8 


// -- Token Address --
// BNB: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
// BUSB: 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56

// on the pancake and apeswap
// ANKR: 0xf307910A4c7bbc79691fD374889b36d8531B08e3

// on the pancake and apeswap and biswap
// LINK: 0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD

// on the Pancake and Biswap
// ATOM: 0x0Eb3a705fc54725037CC9e008bDede697f62F335

// on the pancake, apeswap, biswap and bakeryswap
// DOT: 0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402

// on the pancake, apeswap and biswap
// AVAX: 0x1CE0c2827e2eF14D5C4f29a091d735A204794041