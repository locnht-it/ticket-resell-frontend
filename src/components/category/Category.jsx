import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { useCategoryApi } from "../../api/categoryApi";
import getCategoryStatus from "../../lib/utils/CategoryStatus";
import { toast } from "react-toastify";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const { getAllCategories, changeCategoryStatus } = useCategoryApi();

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories(searchTerm, page, limit);
      const data = response.data.content || [];
      console.log(`>>> Check data response of API getAllCategories: `, data);

      if (Array.isArray(data)) {
        const updatedCategories = data.map((category) => ({
          ...category,
          status: category.isDeleted === false ? "Active" : "Inactive",
        }));

        setCategories(updatedCategories);
      } else {
        console.error("Dữ liệu không phải là mảng.");
      }

      const totalItems = response.data.size || 0;
      const calculatedTotalPages = Math.ceil(totalItems / limit);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, searchTerm]);

  const handleSearch = () => {
    setPage(1);
    fetchCategories();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleCategoryAddNew = () => {
    navigate("/category/save");
  };

  const handleStatusChange = async (categoryId) => {
    try {
      await changeCategoryStatus(categoryId);
      toast.success("Change status successfully!");
      fetchCategories();
    } catch (error) {
      console.error("Failed to change category status:", error);
      toast.error("Failed to change category status");
    }
  };

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-7">
          Category Management
        </strong>
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 pb-5">
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
            className="px-10 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none ml-auto font-bold"
            onClick={handleCategoryAddNew}
          >
            Add New Category
          </button>
        </div>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-blue-500 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th className="px-2 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-700 text-center">
                  #{category.id}
                </td>
                <td class="px-6 py-4 whitespace-normal border-b border-gray-500 text-center break-words">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5 text-center">
                  {getCategoryStatus(category.status)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-center">
                  <button
                    className={`px-5 py-2 border ${
                      category.status === "Active"
                        ? "border-red-500 text-red-500 hover:bg-red-700"
                        : "border-green-500 text-green-500 hover:bg-green-700"
                    } rounded transition duration-300 hover:text-white focus:outline-none`}
                    onClick={() => handleStatusChange(category.id)}
                  >
                    {category.status === "Active" ? "Inactive" : "Active"}
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

export default Category;
