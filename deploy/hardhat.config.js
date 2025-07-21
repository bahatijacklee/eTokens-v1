require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const LISK_SEPOLIA_RPC = "https://rpc.sepolia-api.lisk.com"; // Replace if needed
const PRIVATE_KEY = process.env.YOUR_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "lisk_sepolia",
  networks: {
    hardhat: {},
    lisk_sepolia: {
      url: LISK_SEPOLIA_RPC,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 4202, // Confirm this with Lisk docs or explorer
      maxPriorityFeePerGas: 1.5 * 1e9, // 1.5 Gwei
      maxFeePerGas: 50 * 1e9 // 50 Gwei
    },
  },
};
