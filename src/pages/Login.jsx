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
    setError(null); // Reset error on new submit

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      console.log("Response Data:", response.data); // ✅ Debugging

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        // ✅ Debugging navigation
        console.log("Navigating to:", response.data.user.role === "admin" ? "/admin-dashboard" : "/employee-dashboard");

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      console.error("Login Error:", error); // ✅ Debugging

      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("Server Error. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-gray-800 from-50% to-gray-100 to-50% space-y-6">
      <h1 className="font-poppins text-3xl text-white">SCHOOL EMPLOYEE MANAGEMENT SYSTEM</h1>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl text-pink-600 font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-md px-3 py-2 border"
              placeholder="Enter Email"
              value={email} // ✅ Ensure input value is updated
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-md px-3 py-2 border"
              placeholder="Enter Password"
              value={password} // ✅ Ensure input value is updated
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-pink-600">
              Forgot password?
            </a>
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full rounded-md bg-pink-600 text-white py-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
