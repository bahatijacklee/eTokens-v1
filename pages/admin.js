
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { contract } from "../utils/contract";
import { toWei } from "../utils/utils";

const Admin = () => {
  const { address, isConnected } = useAccount();
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwner = async () => {
      if (isConnected) {
        const dex = await contract();
        const owner = await dex.owner();
        setIsOwner(owner.toLowerCase() === address.toLowerCase());
      }
    };
    checkOwner();
  }, [address, isConnected]);

  const handleCreateToken = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.");
      return;
    }
    if (!isOwner) {
      toast.error("Only the contract owner can create tokens.");
      return;
    }
    if (!tokenName || !tokenSymbol || !initialSupply) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const dex = await contract();
      const tx = await dex.createToken(tokenName, tokenSymbol, toWei(initialSupply));
      await tx.wait();
      toast.success(`Token ${tokenName} created successfully!`);
      setTokenName("");
      setTokenSymbol("");
      setInitialSupply("");
    } catch (error) {
      toast.error(`Failed to create token: ${error.reason || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Admin Panel</h1>
        {isConnected && isOwner ? (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Create New Token</h2>
            <div className="mb-4">
              <label className="block text-gray-600 dark:text-gray-400 mb-2">Token Name</label>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="e.g., eCoin"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 dark:text-gray-400 mb-2">Token Symbol</label>
              <input
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                placeholder="e.g., ECO"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 dark:text-gray-400 mb-2">Initial Supply</label>
              <input
                type="number"
                value={initialSupply}
                onChange={(e) => setInitialSupply(e.target.value)}
                placeholder="e.g., 1000000"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              onClick={handleCreateToken}
              disabled={isLoading}
              className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
            >
              {isLoading ? "Creating..." : "Create Token"}
            </button>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            {isConnected ? "Only the contract owner can access this page." : "Please connect your wallet."}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
