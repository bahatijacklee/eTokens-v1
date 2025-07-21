import { ethers } from 'ethers';

export function toWei(amount, decimals = 18) {
  const toWei = ethers.utils.parseUnits(amount.toString(), decimals);
  return toWei.toString();
}

export function toEth(amount, decimals = 18) {
  const toEth = ethers.utils.formatUnits(amount.toString(), decimals);
  return toEth.toString();
}

export const DEFAULT_DECIMALS = 18;
export const ETHER = ethers.constants.WeiPerEther;
