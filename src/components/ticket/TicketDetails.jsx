import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketDetails = () => {
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const ticketData = {
    id: 1,
    name: `Joker`,
    price: 100000,
    quantity: 1,
    expiredDate: `2024-10-12`,
    venue: `CGV Cinema`,
    categoryName: `Vé xem phim`,
    status: `Active`,
    seller: `Ta Gia Nhat Minh`,
    images: [
      { url: "https://via.placeholder.com/150" },
      { url: "https://via.placeholder.com/150" },
      { url: "https://via.placeholder.com/150" },
    ],
  };

  useEffect(() => {
    setTicket(ticketData);
    setStatus(ticketData.status);
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Cập nhật trạng thái khi chọn
  };

  const handleStatusUpdate = () => {
    // Giả lập cập nhật trạng thái (gửi request đến API trong thực tế)
    setTicket({ ...ticket, status });
    alert(`Ticket status has been updated to ${status}!`);
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Ticket Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <p className="text-lg">{ticket.name}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <p className="text-lg">{ticket.categoryName}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <p className="text-lg">{ticket.price} VND</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Quantity</label>
          <p className="text-lg">{ticket.quantity}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Venue</label>
          <p className="text-lg">{ticket.venue}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Expired Date
          </label>
          <p className="text-lg">
            {new Date(ticket.expiredDate).toLocaleDateString()}
          </p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Seller</label>
          <p className="text-lg">{ticket.seller}</p>
        </div>

        {/* Status */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <p className="text-lg">
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </p>
        </div>

        {/* Trạng thái ticket với chức năng cập nhật */}
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="PENDING">PENDING</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            className="mt-3 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Ticket Images */}
      <div className="mb-6 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Images</label>
        <div className="flex space-x-4 overflow-x-auto">
          {ticket.images?.length > 0 ? (
            ticket.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Ticket Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
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

export default TicketDetails;
