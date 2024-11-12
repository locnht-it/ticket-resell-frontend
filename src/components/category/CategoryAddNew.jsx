import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryApi } from "../../api/categoryApi";
import { toast } from "react-toastify";

const CategoryAddNew = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createCategory } = useCategoryApi();

  const handleChange = (e) => {
    const { value } = e.target;
    setCategoryName(value);
    setError("");
  };

  const validateInput = () => {
    if (!categoryName.trim()) {
      setError("Category name is required");
      return false;
    }
    return true;
  };

  // Hàm xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    createCategory(categoryName)
      .then((response) => {
        if (response.data.statusCode === 400) {
          toast.error(
            response.data.message ||
              "Failed to create category. Please check your input."
          );
          return;
        }
        toast.success("Account has been created successfully!");
        navigate("/category");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMessage =
            error.response.data.message || "An unexpected error occurred.";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred.");
        }
        console.error("Error creating user:", error);
      });
  };

  const handleBack = () => {
    navigate("/category");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create Category</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={categoryName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
          {/* Hiển thị lỗi */}
          {error && <p className="text-red-500 mt-1">{error}</p>}
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
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAddNew;
