import { createPublicClient, fallback, http, webSocket } from "viem";
import { arbitrum } from "viem/chains";
import { arbitrumDataFeeds } from "../src/dataFeeds/arbitrum.js";
import { subscribeToChainLinkPriceUpdates } from "../src/Aggregator.js";
import { useWebsocketOrHttpTransport } from "../src/utils.js";

const arbitrumRpcList = [
  "https://arbitrum.llamarpc.com",
  "wss://arbitrum-one.publicnode.com",
  "https://arbitrum.drpc.org",
];

const transports = fallback(
  arbitrumRpcList.map((rpc) => useWebsocketOrHttpTransport(rpc))
);

const arbCallClient = createPublicClient({
  name: "ArbCall",
  transport: transports,
  chain: arbitrum,
  batch: {
    multicall: true,
  },
});

subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(arbitrumDataFeeds),
  publicClient: arbCallClient,
  onLogsFunction: (array) => {
    for (const feed of array) {
      console.log(`Asset: ${feed.description}`);
      console.log(`🔘 Round ID: ${feed.roundId}`);
      if (feed.description.includes("USD")) {
        console.log(`📈 Answer: $${feed.current}`);
      } else if (feed.description.includes("/ ETH")) {
        console.log(`📈 Answer: Ξ${feed.current}`);
      } else {
        console.log(`📈 Answer: ${feed.current}`);
      }
      console.log(`⏰ Time: ${feed.updatedAt}`);
      console.log("----------------------------------------");
    }
  },
});
