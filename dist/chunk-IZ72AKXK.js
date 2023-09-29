// src/utils.ts
import { formatUnits } from "viem";
var getPhaseId = (round) => {
};
var getRoundNumberInPhase = (round) => {
};
var formatRoundData = (round, decimals, description) => {
  return {
    roundId: round[0],
    answer: formatUnits(round[1], decimals),
    time: new Date(Number(round[2]) * 1e3),
    description
  };
};
async function* getLatestRoundDataForContractAddresses({
  dataFeeds,
  viemClient,
  interval = 3
}) {
  const chainLinkDataFeedFunctions = dataFeeds.map((feed) => {
    return {
      address: feed.getContract().address,
      abi: feed.getContract().abi,
      functionName: "latestRoundData"
    };
  });
  while (true) {
    const results = await viemClient.multicall({
      contracts: chainLinkDataFeedFunctions
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
    await new Promise((resolve) => setTimeout(resolve, interval * 1e3));
  }
}
var setupAllFeeds = async ({
  dataFeeds
}) => {
  await Promise.all(dataFeeds.map((feed) => feed.updateMetadata()));
  return dataFeeds;
};

export {
  getPhaseId,
  getRoundNumberInPhase,
  formatRoundData,
  getLatestRoundDataForContractAddresses,
  setupAllFeeds
};
