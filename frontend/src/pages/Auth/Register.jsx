import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../../services/supabase";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
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

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registration Successful. Please check your email.");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow-xl w-[450px]">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          Create Account
        </h1>

        <form
          onSubmit={handleRegister}
          className="mt-8"
        >

          <div className="mb-4">
            <label>Full Name</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label>Email</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label>Password</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="w-full bg-blue-700 text-white p-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            className="text-blue-700 font-semibold ml-2"
            to="/"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;