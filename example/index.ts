import ChainLinkDataFeed from "../src/index.js";
import { mainnet } from "viem/chains";

const chainLinkDataFeed = new ChainLinkDataFeed({
  chain: mainnet,
  contractAddress: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419",
  rpcUrl: "https://eth.llamarpc.com",
});

const result = await chainLinkDataFeed.getLatestRoundData();
const description = await chainLinkDataFeed.getDescription();
const decimals = await chainLinkDataFeed.getDecimals();

console.log(result);
console.log(description);
console.log(decimals);
