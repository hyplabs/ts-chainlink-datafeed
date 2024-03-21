import { expect, test } from "vitest";
import {
  ChainLinkDataFeed,
  polygonDataFeeds,
  subscribeToChainLinkPriceUpdates,
} from "../index.js";
import { polygon } from "viem/chains";
import { createPublicClient, fallback, http } from "viem";

const polygonRpcList = [
  "https://polygon-bor.publicnode.com",
  "https://polygon.meowrpc.com",
];

const transports = fallback(polygonRpcList.map((rpc) => http(rpc)));

test("Single data feed working", async () => {
  const feed = polygonDataFeeds["ETH / USD"];

  const client = createPublicClient({
    transport: transports,
    chain: polygon,
    batch: {
      multicall: true,
    },
  });

  const dataFeed = new ChainLinkDataFeed({
    contractAddress: feed,
    viemClient: client,
  });

  const data = await dataFeed.getLatestRoundData(true);

  console.log(data);

  expect(data).toBeDefined();
  expect(data.description).toBe("ETH / USD");
  expect(data.roundId).toBeTypeOf("bigint");
});

test(
  "Subscribe to multiple data feeds",
  async () => {
    const client = createPublicClient({
      transport: transports,
      chain: polygon,
      batch: {
        multicall: true,
      },
    });

    let feed:
      | {
          roundId: bigint;
          current: string;
          updatedAt: Date;
          description: string;
        }
      | undefined = undefined;

    subscribeToChainLinkPriceUpdates({
      feedAddresses: Object.values(polygonDataFeeds),
      publicClient: client,
      onLogsFunction(array) {
        const feedOne = array[0];
        feed = feedOne;
      },
    });

    while (!feed) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    feed = feed as {
      roundId: bigint;
      current: string;
      updatedAt: Date;
      description: string;
    };

    console.log(feed);
    expect(feed).toBeDefined();
    expect(feed.description).toBeTypeOf("string");
    expect(feed.roundId).toBeTypeOf("bigint");
    expect(feed.current).toBeTypeOf("string");
    expect(feed.updatedAt).toBeTypeOf("object");
  },
  {
    timeout: 30000,
  }
);
