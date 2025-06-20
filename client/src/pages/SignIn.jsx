import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import BrandLogo from "../components/BrandLogo";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate("/notes");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
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
            <h2 className="text-xl font-bold mb-4">Welcome, Sign in</h2>

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
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-sm mt-6 text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-black underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
