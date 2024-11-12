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

        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          placeholder="Old password"
          required
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          placeholder="New password"
          required
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          placeholder="Confirm new password"
          required
        />

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
