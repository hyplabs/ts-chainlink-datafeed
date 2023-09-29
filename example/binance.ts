import { createPublicClient, webSocket } from "viem";
import { bsc } from "viem/chains";
import { bscDataFeeds } from "../src/dataFeeds/bsc.js";
import { subscribeToChainLinkPriceUpdates } from "../src/Aggregator.js";

const RPCUrl =
  "wss://magical-quaint-meadow.bsc.discover.quiknode.pro/de47914f9b18bfb5e18de824c642e5b97c19c248/";

const arrayOfRedundantRPCs = ["wss://bsc-ws-node.nariox.org:443", RPCUrl];

const callClient = createPublicClient({
  transport: webSocket(RPCUrl),
  chain: bsc,
  batch: {
    multicall: true,
  },
});

subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(bscDataFeeds),
  publicClient: callClient,
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
