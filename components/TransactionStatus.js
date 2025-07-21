
import React from "react";

const TransactionStatus = ({ isLoading, isSuccess, error }) => {
  return (
    <div className="mt-4">
      {isLoading && <p className="text-yellow-600">Transaction pending...</p>}
      {isSuccess && <p className="text-green-600">Transaction successful!</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
};

export default TransactionStatus;
