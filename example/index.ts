import { createPublicClient, fallback, http } from "viem";
import ChainLinkDataFeed from "../src/index.js";
import { subscribeToChainLinkPriceUpdate } from "../src/Aggregator.js";
import {
  getLatestRoundDataForContractAddresses,
  setupAllFeeds,
} from "../src/utils.js";
import { polygon } from "viem/chains";
import { EVMAddress } from "../src/types.js";

/**
 * See {@link https://chainlist.org/chain/137}
 * Free public RPC list
 */
const rpcUrls = [
  "https://polygon.llamarpc.com",
  "https://polygon-bor.publicnode.com",
  "https://polygon.meowrpc.com",
];

/**
 * See {@link https://data.chain.link/polygon/mainnet}
 * Chainlink datafeed contract addresses
 */
const contractAddresses = [
  "0xab594600376ec9fd91f8e885dadf0ce036862de0",
  "0xc907e116054ad103354f2d350fd2514433d57f6f",
  "0xbe23a3aa13038cfc28afd0ece4fde379fe7fbfc4",
  "0xacb51f1a83922632ca02b25a8164c10748001bde",
] as const;

const publicClient = createPublicClient({
  chain: polygon,
  // We use a fallback transport to ensure we don't miss any data
  transport: fallback(
    rpcUrls.map((url) => http(url)),
    {
      // Use latency measurement to rank RPCs
      rank: true,
    }
  ),
});

const feeds = contractAddresses.map((address) => {
  return new ChainLinkDataFeed({
    chain: polygon,
    contractAddress: address,
    viemClient: publicClient,
  });
});

const setupFeeds = await setupAllFeeds({ dataFeeds: feeds });

// Checks the latest round data for all feeds every 3 seconds
const roundDataGenerator = getLatestRoundDataForContractAddresses({
  dataFeeds: setupFeeds,
  viemClient: publicClient,
  interval: 3,
});

for await (const roundData of roundDataGenerator) {
  for (const data of roundData) {
    // check if any values in data are undefined
    if (data === undefined) {
      continue;
    }
    console.log(`Asset: ${data.description}`);
    console.log(`🔘 Round ID: ${data.roundId}`);
    if (data.description.includes("USD")) {
      console.log(`📈 Answer: $${data.answer}`);
    } else {
      console.log(`📈 Answer: ${data.answer}`);
    }
    console.log(`⏰ Time: ${data.time}`);
    console.log("----------------------------------------");
  }
}

// Uses a filter and eth_logs to get the latest round data for all feeds
const allWatches = feeds.map(async (feed) => {
  console.log(feed.description);
  return subscribeToChainLinkPriceUpdate({
    chainLinkDataDeed: feed,
    viemClient: publicClient,
    onLogsEvent: (array) =>
      array.forEach((item: any) => {
        console.log(`Asset: ${item.description}`);
        console.log(`🔘 Round ID: ${item.roundId}`);
        if (item.description.includes("USD")) {
          console.log(`📈 Answer: $${item.current}`);
        } else {
          console.log(`📈 Answer: ${item.current}`);
        }
        console.log(`⏰ Time: ${item.updatedAt}`);
        console.log("----------------------------------------");
      }),
  });
});

const allUnWatches = await Promise.all(allWatches);

// Stop watching after 500 seconds
setTimeout(() => {
  allUnWatches.forEach((unWatch) => unWatch());
}, 500 * 1000);
