import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getTransactionStatus from "../../lib/utils/TransactionStatus";
import { useTransactionApi } from "../../api/transactionApi";
import { toast } from "react-toastify";
import { useUserApi } from "../../api/userApi";

const Transaction = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const { getAllTransactions } = useTransactionApi();
  const { getUserByUserId } = useUserApi();
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const MIN_DATE = new Date("2024-01-01");
  const MAX_DATE = new Date("2024-12-31");

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validateDateRange = (date) => {
    const selectedDate = new Date(date);
    return selectedDate >= MIN_DATE && selectedDate <= MAX_DATE;
  };

  const handleFilter = () => {
    if (!validateDateRange(startDate) || !validateDateRange(endDate)) {
      toast.error("Date must be between 01/01/2024 and 31/12/2024");
      return;
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      toast.error("Start Date cannot be greater than End Date");
      return;
    }
    setPage(1);
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
  };

  const fetchTransactions = async () => {
    try {
      console.log(
        `>>> Check startDate, endDate before call api getAllTransactions: `,
        startDate,
        endDate
      );
      const formattedStartDate = startDate ? formatDate(startDate) : null;
      const formattedEndDate = endDate ? formatDate(endDate) : null;

      const response = await getAllTransactions(
        formattedStartDate,
        formattedEndDate,
        limit,
        page
      );

      const transactions = Array.isArray(response.data.content)
        ? response.data.content
        : [];

      console.log(
        `>>> Check response from api getAllTransactions: `,
        transactions
      );

      const updatedTransactions = await Promise.all(
        transactions.map(async (transaction) => {
          const userResponse = await getUserByUserId(transaction.userId);

          return {
            ...transaction,
            buyerName: userResponse?.data?.content?.fullname,
          };
        })
      );

      setTransactions(updatedTransactions);
      const totalItems = response.data.size || 0;
      setTotalPages(Math.ceil(totalItems / limit));
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      toast.error("Failed to load transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filterStartDate, filterEndDate, page]);

  const handleTransactionDetails = (id) => {
    navigate(`/transaction/${id}`);
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 pb-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-10">
          Transaction Management
        </strong>

        <div className="flex gap-4 mb-5 items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              className="border px-4 py-2 rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              className="border px-4 py-2 rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            onClick={handleFilter}
            className="px-4 py-2 text-sm text-blue-500 border border-blue-300 rounded ml-4 hover:bg-blue-500 hover:text-white focus:outline-none"
          >
            Filter
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-green-500 border border-green-300 rounded ml-4 hover:bg-green-500 hover:text-white focus:outline-none"
          >
            Clear
          </button>
        </div>

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                Platform Fee
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                Buyer Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                Transaction Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  <Link to={`/order/${transaction.id}`}>#{transaction.id}</Link>
                </td>
                <td className="px-6 py-4 whitespace-normal border-b border-gray-500 text-center break-words">
                  {transaction.platformFeeId}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  <Link to={`/user/${transaction.userId}`}>
                    {transaction.buyerName}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  {formatDate(transaction.transactionDate)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  {transaction.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  {getTransactionStatus(transaction.status)}
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  <button
                    className="px-5 py-2 border-blue-500 border text-blue-500 rounded hover:bg-blue-700 hover:text-white"
                    onClick={() => handleTransactionDetails(transaction.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ml-auto mt-5 flex justify-end">
          {totalPages > 0 && (
            <nav className="relative z-0 inline-flex shadow-sm -space-x-px">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page - 1);
                }}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium ${
                  page === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                disabled={page === 1}
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm leading-5 font-medium ${
                    page === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page + 1);
                }}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium ${
                  page === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                disabled={page === totalPages}
              >
                &gt;
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
