
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import {
  swapEthToToken,
  swapTokenToEth,
  swapTokenToToken,
  hasValidAllowance,
  increaseAllowance,
  fetchTokenList,
} from "../utils/context";
import SwapField from "./SwapField";
import Selector from "./Selector";
import TransactionStatus from "./TransactionStatus";

const SwapComponent = () => {
  const { address, isConnected } = useAccount();
  const [swapType, setSwapType] = useState("ethToToken");
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [selectedToken2, setSelectedToken2] = useState("");
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTokens = async () => {
      const tokenList = await fetchTokenList();
      setTokens(tokenList);
      if (tokenList.length > 0) {
        setSelectedToken(tokenList[0].name);
        setSelectedToken2(tokenList[1]?.name || tokenList[0].name);
      }
    };
    loadTokens();
  }, []);

  const handleSwap = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.");
      return;
    }
    if (!amount || !selectedToken) {
      toast.error("Please enter an amount and select a token.");
      return;
    }
    if (swapType === "tokenToToken" && !selectedToken2) {
      toast.error("Please select a destination token.");
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      let receipt;
      if (swapType === "ethToToken") {
        receipt = await swapEthToToken(selectedToken, amount);
      } else if (swapType === "tokenToEth") {
        const hasAllowance = await hasValidAllowance(address, selectedToken, amount);
        if (!hasAllowance) {
          toast.loading("Approving token...");
          await increaseAllowance(selectedToken, amount);
          toast.success("Token approved!");
        }
        receipt = await swapTokenToEth(selectedToken, amount);
      } else {
        const hasAllowance = await hasValidAllowance(address, selectedToken, amount);
        if (!hasAllowance) {
          toast.loading("Approving token...");
          await increaseAllowance(selectedToken, amount);
          toast.success("Token approved!");
        }
        receipt = await swapTokenToToken(selectedToken, selectedToken2, amount);
      }
      setIsSuccess(true);
      toast.success("Swap successful!");
      setAmount("");
    } catch (err) {
      setError(err);
      toast.error(`Swap failed: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Swap Tokens</h2>
      {isConnected ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 mb-2">Swap Type</label>
            <select
              value={swapType}
              onChange={(e) => setSwapType(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="ethToToken">ETH to Token</option>
              <option value="tokenToEth">Token to ETH</option>
              <option value="tokenToToken">Token to Token</option>
            </select>
          </div>
          <SwapField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <Selector
            tokens={tokens}
            selectedToken={selectedToken}
            onChange={setSelectedToken}
            label="Source Token"
          />
          {swapType === "tokenToToken" && (
            <Selector
              tokens={tokens}
              selectedToken={selectedToken2}
              onChange={setSelectedToken2}
              label="Destination Token"
            />
          )}
          <button
            onClick={handleSwap}
            disabled={isLoading}
            className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Swapping..." : "Swap"}
          </button>
          <TransactionStatus isLoading={isLoading} isSuccess={isSuccess} error={error} />
        </>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Please connect your wallet to swap tokens.</p>
      )}
    </div>
  );
};

export default SwapComponent;
