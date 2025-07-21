
import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SwapComponent from "../components/SwapComponent";
import Footer from "../components/Footer";
import { useAccount } from "wagmi";
import { faucetToken } from "../utils/context";
import toast from "react-hot-toast";
import { TOKEN_LIST } from "../utils/saleToken";

const Home = () => {
  const { isConnected } = useAccount();
  const [selectedToken, setSelectedToken] = useState(TOKEN_LIST[0] || "");

  const handleFaucet = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.");
      return;
    }
    if (!selectedToken) {
      toast.error("Please select a token.");
      return;
    }
    try {
      const receipt = await faucetToken(selectedToken);
      toast.success(`Faucet claimed for ${selectedToken}!`);
    } catch (error) {
      toast.error(`Faucet failed: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>eTokens DEX</title>
        <meta name="description" content="Decentralized exchange for swapping ERC-20 tokens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <SwapComponent />
        {isConnected && (
          <div className="mt-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Claim Faucet</h2>
            <div className="mb-4">
              <label className="block text-gray-600 dark:text-gray-400 mb-2">Select Token</label>
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select a token</option>
                {TOKEN_LIST.map((token) => (
                  <option key={token} value={token}>
                    {token}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleFaucet}
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Claim Faucet
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
