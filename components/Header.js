import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";
import Logo from "./SVG/Logo";
import Menu from "./SVG/Menu";

const Header = () => {
  const { isConnected } = useAccount();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">eTokens DEX</span>
          </a>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/">
            <a className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Home
            </a>
          </Link>
          <Link href="/tokens">
            <a className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Tokens
            </a>
          </Link>
          {isConnected && (
            <Link href="/admin">
              <a className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                Admin
              </a>
            </Link>
          )}
          <ConnectButton.Custom>
            {({ account, chain, openConnectModal, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected = ready && account && chain;

              return (
                <button
                  onClick={openConnectModal}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    connected
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  disabled={!ready}
                >
                  {connected ? `${account.displayName} (${chain.name})` : "Connect Wallet"}
                </button>
              );
            }}
          </ConnectButton.Custom>
          <Menu />
        </nav>
      </div>
    </header>
  );
};

export default Header;