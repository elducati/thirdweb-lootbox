import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import type { PackMetadataWithBalance } from "@3rdweb/sdk";
import { useEffect, useState } from "react";
import { packAddress } from "../lib/contractAddresses";

export function getStaticProps() {
  return {
    props: {
      title: "Winner's Lounge",
    },
  };
}

export default function Lounge() {
  const { address } = useWeb3()
const [loading, setLoading] = useState(false);
const [packNfts, setPackNfts] = useState<PackMetadataWithBalance[]>([]);

const sdk = new ThirdwebSDK("https://winter-icy-sun.matic-testnet.quiknode.pro/f36aa318f8f806e4e15a58ab4a1b6cb9f9e9d9b9/")
const packModule = sdk.getPackModule(packAddress);


async function getNftsWithLoading() {
  setLoading(true)
  try {
    const fetchedPackNfts = await packModule.getOwned(address)
    console.log(fetchedPackNfts)
    setPackNfts(fetchedPackNfts)
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  if (address) {
    getNftsWithLoading()
  }
}, [address])

  return <p>You need to own some NFTs to access the lounge!</p>;

}
