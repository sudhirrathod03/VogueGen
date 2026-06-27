import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
   const BASE_URL= import.meta.env.VITE_BACKEND_URL

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) return;
  
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        formData
      );
  
      console.log(res.data);
  
      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
        })
      );

window.dispatchEvent(
  new Event("authChanged")
);

navigate("/");
  
      alert("Login Successful");
  
    } catch (error) {
      console.log(error.response?.data);
    }
  };

   return (
    <section className="relative isolate flex min-h-[500px] items-center justify-center overflow-hidden rounded-3xl bg-[#FBFCFE] px-3 py-8 sm:px-5 sm:py-12">
      {/* Background Arctic Glass Gradients */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(24,95,165,0.11)_0%,rgba(255,255,255,0)_42%),linear-gradient(315deg,rgba(55,138,221,0.12)_0%,rgba(255,255,255,0)_36%)]" />
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white px-5 py-5 shadow-lg shadow-primary-nav/10 sm:px-6 sm:py-6">
          
          {/* Logo & Welcome */}
          <div className="mb-5 text-center">
            <a href="/" className="mb-4 inline-block font-serif text-2xl font-bold tracking-tight text-primary-nav">
              Vogue<span className="font-normal italic text-accent">Gen</span>
            </a>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Welcome Back
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-text-main sm:text-4xl">
              Log in
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-text-muted sm:text-sm">
              Sign in to access your AI-powered fashion dashboard and personalized stylist.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-text-main">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-2xl border border-transparent bg-[#F4F7FB] px-4 py-2.5 text-sm text-text-main outline-none transition placeholder:text-text-muted/60 hover:bg-white focus:bg-white focus:ring-2 focus:ring-accent/20"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm font-medium text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-text-main">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-primary-nav hover:text-accent">
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-2xl border border-transparent bg-[#F4F7FB] px-4 py-2.5 text-sm text-text-main outline-none transition placeholder:text-text-muted/60 hover:bg-white focus:bg-white focus:ring-2 focus:ring-accent/20"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm font-medium text-red-600">
                  {errors.password}
                </p>
              )}
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-nav px-6 py-3 text-sm font-semibold tracking-wider text-white shadow-md shadow-primary-nav/15 transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/25"
            >
              <span>Sign In</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
          {/* Redirect to Signup */}
          <p className="mt-5 text-center text-sm text-text-muted">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary-nav hover:text-accent">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;