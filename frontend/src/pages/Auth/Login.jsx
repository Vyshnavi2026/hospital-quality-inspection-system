import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaHospital,
  FaShieldAlt,
  FaUser,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

import supabase from "../../services/supabase";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login Successful");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 flex items-center justify-center p-6">

      {/* Background decoration */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-300 opacity-20 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* ======================================
            LEFT SIDE
        ====================================== */}

        <div className="hidden md:flex bg-gradient-to-br from-blue-700 to-blue-950 text-white p-12 flex-col justify-between">

          <div>

            {/* Logo */}
            <div className="flex items-center gap-4 mb-10">

              <div className="bg-white text-blue-700 p-4 rounded-2xl shadow-lg">
                <FaHospital className="text-3xl" />
              </div>

              <div>

                <h1 className="text-2xl font-bold">
                  HQIS
                </h1>

                <p className="text-blue-200 text-sm">
                  Hospital Quality Inspection
                </p>

              </div>

            </div>

            {/* Main message */}
            <h2 className="text-4xl font-bold leading-tight">
              Smarter Hospital
              <br />
              Quality Management
            </h2>

            <p className="text-blue-100 mt-6 leading-relaxed">
              Manage hospital inspections, monitor
              quality findings and generate intelligent
              AI-powered quality reports from one
              centralized platform.
            </p>

          </div>

          {/* Features */}

          <div className="space-y-4 mt-10">

            <div className="flex items-center gap-4">

              <div className="bg-white/10 p-3 rounded-xl">
                <FaShieldAlt />
              </div>

              <div>
                <p className="font-semibold">
                  Secure & Reliable
                </p>

                <p className="text-sm text-blue-200">
                  Protected authentication
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="bg-white/10 p-3 rounded-xl">
                🤖
              </div>

              <div>
                <p className="font-semibold">
                  AI-Powered Analysis
                </p>

                <p className="text-sm text-blue-200">
                  Intelligent inspection reports
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="bg-white/10 p-3 rounded-xl">
                📊
              </div>

              <div>
                <p className="font-semibold">
                  Quality Insights
                </p>

                <p className="text-sm text-blue-200">
                  Data-driven hospital monitoring
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ======================================
            RIGHT SIDE - LOGIN
        ====================================== */}

        <div className="p-8 md:p-12 flex flex-col justify-center">

          {/* Mobile Logo */}

          <div className="flex md:hidden items-center justify-center gap-3 mb-8">

            <div className="bg-blue-700 text-white p-3 rounded-xl">
              <FaHospital />
            </div>

            <div>

              <h1 className="text-xl font-bold text-blue-800">
                HQIS
              </h1>

              <p className="text-xs text-gray-500">
                Hospital Quality Inspection
              </p>

            </div>

          </div>

          {/* Heading */}

          <div className="mb-8">

            <p className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
              Welcome Back
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Sign in to your account
            </h2>

            <p className="text-gray-500 mt-2">
              Access your hospital quality dashboard
            </p>

          </div>

          {/* Login Form */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none transition focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none transition focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-blue-200 hover:from-blue-800 hover:to-blue-700 hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <FaArrowRight />
                </>
              )}

            </button>

          </form>

          {/* Register */}

          <div className="flex items-center gap-4 my-7">

            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="text-gray-400 text-sm">
              New to HQIS?
            </span>

            <div className="flex-1 h-px bg-gray-200"></div>

          </div>

          <Link
            to="/register"
            className="w-full text-center border-2 border-blue-700 text-blue-700 font-semibold py-3 rounded-xl hover:bg-blue-50 transition"
          >
            Create an Account
          </Link>

          {/* Footer */}

          <p className="text-center text-xs text-gray-400 mt-8">
            © 2026 Hospital Quality Inspection System
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;