import { Chain } from "viem/chains";
import { EACContract, EVMAddress } from "./types.js";
import { EAC } from "./abis/EAC.js";
import { createPublicClient, getContract, http } from "viem";

export default class ChainLinkDataFeed {
  private contract: EACContract;
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
  }

  async getLatestRoundData() {
    return this.contract.read.latestRoundData();
  }

  /**
   *
   * @returns The asset pair that the data is for.
   */
  async getDescription() {
    return this.contract.read.description();
  }

  /**
   *
   * @returns The number of decimals the data is represented in.
   */
  async getDecimals() {
    return this.contract.read.decimals();
  }

  /**
   * @returns The current phase of the contract.
   *
   */
  async getCurrentPhase() {
    return this.contract.read.phaseId();
  }
}
