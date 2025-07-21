
import React from "react";

const Selector = ({ tokens, selectedToken, onChange, label = "Token" }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 dark:text-gray-400 mb-2">{label}</label>
      <select
        value={selectedToken}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">Select a token</option>
        {tokens.map((token) => (
          <option key={token.address} value={token.name}>
            {token.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
