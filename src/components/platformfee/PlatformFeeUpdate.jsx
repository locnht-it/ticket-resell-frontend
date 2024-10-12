import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PlatformFeeUpdate = () => {
  const { id } = useParams(); // Lấy ID của supplier từ URL
  const navigate = useNavigate();

  const [platfromFee, setPlatformFee] = useState({
    name: "",
    quantity: 0,
    status: "Active",
  });

  useEffect(() => {
    const fetchPlatformFee = async () => {
      const data = {
        id,
        name: `Package 500`,
        quantity: 500,
        status: `Active`,
      };
      setPlatformFee(data);
    };
    fetchPlatformFee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlatformFee({
      ...platfromFee,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Province:", platfromFee);

    navigate(`/platform-fee`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Update Platform Fee
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={platfromFee.name}
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
            value={platfromFee.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Status</label>
          <select
            name="status"
            value={platfromFee.status}
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
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            Update Platform Fee
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlatformFeeUpdate;
