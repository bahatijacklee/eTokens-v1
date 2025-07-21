import { BigNumber, ethers } from "ethers";
import { contract, getTokenContract } from "./contract";
import { toWei, toEth } from "./utils";

const DEX_ADDRESS = "0xdb2c57a7FA682780a6219A3AD18fc71B2C170E44"; // reuse address

export async function swapEthToToken(tokenName, amount) {
  try {
    const contractObj = await contract();
    const tx = await contractObj.swapEthToToken(tokenName, {
      value: toWei(amount)
    });
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function hasValidAllowance(owner, tokenName, amount) {
  try {
    const dex = await contract();
    const tokenAddress = await dex.getTokenAddress(tokenName);
    const token = await getTokenContract(tokenAddress);

    const allowance = await token.allowance(owner, DEX_ADDRESS);
    return BigNumber.from(allowance).gte(toWei(amount));
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function swapTokenToEth(tokenName, amount) {
  try {
    const contractObj = await contract();
    const tx = await contractObj.swapTokenToEth(tokenName, toWei(amount));
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function swapTokenToToken(srcToken, destToken, amount) {
  try {
    const contractObj = await contract();
    const tx = await contractObj.swapTokenToToken(srcToken, destToken, toWei(amount));
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function getTokenBalance(tokenName, address) {
  const contractObj = await contract();
  const balance = await contractObj.getBalance(tokenName, address);
  return toEth(balance);
}

export async function getTokenAddress(tokenName) {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);
    return address;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function increaseAllowance(tokenName, amount) {
  try {
    const dex = await contract();
    const tokenAddress = await dex.getTokenAddress(tokenName);
    const token = await getTokenContract(tokenAddress);

    const tx = await token.approve(DEX_ADDRESS, toWei(amount));
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function getAllHistory() {
  try {
    const contractObj = await contract();
    const historyList = await contractObj.getAllHistory();

    const formatted = historyList.map((history) => ({
      historyId: history.historyId.toNumber(),
      tokenA: history.tokenA,
      tokenB: history.tokenB,
      inputValue: toEth(history.inputValue),
      outputValue: toEth(history.outputValue),
      userAddress: history.userAddress,
    }));

    return formatted;
  } catch (error) {
    return parseErrorMsg(error);
  }
}

export async function faucetToken(tokenName) {
  try {
    const contractObj = await contract();
    const tx = await contractObj.faucet(tokenName);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    return parseErrorMsg(error);
  }
}


// Optional local utility
function parseErrorMsg(error) {
  const json = JSON.parse(JSON.stringify(error));
  return json?.reason || json?.error?.message || "Unknown error";
}
