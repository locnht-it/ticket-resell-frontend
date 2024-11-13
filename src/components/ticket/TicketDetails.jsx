import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTicketApi } from "../../api/ticketApi";
import { toast } from "react-toastify";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { getTicketByTicketId, changeTicketStatus } = useTicketApi();

  const fetchTicketDetails = async () => {
    try {
      const response = await getTicketByTicketId(id);
      setTicket(response.data.content);
      setStatus(response.data.content.status);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
    }
  };

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await changeTicketStatus(parseInt(id), status);
      if (response?.data.statusCode === 202) {
        toast.success(`Ticket status has been updated to ${status}!`);
        setTicket({ ...ticket, status });
      } else {
        console.error(
          "Failed to update ticket status",
          response?.data?.message
        );
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error("Error occurred while updating ticket status.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Ticket Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">ID</label>
          <p className="text-lg text-blue-700">{ticket.ticketId}</p>
        </div>
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <p className="text-lg">{ticket.ticketName}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <p className="text-lg">{ticket.categoryName}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <p className="text-lg">
            {ticket.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
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
          <p className="text-lg">{formatDate(ticket.expirationDate)}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Seller Email
          </label>
          <Link className="text-lg" to={`/user/${ticket.userId}`}>
            {ticket.email}
          </Link>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="PENDING">PENDING</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            className="mt-3 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Status
          </button>
        </div>
      </div>

      <div className="mb-6 border border-gray-300 p-3 rounded">
        <label className="block text-gray-700 font-bold mb-2">Images</label>
        <div className="flex space-x-4 overflow-x-auto">
          {ticket.imageTicketDTOs?.length > 0 ? (
            ticket.imageTicketDTOs.map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                alt={`Ticket Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>

      <div className="mb-6 border border-gray-300 p-3 rounded">
        <h2 className="text-xl font-bold mb-2">Buyer's Feedback</h2>
        {ticket.feedbackDTOs && ticket.feedbackDTOs.length > 0 ? (
          ticket.feedbackDTOs.map((feedback, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-200 p-2 rounded"
            >
              <p className="font-semibold text-blue-600">
                <Link to={`/user/${feedback.userId}`}>{feedback.fullName}</Link>
              </p>
              <p className="font-semibold text-gray-500">
                {formatDate(feedback.createdDate)}
              </p>
              <p className="text-yellow-500">
                {"★".repeat(feedback.rating) + "☆".repeat(5 - feedback.rating)}
              </p>
              <p className="text-gray-700 mb-2">{feedback.context}</p>
              <div className="flex space-x-4 overflow-x-auto">
                {feedback.imgs?.length > 0 &&
                  feedback.imgs.map((image, index) => (
                    <img
                      key={index}
                      src={image.imageUrl}
                      alt={`Feedback Image ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p>No feedback available.</p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TicketDetails;
