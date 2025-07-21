
import React from "react";

const Table = ({ history }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">ID</th>
            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">User</th>
            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Token A</th>
            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Token B</th>
            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Input</th>
            <th className="px-4 py-2 text-left text-gray-800 dark:text-white">Output</th>
          </tr>
        </thead>
        <tbody>
          {history.map((tx) => (
            <tr key={tx.historyId} className="border-t dark:border-gray-700">
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{tx.historyId}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{tx.userAddress.slice(0, 6)}...{tx.userAddress.slice(-4)}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{tx.tokenA}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{tx.tokenB}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{tx.inputValue}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{tx.outputValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
