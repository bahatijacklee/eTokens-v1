
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import TokenBalance from "../components/TokenBalance";
import Table from "../components/Table";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchTokenList, getAllHistory } from "../utils/context";

const Tokens = () => {
  const { address, isConnected } = useAccount();
  const [tokens, setTokens] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (isConnected) {
        const tokenList = await fetchTokenList();
        setTokens(tokenList);
        const historyList = await getAllHistory();
        setHistory(historyList);
      }
    };
    loadData();
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Your Tokens</h1>
        {isConnected ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {tokens.map((token) => (
                <TokenBalance key={token.name} tokenName={token.name} userAddress={address} />
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Transaction History</h2>
            <Table history={history} />
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Please connect your wallet to view your tokens and history.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Tokens;
