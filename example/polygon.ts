import { createPublicClient } from "viem";
import { polygon } from "viem/chains";
import { polygonDataFeeds } from "../src/dataFeeds/polygon.js";
import { subscribeToChainLinkPriceUpdates } from "../src/Aggregator.js";
import { useWebsocketOrHttpTransport } from "../src/utils.js";
import { loadBalance } from "@ponder/utils";

const polygonRpcList = [
  "https://public.stackup.sh/api/v1/node/polygon-mainnet",
  "https://polygon.gateway.tenderly.co",
  "https://polygon.blockpi.network/v1/rpc/public",
  "https://polygon-rpc.com",
];

const transports = loadBalance(
  polygonRpcList.map((rpc) => useWebsocketOrHttpTransport(rpc))
);

const polyCallClient = createPublicClient({
  name: "PolyCall",
  transport: transports,
  chain: polygon,
  batch: {
    multicall: true,
  },
});

subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(polygonDataFeeds),
  publicClient: polyCallClient,
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
