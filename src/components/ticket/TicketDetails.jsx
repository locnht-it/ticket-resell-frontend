import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    reviews: [
      {
        userId: 1,
        reviewerName: "NamLee",
        reviewDate: "2024-10-15",
        rating: 5,
        comment: "Uy tín",
      },
      {
        userId: 2,
        reviewerName: "Hieu Chu Nhat",
        reviewDate: "2024-10-16",
        rating: 4,
        comment: "Ship hơi lâu",
      },
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

      {/* Customer Reviews */}
      <div className="mb-6 border border-gray-300 p-3 rounded">
        <h2 className="text-xl font-bold mb-2">Buyer's Feedback</h2>
        {ticket.reviews && ticket.reviews.length > 0 ? (
          ticket.reviews.map((review, index) => (
            <div
              key={index}
              className={`mb-4 border border-gray-200 p-2 rounded `}
            >
              <p className="font-semibold cursor-pointer text-blue-600">
                <Link to={`/user/${review.userId}`}>{review.reviewerName}</Link>
              </p>
              <p className="text-gray-600">
                {new Date(review.reviewDate).toLocaleDateString()}
              </p>
              <p className="text-yellow-500">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </p>
              <p className="text-gray-700">{review.comment}</p>
              {/* <button
                className={`mt-2 px-4 py-1 rounded focus:outline-none ${
                  review.isActive
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
                onClick={() => handleToggleReviewStatus(index)}
              >
                {review.isActive ? "Inactive" : "Active"}
              </button> */}
            </div>
          ))
        ) : (
          <p>No feedback available.</p>
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

export default TicketDetails;
