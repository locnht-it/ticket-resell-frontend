import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Attempt to sign in
    const success = await signIn(email, password);
    if (success) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Login failed. Please check your email or password.");
    }
  };

  return (
    <div className="flex h-screen rounded-sm">
      <div className="flex-[3.5] flex bg-gray-100 relative rounded-sm">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/ticket-resell-app-33551.appspot.com/o/images%2Favatar.jpg678f7ea3-4635-4275-8b2d-d86e37922e86?alt=media&token=c10e040a-6b2d-41b3-86bd-9dffd84eb77c"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-[1.5] flex flex-col justify-center p-8 bg-white shadow-lg">
        <h1 className="text-5xl font-bold text-center mb-3">Ticket Resell</h1>
        <h3 className="text-2xl font-semibold text-center mb-6">
          Management System
        </h3>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Please enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border border-gray-300 rounded pr-10" // Add right padding for icon
                placeholder="Please enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
