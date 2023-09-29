import { Chain as Chain$1 } from 'viem/chains';
import * as viem from 'viem';
import { GetContractReturnType, PublicClient, HttpTransport, Chain, createPublicClient, WebSocketTransport } from 'viem';

declare const EAC: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_aggregator";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_accessController";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "int256";
        readonly name: "current";
        readonly type: "int256";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "roundId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "updatedAt";
        readonly type: "uint256";
    }];
    readonly name: "AnswerUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "roundId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "startedBy";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "startedAt";
        readonly type: "uint256";
    }];
    readonly name: "NewRound";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferRequested";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferred";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "acceptOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "accessController";
    readonly outputs: readonly [{
        readonly internalType: "contract AccessControllerInterface";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "aggregator";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_aggregator";
        readonly type: "address";
    }];
    readonly name: "confirmAggregator";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly internalType: "uint8";
        readonly name: "";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "description";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_roundId";
        readonly type: "uint256";
    }];
    readonly name: "getAnswer";
    readonly outputs: readonly [{
        readonly internalType: "int256";
        readonly name: "";
        readonly type: "int256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint80";
        readonly name: "_roundId";
        readonly type: "uint80";
    }];
    readonly name: "getRoundData";
    readonly outputs: readonly [{
        readonly internalType: "uint80";
        readonly name: "roundId";
        readonly type: "uint80";
    }, {
        readonly internalType: "int256";
        readonly name: "answer";
        readonly type: "int256";
    }, {
        readonly internalType: "uint256";
        readonly name: "startedAt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "updatedAt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint80";
        readonly name: "answeredInRound";
        readonly type: "uint80";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_roundId";
        readonly type: "uint256";
    }];
    readonly name: "getTimestamp";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestAnswer";
    readonly outputs: readonly [{
        readonly internalType: "int256";
        readonly name: "";
        readonly type: "int256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestRound";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestRoundData";
    readonly outputs: readonly [{
        readonly internalType: "uint80";
        readonly name: "roundId";
        readonly type: "uint80";
    }, {
        readonly internalType: "int256";
        readonly name: "answer";
        readonly type: "int256";
    }, {
        readonly internalType: "uint256";
        readonly name: "startedAt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "updatedAt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint80";
        readonly name: "answeredInRound";
        readonly type: "uint80";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestTimestamp";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly internalType: "address payable";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint16";
        readonly name: "";
        readonly type: "uint16";
    }];
    readonly name: "phaseAggregators";
    readonly outputs: readonly [{
        readonly internalType: "contract AggregatorV2V3Interface";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "phaseId";
    readonly outputs: readonly [{
        readonly internalType: "uint16";
        readonly name: "";
        readonly type: "uint16";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_aggregator";
        readonly type: "address";
    }];
    readonly name: "proposeAggregator";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "proposedAggregator";
    readonly outputs: readonly [{
        readonly internalType: "contract AggregatorV2V3Interface";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint80";
        readonly name: "_roundId";
        readonly type: "uint80";
    }];
    readonly name: "proposedGetRoundData";
    readonly outputs: readonly [{
        readonly internalType: "uint80";
        readonly name: "roundId";
        readonly type: "uint80";
    }, {
        readonly internalType: "int256";
        readonly name: "answer";
        readonly type: "int256";
    }, {
        readonly internalType: "uint256";
        readonly name: "startedAt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "updatedAt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint80";
        readonly name: "answeredInRound";
        readonly type: "uint80";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "proposedLatestRoundData";
    readonly outputs: readonly [{
        readonly internalType: "uint80";
        readonly name: "roundId";
        readonly type: "uint80";
    }, {
        readonly internalType: "int256";
        readonly name: "answer";
        readonly type: "int256";
    }, {
        readonly internalType: "uint256";
        readonly name: "startedAt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "updatedAt";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint80";
        readonly name: "answeredInRound";
        readonly type: "uint80";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_accessController";
        readonly type: "address";
    }];
    readonly name: "setController";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_to";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "version";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];

declare const formatRoundData: (round: [
    bigint,
    bigint,
    bigint,
    bigint,
    bigint
] | readonly [
    bigint,
    bigint,
    bigint,
    bigint,
    bigint
], decimals: number, description: string) => {
    roundId: bigint;
    answer: string;
    time: Date;
    description: string;
};
declare const formatLogWithMetadata: (current: bigint, decimals: number, roundId: bigint, updatedAt: bigint, description: string) => {
    roundId: bigint;
    current: string;
    updatedAt: Date;
    description: string;
};
declare const setupAllFeeds: ({ dataFeeds, }: {
    dataFeeds: ChainLinkDataFeed[];
}) => Promise<ChainLinkDataFeed[]>;

type EVMAddress = `0x${string}`;
type EACContract = GetContractReturnType<typeof EAC, PublicClient<HttpTransport, Chain>>;

declare class ChainLinkDataFeed {
    contract: EACContract;
    decimals: number;
    description: string;
    contractAddress: EVMAddress;
    isWorking: boolean;
    constructor({ contractAddress, viemClient, }: {
        chain: Chain$1;
        contractAddress: EVMAddress;
        viemClient: ReturnType<typeof createPublicClient>;
        rank?: boolean;
    });
    updateMetadata(): Promise<void>;
    /**
     * @param format (optional) - Whether to format the result in human readable units.
     * @returns The latest round data.
     */
    getLatestRoundData(format?: boolean): Promise<readonly [bigint, bigint, bigint, bigint, bigint] | {
        roundId: bigint;
        answer: string;
        time: Date;
        description: string;
    }>;
    getRoundDataInterval(intervalSeconds: number): AsyncGenerator<{
        roundId: bigint;
        answer: string;
        time: Date;
        description: string;
    }, void, unknown>;
    /**
     * Retrieves round data for a given round ID.
     * @param roundId The ID of the round to retrieve data for.
     * @param format Whether or not to format the result.
     * @returns The round data, optionally formatted.
     */
    getRoundData(roundId: bigint, format?: boolean): Promise<readonly [bigint, bigint, bigint, bigint, bigint] | {
        roundId: bigint;
        answer: string;
        time: Date;
        description: string;
    }>;
    /**
     * @returns The current phase of the contract.
     *
     */
    getCurrentPhase(): Promise<number>;
    getPhaseAggregator(): Promise<`0x${string}`>;
}

declare const arbitrumDataFeeds: {
    readonly "AAVE / USD": "0xad1d5344aade45f43e596773bcc4c423eabdd034";
    readonly "LINK / USD": "0x86e53cf1b870786351da77a57575e79cb55812cb";
    readonly "USDC / USD": "0x50834f3163758fcc1df9973b6e91f0f0f0434ad3";
    readonly "DAI / USD": "0xc5c8e77b397e531b8ec06bfb0048328b30e9ecfb";
    readonly "BTC / USD": "0x6ce185860a4963106506c203335a2910413708e9";
    readonly "USDT / USD": "0x3f3f5df88dc9f13eac63df89ec16ef6e7e25dde7";
    readonly "ETH / USD": "0x639fe6ab55c921f74e7fac1ee960c0b6293ba612";
    readonly "KRW / USD": "0x85bb02e0ae286600d1c68bb6ce22cc998d411916";
    readonly "EUR / USD": "0xa14d53bc1f1c0f31b4aa3bd109344e5009051a84";
    readonly "AUD / USD": "0x9854e9a850e7c354c1de177ea953a6b1fba8fc22";
    readonly "CNY / USD": "0xcc3370bde6afe51e1205a5038947b9836371eccb";
    readonly "YFI / USD": "0x745ab5b69e01e2be1104ca84937bb71f96f5fb21";
    readonly "UNI / USD": "0x9c917083fdb403ab5adbec26ee294f6ecada2720";
    readonly "SUSHI / USD": "0xb2a8ba74cbca38508ba1632761b56c897060147c";
    readonly "CHF / USD": "0xe32accc8c4ec03f6e75bd3621bfc9fbb234e1fc3";
    readonly "SPELL / USD": "0x383b3624478124697bef675f07ca37570b73992f";
    readonly "BTC / ETH": "0xc5a90a6d7e4af242da238ffe279e9f2ba0c64b2e";
    readonly "PAXG / USD": "0x2ba975d4d7922cd264267af16f3bd177f206fe3c";
    readonly "wstETH / stETH Exchange Rate": "0xb1552c5e96b312d0bf8b554186f846c40614a540";
    readonly "AXS / USD": "0x5b58aa6e0651ae311864876a55411f481ad86080";
    readonly "MKR / USD": "0xde9f0894670c4efcacf370426f10c3ad2cdf147e";
    readonly "XAG / USD": "0xc56765f04b248394cf1619d20db8082edbfa75b1";
    readonly "DOT / USD": "0xa6bc5baf2000424e90434ba7104ee399dee80dec";
    readonly "APE / USD": "0x221912ce795669f628c51c69b7d0873eda9c03bb";
    readonly "DOGE / USD": "0x9a7fb1b3950837a8d9b40517626e11d4127c098c";
    readonly "MAGIC / USD": "0x47e55ccec6582838e173f252d08afd8116c2202d";
    readonly "DPX / USD": "0xc373b9db0707fd451bc56ba5e9b029ba26629df0";
    readonly "COMP / USD": "0xe7c53ffd03eb6cef7d208bc4c13446c76d1e5884";
    readonly "BAL / USD": "0xbe5ea816870d11239c543f84b71439511d70b94f";
    readonly "KNC / USD": "0xbf539d4c2106dd4d9ab6d56aed3d9023529db145";
    readonly "XRP / USD": "0xb4ad57b52ab9141de9926a3e0c8dc6264c2ef205";
    readonly "ADA / USD": "0xd9f615a9b820225edba2d821c4a696a0924051c6";
    readonly "NEAR / USD": "0xbf5c3fb2633e924598a46b9d07a174a9dbcf57c0";
    readonly "ATOM / USD": "0xcda67618e51762235eaca373894f0c79256768fa";
    readonly "MATIC / USD": "0x52099d4523531f678dfc568a7b1e5038aadce1d6";
    readonly "rETH / ETH Exchange Rate": "0xf3272cafe65b190e76caaf483db13424a3e23dd2";
    readonly "SOL / USD": "0x24cea4b8ce57cda5058b924b9b9987992450590c";
    readonly "CRV / USD": "0xaebda2c976cfd1ee1977eac079b4382acb849325";
    readonly "DODO / USD": "0xa33a06c119ec08f92735f9cca37e07af08c4f281";
    readonly "OHMv2 / USD": "0x761aaebf021f19f198d325d7979965d0c7c9e53b";
    readonly "SGD / USD": "0xf0d38324d1f86a176ac727a4b0c43c9f9d9c5eb1";
    readonly "SEK / USD": "0xde89a55d04ded40a410877ab87d4f567ee66a1f0";
    readonly "CAD / USD": "0xf6da27749484843c4f02f5ad1378cee723dd61d4";
    readonly "JPY / USD": "0x3dd6e51cb9cae717d5a8778cf79a04029f9cfdf8";
    readonly "CVX / USD": "0x851175a919f36c8e30197c09a9a49da932c2cc00";
    readonly "GBP / USD": "0x9c4424fd84c6661f97d8d6b3fc3c1aac2bedd137";
    readonly "FXS / USD": "0x36a121448d74fa81450c992a1a44b9b7377cd3a5";
    readonly "XAU / USD": "0x1f954dc24a49708c26e0c1777f16750b5c6d5a2c";
    readonly "BNB / USD": "0x6970460aabf80c5be983c6b74e5d06dedca95d4a";
    readonly "WBTC / USD": "0xd0c7101eacbb49f3decccc166d238410d6d46d57";
    readonly "NFT Blue Chip Total Market Cap": "0x8d0e319ebaa8df32e088e469062f85abf2ebe599";
    readonly "GMX / USD": "0xdb98056fecfff59d032ab628337a4887110df3db";
    readonly "BUSD / USD": "0x8fcb0f3715a82d83270777b3a5f3a7cf95ce8eec";
    readonly "USDD / USD": "0x4ee1f9ec1048979930ac832a3c1d18a0b4955a02";
    readonly "wstETH / ETH": "0xb523ae262d20a936bc152e6023996e46fdc2a95d";
    readonly "cbETH / ETH": "0xa668682974e3f121185a3cd94f00322bec674275";
    readonly "stETH / ETH": "0xded2c52b75b24732e9107377b7ba93ec1ffa4baf";
    readonly "JOE / USD": "0x04180965a782e487d0632013aba488a472243542";
    readonly "RDNT / USD": "0x20d0fcab0ecfd078b036b6caf1fac69a6453b352";
    readonly "TUSD / USD": "0x6fabee62266da6686ee2744c6f15bb8352d2f28d";
    readonly "LUSD / USD": "0x0411d28c94d85a36bc72cb0f875dfa8371d8ffff";
    readonly "ARB / USD": "0xb2a824043730fe05f3da2efafa1cbbe83fa548d6";
    readonly "WBTC / BTC": "0x0017abac5b6f291f9164e35b1234ca1d697f9cf4";
    readonly "stETH / USD": "0x07c5b924399cc23c24a95c8743de4006a32b7f2a";
    readonly "Frax / USD": "0x0809e3d38d1b4214958faf06d8b1b1a2b73f2ab8";
    readonly "BRL / USD": "0x04b7384473a2adf1903e3a98acac5d62ba8c2702";
    readonly "GNS / USD": "0xe89e98ce4e19071e59ed4780e0598b541ce76486";
    readonly "frxETH / ETH Exchange Rate High": "0x5c3e80763862cb777aa07bddbcce0123104e1c34";
    readonly "1INCH / USD": "0x4bc735ef24bf286983024cad5d03f0738865aaef";
    readonly "TRY / USD": "0xe8f8afe4b56c6c421f691bfac225ce61b2c7cd05";
    readonly "FTM / USD": "0xfeac1a3936514746e70170c0f539e70b23d36f19";
    readonly "CAKE / USD": "0x256654437f1ada8057684b18d742efd14034c400";
    readonly "RPL / USD": "0xf0b7159bbfc341cc41e7cb182216f62c6d40533d";
    readonly "OP / USD": "0x205aad468a11fd5d34fa7211bc6bad5b3deb9b98";
    readonly "SNX / USD": "0x054296f0d036b95531b4e14afb578b80cfb41252";
    readonly "StaFi Staked ETH rETH / ETH Exchange Rate": "0x052d4200b624b07262f574af26c71a6553996ab5";
    readonly "frxETH / ETH Exchange Rate Low": "0x1bd872f3a606471787b1a304ce0356e4e87af930";
    readonly "STG / USD": "0xe74d69e233fab0d8f48921f2d93adfde44ceb3b7";
    readonly "PENDLE / USD": "0x66853e19d73c0f9301fe099c324a1e9726953433";
    readonly "LDO / USD": "0xa43a34030088e6510feccfb77e88ee5e7ed0fe64";
    readonly "IOTX / USD": "0x484a1b29ed1ea038dbd75d7c7293714343363122";
};

declare const avalancheDataFeeds: {
    readonly "LINK / USD": "0x49ccd9ca821efeab2b98c60dc60f518e765ede9a";
    readonly "USDT / USD": "0xebe676ee90fe1112671f19b6b7459bc678b67e8a";
    readonly "DAI / USD": "0x51d7180eda2260cc4f6e4eebb82fef5c3c2b8300";
    readonly "AVAX / USD": "0x0a77230d17318075983913bc2145db16c7366156";
    readonly "BTC / USD": "0x2779d32d5166baaa2b2b658333ba7e6ec0c65743";
    readonly "ETH / USD": "0x976b3d034e162d8bd72d6b9c989d545b839003b0";
    readonly "AAVE / USD": "0x3ca13391e9fb38a75330fb28f8cc2eb3d9ceceed";
    readonly "USDC / USD": "0xf096872672f44d6eba71458d74fe67f9a77a23b9";
    readonly "FRAX / USD": "0xbba56ef1565354217a3353a466edb82e8f25b08e";
    readonly "SUSHI / USD": "0x449a373a090d8a1e5f74c63ef831ceff39e94563";
    readonly "ALPHA / USD": "0x7b0ca9a6d03fe0467a31ca850f5bca51e027b3af";
    readonly "JPY / USD": "0xf8b283ad4d969ecfd70005714dd5910160565b94";
    readonly "KNC / USD": "0x9df2195dc96e6ef983b1aac275649f3f28f82aa1";
    readonly "XAU / USD": "0x1f41ef93dece881ad0b98082b2d44d3f6f0c515b";
    readonly "EUR / USD": "0x192f2dba961bb0277520c082d6bfa87d5961333e";
    readonly "CVX / USD": "0x52f8026423b5e04fdd9e4b5725b68230b71d019b";
    readonly "FXS / USD": "0x12af94c3716bbf339aa26bfd927ddde63b27d50c";
    readonly "XAVA / USD": "0x4cf57dc9028187b9daaf773c8eca941036989238";
    readonly "MIMATIC / USD": "0x5d1f504211c17365ca66353442a74d4435a8b778";
    readonly "CAKE / USD": "0x79bd0edd79db586f22ff300b602e85a662fc1208";
    readonly "TRY / USD": "0xa61bf273688ea095b5e4c11f1af5e763f7aeee91";
    readonly "TUSD / USD": "0x9cf3ef104a973b351b2c032aa6793c3a6f76b448";
    readonly "UNI / USD": "0x9a1372f9b1b71b3a5a72e092ae67e172dbd7daaa";
    readonly "YFI / USD": "0x28043b1ebd41860b93ec1f1ec19560760b6db556";
    readonly "COMP / USD": "0x9d6aa0ac8c4818433bea7a74f49c73b57bcec4ec";
    readonly "SNX / USD": "0x01752eaab988ecb0ceba2c8fc97c4f1d38bf246d";
    readonly "MKR / USD": "0x3e54eb0475051401d093702a5db84efa1ab77b14";
    readonly "APE / USD": "0xf0981a2bde30cf767080d80b93beca6204dcc54a";
    readonly "BAT / USD": "0xe89b3ce86d25599d1e615c0f6a353b4572ff868d";
    readonly "ZRX / USD": "0xc07cdf938aa113741fb639bf39699926123fb58b";
    readonly "BTC.b": "0x99311b4bf6d8e3d3b4b9fbdd09a1b0f4ad8e06e9";
    readonly "DAI.e PoR": "0x976d7fac81a49fa71ef20694a3c56b9efb93c30b";
    readonly "AAVE.e PoR": "0x14c4c668e34c09e1fba823ad5db47f60aebdd4f7";
    readonly "WBTC.e PoR": "0xebefeaa58636df9b20a4fad78fad8759e6a20e87";
    readonly "WETH.e PoR": "0xddaf9290d057bfa12d7576e6dadc109421f31948";
    readonly "Link.e PoR": "0x943cef1b112ca9fd7edadc9a46477d3812a382b6";
    readonly "USDT.e PoR": "0x94d8c2548018c27f1aa078a23c4158206be1cc72";
    readonly "USDC.e PoR": "0x63769951e4cfdbdc653dd9bbde63d2ce0746e5f2";
    readonly "GMX / USD": "0x3f968a21647d7ca81fb8a5b69c0a452701d5dce8";
    readonly "FTT / USD": "0x4f2eaebdd835ebe9108e718c0b6551e868381a88";
    readonly "FTM / USD": "0x2dd517b2f9ba49cedb0573131fd97a5ac19ff648";
    readonly "OHMv2 / USD": "0x1fa4fc8e55939fc511d048e1cecafb4b2d30f9eb";
    readonly "BUSD / USD": "0x827f8a0dc5c943f7524dda178e2e7f275aad743f";
    readonly "SPELL / USD": "0x4f3ddf9378a4865cf4f28be51e10aecb83b7daee";
    readonly "QI / USD": "0x36e039e6391a5e7a7267650979fdf613f659be5d";
    readonly "WBTC / USD": "0x86442e3a98558357d46e6182f4b262f76c4fa26f";
    readonly "WOO / ETH": "0xfaa665f5a0e13beea63b6dff601dd634959690df";
    readonly "JOE / USD": "0x02d35d3a8ac3e1626d3ee09a78dd87286f5e8e3a";
    readonly "CRV / USD": "0x7cf8a6090a9053b01f3df4d4e6cfedd8c90d9027";
    readonly "FIL / USD": "0x2f194315f122d374a27973e259783d5c864a5bf6";
};

declare const baseDataFeeds: {
    readonly "rETH / ETH": "0xf397bf97280b488ca19ee3093e81c0a77f02e9a5";
    readonly "SOL / USD": "0x975043adbb80fc32276cbf9bbcfd4a601a12462d";
    readonly "cbETH / ETH Exchange Rate": "0x868a501e68f3d1e89cfc0d22f6b22e8dabce5f04";
    readonly "wstETH / ETH Exchange Rate": "0xa669e5272e60f78299f4824495ce01a3923f4380";
    readonly "wstETH / stETH Exchange Rate": "0xb88bac61a4ca37c43a3725912b1f472c9a5bc061";
    readonly "APT / USD": "0x88a98431c25329aa422b21d147c1518b34dd36f4";
    readonly "stETH / ETH": "0xf586d0728a47229e747d824a939000cf21def5a0";
    readonly "LINK / USD": "0x17cab8fe31e32f08326e5e27412894e49b0f9d65";
    readonly "COMP / USD": "0x9dda783de64a9d1a60c49ca761ebe528c35ba428";
    readonly "WBTC / USD": "0xccadc697c55bbb68dc5bcdf8d3cbe83cdd4e071e";
    readonly "USDT / USD": "0xf19d560eb8d2adf07bd6d13ed03e1d11215721f9";
    readonly "cbETH / ETH": "0x806b4ac04501c29769051e42783cf04dce41440b";
    readonly "DAI / USD": "0x591e79239a7d679378ec8c847e5038150364c78f";
    readonly "ETH / USD": "0x71041dddad3595f9ced3dccfbe3d1f4b0a16bb70";
    readonly "USDC / USD": "0x7e860098f58bbfc8648a4311b374b1d669a2bc6b";
    readonly "LINK / ETH": "0xc5e65227fe3385b88468f9a01600017cdc9f3a12";
    readonly "sfrxETH / frxETH Exchange Rate": "0x1eba1d6941088c8fce2cbcac80754c77871ad093";
    readonly "SNX / USD": "0xe3971ed6f1a5903321479ef3148b5950c0612075";
    readonly "cbETH / USD": "0xd7818272b9e248357d13057aab0b417af31e817d";
};

declare const bscDataFeeds: {
    readonly "BNB / USD": "0x0567f2323251f0aab15c8dfb1967e4e8a7d42aee";
    readonly "ETH / USD": "0x9ef1b8c0e4f7dc8bf5719ea496883dc6401d5b2e";
    readonly "BTC / USD": "0x264990fbd0a4796a3e3d8e37c4d5f87a3aca5ebf";
    readonly "BTC / BNB": "0x116eeb23384451c78ed366d4f67d5ad44ee771a0";
    readonly "USDT / BNB": "0xd5c40f5144848bd4ef08a9605d860e727b991513";
    readonly "USDC / BNB": "0x45f86ca2a8bc9ebd757225b19a1a0d7051be46db";
    readonly "ETH / BNB": "0x63d407f32aa72e63c7209ce1c2f5da40b3aae726";
    readonly "BUSD / BNB": "0x87ea38c9f24264ec1fff41b04ec94a97caf99941";
    readonly "BCH / USD": "0x43d80f616daf0b0b42a928eed32147dc59027d41";
    readonly "XVS / USD": "0xbf63f430a79d4036a5900c19818aff1fa710f206";
    readonly "USDC / USD": "0x51597f405303c4377e36123cbc172b13269ea163";
    readonly "SXP / USD": "0xe188a9875af525d25334d75f3327863b2b8cd0f1";
    readonly "LTC / USD": "0x74e72f37a8c415c8f1a98ed42e78ff997435791d";
    readonly "BUSD / USD": "0xcbb98864ef56e9042e7d2efef76141f15731b82f";
    readonly "LINK / USD": "0xca236e327f629f9fc2c30a4e95775ebf0b89fac8";
    readonly "USDT / USD": "0xb97ad0e74fa7d920791e90258a6e2085088b4320";
    readonly "FIL / USD": "0xe5dbfd9003bff9df5feb2f4f445ca00fb121fb83";
    readonly "XRP / USD": "0x93a67d414896a280bf8ffb3b389fe3686e014fda";
    readonly "DOT / USD": "0xc333eb0086309a16aa7c8308dfd32c8bba0a2592";
    readonly "XAU / USD": "0x86896feb19d8a607c3b11f2af50a0f239bd71cd0";
    readonly "YFI / USD": "0xd7eaa5bf3013a96e3d515c055dbd98dbdc8c620d";
    readonly "XAG / USD": "0x817326922c909b16944817c207562b25c4df16ad";
    readonly "TRX / USD": "0xf4c5e535756d11994fcbb12ba8add0192d9b88be";
    readonly "XTZ / BNB": "0x8264d6983b219be65c4d62f1c82b3a2999944cf2";
    readonly "YFI / BNB": "0xf841761481df19831ccc851a54d8350ae6022583";
    readonly "LINA / USD": "0x38393201952f2764e04b290af9df427217d56b41";
    readonly "LINK / BNB": "0xb38722f6a608646a538e882ee9972d15c86fc597";
    readonly "ADA / BNB": "0x2d5fc41d1365ffe13d03d91e82e04ca878d69f4b";
    readonly "BAND / BNB": "0x3334bf7ec892ca03d1378b51769b7782eaf318c4";
    readonly "XRP / BNB": "0x798a65d349b2b5e6645695912880b54dffd79074";
    readonly "BCH / BNB": "0x2a548935a323bb7329a5e3f1667b979f16bc890b";
    readonly "CREAM / BNB": "0x6f55dfaf098a813d87bb4e6392275b502360bb9d";
    readonly "EOS / BNB": "0xed93f3764334788f2f6628b30e505fe1fc5d1d7b";
    readonly "DOT / BNB": "0xba8683e9c3b1455be6e18e7768e8cad95eb5ed49";
    readonly "LTC / BNB": "0x4e5a43a79f53c0a8e83489648ea7e429278f8b2d";
    readonly "UNI / USD": "0xb57f259e7c24e56a1da00f66b55a5640d9f9e7e4";
    readonly "JPY / USD": "0x22db8397a6e77e41471de256a7803829fdc8bc57";
    readonly "EUR / USD": "0x0bf79f617988c472dca68ff41efe1338955b9a80";
    readonly "WOO / USD": "0x02bfe714e78e2ad1bb1c2bee93ec8dc5423b66d4";
    readonly "ATOM / USD": "0xb056b7c804297279a9a673289264c17e6dc6055d";
    readonly "ALPHA / BNB": "0x7bc032a7c19b1bdcb981d892854d090cfb0f238e";
    readonly "CAKE / BNB": "0xcb23da9ea243f53194cbc2380a6d4d9bc046161f";
    readonly "TWT / BNB": "0x7e728dfa6bca9023d9abee759fdf56beab8ac7ad";
    readonly "DF / USD": "0x1b816f5e122efa230300126f97c018716c4e47f5";
    readonly "PAXG / USD": "0x7f8cad4690a38ac28bda3d132ef83db1c17557df";
    readonly "YFII / USD": "0xc94580faaf145b2fd0ab5215031833c98d3b77e4";
    readonly "AUTO / USD": "0x88e71e6520e5ac75f5338f5f0c9ded9d4f692cda";
    readonly "XTZ / USD": "0x9a18137adcf7b05f033ad26968ed5a9cf0bf8e6b";
    readonly "DOGE / USD": "0x3ab0a0d137d4f946fbb19eecc6e92e64660231c8";
    readonly "EOS / USD": "0xd5508c8ffdb8f15ce336e629fd4ca9adb48f50f0";
    readonly "WING / USD": "0xf7e7c0ffcb11dac6eca1434c67fab9ae000e10a7";
    readonly "ONT / USD": "0x887f177cbed2cf555a64e7bf125e1825eb69db82";
    readonly "CFX / USD": "0xe3ca2f3bad1d8327820f648c759f17162b5383ae";
    readonly "COMP / USD": "0x0db8945f9aef5651fa5bd52314c5aae78dfde540";
    readonly "SOL / USD": "0x0e8a53dd9c13589df6382f13da6b3ec8f919b323";
    readonly "LIT / USD": "0x83766ba8d964feaed3819b145a69c947df9cb035";
    readonly "REEF / USD": "0x46f13472a4d4fec9e07e8a00ee52f4fa77810736";
    readonly "ZIL /USD": "0x3e3aa4fc329529c8ab921c810850626021dba7e6";
    readonly "AAVE / USD": "0xa8357bf572460fc40f4b0acacbb2a6a61c89f475";
    readonly "ICP / USD": "0x84210d9013a30c6ab169e28840a6cc54b60fa042";
    readonly "MATIC / USD": "0x7ca57b0ca6367191c94c8914d7df09a57655905f";
    readonly "XVS / BNB": "0xf369a13e7f2449e58dde8302f008ee9131f8d859";
    readonly "BTC / ETH": "0xf1769eb4d1943af02ab1096d7893759f6177d6b8";
    readonly "BETH / USD": "0x2a3796273d47c4ed363b361d3aefb7f7e2a13782";
    readonly "BIFI / USD": "0xab827b69dacd586a37e80a7d552a4395d576e645";
    readonly "CHR / USD": "0x1f771b2b1f3c3db6c7a1d5f38961a49cecd116da";
    readonly "MASK / USD": "0x4978c0abe6899178c1a74838ee0062280888e2cf";
    readonly "ALPACA / USD": "0xe0073b60833249ffd1bb2af809112c2fbf221df6";
    readonly "CHF / USD": "0x964261740356cb4aad0c3d2003ce808a4176a46d";
    readonly "FET / USD": "0x657e700c66c48c135c4a29c4292908dbda7aa280";
    readonly "INJ / USD": "0x63a9133cd7c611d6049761038c16f238fdda71d7";
    readonly "TUSD / USD": "0xa3334a9762090e827413a7495afece76f41dfc06";
    readonly "CAKE / USD": "0xb6064ed41d4f67e353768aa239ca86f4f73665a1";
    readonly "DODO / USD": "0x87701b15c08687341c2a847ca44ecfbc8d7873e1";
    readonly "sAVAX / USD": "0x3b37c6f1e3207de5a4664e837072bd9a25269b39";
    readonly "KNC / USD": "0xf2f8273f6b9fc22c90891dc802caf60eef805cdf";
    readonly "NEAR / USD": "0x0fe4d87883005fcafaf56b81d09473d9a29dcdc3";
    readonly "SGD / USD": "0x3065b2369820f76c829b9bbcaf4b90f9f47d6314";
    readonly "KLAY / USD": "0xfd07b211044572898cdbcb1435f0a1369fd15726";
    readonly "VET / USD": "0x9f1fd2cef7b226d555a747da0411f93c5fe74e13";
    readonly "SPELL / USD": "0x47e01580c537cd47da339ea3a4afb5998ccf037c";
    readonly "CRV / USD": "0x2e1c3b6fcae47b20dd343d9354f7b1140a1e6b27";
    readonly "AUD / USD": "0x498f912b09b5df618c77fcc9e8da503304df92bf";
    readonly "FTT / USD": "0x38e05754eb00171cbe72ba1ee792933d6e8d2891";
    readonly "SHIB / USD": "0xa615be6cb0f3f36a641858db6f30b9242d0abed8";
    readonly "ONG / USD": "0xcf95796f3016801a1da5c518fc7a59c51dcef793";
    readonly "SUSHI / USD": "0xa679c72a97b654cfff58ab704de3ba15cde89b07";
    readonly "GBP / USD": "0x8faf16f710003e538189334541f5d4a391da46a0";
    readonly "XLM / USD": "0x27cc356a5891a3fe6f84d0457de4d108c6078888";
    readonly "BRL / USD": "0x5cb1cb3ea5fb46de1ce1d0f3badb3212e8d8ef48";
    readonly "HIGH / USD": "0xdf4dd957a84f798acfadd448badd2d8b9bc99047";
    readonly "C98 / USD": "0x889158e39628c0397dc54b84f6b1cbe0aaeb7ffc";
    readonly "FXS / USD": "0x0e9d55932893fb1308882c7857285b2b0bcc4f4a";
    readonly "MXN / USD": "0x16c0c1f971b1780f952572670a9d5ce4123582a1";
    readonly "1INCH / USD": "0x9a177bb9f5b6083e962f9e62bd21d4b5660aeb03";
    readonly "BSW / USD": "0x08e70777b982a58d23d05e3d7714f44837c06a21";
    readonly "KAVA / USD": "0x12bf0c3f7d5aca9e711930d704da2774358d9210";
    readonly "WIN / USD": "0x9e7377e194e41d63795907c92c3eb351a2eb0233";
    readonly "RDNT / USD": "0x20123c6ebd45c6496102beea86e1a6616ca547c6";
    readonly "USDD / USD": "0x51c78c299c42b058bf11d47fbb74ac437c6a0c8c";
    readonly "MDX (BSC) / USD": "0x9165366bf450a6906d25549f0e0f8e6586fc93e2";
};

declare const celoDataFeeds: {
    readonly "CELO / USD": "0x0568fd19986748ceff3301e55c0eb1e729e0ab7e";
    readonly "LINK / USD": "0x6b6a4c71ec3858a024f3f0ee44bb0adcbed3dcc2";
    readonly "USDT /USD": "0x5e37af40a7a344ec9b03ccd34a250f3da9a20b02";
    readonly "USDC / USD": "0xc7a353bae210aed958a1a2928b654938ec59dab2";
    readonly "BTC / USD": "0x128fe88eaa22bffb868bb3a584a54c96ee24014b";
    readonly "EUR / USD": "0x3d207061dbe8e2473527611bfecb87ff12b28dda";
    readonly "ETH / USD": "0x1fcd30a73d67639c1cd89ff5746e7585731c083b";
};

declare const ethereumDataFeeds: {
    readonly "ETH / USD": "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419";
    readonly "BTC / USD": "0xf4030086522a5beea4988f8ca5b36dbc97bee88c";
    readonly "XAG / USD": "0x379589227b15f1a12195d3f2d90bbc9f31f95235";
    readonly "XAU / USD": "0x214ed9da11d2fbe465a6fc601a91e62ebec1a0d6";
    readonly "AUD / USD": "0x77f9710e7d0a19669a13c055f62cd80d313df022";
    readonly "CHF / USD": "0x449d117117838ffa61263b61da6301aa2a88b13a";
    readonly "JPY / USD": "0xbce206cae7f0ec07b545edde332a47c2f75bbeb3";
    readonly "GBP / USD": "0x5c0ab2d9b5a7ed9f470386e82bb36a3613cdd4b5";
    readonly "EUR / USD": "0xb49f677943bc038e9857d61e7d053caa2c1734c1";
    readonly "LINK / USD": "0x2c1d072e956affc0d435cb7ac38ef18d24d9127c";
    readonly "LRC / ETH": "0x160ac928a16c93ed4895c2de6f81ecce9a7eb7b4";
    readonly "ZRX / ETH": "0x2da4983a622a8498bb1a21fae9d8f6c664939962";
    readonly "BAT / ETH": "0x0d16d4528239e9ee52fa531af613acdb23d88c94";
    readonly "BTC / ETH": "0xdeb288f737066589598e9214e782fa5a8ed689e8";
    readonly "MANA / ETH": "0x82a44d92d6c329826dc557c5e1be6ebec5d5feb9";
    readonly "KNC / ETH": "0x656c0544ef4c98a6a98491833a89204abb045d6b";
    readonly "MKR / ETH": "0x24551a8fb2a7211a25a17b1481f043a8a8adc7f2";
    readonly "USDT / ETH": "0xee9f2375b4bdf6387aa8265dd4fb8f16512a1d46";
    readonly "USDC / ETH": "0x986b5e1e1755e3c2440e960477f25201b0a8bbd4";
    readonly "SUSD / ETH": "0x8e0b7e6062272b5ef4524250bfff8e5bd3497757";
    readonly "TUSD / ETH": "0x3886ba987236181d98f2401c507fb8bea7871df2";
    readonly "DAI / ETH": "0x773616e4d11a78f511299002da57a0a94577f1f4";
    readonly "LINK / ETH": "0xdc530d9457755926550b59e8eccdae7624181557";
    readonly "SNX / ETH": "0x79291a9d692df95334b1a0b3b4ae6bc606782f8c";
    readonly "BNT / USD": "0x1e6cf0d433de4fe882a437abc654f58e1e78548c";
    readonly "BUSD / ETH": "0x614715d2af89e6ec99a233818275142ce88d1cfd";
    readonly "DAI / USD": "0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9";
    readonly "Fast Gas / Gwei": "0x169e633a2d1e6c10dd91238ba11c4a708dfef37c";
    readonly "OXT / USD": "0xd75aaae4af0c398ca13e2667be57af2cca8b5de6";
    readonly "FTM / ETH": "0x2de7e4a9488488e0058b95854cc2f7955b35dc9b";
    readonly "ENJ / ETH": "0x24d9ab51950f3d62e9144fdc2f3135daa6ce8d1b";
    readonly "REN / ETH": "0x3147d7203354dc06d9fd350c7a2437bca92387a4";
    readonly "NMR / ETH": "0x9cb2a01a7e64992d32a34db7ceea4c919c391f6a";
    readonly "BNT / ETH": "0xcf61d1841b178fe82c8895fe60c2edda08314416";
    readonly "YFI / ETH": "0x7c5d4f8345e66f68099581db340cd65b078c41f4";
    readonly "SXP / USD": "0xfb0cfd6c19e25db4a08d8a204a387cea48cc138f";
    readonly "COMP / ETH": "0x1b39ee86ec5979ba5c322b826b3ecb8c79991699";
    readonly "AMPL / USD": "0xe20ca8d7546932360e37e9d72c1a47334af57706";
    readonly "SNX / USD": "0xdc3ea94cd0ac27d9a86c180091e7f78c683d3699";
    readonly "ADA / USD": "0xae48c91df1fe419994ffda27da09d5ac69c30f55";
    readonly "COMP / USD": "0xdbd020caef83efd542f4de03e3cf0c28a4428bd5";
    readonly "LTC / USD": "0x6af09df7563c363b5763b9102712ebed3b9e859b";
    readonly "KNC / USD": "0xf8ff43e991a81e6ec886a3d281a2c6cc19ae70fc";
    readonly "BNB / USD": "0x14e613ac84a31f709eadbdf89c6cc390fdc9540a";
    readonly "UNI / ETH": "0xd6aa3d25116d8da79ea0246c4826eb951872e02e";
    readonly "CRV / ETH": "0x8a12be339b0cd1829b91adc01977caa5e9ac121e";
    readonly "AAVE / ETH": "0x6df09e975c830ecae5bd4ed9d90f3a95a4f88012";
    readonly "AAVE / USD": "0x547a514d5e3769680ce22b2361c10ea13619e8a9";
    readonly "ANT / ETH": "0x8f83670260f8f7708143b836a2a6f11ef0abac01";
    readonly "RLC / ETH": "0x4cba1e1fdc738d0fe8db3ee07728e2bc4da676c6";
    readonly "MLN / ETH": "0xdaea8386611a157b08829ed4997a8a62b557014c";
    readonly "BAL / ETH": "0xc1438aa3823a6ba0c159cfa8d98df5a994ba120b";
    readonly "UMA / ETH": "0xf817b69ea583caff291e287cae00ea329d22765c";
    readonly "UNI / USD": "0x553303d460ee0afb37edff9be42922d8ff63220e";
    readonly "YFI / USD": "0xa027702dbb89fbd58938e4324ac03b58d812b0e1";
    readonly "DOT / USD": "0x1c07afb8e2b827c5a4739c6d59ae3a5035f28734";
    readonly "PAXG / ETH": "0x9b97304ea12efed0fad976fbecaad46016bf269e";
    readonly "ORN / ETH": "0xba9b2a360eb8abdb677d6d7f27e12de11aa052ef";
    readonly "MATIC / USD": "0x7bac85a8a13a4bcd8abb3eb7d6b4d632c5a57676";
    readonly "OGN / ETH": "0x2c881b6f3f6b5ff6c975813f87a4dad0b241c15b";
    readonly "TOMO / USD": "0x3d44925a8e9f9dfd90390e58e92ec16c996a331b";
    readonly "CAD / USD": "0xa34317db73e77d453b1b8d04550c44d10e981c8e";
    readonly "SUSHI / ETH": "0xe572cef69f43c2e488b33924af04bdace19079cf";
    readonly "1INCH / ETH": "0x72afaecf99c9d9c8215ff44c77b94b99c28741e8";
    readonly "KP3R / ETH": "0xe7015ccb7e5f788b8c1010fc22343473eaac3741";
    readonly "FTT / ETH": "0xf0985f7e2cabff22cecc5a71282a89582c382efe";
    readonly "RUNE / ETH": "0x875d60c44cfbc38baa4eb2ddb76a767deb91b97e";
    readonly "ZRX / USD": "0x2885d15b8af22648b98b122b22fdf4d2a56c6023";
    readonly "CNY / USD": "0xef8a4af35cd47424672e3c590abd37fbb7a7759a";
    readonly "TRU / USD": "0x26929b85fe284eeab939831002e1928183a10fb1";
    readonly "GRT / ETH": "0x17d054ecac33d91f7340645341efb5de9009f1c1";
    readonly "KRW / USD": "0x01435677fb11763550905594a16b645847c1d0f3";
    readonly "USDC / USD": "0x8fffffd4afb6115b954bd326cbe7b4ba576818f6";
    readonly "USDT / USD": "0x3e7d1eab13ad0104d2750b8863b489d65364e32d";
    readonly "SGD / USD": "0xe25277ff4bbf9081c75ab0eb13b4a13a721f3e13";
    readonly "FIL / ETH": "0x0606be69451b1c9861ac6b3626b99093b713e801";
    readonly "AMPL / ETH": "0x492575fdd11a0fcf2c6c719867890a7648d526eb";
    readonly "USDP / ETH": "0x3a08ebbab125224b7b6474384ee39fbb247d2200";
    readonly "WING / USD": "0x134fe0a225fb8e6683617c13ceb6b3319fb4fb82";
    readonly "ONT / USD": "0xcda3708c5c2907fcca52bb3f9d3e4c2028b89319";
    readonly "PERP / ETH": "0x3b41d5571468904d4e53b6a8d93a6bac43f02dc9";
    readonly "TRY / USD": "0xb09fc5fd3f11cf9eb5e1c5dba43114e3c9f477b5";
    readonly "ALPHA / ETH": "0x89c7926c7c15fd5bfdb1edcff7e7fc8283b578f6";
    readonly "FXS / USD": "0x6ebc52c8c1089be9eb3945c4350b68b8e4c2233f";
    readonly "1INCH / USD": "0xc929ad75b72593967de83e7f7cda0493458261d9";
    readonly "CRV / USD": "0xcd627aa160a6fa45eb793d19ef54f5062f20f33f";
    readonly "ANKR / USD": "0x7eed379bf00005cfed29fed4009669de9bcc21ce";
    readonly "HBAR / USD": "0x38c5ae3ee324ee027d88c5117ee58d07c9b4699b";
    readonly "RAI / ETH": "0x4ad7b025127e89263242ab68f0f9c4e5c033b489";
    readonly "SAND / USD": "0x35e3f7e558c04ce7eee1629258ecbba03b36ec56";
    readonly "RARI / ETH": "0x2a784368b1d492f458bf919389f42c18315765f5";
    readonly "LON / ETH": "0x13a8f2cc27ccc2761ca1b21d2f3e762445f201ce";
    readonly "sUSD / USD": "0xad35bd71b9afe6e4bdc266b345c198eadef9ad94";
    readonly "BUSD / USD": "0x833d8eb16d306ed1fbb5d7a2e019e106b960965a";
    readonly "NZD / USD": "0x3977cfc9e4f29c184d4675f4eb8e0013236e5f3e";
    readonly "LDO / ETH": "0x4e844125952d32acdf339be976c98e22f6f318db";
    readonly "DOGE / USD": "0x2465cefd3b488be410b941b1d4b2767088e2a028";
    readonly "MKR / USD": "0xec1d1b3b0443256cc3860e24a46f108e699484aa";
    readonly "FRAX / ETH": "0x14d04fff8d21bd62987a5ce9ce543d2f1edf5d3e";
    readonly "OMG / USD": "0x7d476f061f8212a8c9317d5784e72b4212436e93";
    readonly "SUSHI / USD": "0xcc70f09a6cc17553b2e31954cd36e4a2d89501f7";
    readonly "TRIBE / ETH": "0x84a24deca415acc0c395872a9e6a63e27d6225c8";
    readonly "AVAX / USD": "0xff3eeb22b5e3de6e705b44749c2559d704923fd7";
    readonly "FRAX / USD": "0xb9e1e3a9feff48998e45fa90847ed4d467e8bcfd";
    readonly "ALCX / ETH": "0x194a9aaf2e0b67c35915cd01101585a33fe25caa";
    readonly "stETH / USD": "0xcfe54b5cd566ab89272946f602d76ea879cab4a8";
    readonly "AXS / ETH": "0x8b4fc5b68cd50eac1dd33f695901624a4a1a0a8b";
    readonly "WBTC PoR": "0xa81fe04086865e63e12dd3776978e49deea2ea4e";
    readonly "EURt / USD": "0x01d391a48f4f7339ac64ca2c83a07c22f95f587a";
    readonly "USDP / USD": "0x09023c0da49aaf8fc3fa3adf34c6a7016d38d5e3";
    readonly "RSR / USD": "0x759bbc1be8f90ee6457c44abc7d443842a976d02";
    readonly "SOL / USD": "0x4ffc43a60e009b551865a93d232e33fce9f01507";
    readonly "RAI / USD": "0x483d36f6a1d063d580c7a24f9a42b346f3a69fbb";
    readonly "SPELL / USD": "0x8c110b94c5f1d347facf5e1e938ab2db60e3c9a8";
    readonly "eFIL Reserves": "0x8917800a6bdd8fa8b7c94e25ae2219db28050622";
    readonly "ETH / BTC": "0xac559f25b1619171cbc396a50854a3240b6a4e99";
    readonly "FLOW / USD": "0xd9bdd9f5ffa7d89c846a5e3231a093ae4b3469d2";
    readonly "CACHE Gold Reserves": "0x5586bf404c7a22a4a4077401272ce5945f80189c";
    readonly "APE / USD": "0xd10abbc76679a20055e167bb80a24ac851b37056";
    readonly "CVX / ETH": "0xc9cbf687f43176b302f03f5e58470b77d07c61c6";
    readonly "BADGER / ETH": "0x58921ac140522867bf50b9e009599da0ca4a2379";
    readonly "XCN / USD": "0xeb988b77b94c186053282bfcd8b7ed55142d3cab";
    readonly "GBPT PoR": "0xf6f5b570ab6e39e55558afd8e1e30c5f20e6527e";
    readonly "HBTC PoR": "0x0a8cd0115b1ee87eba5b8e06a9a15ed93e230f7a";
    readonly "cbETH / ETH": "0xf017fcb346a1885194689ba23eff2fe6fa5c483b";
    readonly "xSushi / ETH": "0xf05d9b6c08757eacb1fbec18e36a1b7566a13deb";
    readonly "TUSD Reserves": "0xbe456fd14720c3accc30a2013bffd782c9cb75d5";
    readonly "STBT PoR": "0xad4a9bed9a5e2c1c9a6e43d35db53c83873dd901";
    readonly "Swell ETH PoR": "0x60cbe8d88ef519cf3c62414d76f50818d211fea1";
    readonly "HOPE PoR": "0xaf2ce23ef2dd9bb6f03668ca6ead55aea1e56fba";
    readonly "WMXN / ETH": "0xe5dc0a609ab8bcf15d3f35cfaa1ff40f521173ea";
    readonly "MANA / USD": "0x56a4857acbcfe3a66965c251628b1c9f1c408c19";
    readonly "ENJ / USD": "0x23905c55dc11d609d5d11dc604905779545de9a7";
    readonly "CVX - USD": "0xd962fc30a72a84ce50161031391756bf2876af5d";
    readonly "OHMv2/ETH": "0x9a72298ae3886221820b1c878d12d872087d3a23";
    readonly "TUSD / USD": "0xec746ecf986e2927abd291a2a1716c940100f8ba";
    readonly "XSUSHI / USD": "0xcc1f5d9e6956447630d703c8e93b2345c2de3d13";
    readonly "FOR / USD": "0x456834f736094fb0aad40a9bbc9d4a0f37818a54";
    readonly "HIGH / USD": "0xe2f95bc12fe8a3c35684be7586c39fd7c0e5b403";
    readonly "IMX / USD": "0xbaebefc1d023c0feccc047bff42e75f15ff213e6";
    readonly "BADGER / USD": "0x66a47b7206130e6ff64854ef0e1edfa237e65339";
    readonly "ILV / ETH": "0xf600984cca37cd562e74e3ee514289e3613ce8e4";
    readonly "BAL / USD": "0xdf2917806e30300537aeb49a7663062f4d1f2b5f";
    readonly "wBTC / BTC": "0xfdfd9c85ad200c506cf9e21f1fd8dd01932fbb23";
    readonly "Mutant Ape Yacht Club": "0x1823c89715fe3fb96a24d11c917aca918894a090";
    readonly "World of Women": "0xddf0b85c600daf9e308afed9f597aca212354764";
    readonly Cryptoadz: "0xfaa8f6073845dbe5627daa3208f78a3043f99bca";
    readonly "Bored Ape Yacht Club": "0x352f2bc3039429fc2fe62004a1575ae74001cfce";
    readonly VeeFriends: "0x35bf6767577091e7f04707c0290b3f889e968307";
    readonly "Total Marketcap / USD": "0xec8761a0a73c34329ca5b1d3dc7ed07f30e836e2";
    readonly "Personal Consumption Expenditures (PCE) US Monthly Index": "0x9a51192e065ecc6bdeafe5e194ce54702de4f1f5";
    readonly "stETH / ETH": "0x86392dc19c0b719886221c78ab11eb8cf5c52812";
    readonly "CAKE / USD": "0xeb0adf5c06861d6c07174288ce4d0a8128164003";
    readonly Doodles: "0x027828052840a43cc2d0187bcfa6e3d6ace60336";
    readonly CloneX: "0x021264d59dabd26e7506ee7278407891bb8cdccc";
    readonly "Cool Cats": "0xf49f8f5b931b0e4b4246e4cca7cd2083997aa83d";
    readonly Azuki: "0xa8b9a447c73191744d5b79bce864f343455e1150";
    readonly Cryptopunks: "0x01b6710b01cf3dd8ae64243097d91afb03728fdd";
    readonly "USDD / USD": "0x0ed39a19d2a68b722408d84e4d970827f61e6c0a";
    readonly "BEANZ OFFICIAL": "0xa97477ab5ab6ed2f6a2b5cbe59d71e88ad334b90";
    readonly MOONBIRDS: "0x9cd36e0e8d3c27d630d00406acfc3463154951af";
    readonly "rETH / ETH": "0x536218f9e9eb48863970252233c8f271f554c2d0";
    readonly "PUDGY PENGUINS": "0x9f2ba149c2a0ee76043d83558c4e79e9f3e5731b";
    readonly "OTHERDEED FOR OTHERSIDE": "0x6e3a4376b4c8d3ba49602f8542d9d3c4a87ba901";
    readonly "GHO / USD": "0x3f12643d3f6f874d39c2a4c9f2cd6f2dbac877fc";
    readonly "STG / USD": "0x7a9f34a0aa917d438e9b6e630067062b7f8f6f3d";
    readonly "IB01 / USD": "0x32d1463eb53b73c095625719afa544d5426354cb";
    readonly "CSPX / USD": "0xf4e1b57fb228879d057ac5ae33973e8c53e4a0e0";
    readonly "RPL / USD": "0x4e155ed98afe9034b7a5962f6c84c86d869daa9d";
    readonly "IBTA / USD": "0xd27e6d02b72eb6fce04ad5690c419196b4ef2885";
    readonly "CRVUSD / USD": "0xeef0c605546958c1f899b6fb336c20671f9cd49f";
    readonly "RDNT / USD": "0x393cc05bad439c9b36489384f11487d9c8410471";
};

declare const fantomDataFeeds: {
    readonly "SNX / USD": "0x2eb00cc9db7a7e0a013a49b3f6ac66008d1456f7";
    readonly "AAVE / USD": "0xe6ecf7d2361b6459cbb3b4fb065e0ef4b175fe74";
    readonly "FTM / USD": "0xf4766552d15ae4d256ad41b6cf2933482b0680dc";
    readonly "SUSHI / USD": "0xccc059a1a17577676c8673952dc02070d29e5a66";
    readonly "BNB / USD": "0x6de70f4791c4151e00ad02e969bd900dc961f92a";
    readonly "DAI / USD": "0x91d5defaffe2854c7d02f50c80fa1fdc8a721e52";
    readonly "BTC / USD": "0x8e94c22142f4a64b99022ccdd994f4e9ec86e4b4";
    readonly "ETH / USD": "0x11ddd3d147e5b83d01cee7070027092397d63658";
    readonly "USDT / USD": "0xf64b636c5dfe1d3555a847341cdc449f612307d0";
    readonly "USDC / USD": "0x2553f4eeb82d5a26427b8d1106c51499cba5d99c";
    readonly "LINK / USD": "0x221c773d8647bc3034e91a0c47062e26d20d97b4";
    readonly "CHF / USD": "0x4be9c8fb4105380116c03fc2eeb9ea1e1a109d95";
    readonly "BIFI / USD": "0x4f5cc6a2291c964dec4c7d6a50c0d89492d4d91b";
    readonly "SPELL / USD": "0x02e48946849e0bfdd7bea5daa80af77195c7e24c";
    readonly "BUSD / USD": "0xf8f57321c2e3e202394b0c0401fd6392c3e7f465";
    readonly "CVX / USD": "0x1a8d750240cdf7b671805eec761e622f13781ceb";
    readonly "MIMATIC / USD": "0x827863222c9c603960de6ff2c0dd58d457dcc363";
    readonly "ALPACA / USD": "0x95d3fff86a754ab81a7c59fcab1468a2076f8c9b";
    readonly "BOO / USD": "0xc8c80c17f05930876ba7c1dd50d9186213496376";
    readonly "FRAX / USD": "0xbac409d670d996ef852056f6d45eca41a8d57fbd";
    readonly "EUR / USD": "0x3e68e68ea2c3698400465e3104843597690ae0f7";
    readonly "CRV / USD": "0xa141d7e3b44594cc65142ae5f2c7844abea66d2b";
    readonly "WBTC / USD": "0x9da678ce7f28aaec8a578a1e414219049509a552";
    readonly "GMX / USD": "0x8a84d922ef06c1f13a30ddd1304bef556ffa7552";
};

declare const harmonyDataFeeds: {
    readonly "AUD / USD": "0x1af363c2fcb47dd57133ee400e3c32eed4d37f8f";
    readonly "BTC / USD": "0x3c41439eb1bf3ba3b2c3f8c921088b267f8d11f4";
    readonly "USDT / USD": "0x5caaebe5c69a8287bffb9d00b5231bf7254145bf";
    readonly "JPY / USD": "0xcdbb167e6c2fbc5c84b8eb4acf0995ec3d7cefa1";
    readonly "CRV / USD": "0x054347c697e12782f906565e55996836e12da6ac";
    readonly "ETH / USD": "0xbaf7c8149d586055ed02c286367a41e0ada96b7c";
    readonly "AXS / USD": "0x3a65ee7351b603f950cb44ea6c265d6b5289512d";
    readonly "DAI / USD": "0xf8326d22b2caff4880115e92161c324abc5e0395";
    readonly "GBP / USD": "0x7dfab439b3aee18f6b687c40e5a9e62724e9099a";
    readonly "ONE / USD": "0xdcd81fbbd6c4572a69a534d8b8152c562da8abef";
    readonly "FRAX / USD": "0x5c0a80cba14a7afc825716b3f411cea7d9eb0f03";
    readonly "ILV / USD": "0x4698f8bfb418bad926a4c8012f648870424fc52d";
    readonly "EUR / USD": "0x8bc1cecd937cdd00e5feaf23b818aa8e30b8442a";
    readonly "AAVE / USD": "0x6ee1efcce688d5b79cb8a400870af471c5282992";
    readonly "SAND / USD": "0x6b890b13d48f46a8d4b85deabbd7155ee19d89b9";
    readonly "CAD / USD": "0xc056a53c210c72ba98d1062ef95b7a23c96ec552";
    readonly "LINK / USD": "0xd54f119d10901b4509610ea259a63169647800c4";
    readonly "BUSD / USD": "0xd1add3dfac655cb1d2803439661eae5161eea76b";
    readonly "CHF / USD": "0x1039a288189680c9986841efa0688955b07af729";
    readonly "CVX / USD": "0x4399420c25c52259edbeb974fc164e25964560c8";
    readonly "USDC / USD": "0xa45a41be2d8419b60a6ce2bc393a0b086b8b3bda";
    readonly "LINK / ONE": "0x69348435ee4b3904df1ae528fa0aaf34da1e9184";
    readonly "WBTC / USD": "0x639545836d8b177054cefafe6942efe798ce6575";
};

declare const moonbeamDataFeeds: {
    readonly "BTC / USD": "0x8c4425e141979c66423a83be2ee59135864487eb";
    readonly "BUSD / USD": "0x2330fd83662bba3fc62bc48cc935ca58847a8957";
    readonly "WBTC / USD": "0x8211b991d713ddae32326fd69e1e2510f4a653b0";
    readonly "LINK / USD": "0xd61d7398b7734abe7c4b143fe57dc666d2fe83ad";
    readonly "BNB / USD": "0x0147f2ad7f1e2bc51f998cc128a8355d5ae8c32d";
    readonly "USDC / USD": "0xa122591f60115d63421f66f752ef9f6e0bc73abc";
    readonly "ETH / USD": "0x9ce2388a1696e22f870341c3fc1e89710c7569b5";
    readonly "ATOM / USD": "0x4f152d143c97b5e8d2293bc5b2380600f274a5dd";
    readonly "USDT / USD": "0xd925c5bf88bd0ca09312625d429240f811b437c6";
    readonly "BRL / USD": "0x6e9bc5f60c597aa4063640a4f426c29c23bc7034";
    readonly "DAI / USD": "0x6063e1037b1afda2be5a3340757261e4d6a402ac";
    readonly "CAKE / USD": "0x6dd5ccbdbbb77a4827209104615db2333304f008";
};

declare const metisDataFeeds: {
    readonly "LINK / USD": "0x4a4f382a2ff9685de9f0418f1375ce16d0727637";
    readonly "AAVE / USD": "0x54389e89a5ec1d4312d5b5c48055d6e56a177bf9";
    readonly "METIS / USD": "0xd4a5bb03b5d66d9bf81507379302ac2c2dfdfa6d";
    readonly "USDC / USD": "0x663855969c85f3be415807250414ca9129533a5f";
    readonly "BTC / USD": "0x51ed8fecf96813826f727cabdf01b3cf6a61373e";
    readonly "USDT / USD": "0x51864b8948aa5e35aace2badaf901d63418a3b9d";
    readonly "ETH / USD": "0x3bbe70e2f96c87aece7f67a2b0178052f62e37fe";
};

declare const moonriverDataFeeds: {
    readonly "FTM / USD": "0x5e70fc5f38cb930f9be8beaeaf80cf927af3b17e";
    readonly "MOVR / USD": "0x3f8bfbdc1e79777511c00ad8591cef888c2113c1";
    readonly "KSM / USD": "0x6e0513145fce707cd743528db7c1cab537de9d1b";
    readonly "ETH / USD": "0xc3cf399566220dc5ed6c8cfbf8247214af103c72";
    readonly "BNB / USD": "0xd6b013a65c22c372f995864ccdae202d0194f9bf";
    readonly "BTC / USD": "0x1b5c6cf9df1cbf30387c24cc7db1787ccf65c797";
    readonly "USDT / USD": "0xf80dad54af79257d41c30014160349896ca5370a";
    readonly "FRAX / USD": "0xd080d4760318710e795b0a59f181f6c1512ffb15";
    readonly "USDC / USD": "0x12870664a77dd55bbdcde32f91eb3244f511ef2e";
    readonly "BUSD / USD": "0x596129f6abcab2e6e81d19284b78ea73c176d170";
    readonly "DOT / USD": "0x54b584eb643375c41c55ddd8da4b90124b18d05c";
    readonly "DAI / USD": "0x7ba0e3ebce25dd3b5a0f36dd7ab34019b863b08d";
    readonly "LINK / USD": "0xdd27789b504fed690f406a82f16b45a0901172c0";
    readonly "WBTC / USD": "0xeebbe35b5f397d5bb26fd10d375b01d0f4a791a3";
    readonly "AAVE / USD": "0x37f35ef6735c594e6e803bc81577bac759d8179c";
};

declare const optimismDataFeeds: {
    readonly "AXS / USD": "0x805a61d54bb686e57f02d1ec96a1491c7af40893";
    readonly "stETH / USD": "0x41878779a388585509657ce5fb95a80050502186";
    readonly "BNB / USD": "0xd38579f7cbd14c22cf1997575ea8ef7bfe62ca2c";
    readonly "FLOW / USD": "0x2ff1eb7d0cec35959f0248e9354c3248c6683d9b";
    readonly "FRAX / USD": "0xc7d132becabe7dcc4204841f33bae45841e41d9c";
    readonly "IMX / USD": "0x26fce884555fae5f0e4701cc976fe8d8bb111a38";
    readonly "ZIL / USD": "0x1520874fc216f5f07e03607303df2fda6c3fc203";
    readonly "XAU / USD": "0x8f7bfb42bf7421c2b34aad619be4654bfa7b3b8b";
    readonly "WAVES / USD": "0x776003ecdf644f87a95b05da549b5e646d5f2ae4";
    readonly "FXS / USD": "0xb9b16330671067b1b062b9ac2efd2db75f03436e";
    readonly "LINK / ETH": "0x464a1515adc20de946f8d0deb99cead8ceae310d";
    readonly "APE / USD": "0x89178957e9bd07934d7792ffc0cf39f11c8c2b1f";
    readonly "XAG / USD": "0x290dd71254874f0d4356443607cb8234958dee49";
    readonly "SUSD / USD": "0x7f99817d87bad03ea21e05112ca799d715730efe";
    readonly "RUNE / USD": "0x372cc5e685115a56f14fa7e4716f1294e04c278a";
    readonly "INR / USD": "0x5535e67d8f99c8ebe961e1fc1f6ddae96fec82c9";
    readonly "FTM / USD": "0xc19d58652d6bfc6db6fb3691eda6aa7f3379e4e9";
    readonly "wstETH / stETH Exchange Rate": "0xe59eba0d492ca53c6f46015eea00517f2707dc77";
    readonly "PERP / USD": "0xa12cddd8e986af9288ab31e58c60e65f2987fb13";
    readonly "OP / USD": "0x0d276fc14719f9292d5c1ea2198673d1f4269246";
    readonly "KNC / USD": "0xcb24d22af35986ac1feb8874adbbdf68f6dc2e96";
    readonly "DOGE / USD": "0xc6066533917f034cf610c08e1fe5e9c7eade0f54";
    readonly "XMR / USD": "0x2a8d91686a048e98e6ccf1a89e82f40d14312672";
    readonly "CAD / USD": "0x6fd5e4a193459fc7dfcfc674357a123f655f6ef8";
    readonly "GBP / USD": "0x540d48c01f946e729174517e013ad0bdae5f08c0";
    readonly "LUSD / USD": "0x9dfc79aaeb5bb0f96c6e9402671981cdfc424052";
    readonly "SUI / USD": "0xeaf1a9fe242aa9928faedc6ce7e09ad4875f7133";
    readonly "SNX / USD": "0x2fcf37343e916eaed1f1ddaaf84458a359b53877";
    readonly "UNI / USD": "0x11429ee838cc01071402f21c219870cbac0a59a0";
    readonly "AAVE / USD": "0x338ed6787f463394d24813b297401b9f05a8c9d1";
    readonly "SOL / USD": "0xc663315f7af904fbbb0f785c32046dfa03e85270";
    readonly "ONE / USD": "0x7cfb4fac1a2fdb1267f8bc17fadc12804ac13cfe";
    readonly "LINK / USD": "0xcc232dcfaae6354ce191bd574108c1ad03f86450";
    readonly "EUR / USD": "0x3626369857a10ccc6cc3a6e4f5c2f5984a519f20";
    readonly "CRV / USD": "0xbd92c6c284271c227a1e0bf1786f468b539f51d9";
    readonly "DAI / USD": "0x8dba75e83da73cc766a7e5a0ee71f656bab470d6";
    readonly "BTC / USD": "0xd702dd976fb76fffc2d3963d037dfdae5b04e593";
    readonly "USDC / USD": "0x16a9fa2fda030272ce99b29cf780dfa30361e0f3";
    readonly "ETH / USD": "0x13e3ee699d1909e989722e753853ae30b17e08c5";
    readonly "USDT / USD": "0xecef79e109e997bca29c1c0897ec9d7b03647f5e";
    readonly "JPY / USD": "0x536944c3a71feb7c1e5c66ee37d1a148d8d8f619";
    readonly "AUD / USD": "0x39be70e93d2d285c9e71be7f70fc5a45a7777b14";
    readonly "WBTC / USD": "0x718a5788b89454aae3a028ae9c111a29be6c2a6f";
    readonly "BUSD / USD": "0xc1cb3b7cbb3e786ab85ea28489f332f4faed5bc4";
    readonly "GMX / USD": "0x62f42f70ba85de1086476bb6bade926d0e0b8a4c";
    readonly "SHIB / USD": "0xd1e56e7657c0e0d20c0e11c2b6ae0d90932d5665";
    readonly "LDO / USD": "0x221618871470f78d8a3391d35b77dfb3c0fbc383";
    readonly "BCH / USD": "0x33e047119359161288bcb143e0c15467c7151d4c";
    readonly "ARB / USD": "0x8f14546d0b960793180ee355b73fa55041a4a356";
    readonly "ADA / USD": "0x43dea17dee1ca50c6266acb59b32659e44d3ee5d";
    readonly "APT / USD": "0x48f2ecf0bd180239aef474a9da945f2e2d41daa3";
    readonly "LTC / USD": "0x45954efbd01f5a12428a09e4c38b8434c3dd4ac3";
    readonly "1INCH / USD": "0x9fce737834500045fb07ad158991bcac3b05d5a6";
    readonly "SUSHI / USD": "0x72155d46fd9f03af1739637f9e7db8a87c40a730";
    readonly "ICP / USD": "0xe98290265e4ae3758503a03e937f381a2a7afb57";
    readonly "wstETH / ETH": "0x524299ab0987a7c4b3c8022a35669ddcdc715a10";
    readonly "MKR / USD": "0x607b417df51e0e1ed3a12fdb7fc0e8307ed250f3";
    readonly "WLD / USD": "0x4e1c6b168dcfd7758bc2ab9d2865f1895813d236";
    readonly "ETH / BTC": "0xe4b9bcd7d0aa917f19019165eb89bdbbf36d2cbe";
    readonly "ETC / USD": "0xb7b9a39cc63f856b90b364911cc324dc46ac1770";
    readonly "YFI / USD": "0x5cdc797accbf57ee2363fed9701262abc87a232e";
    readonly "INJ / USD": "0x90cc16f5493894eff84a5fedd1dce297d174feef";
    readonly "XRP / USD": "0x8788f0dbda7678244ac7ff09d963d7696d56a8a0";
    readonly "TRX / USD": "0x0e09921cf7801a5ad47b892c8727593275625a9f";
    readonly "cbETH / ETH": "0x138b809b8472ff09cd3e075e6ecbb2e42d41d870";
    readonly "DOT / USD": "0x28e67baeeb5de7a788f3dde6cf6ee491369bb3fa";
    readonly "PEPE / USD": "0x64ecf089a6594be781908d5a26fc8fa6cb08a2c7";
    readonly "MAV / USD": "0x51e06250c8e46c8e5de41ac8b917a47d706128c2";
    readonly "RPL / USD": "0xade082c91a6aecc86fc11704a830e933e1b382ea";
    readonly "COMP / USD": "0xe1011160d78a80e2eebd60c228eef7af4dfcd4d7";
    readonly "wstETH / USD": "0x698b585cbc4407e2d54aa898b2600b53c68958f7";
    readonly "ENJ / USD": "0x0cd83cc474e69e611d240f0d35d5794361f5e5c2";
    readonly "rETH / ETH Exchange Rate": "0x22f3727be377781d1579b7c9222382b21c9d1a8f";
    readonly "FIL / USD": "0x66f61fee824c1df059bcccc5f21ca39e083eefdf";
    readonly "BRL / USD": "0xb22900d4d0cea5db0b3bb08565a9f0f4a831d32c";
    readonly "FLOKI / USD": "0x34e0e85ceec6be6146c4f0115769a29a9539222e";
    readonly "BLUR / USD": "0x517c2557c29f7c53aa5f97a1dae465e0d5c174aa";
    readonly "SEI / USD": "0x6f6ced6b096708c1276056fdbdb7bbde07ca462c";
    readonly "ZRX / USD": "0xbfbb4fe2fb71022dbfe0d4232c8c528bddf9c57f";
    readonly "stETH / ETH": "0x14d2d3a82aed4019fdddfe07e8bdc485fb0d2249";
    readonly "EOS / USD": "0x8e8e6c8c4942e4963c682ff54a0d058458393dcc";
    readonly "ALGO / USD": "0xbf5384854988939729e8b76b8aece7d8d930f9f3";
    readonly "CELO / USD": "0x5a9072a995e072fd06d8f1eb95933955fda53c0a";
    readonly "ZEC / USD": "0x2ff8822f371b283604369700d6f06da3fbb31064";
    readonly "XLM / USD": "0x799a346e7dbfa0f66ad0961259366f93a1ee34c4";
    readonly "UMA / USD": "0xeec819b2e155cc8feae194f5129f767409e2327c";
};

declare const polygonDataFeeds: {
    readonly "USDT / USD": "0x0a6513e40db6eb1b165753ad52e80663aea50545";
    readonly "ETH / USD": "0xf9680d99d6c9589e2a93a78a04a279e509205945";
    readonly "USDC / USD": "0xfe4a8cc5b5b2366c1b58bea3858e81843581b2f7";
    readonly "DAI / USD": "0x4746dec9e833a82ec7c2c1356372ccf2cfcd2f3d";
    readonly "MATIC / USD": "0xab594600376ec9fd91f8e885dadf0ce036862de0";
    readonly "BTC / USD": "0xc907e116054ad103354f2d350fd2514433d57f6f";
    readonly "AAVE / ETH": "0xbe23a3aa13038cfc28afd0ece4fde379fe7fbfc4";
    readonly "MATIC / ETH": "0x327e23a4855b6f663a28c5161541d69af8973302";
    readonly "LINK / ETH": "0xb77fa460604b9c6435a235d057f7d319ac83cb53";
    readonly "WBTC / ETH": "0xa338e0492b2f944e9f8c0653d3ad1484f2657a37";
    readonly "DOT / USD": "0xacb51f1a83922632ca02b25a8164c10748001bde";
    readonly "DAI / ETH": "0xfc539a559e170f848323e19dfd66007520510085";
    readonly "USDC / ETH": "0xefb7e6be8356ccc6827799b6a7348ee674a80eae";
    readonly "USDT / ETH": "0xf9d5aac6e5572aefa6bd64108ff86a222f69b64d";
    readonly "WBTC / USD": "0xde31f8bfbd8c84b5360cfacca3539b938dd78ae6";
    readonly "LINK / USD": "0xd9ffdb71ebe7496cc440152d43986aae0ab76665";
    readonly "SNX / USD": "0xbf90a5d9b6ee9019028dbfc2a9e50056d5252894";
    readonly "SUSHI / USD": "0x49b0c695039243bbfeb8ecd054eb70061fd54aa0";
    readonly "SAND / USD": "0x3d49406edd4d52fb7ffd25485f32e073b529c924";
    readonly "BOND / USD": "0x58527c2dcc755297bb81f9334b80b2b6032d8524";
    readonly "CEL / USD": "0xc9ecf45956f576681bdc01f79602a79bc2667b0c";
    readonly "FXS / USD": "0x6c0fe985d3cacbcde428b84fc9431792694d0f51";
    readonly "DOGE / USD": "0xbaf9327b6564454f4a3364c33efeef032b4b4444";
    readonly "ADA / USD": "0x882554df528115a743c4537828da8d5b58e52544";
    readonly "JPY / USD": "0xd647a6fc9bc6402301583c91decc5989d8bc382d";
    readonly "YFI / ETH": "0x9896a1ea7a00f5f32ab131ebbee07487b0af31d0";
    readonly "UNI / ETH": "0x162d8c5bf15eb6bee003a1ffc4049c92114bc931";
    readonly "CRV / ETH": "0x1cf68c76803c9a415be301f50e82e44c64b7f1d4";
    readonly "MKR / ETH": "0x807b59d12520830d1864286fa0271c27baa94197";
    readonly "BCH / USD": "0x327d9822e9932996f55b39f557aec838313da8b7";
    readonly "BAT / USD": "0x2346ce62bd732c62618944e51cbfa09d985d86d2";
    readonly "DASH / USD": "0xd94427edee70e4991b4b8ddcc848f2b58ed01c0b";
    readonly "ETC / USD": "0xdf3f72be10d194b58b1bb56f2c4183e661cb2114";
    readonly "HKD / USD": "0x82d43b72573f902f960126a19581bcbba5b014f5";
    readonly "PAXG / USD": "0x0f6914d8e7e1214cdb3a4c6fbf729b75c69df608";
    readonly "XAU / USD": "0x0c466540b2ee1a31b441671eac0ca886e051e410";
    readonly "XRP / USD": "0x785ba89291f676b5386652eb12b30cf361020694";
    readonly "XLM / USD": "0x692ae5510ca9070095a496dbcfbcda99d4024cd9";
    readonly "ALGO / USD": "0x03bc6d9efed65708d35fdaefb25e87631a0a3437";
    readonly "ZRX / USD": "0x6ea4d89474d9410939d429b786208c74853a5b47";
    readonly "ZEC / USD": "0xbc08c639e579a391c4228f20d0c29d0690092df0";
    readonly "AUD / USD": "0x062df9c4efd2030e243ffcc398b652e8b8f95c6f";
    readonly "BNT / USD": "0xf5724884b6e99257cc003375e6b844bc776183f9";
    readonly "TUSD / USD": "0x7c5d415b64312d38c56b54358449d0a4058339d2";
    readonly "CAD / USD": "0xaca44abb8b04d07d883202f99fa5e3c53ed57fb5";
    readonly "BUSD / USD": "0xe0dc07d5ed74741ceeda61284ee56a2a0f7a4cc9";
    readonly "TRX / USD": "0x307ccf7cbd17b69a487b9c3dbe483931cf3e1833";
    readonly "LTC / USD": "0xeb99f173cf7d9a6dc4d889c2ad7103e8383b6efa";
    readonly "OMG / USD": "0x93ffee768f74208a7b9f2a4426f0f6bcbb1d09de";
    readonly "LPT / USD": "0xbaaf11ceda1d1ca9cf01748f8196653c9656a400";
    readonly "EOS / USD": "0xd6285f06203d938ab713fa6a315e7d23247dde95";
    readonly "GBP / USD": "0x099a2540848573e94fb1ca0fa420b00acbbc845a";
    readonly "UMA / USD": "0x33d9b1baadcf4b26ab6f8e83e9cb8a611b2b3956";
    readonly "MANA / USD": "0xa1cbf3fe43bc3501e3fc4b573e822c70e76a7512";
    readonly "COMP / USD": "0x2a8758b7257102461bc958279054e372c2b1bde6";
    readonly "KNC / USD": "0x10e5f3dfc81b3e5ef4e648c4454d04e79e1e41e2";
    readonly "AAVE / USD": "0x72484b12719e23115761d5da1646945632979bb6";
    readonly "UNI / USD": "0xdf0fb4e4f928d2dcb76f438575fdd8682386e13c";
    readonly "BNB / USD": "0x82a6c4af830caa6c97bb504425f6a66165c2c26e";
    readonly "SGD / USD": "0x8ce3cac0e6635ce04783709ca3cc4f5fc5304299";
    readonly "EUR / USD": "0x73366fe0aa0ded304479862808e02506fe556a98";
    readonly "CHF / USD": "0xc76f762cedf0f78a439727861628e0fdfe1e70c2";
    readonly "ALCX / USD": "0x5db6e61b6159b20f068dc15a47df2e5931b14f29";
    readonly "THETA - USD": "0x38611b09f8f2d520c14ea973765c225bf57b9eac";
    readonly "GHST / ETH": "0xe638249af9642cda55a92245525268482ee4c67b";
    readonly "BAL / USD": "0xd106b538f2a868c28ca1ec7e298c3325e0251d66";
    readonly "ICP / USD": "0x84227a76a04289473057bef706646199d7c58c34";
    readonly "MKR / USD": "0xa070427bf5ba5709f70e98b94cb2f435a242c46c";
    readonly "SOL / USD": "0x10c8264c0935b3b9870013e057f330ff3e9c56dc";
    readonly "QUICK / USD": "0xa058689f4bca95208bba3f265674ae95ded75b6d";
    readonly "QUICK / ETH": "0x836a579b39d22b2147c1c229920d27880c915578";
    readonly "1INCH / USD": "0x443c5116cdf663eb387e72c688d276e702135c87";
    readonly "FARM / USD": "0xdfb138ba3a6cce675a6f5961323be31ee42e40ff";
    readonly "AVAX / USD": "0xe01ea2fbd8d76ee323fbed03eb9a8625ec981a10";
    readonly "YFI / USD": "0x9d3a43c111e7b2c6601705d9fcf7a70c95b1dc55";
    readonly "OGN / USD": "0x8ec0ec2e0f26d8253abf39db4b1793d76b49c6d5";
    readonly "STORJ / USD": "0x0f1d5bd7be9b30fc09e110cd6504bd450e53cb0e";
    readonly "ANT / USD": "0x213b030e24c906ee3b98ec7538cc6d3d3c82af55";
    readonly "CACHE Gold Reserves": "0x4e9fc7480c16f3fe5d956c0759ee6b4808d1f5d7";
    readonly "BRL / USD": "0xb90da3ff54c3ed09115abf6fba0ff4645586af2c";
    readonly "AMKT PoR": "0x32640253a3d0fc25597d8a784a839311ff404c83";
    readonly "bIB01 Reserves": "0xad4395fc414fc1575a7a38c20b0bfdbdb09ee41a";
    readonly "bCSPX Reserves": "0x55e75d35c44a9ee1a5b05416640965ebca4a8d33";
    readonly "bIBTA Reserves": "0x4517002fcd31062ea38680df9ee37f29528c2707";
    readonly "USDR PoR": "0x430db5e2e6dd0492adaadf257845324eb250f7be";
    readonly "CNY / USD": "0x04bb437aa63e098236fa47365f0268547f6eab32";
    readonly "FTM / USD": "0x58326c0f831b2dbf7234a4204f28bba79aa06d5f";
    readonly "APE / USD": "0x2ac3f3bfac8fc9094bc3f0f9041a51375235b992";
    readonly "WOO / USD": "0x6a99ec84819fb7007dd5d032068742604e755c56";
    readonly "OCEAN / USD": "0xdcda79097c44353dee65684328793695bd34a629";
    readonly "PLN / USD": "0xb34bce11040702f71c11529d00179b2959bce6c0";
    readonly "INR / USD": "0xda0f8df6f5db15b346f4b8d1156722027e194e60";
    readonly "KAVA / USD": "0x7899dd75c329efe63e35b02bc7d60d3739fb23c5";
    readonly "MIMATIC / USD": "0xd8d483d813547cfb624b8dc33a00f2fcbcd2d428";
    readonly "KRW / USD": "0x24b820870f726da9b0d83b0b28a93885061dbf50";
    readonly "GNS / USD": "0x9cb43aa3d036cb035a694ba0aaa91f8875b16ce1";
    readonly "cbETH / ETH": "0x0a6a03cdf7d0b48d4e4ba8e362a4ffc3aac4f3c0";
    readonly "FIL / USD": "0xa07703e5c2ed1516107c7c72a494493dcb99c676";
    readonly "wstETH / stETH Exchange Rate": "0x3ea1ec855fbda8ba0396975ec260ad2e9b2bc01c";
    readonly "TRUMATIC / MATIC Exchange Rate": "0x30badc453d20b520e0ed98fce6ba1ac5876cf1e5";
};

declare const xdaiDataFeeds: {
    readonly "YFI / USD": "0x14030d5a0c9e63d9606c6f2c8771fc95b34b07e0";
    readonly "ETH / USD": "0xa767f745331d267c7751297d982b050c93985627";
    readonly "BTC / USD": "0x6c1d7e76ef7304a40e8456ce883bc56d3dea3f7d";
    readonly "SUSHI / USD": "0xc0a6bf8d5d408b091d022c3c0653d4056d4b9c01";
    readonly "DOT / USD": "0x3c30c5c415b2410326297f0f65f5cbb32f3aefcc";
    readonly "AAVE / USD": "0x2b481dc923aa050e009113dca8dcb0dab4b68cdf";
    readonly "LINK / USD": "0xed322a5ac55bae091190dff9066760b86751947b";
    readonly "SNX / USD": "0x3b84d6e6976d5826500572600eb44f9f1753827b";
    readonly "DAI / USD": "0x678df3415fc31947da4324ec63212874be5a82f8";
    readonly "USDC / USD": "0x26c31ac71010af62e6b486d1132e266d6298857d";
    readonly "UNI / USD": "0xd98735d78266c62277bb4dbf3e3bcdd3694782f4";
    readonly "COMP / USD": "0xba95bc8418ebcdf8a690924e1d4ad5292139f2ea";
    readonly "1INCH / USD": "0xfdf9eb5fafc11efa65f6fd144898da39a7920ae8";
    readonly "MKR / USD": "0x51e4024255d0cbd1f4c79aee6bdb6565df2c5d1b";
    readonly "REN / USD": "0x27d4d36968a2bd1cc3406d99cb1df50561dbf2a4";
    readonly "CREAM / USD": "0x3b681e9bf56efe4b2a14196826230a5843fff758";
    readonly "XAU / USD": "0x4a5ab0f60d12a4420d36d3ed9a1f77d8c47eb94c";
    readonly "FTT / USD": "0x0cae8f5c10931f0ce87ed9bbb71391c6e93c2c26";
    readonly "ZIL / USD": "0x2997eba3d9c2447c36107bb0f082b8c33566b49c";
    readonly "JPY / USD": "0x2afb993c670c01e9da1550c58e8039c1d8b8a317";
    readonly "AVAX / USD": "0x911e08a32a6b7671a80387f93147ab29063de9a2";
    readonly "SOL / USD": "0xb7b7d008c49295a0ff6eed6df4ad3052fd39d5e6";
    readonly "BNB / USD": "0x6d42cc26756c34f26becdd9b30a279ce9ea8296e";
    readonly "GNO / USD": "0x22441d81416430a54336ab28765abd31a792ad37";
};

declare const index_arbitrumDataFeeds: typeof arbitrumDataFeeds;
declare const index_avalancheDataFeeds: typeof avalancheDataFeeds;
declare const index_baseDataFeeds: typeof baseDataFeeds;
declare const index_bscDataFeeds: typeof bscDataFeeds;
declare const index_celoDataFeeds: typeof celoDataFeeds;
declare const index_ethereumDataFeeds: typeof ethereumDataFeeds;
declare const index_fantomDataFeeds: typeof fantomDataFeeds;
declare const index_harmonyDataFeeds: typeof harmonyDataFeeds;
declare const index_moonbeamDataFeeds: typeof moonbeamDataFeeds;
declare const index_metisDataFeeds: typeof metisDataFeeds;
declare const index_moonriverDataFeeds: typeof moonriverDataFeeds;
declare const index_optimismDataFeeds: typeof optimismDataFeeds;
declare const index_polygonDataFeeds: typeof polygonDataFeeds;
declare const index_xdaiDataFeeds: typeof xdaiDataFeeds;
declare namespace index {
  export {
    index_arbitrumDataFeeds as arbitrumDataFeeds,
    index_avalancheDataFeeds as avalancheDataFeeds,
    index_baseDataFeeds as baseDataFeeds,
    index_bscDataFeeds as bscDataFeeds,
    index_celoDataFeeds as celoDataFeeds,
    index_ethereumDataFeeds as ethereumDataFeeds,
    index_fantomDataFeeds as fantomDataFeeds,
    index_harmonyDataFeeds as harmonyDataFeeds,
    index_moonbeamDataFeeds as moonbeamDataFeeds,
    index_metisDataFeeds as metisDataFeeds,
    index_moonriverDataFeeds as moonriverDataFeeds,
    index_optimismDataFeeds as optimismDataFeeds,
    index_polygonDataFeeds as polygonDataFeeds,
    index_xdaiDataFeeds as xdaiDataFeeds,
  };
}

/**
 * Subscribes to ChainLink price update logs and returns a filter object.
 * @param {ChainLinkDataFeed} options.chainLinkDataDeed - The ChainLink data feed object.
 * @param {ReturnType<typeof createPublicClient>} options.viemClient - The VIEM client object.
 * @param {(result: ReturnType<typeof formatLogWithMetadata>[]) => void} options.onLogsEvent - The callback function to handle the logs.
 * @returns {Promise<Filter>} - A Promise that resolves with the filter object. You can unsub using this.
 * @throws {Error} - If one of the log results is missing.
 */
declare const subscribeToChainLinkPriceUpdate: ({ chainLinkDataDeed: chainLinkDataFeed, viemClient, onLogsEvent, }: {
    chainLinkDataDeed: ChainLinkDataFeed;
    viemClient: ReturnType<typeof createPublicClient>;
    onLogsEvent: (result: ReturnType<typeof formatLogWithMetadata>[]) => void;
}) => Promise<{
    aggregatorContractAddress: `0x${string}`;
    unWatch: viem.WatchContractEventReturnType;
    chainLinkDataFeed: ChainLinkDataFeed;
    description: string;
}>;
/**
 * Subscribes to ChainLink price updates for a list of feed addresses.
 * @param feedAddresses - An array of feed addresses to subscribe to.
 * @param publicClient - The public client to use for subscribing. Must use a websocket URL.
 * @param onLogsFunction - A function to call when new logs are received.
 * @param checkForNewAggregatorInterval - (Optional) The interval (in seconds) to check for new aggregators. Defaults to 60 seconds.
 * @returns A Promise that resolves when all feeds have been subscribed to.
 */
declare const subscribeToChainLinkPriceUpdates: ({ feedAddresses, publicClient, onLogsFunction, checkForNewAggregatorInterval, }: {
    feedAddresses: `0x${string}`[];
    publicClient: PublicClient<WebSocketTransport, Chain>;
    onLogsFunction: (array: {
        roundId: bigint;
        current: string;
        updatedAt: Date;
        description: string;
    }[]) => void;
    checkForNewAggregatorInterval?: number | undefined;
}) => Promise<void>;

export { index as ChainDataFeeds, ChainLinkDataFeed, formatLogWithMetadata, formatRoundData, setupAllFeeds, subscribeToChainLinkPriceUpdate, subscribeToChainLinkPriceUpdates };