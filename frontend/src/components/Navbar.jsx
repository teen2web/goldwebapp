import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
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
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/posts/new" className={linkClass}>
            New Post
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
