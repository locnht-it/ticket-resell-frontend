import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getOrderStatus from "../../lib/utils/OrderStatus";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]);
  const [newStatus, setNewStatus] = useState({
    orderStatusName: "",
    date: "",
  });
  const [addingStatus, setAddingStatus] = useState(false);

  const orderData = {
    orderId: 1,
    orderDate: `2024-10-10`,
    price: 1000000,
    quantity: 1,
    buyerName: `Tan Loc`,
    userId: 1,
    ticketId: 1,
    ticketName: `Ve VIP Concert Anh Trai Vuot Ngan Chong Gai`,
    address: `Thu Duc City`,
    status: [
      {
        orderStatusId: 1,
        orderStatusName: `PENDING`,
        date: `2024-10-10`,
      },
      {
        orderStatusId: 2,
        orderStatusName: `PROCESSING`,
        date: `2024-10-11`,
      },
      {
        orderStatusId: 3,
        orderStatusName: `COMPLETED`,
        date: `2024-10-12`,
      },
    ],
  };

  useEffect(() => {
    setOrder(orderData);
    setOrderStatus(orderData.status);
  }, []);

  const handleAddStatus = () => {
    // Toggle form visibility
    setAddingStatus(!addingStatus);
  };

  const handleSubmitNewStatus = () => {
    if (newStatus.orderStatusName && newStatus.date) {
      const updatedStatus = [
        ...orderStatus,
        {
          orderStatusId: orderStatus.length + 1, // Giả sử mỗi status mới có id tăng dần
          ...newStatus,
        },
      ];
      setOrderStatus(updatedStatus);
      setNewStatus({ orderStatusName: "", date: "" }); // Reset form
      setAddingStatus(false);
      // Call API to send the new status to backend here
    }
  };

  //   const handleSubmitNewStatus = async () => {
  //     if (newStatus.orderStatusName && newStatus.date) {
  //       // Tạo dữ liệu để gửi đến API
  //       const newOrderStatus = {
  //         orderId: order.orderId, // Đính kèm orderId vào request
  //         orderStatusName: newStatus.orderStatusName,
  //         date: newStatus.date,
  //       };

  //       try {
  //         // Gọi API để tạo mới order status
  //         const response = await fetch('/api/orderstatus', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(newOrderStatus),
  //         });

  //         if (response.ok) {
  //           const result = await response.json();
  //           // Giả sử API trả về trạng thái mới vừa được tạo
  //           const updatedStatus = [...orderStatus, result];
  //           setOrderStatus(updatedStatus);
  //           setNewStatus({ orderStatusName: "", date: "" }); // Reset form
  //           setAddingStatus(false); // Ẩn form sau khi submit
  //         } else {
  //           // Xử lý khi API trả về lỗi
  //           console.error("Failed to create order status");
  //         }
  //       } catch (error) {
  //         console.error("Error creating order status:", error);
  //       }
  //     }
  //   };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Order Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order info */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Order ID</label>
          <p className="text-lg">{order.orderId}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Ticket Name
          </label>
          <div className="text-lg text-blue-900">
            <Link to={`/ticket/${order.ticketId}`}>{order.ticketName}</Link>
          </div>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Order Date
          </label>
          <p className="text-lg">
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Buyer</label>
          <div className="text-lg text-blue-900">
            <Link to={`/user/${order.userId}`}>{order.buyerName}</Link>
          </div>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <p className="text-lg">{order.price}</p>
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
        {orderStatus.map((status) => (
          <div
            key={status.orderStatusId}
            className="border-b border-gray-300 py-2"
          >
            <p className="font-bold">
              {new Date(status.date).toLocaleDateString()}: {` `}
              {getOrderStatus(status.orderStatusName)}
            </p>
          </div>
        ))}

        {/* Button to add new status */}
        <button
          onClick={handleAddStatus}
          className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700"
        >
          Add New Status
        </button>

        {/* Form to add new status */}
        {addingStatus && (
          <div className="mt-4">
            <label className="block text-gray-700 font-bold mb-2">
              Order Status
            </label>
            <select
              value={newStatus.orderStatusName}
              onChange={(e) =>
                setNewStatus({ ...newStatus, orderStatusName: e.target.value })
              }
              className="block w-full mb-2 p-2 border border-gray-300 rounded"
            >
              <option value="">Select Status</option>
              <option value="PENDING">PENDING</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>

            <label className="block text-gray-700 font-bold mb-2">Date</label>
            <input
              type="date"
              value={newStatus.date}
              onChange={(e) =>
                setNewStatus({ ...newStatus, date: e.target.value })
              }
              className="block w-full mb-2 p-2 border border-gray-300 rounded"
            />

            <button
              onClick={handleSubmitNewStatus}
              className="px-5 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700 mt-3"
            >
              Submit
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
