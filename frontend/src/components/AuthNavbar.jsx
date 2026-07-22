import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";

const mono = {
  fontFamily: "'JetBrains Mono', monospace",
};

export default function AuthNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#FBF6ED]/90 backdrop-blur-md border-b border-[#E4D5BE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1C1712] flex items-center justify-center">
            <BookOpen
              size={20}
              className="text-white"
            />
          </div>

          <div>
            <h2 className="font-bold text-lg text-[#1C1712]">
              StudyScribe
            </h2>

            <p
              className="text-[10px] text-[#9C8F7A]"
              style={mono}
            >
              AI
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link
            to="/"
            className="hover:text-[#C8562E] transition"
          >
            Home
          </Link>

          <a
            href="#features"
            className="hover:text-[#C8562E] transition"
          >
            Features
          </a>

          <Link
            to="/login"
            className="hover:text-[#C8562E] transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-[#1C1712] text-white px-5 py-2 rounded-xl hover:bg-[#2F2923] transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-[#F3E8DA]"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden border-t border-[#E4D5BE] bg-[#FBF6ED]">
          <div className="flex flex-col px-6 py-5 gap-5 text-sm">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="hover:text-[#C8562E]"
            >
              Home
            </Link>

            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="hover:text-[#C8562E]"
            >
              Features
            </a>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="hover:text-[#C8562E]"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="bg-[#1C1712] text-white text-center py-3 rounded-xl"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}