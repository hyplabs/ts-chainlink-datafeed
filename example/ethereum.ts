import { createPublicClient, webSocket } from "viem";
import { mainnet } from "viem/chains";
import { ethereumDataFeeds } from "../src/dataFeeds/ethereum.js";
import { subscribeToChainLinkPriceUpdates } from "../src/Aggregator.js";

const RPCUrl =
  "wss://eth-mainnet.g.alchemy.com/v2/sjlKG_gODlckpb49H882ur-bXKbzqvFm";

const callClient = createPublicClient({
  name: "ArbCall",
  transport: webSocket(RPCUrl),
  chain: mainnet,
  batch: {
    multicall: true,
  },
});

subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(ethereumDataFeeds),
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
