import { createPublicClient, fallback } from "viem";
import { bsc } from "viem/chains";
import { bscDataFeeds } from "../src/dataFeeds/bsc.js";
import { subscribeToChainLinkPriceUpdates } from "../src/Aggregator.js";
import { useWebsocketOrHttpTransport } from "../src/utils.js";
import { loadBalance } from "@ponder/utils";

const rpcList = [
  "https://bsc-dataseed1.bnbchain.org",
  "https://bsc-dataseed1.ninicoin.io",
  "wss://bsc.publicnode.com",
];

const transports = loadBalance(
  rpcList.map((rpc) => useWebsocketOrHttpTransport(rpc))
);

const callClient = createPublicClient({
  name: "BSCCall",
  transport: transports,
  chain: bsc,
  batch: {
    multicall: true,
  },
});

subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(bscDataFeeds),
  publicClient: callClient,
  onLogsFunction: (logs) => {
    for (const log of logs) {
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
