import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const Row = ({
  chainName,
  feeds,
}: {
  chainName: string;
  feeds: { description: string; price: string; updatedAt: Date }[];
}) => {
  const [previousPrices, setPreviousPrices] = useState<Record<string, number>>(
    {}
  );
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const prices = {} as Record<string, number>;
    feeds.forEach((feed) => {
      prices[feed.description] = Number(feed.price);
    });
    // Only update states if prices have changed
    if (JSON.stringify(prices) !== JSON.stringify(currentPrices)) {
      setPreviousPrices(currentPrices);
      setCurrentPrices(prices);
    }
  }, [feeds]);

  const rows = feeds.map((feed) => {
    const priceIncrease = Number(feed.price) > previousPrices[feed.description];
    const priceDecrease = Number(feed.price) < previousPrices[feed.description];

    return (
      <TableRow className="">
        <TableCell>{feed.description}</TableCell>
        <TableCell>
          {feed.description.includes("USD") ? `$${feed.price}` : feed.price}
        </TableCell>
        <TableCell>
          {priceIncrease && <span className="text-green-500 text-2xl">↑</span>}
          {priceDecrease && <span className="text-red-500 text-2xl">↓</span>}
          {!priceIncrease && !priceDecrease && (
            <span className="text-blue-500 text-2xl">-</span>
          )}
        </TableCell>
        <TableCell>{feed.updatedAt.toISOString()}</TableCell>
      </TableRow>
    );
  });

  return (
    <section className="border rounded-lg w-full overflow-auto">
      <h2 className="text-2xl font-bold p-4 bg-gray-100">{chainName}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Price Feed</TableHead>
            <TableHead className="w-[150px]">Current Price</TableHead>
            <TableHead className="w-[150px]">Vs Previous Price</TableHead>
            <TableHead className="w-[200px]">Last Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{rows.map((row) => row)}</TableBody>
      </Table>
    </section>
  );
};
