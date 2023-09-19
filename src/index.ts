import { Chain } from "viem/chains";
import { EACContract, EVMAddress, RoundData } from "./types.js";
import { EAC } from "./abis/EAC.js";
import {
  createPublicClient,
  fallback,
  formatUnits,
  getContract,
  http,
} from "viem";

export default class ChainLinkDataFeed {
  private contract: EACContract;
  private decimals = 0;
  private description = "";
  constructor({
    chain,
    contractAddress,
    rpcUrls,
    rank = true,
  }: {
    chain: Chain;
    contractAddress: EVMAddress;
    rpcUrls: string[];
    rank?: boolean;
  }) {
    let viemClient: ReturnType<typeof createPublicClient>;

    if (rpcUrls.length === 0) throw new Error("No RPC URLs provided");

    if ((rpcUrls.length = 1)) {
      viemClient = createPublicClient({
        batch: {
          multicall: true,
        },
        chain,
        transport: http(rpcUrls[0]),
      });
    } else {
      viemClient = createPublicClient({
        batch: {
          multicall: true,
        },
        chain,
        transport: fallback([...rpcUrls.map((url) => http(url))], {
          rank,
        }),
      });
    }

    this.contract = getContract({
      address: contractAddress,
      abi: EAC,
      publicClient: viemClient,
    });

    this.contract.read.decimals().then((decimals) => {
      this.decimals = decimals;
    });

    this.contract.read.description().then((description) => {
      this.description = description;
    });
  }

  formatRoundData(
    round:
      | [bigint, bigint, bigint, bigint, bigint]
      | readonly [bigint, bigint, bigint, bigint, bigint]
  ) {
    return {
      roundId: round[0],
      answer: formatUnits(round[1], this.decimals),
      time: new Date(Number(round[2]) * 1000),
      description: this.description,
    };
  }

  /**
   * @param format (optional) - Whether to format the result in human readable units.
   * @returns The latest round data.
   */
  async getLatestRoundData(format = true) {
    const result = await this.contract.read.latestRoundData();
    if (format) {
      return this.formatRoundData(result);
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
      yield this.formatRoundData(roundData);
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
      return this.formatRoundData(result);
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
}
