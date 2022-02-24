import { sdk } from "./helpers.js";

async function main() {
  const packModuleAddress = '0xD6e45249cCC9d2e8d072AB1f3d5293547282f469';
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Opening the pack...');
  const opened = await packModule.open('0');
  console.log('Opened the pack!');
  console.log(opened);
}

try {
  await main();
} catch (error) {
  console.error("Error opening the pack", error);
  process.exit(1);
}