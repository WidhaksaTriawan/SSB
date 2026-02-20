import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "SSB", path: "/ssb" },
    { name: "Siswa", path: "/siswa" },
    { name: "Jadwal", path: "/jadwal" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 w-64 bg-blue-600 text-black min-h-screen p-5 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h1 className="text-2xl font-bold mb-8 text-white">SSB Portal</h1>

        <nav className="flex flex-col gap-3">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded transition text-black ${
                  isActive
                    ? "bg-white text-blue-600 font-semibold"
                    : "hover:bg-blue-500"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
