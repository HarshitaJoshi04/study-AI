import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { BookOpen, Mail, Lock, ArrowRight } from "lucide-react";

const display = { fontFamily: "'Lora', ui-serif, Georgia, serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      login(res.data.token, res.data.user);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3E8DA] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center gap-2.5 mb-10"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1C1712] flex items-center justify-center shrink-0">
            <BookOpen size={16} className="text-[#F3E8DA]" strokeWidth={2} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-[#1C1712]">
            StudyScribe
          </span>
          <span className="text-[11px] text-[#9C8F7A] tracking-wide" style={mono}>
            /AI
          </span>
        </Link>

        <div className="bg-[#FBF6ED] border border-[#E4D5BE] rounded-2xl shadow-[0_16px_40px_-24px_rgba(28,23,18,0.35)] p-8 sm:p-10">
          <p className="text-[11px] text-[#9C8F7A] tracking-wide mb-2" style={mono}>
            WELCOME BACK
          </p>
          <h1
            className="text-[1.75rem] leading-tight font-medium text-[#1C1712] mb-8"
            style={display}
          >
            Log in to your notes.
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] text-[#5A4F40] mb-1.5">
                Email
              </label>
              <div className="flex items-center gap-2.5 bg-[#F3E8DA] border border-[#E4D5BE] rounded-xl px-4 focus-within:border-[#C8562E] transition-colors">
                <Mail size={16} className="text-[#B0A18A] shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@studyscribe.ai"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent py-3 text-[14px] text-[#1C1712] placeholder:text-[#B0A18A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[13px] text-[#5A4F40]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[12px] text-[#9C8F7A] hover:text-[#C8562E] transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="flex items-center gap-2.5 bg-[#F3E8DA] border border-[#E4D5BE] rounded-xl px-4 focus-within:border-[#C8562E] transition-colors">
                <Lock size={16} className="text-[#B0A18A] shrink-0" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent py-3 text-[14px] text-[#1C1712] placeholder:text-[#B0A18A] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-[#1C1712] text-[#F3E8DA] text-[14px] font-medium py-3.5 rounded-xl hover:bg-[#2E261D] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in…" : "Log in"}
              {!loading && <ArrowRight size={15} />}
            </button>
          </form>
        </div>

        <p className="text-center text-[14px] text-[#6B6152] mt-7">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#1C1712] font-medium hover:text-[#C8562E] transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;