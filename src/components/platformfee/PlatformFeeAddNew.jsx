import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import platformFeeApi, { usePlatformFeeApi } from "../../api/platformFeeApi";
import { toast } from "react-toastify";

const PlatformFeeAddNew = () => {
  const [platformFee, setPlatformFee] = useState({
    name: "",
    quantity: 1,
    price: 10000,
  });

  const navigate = useNavigate();
  const { createPlatformFee } = usePlatformFeeApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlatformFee({
      ...platformFee,
      [name]: value,
    });
  };

  // Hàm submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!platformFee.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (platformFee.quantity <= 0 || platformFee.quantity > 1000) {
      toast.error(
        "Quantity is greater than 0 or quantity is less than or equal 1000"
      );
      return;
    }

    if (platformFee.price < 10000) {
      toast.error("Price is greater than 10.000 VND");
      return;
    }

    try {
      const response = await createPlatformFee(platformFee);

      if (response.data.statusCode !== 201) {
        toast.error(response.data.content || "Create new platform fee failed");
        return;
      }

      console.log("New Platform Fee:", platformFee);
      toast.success("Create new platform fee successfully");

      navigate("/platform-fee");
    } catch (error) {
      console.error("Error creating platform fee:", error);
      toast.error("Create new platform fee failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
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
          <label className="block text-gray-700 font-bold">Price</label>
          <input
            type="number"
            name="price"
            value={platformFee.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700"
            onClick={() => navigate("/platform-fee")}
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
