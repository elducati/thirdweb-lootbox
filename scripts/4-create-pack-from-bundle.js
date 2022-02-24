import { readFileSync } from 'fs';
import { sdk } from './helpers.js';

async function main() {
  const bundleModuleAddress = '0x3E180B737b06e98D7B9f9ADB311AB096331B175a'; // your bundle module address
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  const packModuleAddress = '0xD6e45249cCC9d2e8d072AB1f3d5293547282f469'; // your pack module address
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Getting all NFTs from bundle...');
  const nftsInBundle = await bundleModule.getAll();

  console.log('NFTs in bundle:');
  console.log(nftsInBundle);

  console.log('Creating a pack containing the NFTs from bundle...');
  const created = await packModule.create({
    assetContract: bundleModuleAddress,
    metadata: {
      name: 'Fancy Cars Pack!',
      image: readFileSync('./assets/fancy-cars.jpg'),
    },
    assets: nftsInBundle.map(nft => ({
      tokenId: nft.metadata.id,
      amount: nft.supply,
    })),
  });

  console.log('Pack created!')
  console.log(created);
}

try {
  await main();
} catch (error) {
  console.error("Error minting the NFTs", error);
  process.exit(1);
}