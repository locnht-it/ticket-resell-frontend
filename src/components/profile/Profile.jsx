import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import getUserRole from "../../lib/utils/UserRole";

const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const loadUserData = async () => {
      const data = await auth.user;
      setUserData(data);
    };
    loadUserData();
  }, [id, auth.user]);

  const handleUpdate = () => {
    navigate(`/profile/edit/${id}`);
  };

  const handleChangePassword = () => {
    navigate(`/change-password`);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  // Nếu dữ liệu người dùng chưa được tải, hiển thị loading
  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }
  const displayGender =
    userData.gender === 0
      ? "Male"
      : userData.gender === "MALE"
      ? "Male"
      : userData.gender === 1
      ? "Female"
      : userData.gender === "FEMALE"
      ? "Female"
      : userData.gender === "OTHER"
      ? "Other"
      : userData.gender === 2
      ? "Other"
      : "Unknown";

  return (
    <div className="flex items-center justify-center p-1 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Profile Information
        </h1>
        <div className="flex items-center mb-6">
          <img
            src={userData.image}
            alt="Avatar"
            className="w-32 h-32 rounded-full border border-gray-300"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {userData.fullname}
            </h2>
            <p className="text-gray-600">{getUserRole(userData.role)}</p>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Email:</strong>
          <p className="text-gray-600">{userData.email}</p>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Phone:</strong>
          <p className="text-gray-600">{userData.phoneNumber}</p>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Address:</strong>
          <p className="text-gray-600">{userData.address}</p>
        </div>
        <div className="mb-4 flex items-center">
          <strong className="text-gray-800 mr-2">Gender:</strong>
          <p className="text-gray-600">{displayGender}</p>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mr-2"
          >
            Update Information
          </button>
          <button
            onClick={handleChangePassword}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300"
          >
            Change Password
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
