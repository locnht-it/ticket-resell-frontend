import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotPasswordApi } from "../../api/forgotPasswordApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Bước 1: Nhập email, Bước 2: Nhập OTP, Bước 3: Nhập mật khẩu mới
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60); // Thời gian đếm ngược cho OTP
  const [resendEnabled, setResendEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    checkEmailForgotPassword,
    validateEmailForgotPassword,
    resendOTPEmailForgotPassword,
    changeForgotPassword,
  } = useForgotPasswordApi();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Xử lý gửi OTP qua email
  const handleSendOtp = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Email is invalid. Please check your email again.");
      return;
    }

    try {
      const response = await checkEmailForgotPassword(email);
      const userData = response.data.content;

      localStorage.setItem("userData", JSON.stringify(userData));
      if (response.data.statusCode === 500) {
        toast.error(response.data.content);
        return;
      }
      setStep(2); // Chuyển sang bước 2: Nhập OTP
      setError("");
      setCountdown(60); // Reset thời gian đếm ngược
      setResendEnabled(false);
    } catch (error) {
      setError(error.response.data.content);
    }
  };

  // Xử lý xác thực OTP
  const handleVerifyOtp = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.id;

    const otpRegex = /^[0-9]{6}$/;
    if (!otpRegex.test(otp)) {
      toast.error("OTP is invalid. OTP contains 6 digits.");
      return;
    }

    try {
      const response = await validateEmailForgotPassword(otp, userId);
      if (response.data.statusCode === 400) {
        toast.error(response.data.content);
        return;
      }
      setStep(3); // Chuyển sang bước 3: Nhập mật khẩu mới
      setError("");
    } catch (error) {
      setError("OTP không hợp lệ hoặc đã hết hạn.");
    }
  };

  // Xử lý yêu cầu gửi lại OTP
  const handleResendOtp = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.id;

    try {
      await resendOTPEmailForgotPassword(email, userId);
      setCountdown(60);
      setResendEnabled(false);
      toast.success("OTP is resend. Please check your email again.");
    } catch (error) {
      setError("Cannot resend OTP.");
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0 && step === 2) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendEnabled(true);
    }
    return () => clearInterval(timer);
  }, [countdown, step]);

  const handleChangePassword = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userEmail = userData?.email;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must be at least 9 characters, including 1 uppercase letter, 1 number and 1 special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Confirmation password does not match.");
      return;
    }

    try {
      await changeForgotPassword(userEmail, newPassword);
      localStorage.removeItem("userData");
      toast.success("Change password successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Change password failed.");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError("");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex justify-center pt-20">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Forgot Password
        </h1>

        {step === 1 && (
          <div>
            <h2 className="text-lg text-gray-700 font-semibold mb-4">
              Please enter your email
            </h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
              placeholder="Your email"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleSendOtp}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Send OTP
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg text-gray-700 font-semibold mb-4">
              Please enter OTP
            </h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
              placeholder="OTP Token"
            />
            <p className="text-gray-600 mb-4">
              {countdown > 0 ? (
                `OTP will expire in ${countdown} s`
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="text-blue-600 underline"
                >
                  Resend OTP
                </button>
              )}
            </p>
            {/* {resendEnabled && (
              <button
                onClick={handleResendOtp}
                className="text-blue-600 underline"
              >
                Resend OTP
              </button>
            )} */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleVerifyOtp}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg text-gray-700 font-semibold mb-4">
              Please enter new password
            </h2>
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
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleChangePassword}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Change password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
