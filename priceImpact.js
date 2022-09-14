const { utils } = require("ethers");
const Web3 = require("web3");
const web3 = new Web3("https://bsc-dataseed1.binance.org");
const poolAddress = '0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF'; // BNB-DOT

let ABI = [
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

async function priceImpact() {
    let contract = await new web3.eth.Contract(ABI, poolAddress);

    let reserves = await contract.methods.getReserves().call()

    console.log(reserves._reserve0);
    console.log(reserves._reserve1);

    let reserve_a_initial = parseFloat(utils.formatUnits(reserves._reserve0));
    let reserve_b_initial = parseFloat(utils.formatUnits(reserves._reserve1));
    console.log(`BNB in pool: ${reserve_a_initial}`);
    console.log(`DOT in pool: ${reserve_b_initial}`);

    const fee = 0.0025;
    let max_price_impact = 0.01;
    let amount_traded_cake = reserve_a_initial * max_price_impact / ((1 - max_price_impact) * (1 - fee));
    let amount_traded_usdt = reserve_b_initial * max_price_impact / ((1 - max_price_impact) * (1 - fee));
    console.log(`Given a max price impact of ${max_price_impact * 100}%, the max amount of BNB tradeable is ${amount_traded_cake}`);
    console.log(`Given a max price impact of ${max_price_impact * 100}%, the max amount of DOT tradeable is ${amount_traded_usdt}`);

    let amountInCAKE = amount_traded_cake * (1 - fee);
    let amountInUSDT = amount_traded_usdt * (1 - fee);
    let price_impact_trade_cake = amountInCAKE / (reserve_a_initial + amountInCAKE);
    let price_impact_trade_usdt = amountInUSDT / (reserve_b_initial + amountInUSDT);
    console.log(`Price impact when trading ${amount_traded_cake} BNB: ${price_impact_trade_cake * 100}%`);
    console.log(`Price impact when trading ${amount_traded_usdt} DOT: ${price_impact_trade_usdt * 100}%`);

}

priceImpact()
