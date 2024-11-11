import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getUserRole from "../../lib/utils/UserRole";
import getUserStatus from "../../lib/utils/UserStatus";
import { HiOutlineSearch } from "react-icons/hi";
import { useUserApi } from "../../api/userApi";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // Thêm state cho role
  const navigate = useNavigate();
  const { getAllUsers, searchUserByNameAndEmail, getUsersByRole } =
    useUserApi();

  // Hàm fetch người dùng
  const fetchUsers = async (currentPage, search = "", role) => {
    setLoading(true); // Đặt loading về true mỗi khi bắt đầu fetch
    try {
      let response;
      if (role || role === 0) {
        response = await getUsersByRole(role); // Gọi API getUsersByRole khi có role
      } else if (search) {
        response = await searchUserByNameAndEmail(search); // Gọi API search khi có search term
      } else {
        response = await getAllUsers(currentPage, pageSize); // Gọi API getAllUsers khi không có search hay role
      }

      const data = response.data.content || [];

      console.log(`>>> Check data response of API: `, data);

      if (Array.isArray(data)) {
        const updatedUsers = data.map((user) => ({
          ...user,
          status: user.isDeleted === false ? "Active" : "Inactive",
        }));

        setUsers(updatedUsers);
      } else {
        console.error("Dữ liệu không phải là mảng.");
      }

      const totalItems = response.data.size;
      setTotalCount(totalItems);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false); // Đặt loading về false sau khi fetch xong
    }
  };

  useEffect(() => {
    fetchUsers(page); // Gọi fetchUsers theo page ban đầu
  }, [page]);

  // Hàm xử lý search
  const handleSearch = () => {
    fetchUsers(1, searchTerm); // Fetch lại từ đầu khi tìm kiếm
  };

  const handleRoleChange = (role) => {
    const roleInt = parseInt(role, 10);
    setSelectedRole(roleInt);
    console.log(">>> Chech roleInt: ", roleInt);
    fetchUsers(1, "", roleInt);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedRole("");
    fetchUsers(1);
  };

  // Hàm xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      console.log("Current Page:", page, "New Page:", newPage);
      setPage(newPage);
    }
  };

  const handleAddNewUser = () => {
    navigate("/user/save");
  };

  const handleUserDetails = (id) => {
    navigate(`/user/${id}`);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (totalCount === 0) return <div>No users available.</div>;

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <strong className="text-gray-700 font-medium text-4xl text-center block pb-7">
          User Management
        </strong>
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans pb-5">
          <select
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="text-sm h-10 border border-gray-300 rounded-sm px-4 mr-4"
          >
            <option value="">Select Role</option>
            <option value="1">ADMIN</option>
            <option value="2">STAFF</option>
            <option value="0">CUSTOMER</option>
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

          <button
            className="px-10 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none ml-auto font-bold"
            onClick={handleAddNewUser}
          >
            Add New User
          </button>
        </div>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-gray-800">
                    <Link to={`/user/${user.id}`}>#{user.id}</Link>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {user.fullname}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {getUserRole(user.role)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                  {getUserStatus(user.status)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <button
                    className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                    onClick={() => handleUserDetails(user.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Chỉ hiển thị phân trang khi không có tìm kiếm và role */}
        {searchTerm === "" && selectedRole === "" && (
          <div className="ml-auto mt-5 flex justify-end">
            {totalPages > 0 && (
              <nav className="relative z-0 inline-flex shadow-sm -space-x-px">
                {/* Previous button */}
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
                {/* Page numbers */}
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
                {/* Next button */}
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
        )}
      </div>
    </div>
  );
};

export default User;
