import React from "react";
import { Link } from "react-router-dom";
import getTransactionStatus from "../../lib/utils/TransactionStatus";

const recentTransactionData = [
  {
    id: `1`,
    platformFeeName: `Package 10`,
    customerId: `1`,
    customerName: `NamLee`,
    transactionDate: `2024-09-09`,
    price: 240000,
    status: `PENDING`,
  },
  {
    id: `2`,
    platformFeeName: `Package 20`,
    customerId: `2`,
    customerName: `Hieu Chu Nhat`,
    transactionDate: `2024-09-09`,
    price: 150000,
    status: `COMPLETED`,
  },
  {
    id: `3`,
    platformFeeId: `3`,
    platformFeeName: `Package 30`,
    customerId: `3`,
    customerName: `Minh Ta`,
    transactionDate: `2024-09-09`,
    price: 90000,
    status: `PROCESSING`,
  },
  {
    id: `4`,
    platformFeeId: `4`,
    platformFeeName: `Package 40`,
    customerId: `4`,
    customerName: `Vo Van Tinh`,
    transactionDate: `2024-09-09`,
    price: 300000,
    status: `CANCELLED`,
  },
];

const RecentTransaction = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Transactions</strong>
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr>
              <td className="text-center">ID</td>
              <td className="text-center">PlatfromFee</td>
              <td className="text-center">Customer Name</td>
              <td className="text-center">Transaction Date</td>
              <td className="text-center">Price</td>
              <td className="text-center">Transaction Status</td>
            </tr>
          </thead>
          <tbody>
            {recentTransactionData.map((transaction) => (
              <tr key={transaction.id}>
                <td className="text-center">
                  <Link to={`/transaction/${transaction.id}`}>
                    #{transaction.id}
                  </Link>
                </td>
                <td className="text-center">{transaction.platformFeeName}</td>
                <td className="text-center">
                  <Link to={`/user/${transaction.customerId}`}>
                    {transaction.customerName}
                  </Link>
                </td>
                <td className="text-center">
                  {formatDate(transaction.transactionDate)}
                </td>
                <td className="text-center">
                  {transaction.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="text-center">
                  {getTransactionStatus(transaction.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransaction;
