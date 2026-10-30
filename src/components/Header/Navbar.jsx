import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes, FaBookOpen, FaBookmark } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "My Reading List", path: "/readList" },
  ];

  const linkClass = ({ isActive }) =>
    `relative text-sm font-semibold transition duration-300 ${
      isActive ? "text-orange-600" : "text-slate-600 hover:text-orange-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#fffdf9]/95 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600 text-xl text-white shadow-lg shadow-orange-200">
            <FaBookOpen />
          </span>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Book<span className="text-orange-600">Vibe.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={linkClass}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/readList"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition duration-300 hover:bg-orange-600"
          >
            <FaBookmark />
            My Books
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-800 transition hover:bg-orange-50 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-[#fffdf9] px-5 py-5 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/readList"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
            >
              <FaBookmark />
              My Books
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
