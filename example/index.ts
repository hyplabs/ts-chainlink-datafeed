import ChainLinkDataFeed from "../src/index.js";
import { mainnet } from "viem/chains";

const chainLinkDataFeed = new ChainLinkDataFeed({
  chain: mainnet,
  contractAddress: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419",
  rpcUrls: [
    "https://eth.llamarpc.com",
    "https://uk.rpc.blxrbdn.com",
    "https://eth-mainnet.public.blastapi.io",
    "https://singapore.rpc.blxrbdn.com",
    "https://cloudflare-eth.com",
    "https://rpc.eth.gateway.fm",
    "https://1rpc.io/eth",
    "https://rpc.flashbots.net",
  ],
});

const result = await chainLinkDataFeed.getLatestRoundData();

console.log(result);
