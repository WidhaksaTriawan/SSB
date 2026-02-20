import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "SSB", path: "/ssb", icon: "🏫" },
    { name: "Siswa", path: "/siswa", icon: "👦" },
    { name: "Jadwal", path: "/jadwal", icon: "📅" },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow transition"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 w-64 min-h-screen bg-linear-to-b from-blue-600 to-blue-700 text-white p-6 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          ⚽ SSB Portal
        </h1>

        <nav className="space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-white text-blue-700 font-semibold shadow"
                    : "hover:bg-blue-500/70"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
