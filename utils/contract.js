import { ethers } from "ethers";
import CustomDexABI from "../utils/CustomDex.json";
import CustomTokenABI from "../utils/CustomToken.json";

// ✅ Your deployed CustomDex contract address
const DEX_ADDRESS = "0xdb2c57a7FA682780a6219A3AD18fc71B2C170E44";

// ✅ Get CustomDex contract instance
export const getDexContract = async () => {
  if (!window.ethereum) {
    console.error("MetaMask not detected.");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(DEX_ADDRESS, CustomDexABI.abi, signer);
};

// ✅ Get CustomToken contract instance by its address
export const getTokenContract = async (tokenAddress) => {
  if (!window.ethereum) {
    console.error("MetaMask not detected.");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(tokenAddress, CustomTokenABI.abi, signer);
};

//Token dynamic fetching
export const fetchTokenList = async () => {
  if (!window.ethereum) {
    console.error("MetaMask not available");
    return [];
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dex = new ethers.Contract(
    DEX_ADDRESS,
    CustomDexABI.abi,
    signer
  );

  try {
    const tokenNames = await dex.getTokenList();

    const tokenInfoList = await Promise.all(
      tokenNames.map(async (name) => {
        const address = await dex.getTokenAddress(name);
        return {
          name,
          address,
        };
      })
    );

    return tokenInfoList; // [{ name: "Tether USD", address: "0x..." }, ...]
  } catch (error) {
    console.error("❌ Failed to fetch token list:", error);
    return [];
  }
};
