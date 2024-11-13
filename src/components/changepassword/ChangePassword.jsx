import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserApi } from "../../api/userApi";
import { useAuth } from "../../AuthContext";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { changePassword } = useUserApi();
  const { auth } = useAuth();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowOldPassword = () => {
    setShowOldPassword((prev) => !prev);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validateNewPassword = (password) => {
    const minLength = /.{9,}/; // Ít nhất 9 ký tự
    const hasUpperCase = /[A-Z]/; // Ít nhất 1 chữ viết hoa
    const hasNumber = /\d/; // Ít nhất 1 chữ số
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Ít nhất 1 ký tự đặc biệt

    if (!minLength.test(password)) {
      return "Password must be at least 9 characters long.";
    }
    if (!hasUpperCase.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!hasNumber.test(password)) {
      return "Password must include at least one number.";
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must include at least one special character.";
    }
    return null;
  };

  // Hàm xử lý thay đổi password
  const handleUpdatePassword = async () => {
    const email = auth?.user?.email;

    if (!email) {
      setError("User email not found. Please log in again.");
      return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (oldPassword === newPassword) {
      setError("New password must not be the same as the old password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Gọi hàm validate cho password mới
    const passwordError = validateNewPassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      setLoading(true);
      const data = {
        email: email,
        password: oldPassword,
        newPassword: newPassword,
      };
      const success = await changePassword(data);
      if (success) {
        setError("");
        toast.success("Change password successfully!");
        navigate(`/profile/${auth.user.id}`);
      } else {
        setError("Failed to update password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Change Password
        </h1>
        <h2 className="text-lg text-gray-700 font-semibold mb-4">
          Enter your old and new password
        </h2>

        <div className="relative mb-4">
          <input
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Old password"
            required
          />
          <button
            type="button"
            onClick={toggleShowOldPassword}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.548c.283-.368.76-.756 1.28-1.152C7.206 5.81 9.5 4.5 12 4.5s4.794 1.31 6.74 2.896c.52.396.997.784 1.28 1.152.244.32.244.688 0 1.008-.283.368-.76.756-1.28 1.152C16.794 14.19 14.5 15.5 12 15.5s-4.794-1.31-6.74-2.896c-.52-.396-.997-.784-1.28-1.152a.97.97 0 010-1.008z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.548a.97.97 0 010 1.008c.283.368.76.756 1.28 1.152C7.206 14.19 9.5 15.5 12 15.5s4.794-1.31 6.74-2.896c.52-.396.997-.784 1.28-1.152a.97.97 0 000-1.008c-.283-.368-.76-.756-1.28-1.152C16.794 5.81 14.5 4.5 12 4.5s-4.794 1.31-6.74 2.896c-.52.396-.997.784-1.28 1.152z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="New password"
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.548c.283-.368.76-.756 1.28-1.152C7.206 5.81 9.5 4.5 12 4.5s4.794 1.31 6.74 2.896c.52.396.997.784 1.28 1.152.244.32.244.688 0 1.008-.283.368-.76.756-1.28 1.152C16.794 14.19 14.5 15.5 12 15.5s-4.794-1.31-6.74-2.896c-.52-.396-.997-.784-1.28-1.152a.97.97 0 010-1.008z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.548a.97.97 0 010 1.008c.283.368.76.756 1.28 1.152C7.206 14.19 9.5 15.5 12 15.5s4.794-1.31 6.74-2.896c.52-.396.997-.784 1.28-1.152a.97.97 0 000-1.008c-.283-.368-.76-.756-1.28-1.152C16.794 5.81 14.5 4.5 12 4.5s-4.794 1.31-6.74 2.896c-.52.396-.997.784-1.28 1.152z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Confirm new password"
            required
          />
          <button
            type="button"
            onClick={toggleShowConfirmPassword}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {showConfirmPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.548c.283-.368.76-.756 1.28-1.152C7.206 5.81 9.5 4.5 12 4.5s4.794 1.31 6.74 2.896c.52.396.997.784 1.28 1.152.244.32.244.688 0 1.008-.283.368-.76.756-1.28 1.152C16.794 14.19 14.5 15.5 12 15.5s-4.794-1.31-6.74-2.896c-.52-.396-.997-.784-1.28-1.152a.97.97 0 010-1.008z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.548a.97.97 0 010 1.008c.283.368.76.756 1.28 1.152C7.206 14.19 9.5 15.5 12 15.5s4.794-1.31 6.74-2.896c.52-.396.997-.784 1.28-1.152a.97.97 0 000-1.008c-.283-.368-.76-.756-1.28-1.152C16.794 5.81 14.5 4.5 12 4.5s-4.794 1.31-6.74 2.896c-.52.396-.997.784-1.28 1.152z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-500"
                : "px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700"
            } text-white px-4 py-2 rounded transition duration-300`}
          >
            {loading ? "Changing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
