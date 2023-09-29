import { createPublicClient, webSocket } from "viem";
import { arbitrum } from "viem/chains";
import { arbitrumDataFeeds } from "../src/dataFeeds/arbitrum.js";
import { subscribeToChainLinkPriceUpdates } from "../src/Aggregator.js";

const ArbCallRPC =
  "wss://arb-mainnet.g.alchemy.com/v2/K5DW9EYsh0JlWWUTRF0azbUIVIheMmzL";

const arbCallClient = createPublicClient({
  name: "ArbCall",
  transport: webSocket(ArbCallRPC),
  chain: arbitrum,
  batch: {
    multicall: true,
  },
});

subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(arbitrumDataFeeds),
  publicClient: arbCallClient,
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
