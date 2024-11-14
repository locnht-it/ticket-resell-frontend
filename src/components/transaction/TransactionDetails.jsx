import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTransactionApi } from "../../api/transactionApi";
import { useUserApi } from "../../api/userApi";
import getTransactionStatus from "../../lib/utils/TransactionStatus";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState();
  const navigate = useNavigate();
  const { getTransactionByTransactionId } = useTransactionApi();
  const { getUserByUserId } = useUserApi();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await getTransactionByTransactionId(id);
        console.log(
          `>>> Check response from api getTransactionByTransactionId: `,
          response
        );

        const transaction = response.data.content;
        console.log(
          `>>> Check response from api getTransactionByTransactionId: `,
          transaction
        );

        const userResponse = await getUserByUserId(transaction.userId);
        const updatedTransaction = {
          ...transaction,
          buyerName: userResponse?.data?.content?.fullname,
        };
        setTransaction(updatedTransaction);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

  if (!transaction) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Transaction Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Order ID</label>
          <p className="text-lg text-blue-700">{transaction.id}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Platform Fee
          </label>
          <p className="text-lg text-blue-700">
            {transaction.platformFeeDto.name}
          </p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Buyer Name
          </label>
          <p className="text-lg text-blue-700">
            <Link to={`/user/${transaction.userId}`}>
              {transaction.buyerName}
            </Link>
          </p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <p className="text-lg text-blue-700">
            {getTransactionStatus(transaction.status)}
          </p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Transaction Date
          </label>
          <p className="text-lg">{formatDate(transaction.transactionDate)}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Payment Method
          </label>
          <p className="text-lg">{transaction.paymentMethod}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          {transaction.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Promotion
          </label>
          {transaction.promotion}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;
