import { Chain, PublicClient, Transport } from "viem";
import { AggregatorABI } from "./abis/Aggregator.js";
import ChainLinkDataFeed from "./ChainLinkDataFeed.js";
import {
  formatLogWithMetadata,
  getPhaseAggregator,
  setupAllFeeds,
} from "./utils.js";

/**
 * Subscribes to ChainLink price update events and returns an object containing
 * the aggregator contract address, a function to stop watching the event, the
 * ChainLink data feed, and the data feed description.
 *
 * @param {Object} options - An object containing the ChainLink data feed, the
 * Viem client, and a callback function to handle the logs event.
 * @param {ChainLinkDataFeed} options.chainLinkDataDeed - The ChainLink data feed.
 * @param {PublicClient<Transport, Chain>} options.viemClient - The Viem client.
 * @param {(result: ReturnType<typeof formatLogWithMetadata>[]) => void} options.onLogsEvent - The callback function to handle the logs event.
 * @returns {Promise<Object>} - An object containing the aggregator contract address,
 * a function to stop watching the event, the ChainLink data feed, and the data feed description.
 */
export const subscribeToChainLinkPriceUpdate = async ({
  chainLinkDataDeed: chainLinkDataFeed,
  viemClient,
  onLogsEvent,
}: {
  chainLinkDataDeed: ChainLinkDataFeed;
  viemClient: PublicClient<Transport, Chain>;
  onLogsEvent: (result: ReturnType<typeof formatLogWithMetadata>[]) => void;
}) => {
  const aggregatorContractAddress =
    await chainLinkDataFeed.getPhaseAggregator();

  const unWatch = await viemClient.watchContractEvent({
    address: aggregatorContractAddress,
    abi: AggregatorABI,
    eventName: "AnswerUpdated",
    onLogs: (logs) => {
      const format = logs.map((log) => {
        try {
          if (
            log.args.current === undefined ||
            log.args.roundId === undefined ||
            log.args.updatedAt === undefined
          ) {
            throw new Error("One of the log results missing");
          }
          return formatLogWithMetadata(
            log.args.current,
            chainLinkDataFeed.decimals,
            log.args.roundId,
            log.args.updatedAt,
            chainLinkDataFeed.description
          );
        } catch {
          console.log(log);
        }
      }) as ReturnType<typeof formatLogWithMetadata>[];
      onLogsEvent(format);
    },
  });
  return {
    aggregatorContractAddress,
    unWatch,
    chainLinkDataFeed,
    description: chainLinkDataFeed.description,
  };
};

/**
 * Subscribes to ChainLink price updates for a list of feed addresses.
 * @param feedAddresses - An array of feed addresses to subscribe to.
 * @param publicClient - The public client to use for subscribing. Must use a websocket URL.
 * @param onLogsFunction - A function to call when new logs are received.
 * @param checkForNewAggregatorInterval - (Optional) The interval (in seconds) to check for new aggregators. Defaults to 60 seconds.
 * @returns A Promise that resolves when all feeds have been subscribed to.
 */
export const subscribeToChainLinkPriceUpdates = async ({
  feedAddresses,
  publicClient,
  onLogsFunction,
  checkForNewAggregatorInterval = 60,
}: {
  feedAddresses: `0x${string}`[];
  publicClient: PublicClient<Transport, Chain>;
  onLogsFunction: (
    array: {
      roundId: bigint;
      current: string;
      updatedAt: Date;
      description: string;
    }[]
  ) => void;
  checkForNewAggregatorInterval?: number;
}) => {
  try {
    const allFeedContracts = feedAddresses.map((address) => {
      return new ChainLinkDataFeed({
        contractAddress: address,
        viemClient: publicClient,
      });
    });

    await setupAllFeeds({
      dataFeeds: allFeedContracts,
    });

    const allUnWatchPromises = allFeedContracts.map((feed) => {
      return subscribeToChainLinkPriceUpdate({
        chainLinkDataDeed: feed,
        viemClient: publicClient,
        onLogsEvent: (array) => onLogsFunction(array),
      });
    });

    let unWatchFunctions = await Promise.all(allUnWatchPromises);

    const aggregatorGenerator = getPhaseAggregator({
      dataFeeds: allFeedContracts,
      viemClient: publicClient,
      interval: checkForNewAggregatorInterval,
    });

    for await (const result of aggregatorGenerator) {
      for (const item of result) {
        // Using the description and the aggregatorAddress, check if any aggregator address has changed. If it has, unwatch the old one and watch the new one, and add it to the unWatchFunctions array
        const newAddAddress = item?.aggregator;
        const currentDataFeed = unWatchFunctions.find(
          (feed) => feed.description === item?.description
        ) as Awaited<ReturnType<typeof subscribeToChainLinkPriceUpdate>>;
        const oldAddAddress = currentDataFeed?.aggregatorContractAddress;
        if (newAddAddress !== oldAddAddress) {
          await currentDataFeed.unWatch();
          // find index of array for currentDataFeed
          const index = unWatchFunctions.findIndex((item) => {
            return item.description === currentDataFeed?.description;
          });
          unWatchFunctions.splice(index, 1);
          const newUnWatch = subscribeToChainLinkPriceUpdate({
            chainLinkDataDeed: currentDataFeed?.chainLinkDataFeed,
            viemClient: publicClient,
            onLogsEvent: (array) => onLogsFunction(array),
          });
          const ready = await newUnWatch;
          unWatchFunctions.push(ready);
        }
      }
    }
    return unWatchFunctions;
  } catch (error) {
    console.error(error);
  }
};
