import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserApi } from "../../api/userApi";
import getUserRole from "../../lib/utils/UserRole";
import getUserStatus from "../../lib/utils/UserStatus";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../AuthContext";

const UserDetails = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const { getUserByUserId, changeUserStatus } = useUserApi();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserByUserId(id);
        console.log(`>>> Check response from api getUserByUserId: `, response);
        if (response && response.data.content) {
          const user = response.data.content;
          const status = user.isDeleted === true ? "Inactive" : "Active";
          const gender =
            user.gender === 0
              ? "Male"
              : user.gender === "MALE"
              ? "Male"
              : user.gender === 1
              ? "Female"
              : user.gender === "FEMALE"
              ? "Female"
              : user.gender === "OTHER"
              ? "Other"
              : user.gender === 2
              ? "Other"
              : "Unknown";
          setAccount({ ...user, status, gender });
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

  const handleToggleStatus = async () => {
    try {
      const newStatus = account.status === "Active" ? "Inactive" : "Active";
      const response = await changeUserStatus(id);
      if (response && response.data.content) {
        setAccount({ ...account, status: newStatus });
        toast.success("Change status successfully!");
      } else {
        toast.error("Error updating user status.");
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Error toggling user status.");
    }
  };

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center p-1 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Account Details
        </h1>
        <div className="flex items-center mb-6">
          <img
            src={account.image}
            alt="Avatar"
            className="w-32 h-32 rounded-full border border-gray-300"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {account.fullname}
            </h2>
            <p className="text-gray-600">{getUserRole(account.role)}</p>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Address:</strong>
          <p className="text-gray-600">{account.address}</p>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Email:</strong>
          <p className="text-gray-600">{account.email}</p>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Phone Number:</strong>
          <p className="text-gray-600">{account.phoneNumber}</p>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Point:</strong>
          <p className="text-gray-600">{account.point}</p>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Post Times:</strong>
          <p className="text-gray-600">{account.postTimes}</p>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Gender:</strong>
          <p className="text-gray-600">{account.gender}</p>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Status:</strong>
          <p className="text-gray-600">{getUserStatus(account.status)}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="px-6 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          {(auth.user.role === "ADMIN" || auth.user.role === 1) && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
