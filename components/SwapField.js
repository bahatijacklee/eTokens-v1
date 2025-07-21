
import React from "react";

const SwapField = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 dark:text-gray-400 mb-2">{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
};

export default SwapField;
