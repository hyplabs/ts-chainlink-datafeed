import { createPublicClient, fallback, http } from "viem";
import ChainLinkDataFeed from "../src/index.js";
import { subscribeToChainLinkPriceUpdate } from "../src/Aggregator.js";
import { getLatestRoundDataForContractAddresses, pause } from "../src/utils.js";
import { mainnet, polygon } from "viem/chains";
import { polygonDataFeeds } from "../src/dataFeeds/polygon.js";

/**
 * See {@link https://chainlist.org/chain/137}
 * Free public RPC list
 */

const EthCallRPC =
  "https://polygon-mainnet.g.alchemy.com/v2/37c6tMn8J6tDN6LnE_98fXIhPBQHALWb";
const EthIntervalRPC =
  "https://polygon-mainnet.g.alchemy.com/v2/mZ3KWReKJYf5QBIzYtJHX5njgNy9Us9L";

const rpcUrls = [
  "https://polygon-mainnet.g.alchemy.com/v2/yAbnaHp8ByhAIrQrplXdhhzQRnB5Lu73",
  "https://polygon.llamarpc.com",
  "https://polygon-bor.publicnode.com",
  "https://polygon.meowrpc.com",
];

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

const EthUSD = polygonDataFeeds["ETH / USD"];

const ethUsdDataFeed = new ChainLinkDataFeed({
  chain: polygon,
  contractAddress: EthUSD,
  viemClient: publicClient,
});

// We need to run this method to get the decimals and description
await ethUsdDataFeed.updateMetadata();

console.log("Price of ETH / USD :", await ethUsdDataFeed.getLatestRoundData());

const contractAddresses = Object.values(polygonDataFeeds);

const feeds = contractAddresses.map((address) => {
  return new ChainLinkDataFeed({
    chain: mainnet,
    contractAddress: address,
    viemClient: publicClient,
  });
});

const testFeeds = feeds
  .map(async (feed) => {
    await feed.updateMetadata();
    if (!feed.isWorking) {
      const key = Object.keys(polygonDataFeeds).find(
        (key) =>
          polygonDataFeeds[key as keyof typeof polygonDataFeeds] ===
          feed.contractAddress
      );
      console.log(`👹 Feed ${key} is not working`);
      await pause(2);
      return;
    }
    console.log(`🍀 Feed ${feed.description} is working`);
    await pause(10);
    return feed;
  })
  .filter((feed) => feed !== undefined) as Promise<ChainLinkDataFeed>[];

const settled = await Promise.allSettled(testFeeds).then((results) => {
  const fulfilled = results.filter((result) => result.status === "fulfilled");
  return fulfilled.map((result) => {
    if (result.status === "fulfilled" && result.value) return result.value;
  });
});
// await setupAllFeeds({ dataFeeds: feeds });

// Checks the latest round data for all feeds every 3 seconds
// const roundDataGenerator = getLatestRoundDataForContractAddresses({
//   dataFeeds: feeds,
//   viemClient: publicClient,
//   interval: 3,
// });

// for await (const roundData of roundDataGenerator) {
//   for (const data of roundData) {
//     // check if any values in data are undefined
//     if (data === undefined) {
//       continue;
//     }
//     console.log(`Asset: ${data.description}`);
//     console.log(`🔘 Round ID: ${data.roundId}`);
//     if (data.description.includes("USD")) {
//       console.log(`📈 Answer: $${data.answer}`);
//     } else {
//       console.log(`📈 Answer: ${data.answer}`);
//     }
//     console.log(`⏰ Time: ${data.time}`);
//     console.log("----------------------------------------");
//   }
// }

// Uses a filter and eth_logs to get the latest round data for all feeds

const feedsWeWant = [
  "ETH / USD",
  "BTC / USD",
  "LINK / USD",
  "AAVE / USD",
  "UNI / USD",
];

const newDataFeedsList = feeds.filter((feed) => {
  return feedsWeWant.includes(feed.description);
});

console.log(newDataFeedsList);

// const allWatches = newDataFeedsList.map(async (feed) => {
//   console.log(feed.description);
//   return subscribeToChainLinkPriceUpdate({
//     chainLinkDataDeed: feed,
//     viemClient: publicClient,
//     onLogsEvent: (array) =>
//       array.forEach((item: any) => {
//         console.log(`Asset: ${item.description}`);
//         console.log(`🔘 Round ID: ${item.roundId}`);
//         if (item.description.includes("USD")) {
//           console.log(`📈 Answer: $${item.current}`);
//         } else if (item.description.includes("/ ETH")) {
//           console.log(`📈 Answer: Ξ${item.current}`);
//         } else {
//           console.log(`📈 Answer: ${item.current}`);
//         }
//         console.log(`⏰ Time: ${item.updatedAt}`);
//         console.log("----------------------------------------");
//       }),
//   });
// });

// const allUnWatches = await Promise.all(allWatches);

// const contractMap = new Map();
// feeds.forEach((feed) => {
//   contractMap.set(feed.description, feed);
// });

// const phaseAggregator = await feeds[0].getPhaseAggregator();

// Get all phase aggregators for all feeds every 10 seconds. If any of them change, find the unwatch function for that description, unwatch it, and rewatch it with the new phaseAggregator
// setInterval(async () => {
//   const newPhaseAggregator = await feeds[0].getPhaseAggregator();
//   if (newPhaseAggregator !== phaseAggregator) {
//     console.log("Phase aggregator changed");
//     const feed = contractMap.get("ETH / USD");
//     const unWatch = allUnWatches.find((unWatch) => {
//       return unWatch.address === feed.contract.address;
//     });
//     unWatch();
//     const newUnWatch = await subscribeToChainLinkPriceUpdate({
//       chainLinkDataDeed: feed,
//       viemClient: publicClient,
//       onLogsEvent: (array) =>
//         array.forEach((item: any) => {
//           console.log(`Asset: ${item.description}`);
//           console.log(`🔘 Round ID: ${item.roundId}`);
//           if (item.description.includes("USD")) {
//             console.log(`📈 Answer: $${item.current}`);
//           } else if (item.description.includes("/ ETH")) {
//             console.log(`📈 Answer: Ξ${item.current}`);
//           } else {
//             console.log(`📈 Answer: ${item.current}`);
//           }
//           console.log(`⏰ Time: ${item.updatedAt}`);
//           console.log("----------------------------------------");
//         }),
//     });
//     allUnWatches.push(newUnWatch);
//   }
// }, 10 * 1000);

// setInterval(() => {
//   const potentialNewPhas;
// }, 10 * 1000);

// Stop watching after 500 seconds
// setTimeout(() => {
//   allUnWatches.forEach((unWatch) => unWatch());
// }, 500 * 1000);

// Check if the aggregator for each feed has changed every 60 seconds. If an aggregator has changed, unwatch the old aggregator and watch the new one
