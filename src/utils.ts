import { createPublicClient, formatUnits, http, webSocket } from "viem";
import ChainLinkDataFeed from "./ChainLinkDataFeed.js";

export const pause = async (seconds: number) => {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const getPhaseId = (round: BigInt) => {};

export const getRoundNumberInPhase = (round: BigInt) => {};

export const formatRoundData = (
  round:
    | [bigint, bigint, bigint, bigint, bigint]
    | readonly [bigint, bigint, bigint, bigint, bigint],
  decimals: number,
  description: string
) => {
  return {
    roundId: round[0],
    answer: formatUnits(round[1], decimals),
    time: new Date(Number(round[2]) * 1000),
    description,
  };
};

export const formatLogWithMetadata = (
  current: bigint,
  decimals: number,
  roundId: bigint,
  updatedAt: bigint,
  description: string
) => {
  return {
    roundId,
    current: formatUnits(current, decimals),
    updatedAt: new Date(Number(updatedAt) * 1000),
    description,
    decimals,
  };
};

export async function* getLatestRoundDataForContractAddresses({
  dataFeeds,
  viemClient,
  interval = 3,
}: {
  dataFeeds: ChainLinkDataFeed[];
  viemClient: ReturnType<typeof createPublicClient>;
  interval?: number;
}) {
  const chainLinkDataFeedFunctions = dataFeeds.map((feed) => {
    return {
      address: feed.contract.address,
      abi: feed.contract.abi,
      functionName: "latestRoundData" as const,
    };
  });

  while (true) {
    const results = await viemClient.multicall({
      contracts: chainLinkDataFeedFunctions,
    });

    yield results.map((result, index) => {
      if (result.status === "success") {
        return formatRoundData(
          result.result,
          dataFeeds[index].decimals,
          dataFeeds[index].description
        );
      }
    });
    await new Promise((resolve) => setTimeout(resolve, interval * 1000));
  }
}

export async function* getPhaseAggregator({
  dataFeeds,
  viemClient,
  interval = 3,
}: {
  dataFeeds: ChainLinkDataFeed[];
  viemClient: ReturnType<typeof createPublicClient>;
  interval?: number;
}) {
  const chainLinkDataFeedFunctions = dataFeeds.map((feed) => {
    return {
      address: feed.contract.address,
      abi: feed.contract.abi,
      functionName: "aggregator" as const,
    };
  });

  while (true) {
    const results = await viemClient.multicall({
      contracts: chainLinkDataFeedFunctions,
    });

    yield results.map((result, index) => {
      if (result.status === "success") {
        return {
          aggregator: result.result,
          description: dataFeeds[index].description,
        };
      }
    });
    await new Promise((resolve) => setTimeout(resolve, interval * 1000));
  }
}

export const setupAllFeeds = async ({
  dataFeeds,
}: {
  dataFeeds: ChainLinkDataFeed[];
}) => {
  await Promise.all(dataFeeds.map((feed) => feed.updateMetadata()));
  return dataFeeds;
};

export const useWebsocketOrHttpTransport = (rpcUrl: string) => {
  if (rpcUrl.startsWith("ws")) return webSocket(rpcUrl);
  return http(rpcUrl);
};
