import React from "react";
import { Link } from "react-router-dom";
import getTransactionStatus from "../../lib/utils/TransactionStatus";

const recentTransactionData = [
  {
    id: `1`,
    platformFeeId: `1`,
    platformFeeName: `Package 10`,
    customerId: `10000`,
    customerName: `NamLee`,
    transactionDate: `2024-09-09`,
    price: `$435.50`,
    status: `PENDING`,
  },
  {
    id: `2`,
    platformFeeId: `2`,
    platformFeeName: `Package 20`,
    customerId: `10000`,
    customerName: `Hieu Chu Nhat`,
    transactionDate: `2024-09-09`,
    price: `$535.50`,
    status: `COMPLETED`,
  },
  {
    id: `3`,
    platformFeeId: `3`,
    platformFeeName: `Package 30`,
    customerId: `10000`,
    customerName: `Minh Ta`,
    transactionDate: `2024-09-09`,
    price: `$335.50`,
    status: `PROCESSING`,
  },
  {
    id: `4`,
    platformFeeId: `4`,
    platformFeeName: `Package 40`,
    customerId: `10000`,
    customerName: `Vo Van Tinh`,
    transactionDate: `2024-09-09`,
    price: `$535.50`,
    status: `CANCELLED`,
  },
];

const RecentTransaction = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Transactions</strong>
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>PlatfromFee</td>
              <td>Customer Name</td>
              <td>Transaction Date</td>
              <td>Price</td>
              <td>Transaction Status</td>
            </tr>
          </thead>
          <tbody>
            {recentTransactionData.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  <Link to={`/transaction/${transaction.id}`}>
                    #{transaction.id}
                  </Link>
                </td>
                <td>
                  <Link to={`/tours/${transaction.platformFeeId}`}>
                    {transaction.platformFeeName}
                  </Link>
                </td>
                <td>
                  <Link to={`/users/${transaction.customerId}`}>
                    {transaction.customerName}
                  </Link>
                </td>
                <td>
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </td>
                <td>{transaction.price}</td>
                <td>{getTransactionStatus(transaction.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransaction;
