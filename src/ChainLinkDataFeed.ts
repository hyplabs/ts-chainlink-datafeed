import type { Chain } from "viem/chains";
import { EAC } from "./abis/EAC.js";
import type {
  GetContractReturnType,
  HttpTransport,
  PublicClient,
  Transport,
} from "viem";
import { createPublicClient, getContract } from "viem";
import { formatRoundData } from "./utils.js";

type EACContract = GetContractReturnType<
  typeof EAC,
  PublicClient<HttpTransport, Chain>
>;

type EVMAddress = `0x${string}`;

type RoundDataFormatted = ReturnType<typeof formatRoundData>;

/**
 * A ChainLink data feed.
 */
export default class ChainLinkDataFeed {
  public contract: EACContract;
  public decimals = 0;
  public description = "";
  public contractAddress: EVMAddress;
  public isWorking = true;
  constructor({
    contractAddress,
    viemClient,
  }: {
    contractAddress: EVMAddress;
    viemClient: PublicClient<Transport, Chain>;
    rank?: boolean;
  }) {
    this.contractAddress = contractAddress;
    this.contract = getContract({
      address: contractAddress,
      abi: EAC,
      client: viemClient,
    });
  }

  async updateMetadata() {
    try {
      this.decimals = await this.contract.read.decimals();
      this.description = await this.contract.read.description();
    } catch (e) {
      this.isWorking = false;
    }
  }

  /**
   * @param format (optional) - Whether to format the result in human readable units.
   * @returns The latest round data.
   */
  async getLatestRoundData(format: true): Promise<RoundDataFormatted>;
  async getLatestRoundData(
    format: false
  ): Promise<readonly [bigint, bigint, bigint, bigint, bigint]>;
  async getLatestRoundData(format: boolean) {
    const result = await this.contract.read.latestRoundData();
    if (format) {
      return formatRoundData(result, this.decimals, this.description);
    }
    return result;
  }

  async *getRoundDataInterval(intervalSeconds: number) {
    let lastRoundId = 0n;
    while (true) {
      const roundData = await this.contract.read.latestRoundData();
      // Skip if the round ID is the same as the last one
      if (lastRoundId === roundData[0]) {
        await new Promise((resolve) =>
          setTimeout(resolve, intervalSeconds * 1000)
        );
        continue;
      }
      lastRoundId = roundData[0];
      yield formatRoundData(roundData, this.decimals, this.description);
      await new Promise((resolve) =>
        setTimeout(resolve, intervalSeconds * 1000)
      );
    }
  }

  /**
   * Retrieves round data for a given round ID.
   * @param roundId The ID of the round to retrieve data for.
   * @param format Whether or not to format the result.
   * @returns The round data, optionally formatted.
   */
  async getRoundData(roundId: bigint, format = true) {
    const result = await this.contract.read.getRoundData([roundId]);
    if (format) {
      return formatRoundData(result, this.decimals, this.description);
    }
    return result;
  }

  /**
   * @returns The current phase of the contract.
   *
   */
  async getCurrentPhase() {
    return this.contract.read.phaseId();
  }

  async getPhaseAggregator() {
    const phaseId = await this.contract.read.phaseId();
    const aggregator = await this.contract.read.phaseAggregators([phaseId]);
    return aggregator as EVMAddress;
  }
}
