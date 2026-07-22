import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, History, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FBF8F3]/90 backdrop-blur border-b border-[#E8DDD1]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="text-2xl font-semibold text-[#1C1712]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Study<span className="text-[#C7652E]">Scribe</span>
        </Link>

        {/* Desktop */}

        <nav className="hidden md:flex items-center gap-8">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 transition ${
                isActive
                  ? "text-[#C7652E]"
                  : "text-gray-600 hover:text-[#C7652E]"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `flex items-center gap-2 transition ${
                isActive
                  ? "text-[#C7652E]"
                  : "text-gray-600 hover:text-[#C7652E]"
              }`
            }
          >
            <History size={18} />
            History
          </NavLink>

        </nav>

        {/* Right */}

        <div className="hidden md:flex items-center gap-5">

          <div className="text-right">
            <p className="text-sm font-medium">
              {user?.name}
            </p>

            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-[#1D1915] hover:bg-black text-white px-4 py-2 rounded-xl transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

        {/* Mobile */}

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden border-t border-[#E8DDD1] bg-[#FBF8F3]">

          <NavLink
            to="/dashboard"
            className="block px-6 py-4"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/history"
            className="block px-6 py-4"
            onClick={() => setOpen(false)}
          >
            History
          </NavLink>

          <button
            onClick={logout}
            className="w-full text-left px-6 py-4 text-red-500"
          >
            Logout
          </button>

        </div>
      )}
    </header>
  );
}