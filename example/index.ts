import ChainLinkDataFeed from "../src/index.js";
import { polygon } from "viem/chains";

const chainLinkDataFeed = new ChainLinkDataFeed({
  chain: polygon,
  contractAddress: "0xf9680d99d6c9589e2a93a78a04a279e509205945",
  rpcUrls: [
    "https://polygon.llamarpc.com",
    "https://polygon-bor.publicnode.com",
    "https://polygon.meowrpc.com",
  ],
});

const roundDataGenerator = chainLinkDataFeed.getRoundDataInterval(3);
for await (const roundData of roundDataGenerator) {
  console.log(roundData);
}
