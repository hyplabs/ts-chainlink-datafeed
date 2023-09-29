import { createPublicClient, webSocket } from "viem";
import { polygon } from "viem/chains";
import { polygonDataFeeds } from "../src/dataFeeds/polygon.js";
import { subscribeToChainLinkPriceUpdates } from "../src/Aggregator.js";

const EthCallRPC =
  "wss://polygon-mainnet.g.alchemy.com/v2/37c6tMn8J6tDN6LnE_98fXIhPBQHALWb";

const ethCallClient = createPublicClient({
  name: "EthCall",
  transport: webSocket(EthCallRPC),
  chain: polygon,
  batch: {
    multicall: true,
  },
});

subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(polygonDataFeeds),
  publicClient: ethCallClient,
  onLogsFunction: (array) =>
    array.forEach((item: any) => {
      console.log("CALL");
      console.log(`Asset: ${item.description}`);
      console.log(`🔘 Round ID: ${item.roundId}`);
      if (item.description.includes("USD")) {
        console.log(`📈 Answer: $${item.current}`);
      } else if (item.description.includes("/ ETH")) {
        console.log(`📈 Answer: Ξ${item.current}`);
      } else {
        console.log(`📈 Answer: ${item.current}`);
      }
      console.log(`⏰ Time: ${item.updatedAt}`);
      console.log("----------------------------------------");
    }),
});
