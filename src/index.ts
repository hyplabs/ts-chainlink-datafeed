import { Chain } from "viem/chains";
import { EACContract, EVMAddress } from "./types.js";
import { EAC } from "./abis/EAC.js";
import { createPublicClient, formatUnits, getContract, http } from "viem";

export default class ChainLinkDataFeed {
  private contract: EACContract;
  private decimals = 0;
  private description = "";
  constructor({
    chain,
    contractAddress,
    rpcUrl,
  }: {
    chain: Chain;
    contractAddress: EVMAddress;
    rpcUrl: string;
  }) {
    const viemClient = createPublicClient({
      batch: {
        multicall: true,
      },
      chain,
      transport: http(rpcUrl),
    });

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

  format(
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
      return this.format(result);
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
