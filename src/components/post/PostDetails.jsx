import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTicketApi } from "../../api/ticketApi";
import { toast } from "react-toastify";
import { usePostApi } from "../../api/postApi";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { getPostByPostId, changePostStatus } = usePostApi();

  const fetchPostDetails = async () => {
    try {
      const response = await getPostByPostId(id);
      setPost(response.data.content);
      setStatus(response.data.content.postElements[0].status);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await changePostStatus(parseInt(id), status);
      if (response?.data.statusCode === 200) {
        toast.success(`Post status has been updated to ${status}!`);
        setPost({ ...post, status });
      } else {
        console.error("Failed to update post status", response?.data?.message);
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error("Error occurred while updating post status.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Post Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">ID</label>
          <p className="text-lg text-blue-700">{post.postElements[0].id}</p>
        </div>
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <p className="text-lg">{post.postElements[0].title}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <p className="text-lg">{post.postElements[0].description}</p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Created Date
          </label>
          <p className="text-lg">
            {formatDate(post.postElements[0].createdDate)}
          </p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Ticket</label>
          <Link className="text-lg" to={`/ticket/${post.ticketId}`}>
            {post.ticketName}
          </Link>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Seller Information
          </label>
          <Link className="text-lg" to={`/user/${post.userId}`}>
            {post.email}
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

export default PostDetails;
