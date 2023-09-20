import { createPublicClient, fallback, http } from "viem";
import ChainLinkDataFeed from "../src/index.js";
import {
  getLatestRoundDataForContractAddresses,
  setupAllFeeds,
} from "../src/utils.js";
import { polygon } from "viem/chains";

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

// Single data feed
const feed = setupFeeds[0];
console.log(await feed.getLatestRoundData());

const roundDataGenerator = getLatestRoundDataForContractAddresses({
  dataFeeds: setupFeeds,
  viemClient: publicClient,
  interval: 3,
});

function clearConsole() {
  // Clear the console
  console.clear();
}

function formatData(data: any[]) {
  clearConsole();

  data.forEach((item) => {
    console.log(`🔘 Round ID: ${item.roundId}`);
    console.log(`📈 Answer: ${item.answer}`);
    console.log(`⏰ Time: ${item.time}`);
    console.log(`📝 Description: ${item.description}`);
    console.log("----------------------------------------");
  });
}

// Each time there is new data, log it to the console
const logData = async () => {
  for await (const roundData of roundDataGenerator) {
    formatData(roundData);
  }
};

logData();
