import { createPublicClient, fallback, http } from "viem";
import { pause } from "../src/utils.js";
import { polygon } from "viem/chains";
import { polygonDataFeeds } from "../src/dataFeeds/polygon.js";
import ChainLinkDataFeed from "../src/ChainLinkDataFeed.js";

/**
 * See {@link https://chainlist.org/chain/137}
 * Free public RPC list
 */

const PolygonRPCList = [
  "https://polygon.llamarpc.com",
  "https://polygon-bor.publicnode.com",
  "https://polygon.meowrpc.com",
];

const publicClient = createPublicClient({
  chain: polygon,
  // We use a fallback transport to ensure we don't miss any data
  transport: fallback(
    PolygonRPCList.map((url) => http(url)),
    {
      // Use latency measurement to rank RPCs
      rank: true,
    }
  ),
});
const EthUSD = polygonDataFeeds["ETH / USD"];

const ethUsdDataFeed = new ChainLinkDataFeed({
  contractAddress: EthUSD,
  viemClient: publicClient,
});

console.log(
  "Price of ETH / USD :",
  await ethUsdDataFeed.getLatestRoundData(true)
);

const contractAddresses = Object.values(polygonDataFeeds);

const feeds = contractAddresses.map((address) => {
  return new ChainLinkDataFeed({
    contractAddress: address,
    viemClient: publicClient,
  });
});

for (const feed of feeds) {
  if (!feed.isWorking) {
    const key = Object.keys(polygonDataFeeds).find(
      (key) =>
        polygonDataFeeds[key as keyof typeof polygonDataFeeds] ===
        feed.contractAddress
    );
    console.log(`👹 Feed ${key} is not working`);
    await pause(0.5);
    continue;
  }
  const price = await feed.getLatestRoundData(true);
  console.log(`🍀 Feed ${feed.description} is working: ${price.answer}`);
  await pause(0.1);
}
console.log("All feeds completed");
