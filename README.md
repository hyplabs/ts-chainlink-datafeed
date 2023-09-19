# ChainLinkDataFeed

This TypeScript project provides a ChainLink data feed that can be used to retrieve data from the Ethereum network. It uses the EAC contract and ABI to retrieve data from the network.

## Setup

To use this project, you'll need to have Node.js and Yarn installed on your system. Once you have those installed, you can follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `yarn install` to install the project dependencies.

## Usage

To use the ChainLinkDataFeed, you can create a new instance of the `ChainLinkDataFeed` class and pass in the required parameters:

```typescript
import ChainLinkDataFeed from "../src/index.js";
import { mainnet } from "viem/chains";

const chainLinkDataFeed = new ChainLinkDataFeed({
  chain: mainnet,
  contractAddress: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419",
  rpcUrls: [
    "https://eth.llamarpc.com",
    "https://uk.rpc.blxrbdn.com",
    "https://eth-mainnet.public.blastapi.io",
    ...
  ],
});

const result = await chainLinkDataFeed.getLatestRoundData();

console.log(result);
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.