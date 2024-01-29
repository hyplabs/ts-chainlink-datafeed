import path, { dirname } from "path";
import { chromium } from "playwright";
import fs from "fs";
import { fileURLToPath } from "url";

const ethereumAddressRegex = /0x[a-fA-F0-9]{40}/g;

const dataFeedUrl = "https://data.chain.link/feeds";

let blockchains: Record<string, Record<string, string>> = {};

const getChainlinkDataFeeds = async (url: string) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  while (true) {
    const table = await page.$("table");
    if (!table) {
      console.log("Missing table for: ", url);
      break;
    }
    const rows = await table.$$("tr");
    for (let i = 1; i < rows.length; i++) {
      const columns = await rows[i].$$("td");
      const chain = await columns[1].innerText(); // Network
      const link = await columns[3].$("a");
      const url = await link?.getAttribute("href");
      const extractedAddress = url?.match(ethereumAddressRegex)?.[0];

      const feed = {
        name: await columns[0].innerText(),
        address: extractedAddress,
      };
      if (!feed.address) {
        console.log("Could not extract address for : ", feed.name);
        break;
      }

      if (!blockchains[chain]) {
        blockchains[chain] = {};
      }

      blockchains[chain][feed.name] = feed.address;
      console.log(`${chain} : ${feed.name} : ${feed.address}`);
    }
    const nextButton = await page.getByRole("button", { name: "Next" });
    if (await nextButton.isDisabled()) {
      console.log("Next button is disabled, exiting");
      break;
    }
    if (nextButton) {
      await nextButton.click();
    } else {
      break;
    }
  }
  await browser.close();
};

await getChainlinkDataFeeds(dataFeedUrl);

console.log(blockchains);
console.log(Object.keys(blockchains).length);

const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);

for (const chain in blockchains) {
  const data = blockchains[chain];
  const simpleName = chain.split(" ")[0].toLowerCase();

  const dataFeed = `${simpleName}.ts`;

  const dataFeedPathFull = path.join(
    dirname(currentModulePath),
    "../src/dataFeeds",
    dataFeed
  );
  const stringifiedResult = JSON.stringify(data);
  fs.writeFile(
    dataFeedPathFull,
    `export const ${simpleName}DataFeeds = ${stringifiedResult} as const;`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

let markdown = "";
Object.keys(blockchains).forEach((blockchain) => {
  // make first letter of blockchain uppercase
  const blockChainUpper =
    blockchain.charAt(0).toUpperCase() + blockchain.slice(1);
  markdown += `\n\n### ${blockChainUpper}\n\n`;
  const feeds = blockchains[blockchain];
  Object.keys(feeds).forEach((feed) => {
    markdown += `- ${feed}\n`;
  });
});

// find the line with "## Included Chainlink Feeds" in the README.md
const readmePath = path.join(dirname(currentModulePath), "../README.md");
const readme = fs.readFileSync(readmePath, "utf8");
const lines = readme.split("\n");
const index = lines.findIndex((line) =>
  line.includes("## Included Chainlink Feeds")
);

// delete everything after the index in the readme

const newReadme = lines.slice(0, index + 1).join("\n") + markdown;

fs.writeFile(readmePath, newReadme, (err) => {
  if (err) {
    console.log(err);
  }
});
