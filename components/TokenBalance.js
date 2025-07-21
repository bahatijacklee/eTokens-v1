
import React, { useEffect, useState } from "react";
import { getTokenBalance } from "../utils/context";

const TokenBalance = ({ tokenName, userAddress }) => {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getTokenBalance(tokenName, userAddress);
      setBalance(balance);
    };
    if (userAddress && tokenName) {
      fetchBalance();
    }
  }, [tokenName, userAddress]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{tokenName}</h3>
      <p className="text-gray-600 dark:text-gray-400">Balance: {balance}</p>
    </div>
  );
};

export default TokenBalance;
