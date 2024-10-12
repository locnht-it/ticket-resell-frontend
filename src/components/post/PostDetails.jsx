import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const postData = {
    id: 1,
    status: `PENDING`,
    title: `Pass Vé Vip Concert Anh Trai Vượt Ngàn Chông Gai`,
    description: `Pass Vé Vip Concert Anh Trai Vượt Ngàn Chông Gai`,
    ticketName: `Vé Concert Anh Trai Vượt Ngàn Chông Gai VIP`,
    ticketId: 1,
    userId: 1,
    seller: `Hieu Chu Nhat`,
    createdDate: `2024-10-10`,
  };

  useEffect(() => {
    setPost(postData);
    setStatus(postData.status);
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Cập nhật trạng thái khi chọn
  };

  const handleStatusUpdate = () => {
    // Giả lập cập nhật trạng thái (gửi request đến API trong thực tế)
    setPost({ ...post, status });
    alert(`Post status has been updated to ${status}!`);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Post Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <p className="text-lg">{post.title}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Ticket Name
          </label>
          <p className="text-lg">
            <div class="text-lg text-blue-900">
              <Link to={`/ticket/${post.ticketId}`}>{post.ticketName}</Link>
            </div>
          </p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <p className="text-lg">{post.description}</p>
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Seller</label>
          <p className="text-lg">
            <div class="text-lg text-blue-900">
              <Link to={`/user/${post.userId}`}>{post.seller}</Link>
            </div>
          </p>
        </div>

        <div className="mb-4 border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Created Date
          </label>
          <p className="text-lg">
            {new Date(post.createdDate).toLocaleDateString()}
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

export default PostDetails;
