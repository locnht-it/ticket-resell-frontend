import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen rounded-sm">
      <div className="flex-[3.5] flex bg-gray-100 relative rounded-sm">
        <img
          src="../../avatar.jpg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-[1.5] flex flex-col justify-center p-8 bg-white shadow-lg">
        <h1 className="text-5xl font-bold text-center mb-3">Ticket Resell</h1>
        <h3 className="text-2xl font-semibold text-center mb-6">
          Admin System
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Please enter email"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password:</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Please enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            onClick={() => navigate(`/`)}
          >
            Login
          </button>
          <a
            href="/change-password"
            className="text-blue-500 text-center block mt-2 hover:underline"
          >
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
