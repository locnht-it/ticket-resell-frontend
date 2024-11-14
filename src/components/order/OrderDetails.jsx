import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getOrderStatus from "../../lib/utils/OrderStatus";
import { useOrderApi } from "../../api/orderApi";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const navigate = useNavigate();
  const { getOrderByOrderId } = useOrderApi();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderByOrderId(id);
        console.log(
          `>>> Check response from api getOrderByOrderId: `,
          response
        );
        if (response && response.data.content) {
          setOrder(response.data.content);
        } else {
          console.error("No order data found!");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  if (!order) {
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
      <h1 className="text-3xl font-bold text-center mb-6">Order Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Order ID</label>
          <p className="text-lg">{order.id}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Ticket Name
          </label>
          <div className="text-lg text-blue-700">{order.ticketName}</div>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Order Date
          </label>
          <p className="text-lg">{formatDate(order.orderDate)}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Buyer</label>
          <div className="text-lg text-blue-700">{order.buyerName}</div>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          {order.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Quantity</label>
          <p className="text-lg">{order.quantity}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Address</label>
          <p className="text-lg">{order.address}</p>
        </div>
      </div>

      {/* Order Status History */}
      <div className="mb-6 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2 text-lg">
          Order Status History
        </label>

        {/* List existing statuses */}
        {order.orderStatuses.map((status) => (
          <div key={status.id} className="border-b border-gray-300 py-2">
            <p className="font-bold">
              {formatDate(status.date)}: {` `}
              {getOrderStatus(status.name)}
            </p>
          </div>
        ))}
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

export default OrderDetails;
