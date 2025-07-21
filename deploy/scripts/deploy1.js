const hre = require("hardhat");

const tokenList = [
  "Tether USD",
  "BNB",
  "USD Coin",
  "stETH",
  "TRON",
  "Matic Token",
  "Shiba INU",
  "Uniswap",
  "eCoin",
  "Litecoin",
  "Dogecoin",
  "Wrapped ETH",
  "DAI Stablecoin"
];

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("👤 Deployer:", deployer.address);
  console.log("💰 Deployer balance:", hre.ethers.utils.formatEther(await deployer.getBalance()), "ETH");

  // Deploy the CustomDex contract
  const DexFactory = await hre.ethers.getContractFactory("CustomDex");
  const dex = await DexFactory.deploy({
    maxPriorityFeePerGas: hre.ethers.utils.parseUnits("1.5", "gwei"),
    maxFeePerGas: hre.ethers.utils.parseUnits("50", "gwei"),
    gasLimit: 7000000
  });

  await dex.deployed();
  console.log("✅ CustomDex deployed to:", dex.address);

  // Initialize tokens by calling createToken()
  for (const name of tokenList) {
    const tx = await dex.createToken(name, {
      maxPriorityFeePerGas: hre.ethers.utils.parseUnits("1.5", "gwei"),
      maxFeePerGas: hre.ethers.utils.parseUnits("50", "gwei"),
      gasLimit: 500000
    });
    await tx.wait();
    console.log(`🎯 Created token: ${name}`);
  }

  // Send 1 ETH to DEX contract for swap liquidity
  const fundTx = await deployer.sendTransaction({
    to: dex.address,
    value: hre.ethers.utils.parseEther("1.0"),
    maxPriorityFeePerGas: hre.ethers.utils.parseUnits("1.5", "gwei"),
    maxFeePerGas: hre.ethers.utils.parseUnits("50", "gwei")
  });
  await fundTx.wait();
  console.log("💸 Funded DEX with 1 ETH.");

  console.log("🚀 Deployment complete.");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
