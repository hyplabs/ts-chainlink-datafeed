import ChainLinkDataFeed from "./ChainLinkDataFeed.js";
import { baseDataFeeds } from "./dataFeeds/base.js";
import { ethereumDataFeeds } from "./dataFeeds/ethereum.js";
import { polygonDataFeeds } from "./dataFeeds/polygon.js";
import { bscDataFeeds } from "./dataFeeds/bsc.js";
import { fantomDataFeeds } from "./dataFeeds/fantom.js";
import { xdaiDataFeeds } from "./dataFeeds/xdai.js";
import { celoDataFeeds } from "./dataFeeds/celo.js";
import { arbitrumDataFeeds } from "./dataFeeds/arbitrum.js";
import { avalancheDataFeeds } from "./dataFeeds/avalanche.js";
import { moonbeamDataFeeds } from "./dataFeeds/moonbeam.js";
import { optimismDataFeeds } from "./dataFeeds/optimism.js";
import { harmonyDataFeeds } from "./dataFeeds/harmony.js";
import { scrollDataFeeds } from "./dataFeeds/scroll.js";
import {
  subscribeToChainLinkPriceUpdate,
  subscribeToChainLinkPriceUpdates,
} from "./Aggregator.js";
import { useDataFeed } from "./useDataFeed.js";
import { useWebsocketOrHttpTransport } from "./utils.js";

export {
  baseDataFeeds,
  ethereumDataFeeds,
  polygonDataFeeds,
  bscDataFeeds,
  fantomDataFeeds,
  xdaiDataFeeds,
  celoDataFeeds,
  arbitrumDataFeeds,
  avalancheDataFeeds,
  moonbeamDataFeeds,
  optimismDataFeeds,
  harmonyDataFeeds,
  scrollDataFeeds,
};

export {
  ChainLinkDataFeed,
  subscribeToChainLinkPriceUpdate,
  subscribeToChainLinkPriceUpdates,
  useDataFeed,
  useWebsocketOrHttpTransport,
};
