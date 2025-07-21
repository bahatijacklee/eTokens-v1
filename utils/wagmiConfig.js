
import { configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"; // Updated import
import { publicProvider } from "wagmi/providers/public"; // Updated import
import { metaMask } from "@wagmi/connectors/metaMask";

const LISK_SEPOLIA_RPC = process.env.NEXT_PUBLIC_LISK_SEPOLIA_URL || "https://rpc.sepolia.lisk.com";
const FALLBACK_RPC = "https://rpc.sepolia.lisk.com/v1";

export const { chains, provider } = configureChains(
  [
    {
      id: 4202,
      name: "Lisk Sepolia",
      network: "liskSepolia",
      nativeCurrency: {
        name: "Lisk Sepolia Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: {
        default: { http: [LISK_SEPOLIA_RPC, FALLBACK_RPC] },
        public: { http: [LISK_SEPOLIA_RPC, FALLBACK_RPC] },
      },
      blockExplorers: {
        default: { name: "Lisk Sepolia Explorer", url: "https://sepolia-blockscout.lisk.com" },
      },
      testnet: true,
    },
  ],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }) }), publicProvider()]
);

export const wagmiClient = createClient({
  autoConnect: true,
  provider,
  connectors: [metaMask({ chains })],
});
