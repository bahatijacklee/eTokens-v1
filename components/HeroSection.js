
import React from "react";

const HeroSection = () => {
  return (
    <section className="py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to eTokens DEX
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Swap ERC-20 tokens seamlessly on Lisk Sepolia. Connect your wallet to get started!
      </p>
      <img
        src="/Business_SVG.svg"
        alt="eTokens DEX"
        className="mx-auto w-1/2 md:w-1/3"
      />
    </section>
  );
};

export default HeroSection;
