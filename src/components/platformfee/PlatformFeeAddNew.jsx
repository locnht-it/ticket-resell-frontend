import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlatformFeeAddNew = () => {
  const [platformFee, setPlatformFee] = useState({
    name: "",
    quantity: 0,
    status: "Active", // Mặc định là Active
  });

  const navigate = useNavigate();

  // Xử lý khi form thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlatformFee({
      ...platformFee,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi yêu cầu tạo mới đến server
    console.log("New Platform Fee:", platformFee);
    // Điều hướng về trang quản lý nhà cung cấp sau khi tạo mới
    navigate("/platform-fee");
  };

  // Xử lý quay lại trang trước đó
  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Tiêu đề Create Supplier ở giữa */}
      <h2 className="text-2xl font-bold text-center mb-6">
        Create PlatForm Fee
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={platformFee.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={platformFee.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Status</label>
          <select
            name="status"
            value={platformFee.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700"
          >
            Create Platform Fee
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlatformFeeAddNew;
