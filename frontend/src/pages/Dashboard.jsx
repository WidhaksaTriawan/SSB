import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_siswa: 0,
    total_ssb: 0,
    total_latihan: 0,
    total_turnamen: 0,
  });

  useEffect(() => {
    api.get("/dashboard").then((res) => {
      setStats(res.data);
    });
  }, []);

  const cards = [
    { label: "Total Siswa", value: stats.total_siswa },
    { label: "Total SSB", value: stats.total_ssb },
    { label: "Jadwal Latihan", value: stats.total_latihan },
    { label: "Turnamen", value: stats.total_turnamen },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-600">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
