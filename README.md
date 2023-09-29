# ChainLinkDataFeed

This TypeScript project provides a ChainLink data feed that can be used to retrieve data from any EVM chain on http://data.chain.link.

## Setup

To use this project, you'll need to have Node.js and Yarn installed on your system. Once you have those installed, you can follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `yarn install` to install the project dependencies.

## Usage

```typescript
const RPCUrl =
  "wss://-------";

const callClient = createPublicClient({
  transport: webSocket(RPCUrl),
  chain: mainnet,
  batch: {
    multicall: true,
  },
});

subscribeToChainLinkPriceUpdates({
  feedAddresses: Object.values(ethereumDataFeeds),
  publicClient: callClient,
  onLogsFunction: (array) =>
    array.forEach((item: any) => {
      console.log("CALL");
      console.log(`Asset: ${item.description}`);
      console.log(`🔘 Round ID: ${item.roundId}`);
      if (item.description.includes("USD")) {
        console.log(`📈 Answer: $${item.current}`);
      } else if (item.description.includes("/ ETH")) {
        console.log(`📈 Answer: Ξ${item.current}`);
      } else {
        console.log(`📈 Answer: ${item.current}`);
      }
      console.log(`⏰ Time: ${item.updatedAt}`);
      console.log("----------------------------------------");
    }),
});

```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.