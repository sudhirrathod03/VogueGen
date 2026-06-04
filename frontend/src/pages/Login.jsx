import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Login Data:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-2">
          <h1 className="text-4xl font-serif font-bold text-blue-700">
            Vogue<span className="italic font-normal">Gen</span>
          </h1>
        </div>

        {/* Heading */}
        <p className="text-center text-blue-500 tracking-[4px] text-xs font-semibold uppercase mb-2">
          Welcome Back
        </p>

        <h2 className="text-center text-5xl font-serif font-bold text-[#2C2C2A] mb-3">
          Login
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Sign in to access your AI-powered fashion dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-[#2C2C2A]">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-4 outline-none focus:border-blue-500"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-[#2C2C2A]">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-4 outline-none focus:border-blue-500"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-4 rounded-2xl transition duration-300 shadow-md"
          >
            Login →
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;