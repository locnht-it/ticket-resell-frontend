import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getPostStatus from "../../lib/utils/PostStatus";
import { usePostApi } from "../../api/postApi";
import { HiOutlineSearch } from "react-icons/hi";

const Post = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const { getAllPosts } = usePostApi();
  const [tickets, setTickets] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts(status, searchTerm, page, limit);
      setTickets(response.data.content || []);
      const totalItems = response.data.size || 0;
      const calculatedTotalPages = Math.ceil(totalItems / limit);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [status, searchTerm, page]);

  const handlePostDetails = (id) => {
    navigate(`/post/${id}`);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
    fetchPosts();
  };

  const handleClear = () => {
    setStatus("");
    setSearchTerm("");
    setPage(1);
    fetchPosts();
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
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 pb-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-10">
          Post Management
        </strong>
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans pb-5">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="text-sm h-10 border border-gray-300 rounded-sm px-4 mr-4"
          >
            <option value="">Select Status</option>
            <option value="PENDING">{getPostStatus("PENDING")}</option>
            <option value="ACTIVE">{getPostStatus("ACTIVE")}</option>
            <option value="CLOSED">{getPostStatus("CLOSED")}</option>
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
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-blue-500 tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-blue-500 tracking-wider">
                Ticket
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-blue-500 tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {tickets.map((ticket) =>
              ticket.postElements?.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-center">
                    <Link to={`/post/${post.id}`}>#{post.id}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-normal border-b border-gray-500 text-center break-words">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-center">
                    <Link to={`/ticket/${ticket.ticketId}`}>
                      {ticket.ticketName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-center">
                    {formatDate(post.createdDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-center">
                    {getPostStatus(post.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-center">
                    <button
                      className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                      onClick={() => handlePostDetails(post.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
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

export default Post;
