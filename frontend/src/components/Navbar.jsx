import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm transition ${
      isActive ? "bg-gold text-black" : "text-white/70 hover:text-gold"
    }`;

  return (
    <header className="sticky top-0 z-10 mt-4 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="font-display text-2xl font-bold tracking-[0.25em] text-gold">
          GOLDWEB
        </Link>
        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/posts/new" className={linkClass}>
                New Post
              </NavLink>
              <span className="px-3 text-sm text-white/60">{user?.username}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-gold/40 px-4 py-2 text-sm text-gold transition hover:border-gold hover:bg-gold hover:text-black"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
