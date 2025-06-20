import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import BrandLogo from "../components/BrandLogo";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.fullName || !form.email || !form.password) {
      setError("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email format");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    try {
      setLoading(true);
      await signup(form);
      navigate("/notes");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* Left side image - hidden on small screens */}
      <div className="hidden sm:block flex-1 bg-[url('/images/pattern.jpg')] bg-cover bg-center" />

      {/* Right side form */}
      <div className="w-full sm:w-[420px] bg-white flex flex-col justify-center items-center px-6 sm:px-12">
        <div className="w-full max-w-sm">
          <BrandLogo />

          <form onSubmit={handleSubmit} className="mt-6">
            <h2 className="text-xl font-bold mb-4">Create Your Free Account</h2>

            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 mb-3 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-black"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 mb-3 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-black"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 mb-4 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-black"
            />

            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 uppercase tracking-wide text-sm"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-sm mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-black underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
