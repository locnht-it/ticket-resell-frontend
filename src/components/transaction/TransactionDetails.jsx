import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TransactionDetails = (transactionId) => {
  const [transaction, setTransaction] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const transactionData = {
    transactionId: 1,
    price: 2400,
    transactionDate: "2024-10-01",
    customerName: "Nam Lee",
    status: "Completed",
    paymentMethod: "Credit Card",
    promotion: `20%`,
    platformFeeId: 1,
    platformFeeName: `Package 10`,
  };

  useEffect(() => {
    // Initialize data
    setTransaction(transactionData);
    setStatus(transactionData.status);
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleStatusUpdate = () => {
    // Giả lập cập nhật trạng thái (gửi request đến API trong thực tế)
    setTransaction({ ...transaction, status });
    alert(`Transaction status has been updated to ${status}!`);
  };

  if (!transaction) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Transaction Details
      </h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Transaction ID
          </label>
          <p className="text-lg">{transaction.transactionId}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Platform Fee
          </label>
          <p className="text-lg">
            <div class="text-lg text-blue-900">
              <Link to={`/platform-fee/${transaction.platformFeeId}`}>
                {transaction.platformFeeName}
              </Link>
            </div>
          </p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Customer Name
          </label>
          <p className="text-lg">{transaction.customerName}</p>
        </div>

        {/* Trạng thái order với chức năng cập nhật */}
        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            className="mt-3 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Update Status
          </button>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Transaction Date
          </label>
          <p className="text-lg">
            {new Date(transaction.transactionDate).toLocaleDateString()}
          </p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Payment Method
          </label>
          <p className="text-lg">{transaction.paymentMethod}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <p className="text-lg">{transaction.totalPrice} USD</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Promotion
          </label>
          <p className="text-lg">{transaction.promotion}</p>
        </div>
      </div>

      <div className="flex justify-start">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;
