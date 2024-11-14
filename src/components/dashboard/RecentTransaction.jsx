import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getTransactionStatus from "../../lib/utils/TransactionStatus";
import { useTransactionApi } from "../../api/transactionApi";

const RecentTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const { getTopFiveRecentTransactions } = useTransactionApi();

  useEffect(() => {
    const fetchTopFiveRecentTransactions = async () => {
      try {
        const response = await getTopFiveRecentTransactions();
        if (response && response.data.content) {
          setTransactions(response.data.content);
        } else {
          console.log(
            `>>> Check data from api getTopFiveRecentTransactions: `,
            response
          );
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchTopFiveRecentTransactions();
  }, []);

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
              <td className="text-center">Platfrom Fee</td>
              <td className="text-center">Customer Name</td>
              <td className="text-center">Transaction Date</td>
              <td className="text-center">Price</td>
              <td className="text-center">Transaction Status</td>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="text-center">
                  <Link to={`/transaction/${transaction.id}`}>
                    #{transaction.id}
                  </Link>
                </td>
                <td className="text-center">
                  {transaction.platformFeeDto.name}
                </td>
                <td className="text-center">
                  <Link to={`/user/${transaction.userId}`}>
                    {transaction.userName}
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
