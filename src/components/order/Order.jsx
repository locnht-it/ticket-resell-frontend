import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrderApi } from "../../api/orderApi";
import { useTicketApi } from "../../api/ticketApi";
import { useUserApi } from "../../api/userApi";
import { toast } from "react-toastify";

const Order = () => {
  const navigate = useNavigate();
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const { getAllOrders } = useOrderApi();
  const { getTicketByTicketId } = useTicketApi();
  const { getUserByUserId } = useUserApi();

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
    if (!validateDateRange(startDay) || !validateDateRange(endDay)) {
      toast.error("Date must be between 01/01/2024 and 31/12/2024");
      return;
    }
    if (startDay && endDay && new Date(startDay) > new Date(endDay)) {
      toast.error("Start Date cannot be greater than End Date");
      return;
    }
    setPage(1);
    fetchOrders();
  };

  const fetchOrders = async () => {
    try {
      const formattedStartDate = startDay ? formatDate(startDay) : null;
      const formattedEndDate = endDay ? formatDate(endDay) : null;

      const response = await getAllOrders(
        formattedStartDate,
        formattedEndDate,
        page,
        limit
      );

      // Kiểm tra xem response.data.content có phải là một mảng không
      const orders = Array.isArray(response.data.content)
        ? response.data.content
        : [];

      console.log(`>>> Check response from api getAllOrders: `, orders);

      const updatedOrders = await Promise.all(
        orders.map(async (order) => {
          const ticketResponse = await getTicketByTicketId(order.ticketId);
          const userResponse = await getUserByUserId(order.userId);

          return {
            ...order,
            ticketName: ticketResponse?.data?.content?.ticketName,
            buyerName: userResponse?.data?.content?.fullname,
          };
        })
      );

      setOrders(updatedOrders);
      const totalItems = response.data.size || 0;
      setTotalPages(Math.ceil(totalItems / limit));
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleOrderDetails = (id) => {
    navigate(`/order/${id}`);
  };

  const handleClear = () => {
    setStartDay("");
    setEndDay("");
    setPage(1);
    fetchOrders();
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
          Order Management
        </strong>

        <div className="flex gap-4 mb-5 items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              className="border px-4 py-2 rounded"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              className="border px-4 py-2 rounded"
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
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
                Ticket Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                Order Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                Buyer
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  <Link to={`/order/${order.id}`}>#{order.id}</Link>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  <Link to={`/ticket/${order.ticketId}`}>
                    {order.ticketName}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  {order.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  {formatDate(order.orderDate)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  <Link to={`/user/${order.userId}`}>{order.buyerName}</Link>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                  <button
                    className="px-5 py-2 border-blue-500 border text-blue-500 rounded hover:bg-blue-700 hover:text-white"
                    onClick={() => handleOrderDetails(order.id)}
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

export default Order;
