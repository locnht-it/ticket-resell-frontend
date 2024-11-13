import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const orderData = [
  {
    orderId: 1,
    orderDate: `2024-10-10`,
    price: 1000000,
    quantity: 1,
    buyerName: `Tan Loc`,
    userId: 1,
    ticketId: 1,
    ticketName: `Ve VIP Concert Anh Trai Vuot Ngan Chong Gai`,
    address: `Thu Duc City`,
  },
  {
    orderId: 2,
    orderDate: `2024-10-15`,
    price: 240000,
    quantity: 1,
    buyerName: `Van Tinh`,
    userId: 2,
    ticketId: 2,
    ticketName: `Ve xe khach Thuan Thao`,
    address: `Thu Duc City`,
  },
  {
    orderId: 3,
    orderDate: `2024-10-10`,
    price: 100000,
    quantity: 1,
    buyerName: `Nam Lee`,
    userId: 1,
    ticketId: 1,
    ticketName: `Ve xem phim Joker`,
    address: `Vinhomes Grand Park`,
  },
];

const Order = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orderData);

  const handleOrderDetails = (id) => {
    navigate(`/order/${id}`);
  };

  const handleFilter = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredData = orderData.filter((order) => {
      const orderDate = new Date(order.orderDate);
      // Kiểm tra orderDate nằm trong khoảng startDate và endDate
      return orderDate >= start && orderDate <= end;
    });

    setFilteredOrders(filteredData);
  };

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 pb-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-10">
          Order Management
        </strong>

        {/* Input chọn ngày */}
        <div className="flex gap-4 mb-5">
          <input
            type="date"
            className="border px-4 py-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
          <input
            type="date"
            className="border px-4 py-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Filter
          </button>
        </div>

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Ticket Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Order Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Buyer
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.orderId}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <Link to={`/order/${order.orderId}`}>#{order.orderId}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <Link to={`/ticket/${order.ticketId}`}>
                      {order.ticketName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {order.price} VND
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                    <Link to={`/user/${order.userId}`}>{order.buyerName}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    <button
                      className="px-5 py-2 border-blue-500 border text-blue-500 rounded hover:bg-blue-700 hover:text-white"
                      onClick={() => handleOrderDetails(order.orderId)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No orders found for the selected date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
