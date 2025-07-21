const hre = require("hardhat");

async function main() {
  const CustomDexFactory = await hre.ethers.getContractFactory("CustomDex");
  const customDex = await CustomDexFactory.deploy({
    maxPriorityFeePerGas: hre.ethers.utils.parseUnits('1.5', 'gwei'),
    maxFeePerGas: hre.ethers.utils.parseUnits('50', 'gwei')
  });

  await customDex.deployed();

  console.log("CustomDex deployed to:", customDex.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
 