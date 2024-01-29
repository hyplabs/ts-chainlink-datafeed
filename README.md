# ⭐️ ts-chainlink-datafeed ⭐️

This TypeScript project provides a ChainLink datafeed library that can be used to retrieve data from any EVM chain on http://data.chain.link.

## 📋 Features

- Get the latest price of any asset featured on [Chainlink](https://data.chain.link/).
- Redundant RPC support so that you never miss a price update.
- No reliance on 3rd party APIs like CoinGecko or CoinMarketCap.
- Supports Ethereum, Polygon, Arbitrum, Xdai, Harmony, Moonriver, Celo, Bsc, Optimism, Avalanche, Fantom, Base, Moonbeam, Metis, Scroll and [more](./src/dataFeeds).

## 🛠️ Setup

```bash
# Yarn
yarn add ts-chainlink-datafeed
# NPM
npm install ts-chainlink-datafeed
```

## 🛜 RPCs

You can get multiple RPCs for each chain from [Chainlist](https://chainlist.org/). If you create a fallback provider, you can have a redundant list of RPCs incase one fails or is slow to respond. The [example](./example/) has some code to help with this. You can use both http and websocket RPCs.

## 📦 Supported Chains - Extracting a feed

You can get a single feed by importing the chain feed constant that you need and selecting the feed you want. For example, if you want the ETH / USD feed on Polygon, you would do the following:

```typescript

import { polygonDataFeeds } from "ts-chainlink-datafeed";

const EthUSD = polygonDataFeeds["ETH / USD"];

```

## 🥇 Get the current data for a single feed

This is most useful for getting the very latest price of a feed.

```typescript

const RPCUrl = "wss://-------";

const callClient = createPublicClient({
  transport: webSocket(RPCUrl),
  chain: mainnet,
  batch: {
    multicall: true,
  },
});

const EthUSD = polygonDataFeeds["ETH / USD"];

const ethUsdDataFeed = new ChainLinkDataFeed({
  chain: polygon,
  contractAddress: EthUSD,
  viemClient: publicClient,
});

// We need to run this method to set the decimals and description
await ethUsdDataFeed.updateMetadata();

console.log(
  "Price of ETH / USD :",
  await ethUsdDataFeed.getLatestRoundData(true)
);
/**
* {
*  roundId: 36893488147426144869n,
*  answer: '2379.44',
*  time: 2024-01-10T13:08:43.000Z,
*  description: 'ETH / USD'
* }  
*/
```

More detailed examples can be found in the [example folder](./example).

## 🔑 Subscribing to one of more price feed updates

If you need to continually have the very latest price of a feed, you can subscribe to updates. This will give you the latest price whenever there is an update onchain. Different blockchains have different onchain update criteria. The cheaper chains update more frequently.

```typescript
const RPCUrl = "wss://-------" | "https://-----";

const callClient = createPublicClient({
  transport: webSocket(RPCUrl),
  chain: mainnet,
  batch: {
    multicall: true,
  },
});

subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(ethereumDataFeeds),
  publicClient: callClient,
  onLogsFunction: (arrayOfLogs) =>
    arrayOfLogs.forEach((log) => {
      console.log(`Asset: ${log.description}`); // ETH / USD - The description of the data feed
      console.log(`Decimals: ${log.decimals}`); // The number of decimals the answer uses
      console.log(`🔘 Round ID: ${log.roundId}`); // The roundId of the answer
      console.log(`📈 Answer: ${log.current}`); // The price of the asset without decimals
      console.log(`⏰ Time: ${log.updatedAt}`); // The time the answer was last updated
    }),
});
```
More detailed examples can be found in the [example folder](./example).

## 🧵 Custom Chains

If you are using a chain that does not have a chain configuration in Viem, you can easily create your own. See [this example for Scroll](./example/scroll.ts).

## 🤖 Chainlink Contract Address Scaper

By running the `updateAllFeeds` command in the `package.json`, you can update all of the datafeed helper constants automatically. This function will load up a Chrome browser in headless mode and scrape all of the contract addresses for every single listed feed on the official Chainlink website.

## 📋 TODO

- [ ] Add support for retrieving the price on a certain day
- [ ] Add support for retrieving the price at a certain block
- [ ] Add support for retrieving the price at a certain time range
- [ ] Create hooks for React, Signals etc.


## 🧑‍⚖️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Included Chainlink Feeds

### Ethereum Mainnet

- 1INCH / ETH
- 1INCH / USD
- AAVE / ETH
- AAVE / USD
- ADA / USD
- ALCX / ETH
- AMPL / ETH
- AMPL / USD
- ANKR / USD
- APE / ETH
- APE / USD
- ARB / USD
- AUD / USD
- AVAX / USD
- Azuki Floor Price / ETH
- BADGER / ETH
- BAL / ETH
- BAL / USD
- BAT / ETH
- BEANZ Official Floor Price
- BNB / USD
- Bored Ape Yacht Club Floor Price / ETH
- BTC / ETH
- BTC / USD
- C3M / EUR
- CacheGold PoR USD
- CAD / USD
- CAKE / USD
- Calculated XSUSHI / ETH
- CBETH / ETH
- CHF / USD
- CloneX Floor Price
- CNY / USD
- COMP / ETH
- COMP / USD
- Consumer Price Index
- CoolCats Floor Price
- CRV / ETH
- CRV / USD
- CRVUSD / USD
- Cryptoadz Floor Price
- CryptoPunks Floor Price / ETH
- CSPX / USD
- CVX / ETH
- CVX / USD
- DAI / ETH
- DAI / USD
- DOGE / USD
- Doodles Floor Price
- DOT / USD
- DPI / ETH
- DPI / USD
- eFIL PoR
- ENJ / ETH
- ENS / USD
- ETH / BTC
- ETH / USD
- EUR / USD
- EURR Reserves
- FDUSD / USD
- FIL / ETH
- FRAX / ETH
- FRAX / USD
- FTM / ETH
- FTT / ETH
- FXS / USD
- GBP / USD
- GBPT PoR
- GHO / USD
- GRT / ETH
- GRT / USD
- GUSD / USD
- HBAR / USD
- HBTC PoR
- HIGH / USD
- HOPE PoR
- IB01 / USD
- IBTA / USD
- IMX / USD
- JPY / USD
- KNC / ETH
- KNC / USD
- KRW / USD
- LDO / ETH
- LINK / ETH
- LINK / USD
- LTC / USD
- LUSD / USD
- MANA / ETH
- MATIC / USD
- MAYC Floor Price
- MIM / USD
- MKR / ETH
- MKR / USD
- MLN / ETH
- Moonbirds Floor Price
- Nexus wETH Reserves
- NZD / USD
- OHMv2 / ETH
- Otherdeed for Otherside Floor Price
- PAX / ETH
- PAXG / ETH
- PERP / ETH
- Pudgy Penguins Floor Price
- PYUSD / USD
- RAI / ETH
- RAI / USD
- RDNT / USD
- REN / ETH
- RETH / ETH
- RPL / USD
- RSR / USD
- SAND / USD
- SGD / USD
- SHIB / ETH
- SHV / USD
- SNX / ETH
- SNX / USD
- SOL / USD
- SPELL / USD
- STBT PoR
- STETH / ETH
- STETH / USD
- STG / USD
- SUSD / ETH
- SUSHI / ETH
- SUSHI / USD
- SXP / USD
- Total Marketcap / USD
- TRIBE / ETH
- TRY / USD
- TUSD / ETH
- TUSD / USD
- TUSD Reserves
- UNI / ETH
- UNI / USD
- USDC / ETH
- USDC / USD
- USDD / USD
- USDP / USD
- USDT / ETH
- USDT / USD
- VeeFriends Floor Price
- WBTC / BTC
- WBTC PoR
- WING / USD
- World of Women Floor Price
- XAG / USD
- XAU / USD
- XCN / USD
- YFI / ETH
- YFI / USD
- ZRX / ETH
- ZRX / USD


### Arbitrum Mainnet

- 1INCH / USD
- AAPL / USD
- AAVE / USD
- ADA / USD
- AMZN / USD
- APE / USD
- ARB / USD
- ATOM / USD
- AUD / USD
- AVAX / USD
- AXS / USD
- BAL / USD
- BNB / USD
- Bored Ape Yacht Club Floor Price / ETH
- BRL / USD
- BTC / ETH
- BTC / USD
- BTC-USD Total Marketcap
- CAD / USD
- CAKE / USD
- CBETH / ETH
- cbETH-ETH Exchange Rate
- CHF / USD
- CNY / USD
- COMP / USD
- CRV / USD
- CVX / USD
- DAI / USD
- DODO / USD
- DOGE / USD
- DOT / USD
- DPX / USD
- ETH / USD
- ETH-USD Total Marketcap
- EUR / USD
- EURC / USD
- FRAX / USD
- frxETH-ETH Exchange Rate High
- frxETH-ETH Exchange Rate Low
- FTM / USD
- FXS / USD
- GBP / USD
- gmARB / USD
- gmBTC / USD
- gmETH / USD
- GMX / USD
- GNS / USD
- GOOGL / USD
- IOTX / USD
- JOE / USD
- JPY / USD
- KNC / USD
- KRW / USD
- LDO / USD
- LINK / ETH
- LINK / USD
- LUSD / USD
- MAGIC / USD
- MATIC / USD
- META / USD
- MIM / USD
- MIMATIC / USD
- MKR / USD
- MSFT / USD
- NEAR / USD
- NFT Blue Chip Total Market Cap-USD
- OHM Index
- OHMv2 / USD
- OP / USD
- PAXG / USD
- PENDLE / USD
- PEPE / USD
- PHP / USD
- RDNT / USD
- RETH / ETH
- rETH-ETH Exchange Rate
- RPL / USD
- SEK / USD
- sFRAX / FRAX Exchange Rate
- sfrxETH-frxETH Exchange Rate
- SGD / USD
- SNX / USD
- SOL / USD
- SPELL / USD
- SPY / USD
- StaFi Staked ETH rETH-ETH Exchange Rate
- STETH / ETH
- STETH / USD
- STG / USD
- SUSHI / USD
- swETH / ETH Exchange Rate
- Total Marketcap USD
- TRY / USD
- TSLA / USD
- TUSD / USD
- UNI / USD
- USDC / USD
- USDD / USD
- USDT / USD
- WBTC / BTC
- WBTC / USD
- WOO / USD
- WSTETH / ETH
- wstETH-stETH Exchange Rate
- WTI / USD
- XAG / USD
- XAU / USD
- XRP / USD
- YFI / USD


### BNB Chain Mainnet

- 1INCH / USD
- AAPL / USD
- AAVE / USD
- ADA / BNB
- ADA / USD
- ALPACA / USD
- ALPHA / BNB
- AMZN / USD
- ATOM / USD
- AUD / USD
- AUTO / USD
- AVAX / USD
- AXS / USD
- BAC / USD
- BAND / BNB
- BAND / USD
- BCH / BNB
- BCH / USD
- BETH / USD
- BNB / USD
- BRL / USD
- BSW / USD
- BTC / BNB
- BTC / ETH
- BTC / USD
- C98 / USD
- CAKE / BNB
- CAKE / USD
- Calculated BNBx / USD
- Calculated SAVAX / USD
- CFX / USD
- CHF / USD
- CHR / USD
- COIN / USD
- COMP / USD
- CRV / USD
- DAI / BNB
- DAI / USD
- DF / USD
- DODO / USD
- DOGE / USD
- DOT / BNB
- DOT / USD
- EOS / BNB
- EOS / USD
- ETH / BNB
- ETH / USD
- EUR / USD
- FB / USD
- FDUSD / USD
- FET / USD
- FIL / USD
- FRAX / USD
- FTM / USD
- FXS / USD
- GBP / USD
- GME / USD
- GMT / USD
- GOOGL / USD
- HIGH / USD
- ICP / USD
- INJ / USD
- INR / USD
- JPM / USD
- JPY / USD
- KAVA / USD
- KLAY / USD
- KNC / USD
- LINA / USD
- LINK / BNB
- LINK / USD
- LIT / USD
- LTC / BNB
- LTC / USD
- MASK / USD
- MATIC / USD
- MIM / USD
- MRNA / USD
- MS / USD
- MSFT / USD
- MXN / USD
- NEAR / USD
- NFLX / USD
- NULS / USD
- NVDA / USD
- ONG / USD
- ONT / USD
- PAXG / USD
- PFE / USD
- PHP / USD
- QQQ / USD
- RDNT / USD
- REEF / USD
- SGD / USD
- SHIB / USD
- SOL / USD
- SPCE / USD
- SPELL / USD
- SPY / USD
- SUSHI / USD
- SXP / USD
- TRX / USD
- TSLA / USD
- TSM / USD
- TUSD / USD
- TWT / BNB
- UNI / BNB
- UNI / USD
- USDC / BNB
- USDC / USD
- USDD / USD
- USDT / BNB
- USDT / USD
- VAI / USD
- VET / USD
- WIN / USD
- WING / USD
- WOO / USD
- WTI / USD
- XAG / USD
- XAU / USD
- XLM / USD
- XRP / BNB
- XRP / USD
- XTZ / BNB
- XTZ / USD
- XVS / BNB
- XVS / USD
- YFI / BNB
- YFI / USD
- ZAR / USD


### Gnosis Chain Mainnet

- 1INCH / USD
- AAVE / USD
- ALPHA / USD
- AVAX / USD
- BAL / USD
- BNB / USD
- BTC / USD
- CHF / USD
- COMP / USD
- CREAM / USD
- CRV / USD
- DAI / USD
- DOGE / USD
- DOT / USD
- ETH / USD
- EUR / USD
- FTT / USD
- GNO / USD
- GRT / USD
- JPY / USD
- LINK / USD
- MKR / USD
- MXN / USD
- PERP / USD
- REN / USD
- SNX / USD
- SOL / USD
- STETH / USD
- SUSHI / USD
- UMA / USD
- UNI / USD
- USDC / USD
- USDT / USD
- WBTC / USD
- wstETH-ETH Exchange Rate
- XAU / USD
- YFI / USD
- ZIL / USD


### Optimism Mainnet

- 1INCH / USD
- AAVE / USD
- ADA / USD
- ALGO / USD
- ANKR / USD
- APE / USD
- APT / USD
- ARB / USD
- ATOM / USD
- AUD / USD
- AVAX / USD
- AXS / USD
- BAL / USD
- BCH / USD
- BLUR / USD
- BNB / USD
- BOND / USD
- BONK / USD
- BRL / USD
- BTC / USD
- CBETH / ETH
- CELO / USD
- COMP / USD
- CRV / USD
- DAI / USD
- DOGE / USD
- DOT / USD
- DYDX / USD
- ENJ / USD
- EOS / USD
- ETC / USD
- ETH / BTC
- ETH / USD
- EUR / USD
- FET / USD
- FIL / USD
- FLOKI / USD
- FLOW / USD
- FRAX / USD
- FTM / USD
- FXS / USD
- GBP / USD
- GMX / USD
- GRT / USD
- ICP / USD
- IMX / USD
- INJ / USD
- INR / USD
- JPY / USD
- KNC / USD
- LDO / USD
- LINK / ETH
- LINK / USD
- LTC / USD
- LUSD / USD
- MATIC / USD
- MAV / USD
- MEME / USD
- MIMATIC / USD
- MKR / USD
- NEAR / USD
- ONE / USD
- OP / USD
- PEPE / USD
- PERP / USD
- PYTH / USD
- RETH / ETH
- rETH-ETH Exchange Rate
- RNDR / USD
- RPL / USD
- RUNE / USD
- SAND / USD
- SEI / USD
- sFRAX / FRAX Exchange Rate
- sfrxETH / frxETH-Exchange-Rate
- SHIB / USD
- SNX / USD
- SOL / USD
- STETH / ETH
- STETH / USD
- SUI / USD
- SUSD / USD
- SUSHI / USD
- TIA / USD
- Total Marketcap USD
- TRB / USD
- TRX / USD
- UMA / USD
- UNI / USD
- USDC / USD
- USDT / USD
- WAVES / USD
- WBTC / USD
- WLD / USD
- WSTETH / ETH
- WSTETH / USD
- wstETH-stETH Exchange Rate
- XAG / USD
- XAU / USD
- XLM / USD
- XMR / USD
- XRP / USD
- XTZ / USD
- YFI / USD
- ZEC / USD
- ZIL / USD
- ZRX / USD


### Polygon Mainnet

- 1INCH / USD
- AAPL / USD
- AAVE / ETH
- AAVE / USD
- ADA / USD
- AGEUR / USD
- ALCX / USD
- ALGO / USD
- ALPHA / USD
- AMZN / USD
- ANT / USD
- APE / USD
- AUD / USD
- AVAX / USD
- AXS / USD
- BADGER / ETH
- BADGER / USD
- BAL / ETH
- BAL / USD
- BAT / USD
- bC3M Reserves
- BCH / USD
- bCSPX Reserves
- bIB01 Reserves
- bIBTA Reserves
- BNB / USD
- BOND / USD
- BRL / USD
- BTC / ETH
- BTC / USD
- BTC-USD Total Marketcap
- CAD / USD
- Calculated MaticX / USD
- Calculated stMATIC / USD
- CBETH / ETH
- CEL / USD
- CGT PoR (ETH)
- CHF / USD
- CHZ / USD
- CNY / USD
- COMP / USD
- CRV / ETH
- CRV / USD
- CVX / USD
- DAI / ETH
- DAI / USD
- DASH / USD
- DGB / USD
- DODO / USD
- DOGE / USD
- DOGE-USD Total Marketcap
- DOT / USD
- DPI / ETH
- ENJ / USD
- EOS / USD
- ETC / USD
- ETH / USD
- ETH-USD Total Marketcap
- EUR / USD
- FARM / USD
- FB / USD
- FIL / USD
- FRAX / USD
- FTM / USD
- FTT / USD
- FXS / USD
- GBP / USD
- GHST / ETH
- GHST / USD
- GNS / USD
- GOOGL / USD
- GRT / USD
- HBAR / USD
- ibBTC PricePerShare
- ICP / USD
- ILS / USD
- INR / USD
- JPY / USD
- KAVA / USD
- KLAY / USD
- KNC / USD
- KRW / USD
- LINK / ETH
- LINK / MATIC
- LINK / USD
- LTC / USD
- MANA / USD
- MATIC / ETH
- MATIC / USD
- MIM / USD
- MIMATIC / USD
- MKR / ETH
- MKR / USD
- MLN / ETH
- MSFT / USD
- MXN / USD
- NZD / USD
- OGN / USD
- OHM Index
- OHMv2 / USD
- OM / USD
- OMG / USD
- PAXG / USD
- PHP / USD
- PLA / USD
- PLN / USD
- QNT / USD
- RAI / USD
- SAND / USD
- SE / USD
- SEK / USD
- SGD / USD
- SHIB / USD
- SLP / USD
- SNX / USD
- SOL / USD
- SPY.US
- STORJ / USD
- SUSHI / ETH
- SUSHI / USD
- THB / USD
- THETA / USD
- TRUMATIC-MATIC Exchange Rate
- TRX / USD
- TRY / USD
- TSLA / USD
- TUSD / USD
- UMA / USD
- UNI / ETH
- UNI / USD
- USDC / ETH
- USDC / USD
- USDT / ETH
- USDT / USD
- WBTC / ETH
- WBTC / USD
- WOO / USD
- WSTETH / ETH
- wstETH-stETH Exchange Rate
- XAG / USD
- XAU / USD
- XLM / USD
- XMR / USD
- XRP / USD
- XTZ / USD
- YFI / ETH
- YFI / USD
- ZEC / USD


### Avalanche Mainnet

- AAVE / USD
- AAVE.e PoR
- ADA / USD
- ALPHA / USD
- APE / USD
- AVAX / USD
- AXS / USD
- BAT / USD
- BTC / USD
- BTC.b PoR
- CAKE / USD
- Calculated SAVAX / USD
- CHF / USD
- CHZ / USD
- COMP / USD
- CRV / USD
- CVX / USD
- DAI / USD
- DAI.e PoR
- DOT / USD
- ETH / USD
- EUR / USD
- EURC / USD
- FIL / USD
- FRAX / USD
- FTM / USD
- FXS / USD
- GMX / USD
- Ion Digital Total Reserve
- JOE / USD
- JPY / USD
- KNC / USD
- LINK / AVAX
- LINK / USD
- LINK.e PoR
- MANA / USD
- MATIC / USD
- MIM / USD
- MIMATIC / USD
- MKR / USD
- NEAR / USD
- QI / USD
- SAND / USD
- SNX / USD
- SPELL / USD
- SUSHI / USD
- TRY / USD
- TUSD / USD
- UNI / USD
- USDC / USD
- USDC.e PoR
- USDT / USD
- USDT.e PoR
- WBTC / USD
- WBTC.e PoR
- WETH.e PoR
- WOO / ETH
- wstETH-stETH Exchange Rate
- XAU / USD
- XAVA / USD
- YFI / USD
- ZRX / USD


### Fantom Opera

- AAVE / USD
- ALPACA / USD
- BNB / USD
- BOO / USD
- BTC / USD
- Calculated sFTMX / USD
- CHF / USD
- CREAM / USD
- CRV / USD
- DAI / USD
- ETH / USD
- EUR / USD
- FRAX / USD
- FTM / USD
- GMX / USD
- LINK / FTM
- LINK / USD
- MIM / USD
- MIMATIC / USD
- OHM Index
- SNX / USD
- SPELL / USD
- SUSHI / USD
- USDC / USD
- USDT / USD
- WBTC / USD
- YFI / USD


### Linea Mainnet

- AAVE / USD
- ARB / USD
- BTC / USD
- DAI / USD
- ETH / USD
- EUR / USD
- LINK / USD
- MATIC / USD
- USDC / USD
- USDT / USD
- WSTETH / USD


### Metis Mainnet

- AAVE / USD
- BTC / USD
- DAI / USD
- ETH / USD
- LINK / USD
- METIS / USD
- MIMATIC / USD
- USDC / USD
- USDT / USD


### Moonriver Mainnet

- AAVE / USD
- BNB / USD
- BTC / USD
- DAI / USD
- DOT / USD
- ETH / USD
- FRAX / USD
- FTM / USD
- KSM / USD
- LINK / USD
- MIM / USD
- MOVR / USD
- USDC / USD
- USDT / USD
- WBTC / USD


### Scroll Mainnet

- AAVE / USD
- BTC / USD
- CRV / USD
- DAI / USD
- ETH / USD
- LINK / USD
- RETH / ETH
- STG / USD
- USDC / USD
- USDT / USD
- WSTETH / ETH
- wstETH-stETH Exchange Rate


### Base Mainnet

- APT / USD
- CBETH / ETH
- CBETH / USD
- cbETH-ETH Exchange Rate
- COMP / USD
- DAI / USD
- ETH / USD
- LINK / ETH
- LINK / USD
- OP / USD
- RETH / ETH
- RSR / USD
- sfrxETH-frxETH Exchange Rate
- SNX / USD
- SOL / USD
- STETH / ETH
- STG / USD
- USDC / USD
- USDT / USD
- WBTC / USD
- wstETH-ETH Exchange Rate
- wstETH-stETH Exchange Rate
- YFI / USD


### Moonbeam Mainnet

- ATOM / USD
- BNB / USD
- BRL / USD
- BTC / USD
- CAKE / USD
- DAI / USD
- DOT / USD
- ETH / USD
- FRAX / USD
- GLMR / USD
- LINK / USD
- USDC / USD
- USDT / USD
- WBTC / USD


### Celo Mainnet

- BTC / USD
- CELO / USD
- ETH / USD
- EUR / USD
- LINK / USD
- USDC / USD
- USDT / USD
