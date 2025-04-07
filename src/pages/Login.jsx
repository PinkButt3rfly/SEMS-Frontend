import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const response = await axios.post("https://sems-backend.onrender.com/api/auth/login", {
        email,
        password,
      }); 

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error)
      } else {
        setError("Server Error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 via-gray-900 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-center font-poppins text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
          SCHOOL EMPLOYEE MANAGEMENT SYSTEM
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl text-pink-600 font-bold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-pink-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
