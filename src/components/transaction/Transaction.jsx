import React from "react";
import { Link, useNavigate } from "react-router-dom";
import getTransactionStatus from "../../lib/utils/TransactionStatus";

const transactionData = [
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
    platformFeeName: `Package 50`,
    customerId: `10000`,
    customerName: `Minh Ta`,
    transactionDate: `2024-09-09`,
    price: `$335.50`,
    status: `PROCESSING`,
  },
  {
    id: `4`,
    platformFeeId: `4`,
    platformFeeName: `Package 100`,
    customerId: `10000`,
    customerName: `Vo Van Tinh`,
    transactionDate: `2024-09-09`,
    price: `$535.50`,
    status: `CANCELLED`,
  },
];

const Transaction = () => {
  const navigate = useNavigate();

  const handleTransactionDetails = (id) => {
    navigate(`/transaction/${id}`);
  };
  return (
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-10">
          Transaction Management
        </strong>
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Platform Fee
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Customer Name
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Transaction Date
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Total Price
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody class="bg-white">
            {transactionData.map((transaction) => (
              <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div class="text-sm leading-5 text-gray-800">
                    <Link to={`/transaction/${transaction.id}`}>
                      #{transaction.id}
                    </Link>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div class="text-sm leading-5 text-blue-900">
                    <Link to={`/platform-fee/${transaction.platformFeeId}`}>
                      {transaction.platformFeeName}
                    </Link>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  <Link to={`/users/${transaction.customerId}`}>
                    {transaction.customerName}
                  </Link>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {transaction.price}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                  {getTransactionStatus(transaction.status)}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <button
                    class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                    onClick={() => handleTransactionDetails(transaction.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans pb-3">
          {/* <div>
            <p class="text-sm leading-5 text-blue-700">
              Showing
              <span class="font-medium">1</span>
              to
              <span class="font-medium">200</span>
              of
              <span class="font-medium">2000</span>
              results
            </p>
          </div> */}
          <div class="ml-auto">
            <nav class="relative z-0 inline-flex shadow-sm">
              <div>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                  aria-label="Previous"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
              <div>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                >
                  1
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                >
                  2
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                >
                  3
                </a>
              </div>
              <div>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                  aria-label="Next"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
