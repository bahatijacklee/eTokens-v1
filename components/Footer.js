
import React from "react";
import Facebook from "./SVG/Facebook";
import Insta from "./SVG/Insta";
import Twitter from "./SVG/Twitter";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Insta />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter />
          </a>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          © 2025 eTokens DEX. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
