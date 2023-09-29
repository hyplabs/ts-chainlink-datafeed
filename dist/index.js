import {
  formatRoundData
} from "./chunk-IZ72AKXK.js";
import {
  EAC
} from "./chunk-IV35UHEJ.js";

// src/index.ts
import { getContract } from "viem";
var ChainLinkDataFeed = class {
  contract;
  decimals = 0;
  description = "";
  constructor({
    contractAddress,
    viemClient
  }) {
    this.contract = getContract({
      address: contractAddress,
      abi: EAC,
      publicClient: viemClient
    });
  }
  async updateMetadata() {
    this.decimals = await this.contract.read.decimals();
    this.description = await this.contract.read.description();
  }
  /**
   * @param format (optional) - Whether to format the result in human readable units.
   * @returns The latest round data.
   */
  async getLatestRoundData(format = true) {
    const result = await this.contract.read.latestRoundData();
    if (format) {
      return formatRoundData(result, this.decimals, this.description);
    }
    return result;
  }
  async *getRoundDataInterval(intervalSeconds) {
    let lastRoundId = 0n;
    while (true) {
      const roundData = await this.contract.read.latestRoundData();
      if (lastRoundId === roundData[0]) {
        await new Promise(
          (resolve) => setTimeout(resolve, intervalSeconds * 1e3)
        );
        continue;
      }
      lastRoundId = roundData[0];
      yield formatRoundData(roundData, this.decimals, this.description);
      await new Promise(
        (resolve) => setTimeout(resolve, intervalSeconds * 1e3)
      );
    }
  }
  /**
   * Retrieves round data for a given round ID.
   * @param roundId The ID of the round to retrieve data for.
   * @param format Whether or not to format the result.
   * @returns The round data, optionally formatted.
   */
  async getRoundData(roundId, format = true) {
    const result = await this.contract.read.getRoundData([roundId]);
    if (format) {
      return formatRoundData(result, this.decimals, this.description);
    }
    return result;
  }
  /**
   *
   * @returns The asset pair that the data is for.
   */
  getDescription() {
    return this.description;
  }
  /**
   *
   * @returns The number of decimals the data is represented in.
   */
  getDecimals() {
    return this.decimals;
  }
  /**
   * @returns The current phase of the contract.
   *
   */
  async getCurrentPhase() {
    return this.contract.read.phaseId();
  }
  getContract() {
    return this.contract;
  }
};
export {
  ChainLinkDataFeed as default
};
