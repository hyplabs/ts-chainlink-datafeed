import { createPublicClient, defineChain } from "viem";
import { subscribeToChainLinkPriceUpdates } from "../src/Aggregator.js";
import { scrollDataFeeds } from "../src/dataFeeds/scroll.js";
import { useWebsocketOrHttpTransport } from "../src/utils.js";
import ChainLinkDataFeed from "../src/ChainLinkDataFeed.js";
import { loadBalance } from "@ponder/utils";

const rpcList = [
  "https://scroll-mainnet.public.blastapi.io",
  "https://scroll.blockpi.network/v1/rpc/public	",
  "https://rpc.scroll.io",
];

const transports = loadBalance(
  rpcList.map((rpc) => useWebsocketOrHttpTransport(rpc))
);

const scrollChain = defineChain({
  id: 534352,
  name: "Scroll",
  network: "scroll",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://rpc.scroll.io"],
    },
    default: {
      http: ["https://rpc.scroll.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "ScrollScan",
      url: "https://scrollscan.com/",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 14,
    },
  },
});

const callClient = createPublicClient({
  name: "ScrollCall",
  transport: transports,
  chain: scrollChain,
  batch: {
    multicall: true,
  },
});

const feed = new ChainLinkDataFeed({
  contractAddress: scrollDataFeeds["ETH / USD"],
  viemClient: callClient,
});

console.log("Price of ETH / USD :", await feed.getLatestRoundData(true));

subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(scrollDataFeeds),
  publicClient: callClient,
  onLogsFunction: (arrayOfLogs) => {
    for (const log of arrayOfLogs) {
      console.log(`Asset: ${log.description}`);
      console.log(`🔘 Round ID: ${log.roundId}`);
      if (log.description.includes("USD")) {
        console.log(`📈 Answer: $${log.current}`);
      } else if (log.description.includes("/ ETH")) {
        console.log(`📈 Answer: Ξ${log.current}`);
      } else {
        console.log(`📈 Answer: ${log.current}`);
      }
      console.log(`⏰ Time: ${log.updatedAt}`);
      console.log("----------------------------------------");
    }
  },
});
