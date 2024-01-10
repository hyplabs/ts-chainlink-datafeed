# ChainLinkDataFeed

This TypeScript project provides a ChainLink data feed that can be used to retrieve data from any EVM chain on http://data.chain.link.

## Setup

```bash
# Yarn
yarn add ts-chainlink-datafeed
# NPM
npm install ts-chainlink-datafeed
```

## RPCs

You can get multiple RPCs for each chain from [Chainlist](https://chainlist.org/). If you create a fallback provider, you can have a redundant list of RPCs incase one fails or is slow to respond. The [example](./example/) has some code to help with this. You can use both http and websocket RPCs.

## Get the current data for a single feed

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
 * 
*/
```

More detailed examples can be found in the [example folder](./example).


## Subscribing to one of more price feed updates

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

## Custom Chains

If you are using a chain that does not have a chain configuration in Viem, you can easily create your own. See [this example for Scroll](./example/scroll.ts).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Included Chainlink Feeds

### Ethereum

- ETH / USD
- BTC / USD
- XAG / USD
- XAU / USD
- AUD / USD
- CHF / USD
- JPY / USD
- GBP / USD
- EUR / USD
- LINK / USD
- ZRX / ETH
- BAT / ETH
- BTC / ETH
- MANA / ETH
- KNC / ETH
- MKR / ETH
- USDT / ETH
- USDC / ETH
- SUSD / ETH
- TUSD / ETH
- DAI / ETH
- LINK / ETH
- SNX / ETH
- DAI / USD
- Fast Gas / Gwei
- FTM / ETH
- ENJ / ETH
- REN / ETH
- YFI / ETH
- SXP / USD
- COMP / ETH
- AMPL / USD
- SNX / USD
- ADA / USD
- COMP / USD
- LTC / USD
- KNC / USD
- BNB / USD
- UNI / ETH
- CRV / ETH
- AAVE / ETH
- AAVE / USD
- MLN / ETH
- BAL / ETH
- UNI / USD
- YFI / USD
- DOT / USD
- PAXG / ETH
- MATIC / USD
- CAD / USD
- SUSHI / ETH
- 1INCH / ETH
- FTT / ETH
- ZRX / USD
- CNY / USD
- GRT / ETH
- KRW / USD
- USDC / USD
- USDT / USD
- SGD / USD
- FIL / ETH
- AMPL / ETH
- USDP / ETH
- WING / USD
- PERP / ETH
- TRY / USD
- FXS / USD
- 1INCH / USD
- CRV / USD
- ANKR / USD
- HBAR / USD
- RAI / ETH
- SAND / USD
- NZD / USD
- LDO / ETH
- DOGE / USD
- MKR / USD
- FRAX / ETH
- SUSHI / USD
- TRIBE / ETH
- AVAX / USD
- FRAX / USD
- ALCX / ETH
- stETH / USD
- WBTC PoR
- EURt / USD
- USDP / USD
- RSR / USD
- SOL / USD
- RAI / USD
- SPELL / USD
- eFIL Reserves
- ETH / BTC
- CACHE Gold Reserves
- APE / USD
- CVX / ETH
- BADGER / ETH
- XCN / USD
- GBPT PoR
- HBTC PoR
- cbETH / ETH
- xSushi / ETH
- TUSD Reserves
- STBT PoR
- Swell ETH PoR
- HOPE PoR
- EURR Reserves
- HIGH / USD
- PYUSD / USD
- WMXN / ETH
- CVX - USD
- OHMv2/ETH
- TUSD / USD
- IMX / USD
- BAL / USD
- wBTC / BTC
- Mutant Ape Yacht Club
- World of Women
- Cryptoadz
- Bored Ape Yacht Club
- VeeFriends
- Total Marketcap / USD
- Personal Consumption Expenditures (PCE) US Monthly Index
- stETH / ETH
- CAKE / USD
- Doodles
- CloneX
- Cool Cats
- Azuki
- Cryptopunks
- USDD / USD
- BEANZ OFFICIAL
- MOONBIRDS
- rETH / ETH
- PUDGY PENGUINS
- OTHERDEED FOR OTHERSIDE
- GHO / USD
- STG / USD
- IB01 / USD
- CSPX / USD
- RPL / USD
- IBTA / USD
- CRVUSD / USD
- RDNT / USD


### Polygon

- USDT / USD
- ETH / USD
- USDC / USD
- DAI / USD
- MATIC / USD
- BTC / USD
- AAVE / ETH
- MATIC / ETH
- LINK / ETH
- WBTC / ETH
- DOT / USD
- DAI / ETH
- USDC / ETH
- USDT / ETH
- WBTC / USD
- LINK / USD
- SNX / USD
- SUSHI / USD
- SAND / USD
- BOND / USD
- CEL / USD
- FXS / USD
- DOGE / USD
- ADA / USD
- JPY / USD
- YFI / ETH
- UNI / ETH
- CRV / ETH
- MKR / ETH
- BCH / USD
- BAT / USD
- DASH / USD
- ETC / USD
- PAXG / USD
- XAU / USD
- XRP / USD
- XLM / USD
- ALGO / USD
- ZEC / USD
- AUD / USD
- TUSD / USD
- CAD / USD
- TRX / USD
- LTC / USD
- OMG / USD
- EOS / USD
- GBP / USD
- UMA / USD
- MANA / USD
- COMP / USD
- KNC / USD
- AAVE / USD
- UNI / USD
- BNB / USD
- SGD / USD
- EUR / USD
- CHF / USD
- ALCX / USD
- THETA - USD
- GHST / ETH
- BAL / USD
- ICP / USD
- MKR / USD
- SOL / USD
- 1INCH / USD
- FARM / USD
- AVAX / USD
- YFI / USD
- OGN / USD
- STORJ / USD
- ANT / USD
- CACHE Gold Reserves
- BRL / USD
- bIB01 Reserves
- bCSPX Reserves
- bIBTA Reserves
- QNT / USD
- bC3M Reserves
- CNY / USD
- FTM / USD
- APE / USD
- WOO / USD
- PLN / USD
- INR / USD
- KAVA / USD
- MIMATIC / USD
- KRW / USD
- GNS / USD
- cbETH / ETH
- FIL / USD
- wstETH / stETH Exchange Rate
- TRUMATIC / MATIC Exchange Rate


### Arbitrum

- AAVE / USD
- LINK / USD
- USDC / USD
- DAI / USD
- BTC / USD
- USDT / USD
- ETH / USD
- KRW / USD
- EUR / USD
- AUD / USD
- CNY / USD
- YFI / USD
- UNI / USD
- SUSHI / USD
- CHF / USD
- SPELL / USD
- BTC / ETH
- PAXG / USD
- wstETH / stETH Exchange Rate
- AXS / USD
- MKR / USD
- XAG / USD
- DOT / USD
- APE / USD
- DOGE / USD
- MAGIC / USD
- DPX / USD
- COMP / USD
- BAL / USD
- KNC / USD
- XRP / USD
- ADA / USD
- NEAR / USD
- ATOM / USD
- MATIC / USD
- rETH / ETH Exchange Rate
- WOO / USD
- EURC / USD
- swETH-ETH Exchange Rate
- SOL / USD
- CRV / USD
- DODO / USD
- OHMv2 / USD
- SGD / USD
- SEK / USD
- CAD / USD
- JPY / USD
- CVX / USD
- GBP / USD
- FXS / USD
- XAU / USD
- BNB / USD
- WBTC / USD
- NFT Blue Chip Total Market Cap
- GMX / USD
- USDD / USD
- wstETH / ETH
- cbETH / ETH
- stETH / ETH
- JOE / USD
- RDNT / USD
- TUSD / USD
- LUSD / USD
- ARB / USD
- WBTC / BTC
- stETH / USD
- Frax / USD
- BRL / USD
- GNS / USD
- frxETH / ETH Exchange Rate High
- 1INCH / USD
- TRY / USD
- FTM / USD
- CAKE / USD
- RPL / USD
- OP / USD
- SNX / USD
- StaFi Staked ETH rETH / ETH Exchange Rate
- IOTX / USD
- STG / USD
- PENDLE / USD
- LDO / USD
- frxETH / ETH Exchange Rate Low
- AVAX / USD
- sFRAX-FRAX Exchange Rate


### Xdai

- YFI / USD
- ETH / USD
- BTC / USD
- SUSHI / USD
- DOT / USD
- AAVE / USD
- LINK / USD
- SNX / USD
- DAI / USD
- USDC / USD
- UNI / USD
- COMP / USD
- 1INCH / USD
- MKR / USD
- REN / USD
- CREAM / USD
- XAU / USD
- FTT / USD
- ZIL / USD
- JPY / USD
- AVAX / USD
- SOL / USD
- BNB / USD
- GNO / USD


### Harmony

- AUD / USD
- BTC / USD
- USDT / USD
- JPY / USD
- CRV / USD
- ETH / USD
- AXS / USD
- DAI / USD
- GBP / USD
- ONE / USD
- FRAX / USD
- ILV / USD
- EUR / USD
- AAVE / USD
- SAND / USD
- CAD / USD
- LINK / USD
- CHF / USD
- CVX / USD
- USDC / USD
- LINK / ONE
- WBTC / USD


### Moonriver

- FTM / USD
- MOVR / USD
- KSM / USD
- ETH / USD
- BNB / USD
- BTC / USD
- USDT / USD
- FRAX / USD
- USDC / USD
- DOT / USD
- DAI / USD
- LINK / USD
- WBTC / USD
- AAVE / USD


### Celo

- ETH / USD
- CELO / USD
- LINK / USD
- USDT /USD
- USDC / USD
- BTC / USD
- EUR / USD


### Bsc

- BNB / USD
- ETH / USD
- BTC / USD
- BTC / BNB
- USDT / BNB
- USDC / BNB
- ETH / BNB
- BCH / USD
- XVS / USD
- USDC / USD
- SXP / USD
- LTC / USD
- LINK / USD
- USDT / USD
- FIL / USD
- XRP / USD
- DOT / USD
- XAU / USD
- YFI / USD
- XAG / USD
- TRX / USD
- XTZ / BNB
- YFI / BNB
- LINA / USD
- LINK / BNB
- ADA / BNB
- BAND / BNB
- XRP / BNB
- BCH / BNB
- EOS / BNB
- DOT / BNB
- LTC / BNB
- UNI / USD
- JPY / USD
- EUR / USD
- WOO / USD
- ATOM / USD
- ALPHA / BNB
- CAKE / BNB
- TWT / BNB
- DF / USD
- PAXG / USD
- YFII / USD
- AUTO / USD
- XTZ / USD
- DOGE / USD
- EOS / USD
- WING / USD
- ONT / USD
- CFX / USD
- COMP / USD
- SOL / USD
- LIT / USD
- REEF / USD
- AAVE / USD
- ICP / USD
- MATIC / USD
- XVS / BNB
- BTC / ETH
- BETH / USD
- CHR / USD
- MASK / USD
- ALPACA / USD
- CHF / USD
- FET / USD
- INJ / USD
- TUSD / USD
- CAKE / USD
- DODO / USD
- sAVAX / USD
- KNC / USD
- NEAR / USD
- SGD / USD
- KLAY / USD
- VET / USD
- FDUSD / USD
- SPELL / USD
- CRV / USD
- AUD / USD
- SHIB / USD
- ONG / USD
- SUSHI / USD
- GBP / USD
- XLM / USD
- BRL / USD
- HIGH / USD
- C98 / USD
- FXS / USD
- MXN / USD
- 1INCH / USD
- BSW / USD
- KAVA / USD
- WIN / USD
- RDNT / USD
- USDD / USD


### Optimism

- AXS / USD
- stETH / USD
- BNB / USD
- FLOW / USD
- FRAX / USD
- IMX / USD
- ZIL / USD
- XAU / USD
- WAVES / USD
- FXS / USD
- LINK / ETH
- APE / USD
- XAG / USD
- SUSD / USD
- RUNE / USD
- INR / USD
- FTM / USD
- wstETH / stETH Exchange Rate
- PERP / USD
- OP / USD
- KNC / USD
- DOGE / USD
- XMR / USD
- GBP / USD
- LUSD / USD
- SUI / USD
- CELO / USD
- TRB / USD
- rETH / ETH
- BONK / USD
- PYTH / USD
- sFRAX-FRAX Exchange Rate
- SNX / USD
- UNI / USD
- AAVE / USD
- SOL / USD
- ONE / USD
- LINK / USD
- EUR / USD
- CRV / USD
- DAI / USD
- BTC / USD
- USDC / USD
- ETH / USD
- USDT / USD
- JPY / USD
- AUD / USD
- WBTC / USD
- GMX / USD
- SHIB / USD
- LDO / USD
- BCH / USD
- ARB / USD
- ADA / USD
- APT / USD
- LTC / USD
- 1INCH / USD
- SUSHI / USD
- ICP / USD
- wstETH / ETH
- MKR / USD
- WLD / USD
- ETH / BTC
- ETC / USD
- YFI / USD
- INJ / USD
- XRP / USD
- TRX / USD
- cbETH / ETH
- DOT / USD
- PEPE / USD
- MAV / USD
- RPL / USD
- COMP / USD
- wstETH / USD
- ENJ / USD
- rETH / ETH Exchange Rate
- FIL / USD
- BRL / USD
- FLOKI / USD
- BLUR / USD
- SEI / USD
- ZRX / USD
- stETH / ETH
- EOS / USD
- ALGO / USD
- ZEC / USD
- sfrxETH / frxETH-Exchange-Rate
- XLM / USD
- UMA / USD


### Avalanche

- LINK / USD
- USDT / USD
- DAI / USD
- AVAX / USD
- BTC / USD
- ETH / USD
- AAVE / USD
- USDC / USD
- FRAX / USD
- CHF / USD
- SUSHI / USD
- ALPHA / USD
- JPY / USD
- KNC / USD
- XAU / USD
- EUR / USD
- CVX / USD
- FXS / USD
- XAVA / USD
- MIMATIC / USD
- CAKE / USD
- TRY / USD
- TUSD / USD
- UNI / USD
- YFI / USD
- COMP / USD
- SNX / USD
- MKR / USD
- APE / USD
- BAT / USD
- ZRX / USD
- BTC.b
- DAI.e PoR
- AAVE.e PoR
- WBTC.e PoR
- WETH.e PoR
- Link.e PoR
- USDT.e PoR
- USDC.e PoR
- GMX / USD
- EURC / USD
- wstETH / stETH Exchange Rate
- FTM / USD
- SPELL / USD
- QI / USD
- WBTC / USD
- WOO / ETH
- JOE / USD
- CRV / USD
- FIL / USD


### Fantom

- SNX / USD
- AAVE / USD
- FTM / USD
- SUSHI / USD
- BNB / USD
- DAI / USD
- BTC / USD
- ETH / USD
- USDT / USD
- USDC / USD
- LINK / USD
- CHF / USD
- SPELL / USD
- MIMATIC / USD
- ALPACA / USD
- BOO / USD
- FRAX / USD
- EUR / USD
- CRV / USD
- WBTC / USD
- GMX / USD


### Base

- YFI / USD
- STG / USD
- rETH / ETH
- SOL / USD
- cbETH / ETH Exchange Rate
- wstETH / ETH Exchange Rate
- wstETH / stETH Exchange Rate
- APT / USD
- stETH / ETH
- LINK / USD
- COMP / USD
- WBTC / USD
- USDT / USD
- cbETH / ETH
- DAI / USD
- ETH / USD
- USDC / USD
- LINK / ETH
- sfrxETH / frxETH Exchange Rate
- SNX / USD
- cbETH / USD


### Moonbeam

- BTC / USD
- WBTC / USD
- LINK / USD
- BNB / USD
- USDC / USD
- ETH / USD
- ATOM / USD
- USDT / USD
- BRL / USD
- DAI / USD
- CAKE / USD


### Metis

- LINK / USD
- AAVE / USD
- METIS / USD
- USDC / USD
- BTC / USD
- USDT / USD
- ETH / USD


### Scroll

- wstETH-stETH Exchange Rate
- USDC / USD
- ETH / USD
- LINK / USD
- USDT / USD
- BTC / USD
- DAI / USD
- rETH / ETH
