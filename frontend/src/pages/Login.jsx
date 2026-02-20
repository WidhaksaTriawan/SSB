import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* LEFT BRAND SECTION */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-indigo-600 to-blue-800 text-white p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Admin SSB 👋</h1>

        <p className="text-lg opacity-90 max-w-md">
          Kelola data pemain, berita, dan sistem sekolah sepak bola dengan cepat
          dan efisien melalui dashboard modern.
        </p>
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login Admin</h2>

          <p className="text-gray-500 mb-6">Masuk untuk mengelola sistem SSB</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
