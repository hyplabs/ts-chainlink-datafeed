"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  formatRoundData: () => formatRoundData,
  getLatestRoundDataForContractAddresses: () => getLatestRoundDataForContractAddresses,
  getPhaseId: () => getPhaseId,
  getRoundNumberInPhase: () => getRoundNumberInPhase,
  setupAllFeeds: () => setupAllFeeds
});
module.exports = __toCommonJS(utils_exports);
var import_viem = require("viem");
var getPhaseId = (round) => {
};
var getRoundNumberInPhase = (round) => {
};
var formatRoundData = (round, decimals, description) => {
  return {
    roundId: round[0],
    answer: (0, import_viem.formatUnits)(round[1], decimals),
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatRoundData,
  getLatestRoundDataForContractAddresses,
  getPhaseId,
  getRoundNumberInPhase,
  setupAllFeeds
});
