import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import getPlatformFeeStatus from "../../lib/utils/PlatformFeeStatus";
import getCategoryStatus from "../../lib/utils/CategoryStatus";

const categoryData = [
  {
    id: 1,
    name: `Ve xe khach`,
    status: `Active`,
  },
  {
    id: 2,
    name: `Ve tau lua`,
    status: `Active`,
  },
  {
    id: 3,
    name: `Ve may bay`,
    status: `Inactive`,
  },
  {
    id: 4,
    name: `Ve concert`,
    status: `Inactive`,
  },
  {
    id: 5,
    name: `Ve xem phim`,
    status: `Active`,
  },
];

const Category = () => {
  const [categories, setCategories] = useState(categoryData);
  const navigate = useNavigate();

  const handleCategoryAddNew = () => {
    navigate("/category/save");
  };

  const handleCategoryUpdate = (id) => {
    navigate(`/category/update/${id}`);
  };

  const handleToggleStatus = (id) => {
    setCategories((prevCategoryFees) =>
      prevCategoryFees.map((category) =>
        category.id === id
          ? {
              ...category,
              status: category.status === "Active" ? "Inactive" : "Active",
            }
          : category
      )
    );
  };

  return (
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-7">
          Category Management
        </strong>
        <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans pb-5">
          <button
            class="px-10 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none ml-auto font-bold"
            onClick={handleCategoryAddNew}
          >
            Add New Category
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
                Status
              </th>
              <th class="px-2 py-3 border-b-2 border-gray-300"></th>
              <th class="px-2 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody class="bg-white">
            {categories.map((category) => (
              <tr key={category.id}>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div class="text-sm leading-5 text-blue-500">
                    #{category.id}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div class="text-sm leading-5 text-blue-900">
                    {category.name}
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                  {getCategoryStatus(category.status)}
                </td>
                <td class="px-2 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <button
                    class={`px-2 py-2 border ${
                      category.status === "Active"
                        ? "border-red-500 text-red-500 hover:bg-red-700"
                        : "border-green-500 text-green-500 hover:bg-green-700"
                    } rounded transition duration-300 hover:text-white focus:outline-none`}
                    onClick={() => handleToggleStatus(category.id)}
                  >
                    {category.status === "Active"
                      ? "Set Inactive"
                      : "Set Active"}
                  </button>
                </td>
                <td class="px-2 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <div class="flex justify-end space-x-2">
                    <button
                      class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                      onClick={() => handleCategoryUpdate(category.id)}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans pb-3">
          {/* <div>
            <p class="text-sm leading-5 text-blue-700">
              Showing
              <span class="font-medium">1</span>
              to
              <span class="font-medium">200</span>
              of
              <span class="font-medium">2000</span>
              results
            </p>
          </div> */}
          <div class="ml-auto">
            <nav class="relative z-0 inline-flex shadow-sm">
              <div>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                  aria-label="Previous"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
              <div>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                >
                  1
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                >
                  2
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                >
                  3
                </a>
              </div>
              <div>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                  aria-label="Next"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
