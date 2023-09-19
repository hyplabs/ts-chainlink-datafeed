import ChainLinkDataFeed from "../src/index.js";
import { polygon } from "viem/chains";

const chainLinkDataFeed = new ChainLinkDataFeed({
  chain: polygon,
  contractAddress: "0xf9680d99d6c9589e2a93a78a04a279e509205945", // ETH / USD on polygon
  rpcUrls: [
    "https://polygon.llamarpc.com",
    "https://polygon-bor.publicnode.com",
    "https://polygon.meowrpc.com",
  ],
});

// Check the chain every 3 seconds for new data
const roundDataGenerator = chainLinkDataFeed.getRoundDataInterval(3);
// Each time there is new data, log it to the console
for await (const roundData of roundDataGenerator) {
  console.log(roundData);
}
