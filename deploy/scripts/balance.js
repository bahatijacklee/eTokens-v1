const [deployer] = await hre.ethers.getSigners();
const balance = await deployer.getBalance();
console.log("Deployer balance:", hre.ethers.utils.formatEther(balance));
