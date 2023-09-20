import { createPublicClient, formatUnits } from "viem";
import ChainLinkDataFeed from "./index.js";

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
      address: feed.getContract().address,
      abi: feed.getContract().abi,
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

export const setupAllFeeds = async ({
  dataFeeds,
}: {
  dataFeeds: ChainLinkDataFeed[];
}) => {
  await Promise.all(dataFeeds.map((feed) => feed.updateMetadata()));
  return dataFeeds;
};
