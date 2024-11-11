import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserApi } from "../../api/userApi";
import getUserRole from "../../lib/utils/UserRole";
import getUserStatus from "../../lib/utils/UserStatus";

const UserDetails = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const { getUserByUserId } = useUserApi();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserByUserId(id);
        console.log(`>>> Chẹc response from api getUserByUserId: `, response);
        if (response && response.data.content) {
          const user = response.data.content;
          const status = user.isDelete === true ? "Inactive" : "Active";
          setAccount({ ...user, status });
        } else {
          console.error("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const handleToggleStatus = () => {
    const newStatus = account.status === "active" ? "inactive" : "active";
    setAccount({ ...account, status: newStatus });
    alert(
      `Account status has been updated to ${
        newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
      }!`
    );
  };

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Account Details</h1>

      <div className="grid grid-cols-3 items-center gap-4 mb-6">
        {/* Avatar */}
        <div className="text-center">
          <img
            src={account.image}
            alt="Avatar"
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
        </div>

        {/* Full Name and Role */}
        <div className="col-span-2">
          <div className="pt-3 pl-4 rounded mb-2">
            <label className="block text-gray-700 font-bold mb-1">
              Full Name
            </label>
            <p className="text-lg">{account.fullname}</p>
          </div>

          <div className=" p-3 rounded">
            <label className="block text-gray-700 font-bold mb-2">Role</label>
            <p className="text-lg">{getUserRole(account.role)}</p>
          </div>
        </div>
      </div>

      {/* Address and Email in one row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Address</label>
          <p className="text-lg">{account.address}</p>
        </div>
        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <p className="text-lg">{account.email}</p>
        </div>
      </div>

      {/* Phone and Point in one row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <p className="text-lg">{account.phoneNumber}</p>
        </div>
        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Point</label>
          <p className="text-lg">{account.point}</p>
        </div>
      </div>

      {/* Post Times and Status in one row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">
            Post Times
          </label>
          <p className="text-lg">{account.postTimes}</p>
        </div>
        <div className="border border-gray-300 p-3 rounded">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <p className="text-lg">{getUserStatus(account.status)}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none"
          onClick={() => navigate("/user")}
        >
          Back
        </button>
        <button
          className={`px-6 py-2 rounded ${
            account.status === "Active"
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-500 text-white hover:bg-green-600"
          } focus:outline-none`}
          onClick={handleToggleStatus}
        >
          {account.status === "Active" ? "Inactive" : "Active"}
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
