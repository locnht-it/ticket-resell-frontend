import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getTicketStatus from "../../lib/utils/TicketStatus";
import { useTicketApi } from "../../api/ticketApi";
import { HiOutlineSearch } from "react-icons/hi";

const Ticket = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const { getAllTickets } = useTicketApi();

  const fetchTickets = async () => {
    try {
      const response = await getAllTickets(status, searchTerm, page, limit);
      setTickets(response.data.content);
      const totalItems = response.data.size || 0;
      const calculatedTotalPages = Math.ceil(totalItems / limit);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [status, searchTerm, page]);

  const handleTicketDetails = (id) => {
    navigate(`/ticket/${id}`);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
    fetchTickets();
  };

  const handleClear = () => {
    setStatus("");
    setSearchTerm("");
    setPage(1);
    fetchTickets();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-10">
          Ticket Management
        </strong>
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans pb-5">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="text-sm h-10 border border-gray-300 rounded-sm px-4 mr-4"
          >
            <option value="">Select Status</option>
            <option value="PENDING">{getTicketStatus("PENDING")}</option>
            <option value="ACTIVE">{getTicketStatus("ACTIVE")}</option>
            <option value="CLOSED">{getTicketStatus("CLOSED")}</option>
          </select>
          <div className="relative w-[24rem]">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-sm focus:outline-none active:outline-none h-10 w-full border border-gray-300 rounded-sm pl-4 pr-10"
            />
            <HiOutlineSearch
              fontSize={20}
              className="text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={handleSearch}
            />
          </div>

          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-green-500 border border-green-300 rounded ml-4 hover:bg-green-500 hover:text-white focus:outline-none"
          >
            Clear
          </button>
        </div>
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Seller Email
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Price
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Expired Date
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody class="bg-white">
            {tickets.map((ticket) => (
              <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div class="text-sm leading-5 text-gray-800">
                    <Link to={`/ticket/${ticket.ticketId}`}>
                      #{ticket.ticketId}
                    </Link>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div class="text-sm leading-5 text-blue-900">
                    {ticket.ticketName}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  <Link to={`/user/${ticket.userId}`}>{ticket.email}</Link>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {formatDate(ticket.expirationDate)}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {ticket.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                  {getTicketStatus(ticket.status)}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <button
                    class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                    onClick={() => handleTicketDetails(ticket.ticketId)}
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

export default Ticket;
