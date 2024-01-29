import { createPublicClient, fallback } from "viem";
import { Row } from "./@/components/Row";
import { useDataFeed } from "./hooks/useDataFeed";
import { useWebsocketOrHttpTransport } from "../../../src/utils";
import { polygon } from "viem/chains";
import { polygonDataFeeds } from "../../../src/dataFeeds/polygon";

const PolygonRPCList = [
  "https://1rpc.io/matic",
  "https://polygon-bor.publicnode.com",
  "https://polygon.meowrpc.com",
  "https://rpc.ankr.com/polygon",
];

const transports = fallback(
  PolygonRPCList.map((rpc) => useWebsocketOrHttpTransport(rpc))
);

const polygonClient = createPublicClient({
  transport: transports,
  chain: polygon,
  batch: {
    multicall: true,
  },
});

export default function App() {
  const arbitrum = useDataFeed({
    viemClient: polygonClient,
    chainDataFeeds: polygonDataFeeds,
    feedsToSubscribeTo: [
      "1INCH / USD",
      "BNB / USD",
      "ETH / USD",
      "MATIC / USD",
    ],
  });

  const fed = Object.values(arbitrum);
  return (
    <main className="max-w-[1080px] m-auto my-10">
      <Row
        chainName="Polygon - As price updates come in, they will be displayed below"
        feeds={fed}
      />
    </main>
  );
}
