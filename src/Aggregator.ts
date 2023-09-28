import { createPublicClient } from "viem";
import { AggregatorABI } from "./abis/Aggregator.js";
import ChainLinkDataFeed from "./index.js";
import { formatLogWithMetadata } from "./utils.js";

/**
 * Subscribes to ChainLink price update logs and returns a filter object.
 * @param {ChainLinkDataFeed} options.chainLinkDataDeed - The ChainLink data feed object.
 * @param {ReturnType<typeof createPublicClient>} options.viemClient - The VIEM client object.
 * @param {(result: ReturnType<typeof formatLogWithMetadata>[]) => void} options.onLogsEvent - The callback function to handle the logs.
 * @returns {Promise<Filter>} - A Promise that resolves with the filter object. You can unsub using this.
 * @throws {Error} - If one of the log results is missing.
 */
export const subscribeToChainLinkPriceUpdate = async ({
  chainLinkDataDeed,
  viemClient,
  onLogsEvent,
}: {
  chainLinkDataDeed: ChainLinkDataFeed;
  viemClient: ReturnType<typeof createPublicClient>;
  onLogsEvent: (result: ReturnType<typeof formatLogWithMetadata>[]) => void;
}) => {
  const aggregatorContractAddress =
    await chainLinkDataDeed.getPhaseAggregator();
  return await viemClient.watchContractEvent({
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
            chainLinkDataDeed.decimals,
            log.args.roundId,
            log.args.updatedAt,
            chainLinkDataDeed.description
          );
        } catch {
          console.log(log);
        }
      }) as ReturnType<typeof formatLogWithMetadata>[];
      onLogsEvent(format);
    },
  });
};
