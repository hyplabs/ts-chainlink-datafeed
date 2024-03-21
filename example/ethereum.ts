import { createPublicClient, fallback } from "viem";
import { mainnet } from "viem/chains";
import { ethereumDataFeeds } from "../src/dataFeeds/ethereum.js";
import { subscribeToChainLinkPriceUpdates } from "../src/Aggregator.js";
import { useWebsocketOrHttpTransport } from "../src/utils.js";
import { loadBalance } from "@ponder/utils";

const rpcList = [
  "https://eth.drpc.org",
  "wss://ethereum.publicnode.com",
  "https://rpc.mevblocker.io/noreverts",
];

const transports = loadBalance(
  rpcList.map((rpc) => useWebsocketOrHttpTransport(rpc))
);

const callClient = createPublicClient({
  name: "EthereumCall",
  transport: transports,
  chain: mainnet,
  batch: {
    multicall: true,
  },
});

/**
 * Subscribe to Chainlink price updates
 */
subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(ethereumDataFeeds),
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
