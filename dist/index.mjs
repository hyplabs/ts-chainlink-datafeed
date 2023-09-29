import { formatUnits, getContract } from 'viem';

const EAC = [
  {
    inputs: [
      { internalType: "address", name: "_aggregator", type: "address" },
      { internalType: "address", name: "_accessController", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "int256",
        name: "current",
        type: "int256"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256"
      }
    ],
    name: "AnswerUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "startedBy",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startedAt",
        type: "uint256"
      }
    ],
    name: "NewRound",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" }
    ],
    name: "OwnershipTransferRequested",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "accessController",
    outputs: [
      {
        internalType: "contract AccessControllerInterface",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "aggregator",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_aggregator", type: "address" }],
    name: "confirmAggregator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_roundId", type: "uint256" }],
    name: "getAnswer",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_roundId", type: "uint256" }],
    name: "getTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "latestAnswer",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "latestRound",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "latestTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    name: "phaseAggregators",
    outputs: [
      {
        internalType: "contract AggregatorV2V3Interface",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "phaseId",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_aggregator", type: "address" }],
    name: "proposeAggregator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "proposedAggregator",
    outputs: [
      {
        internalType: "contract AggregatorV2V3Interface",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "proposedGetRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "proposedLatestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_accessController", type: "address" }
    ],
    name: "setController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_to", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];

const formatRoundData = (round, decimals, description) => {
  return {
    roundId: round[0],
    answer: formatUnits(round[1], decimals),
    time: new Date(Number(round[2]) * 1e3),
    description
  };
};

class ChainLinkDataFeed {
  contract;
  decimals = 0;
  description = "";
  contractAddress;
  isWorking = true;
  constructor({
    contractAddress,
    viemClient
  }) {
    this.contractAddress = contractAddress;
    this.contract = getContract({
      address: contractAddress,
      abi: EAC,
      publicClient: viemClient
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
   * @returns The current phase of the contract.
   *
   */
  async getCurrentPhase() {
    return this.contract.read.phaseId();
  }
  async getPhaseAggregator() {
    const phaseId = await this.contract.read.phaseId();
    const aggregator = await this.contract.read.phaseAggregators([phaseId]);
    return aggregator;
  }
}

export { ChainLinkDataFeed as default };
