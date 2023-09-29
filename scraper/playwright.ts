import { chromium } from "playwright";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const getContractAddressFromUrl = (url: string) => {
  const split = url.split("/");
  return split[split.length - 1];
};

const urlList = [
  "https://data.chain.link/ethereum/mainnet",
  "https://data.chain.link/polygon/mainnet",
  "https://data.chain.link/arbitrum/mainnet",
  "https://data.chain.link/xdai/mainnet",
  "https://data.chain.link/harmony/mainnet",
  "https://data.chain.link/moonriver/mainnet",
  "https://data.chain.link/celo/mainnet",
  "https://data.chain.link/bsc/mainnet",
  "https://data.chain.link/optimism/mainnet",
  "https://data.chain.link/avalanche/mainnet",
  "https://data.chain.link/fantom/mainnet",
  "https://data.chain.link/base/base",
  "https://data.chain.link/moonbeam/mainnet",
  "https://data.chain.link/metis/mainnet",
];

const getChainlinkDataFeeds = async (url: string) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const result = {};
  while (true) {
    const table = await page.$("table");
    if (!table) {
      console.log("Missing table for: ", url);
      continue;
    }
    const rows = await table.$$("tr");
    for (let i = 1; i < rows.length; i++) {
      const columns = await rows[i].$$("td");
      const feed = {
        name: await columns[0].innerText(),
        link: await columns[2].$("a"),
      };
      if (!feed.link) {
        console.log("Missing link for: ", feed.name);
        continue;
      }
      const address = await feed.link.getAttribute("href");
      if (!address) {
        console.log("Missing address for: ", feed.name);
        continue;
      }
      result[`${feed.name}`] = getContractAddressFromUrl(address);
      console.log(`${feed.name}`, result[`${feed.name}`]);
    }
    const nextButton = await page.getByRole("button", { name: "Next" });
    if (await nextButton.isDisabled()) {
      break;
    }
    if (nextButton) {
      await nextButton.click();
    } else {
      break;
    }
  }
  await browser.close();
  return result;
};

const removeList = ["TOMO / USD", "BNT / ETH"];

const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);

urlList.forEach(async (url) => {
  const result = await getChainlinkDataFeeds(url);
  const split = url.split("/");
  const blockchain = split[split.length - 2];
  const dataFeed = `${blockchain}.ts`;

  const dataFeedPathFull = path.join(
    dirname(currentModulePath),
    "../src/dataFeeds",
    dataFeed
  );
  const stringifiedResult = JSON.stringify(result);
  fs.writeFile(
    dataFeedPathFull,
    `export const ${blockchain}DataFeeds = ${stringifiedResult} as const;`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});
