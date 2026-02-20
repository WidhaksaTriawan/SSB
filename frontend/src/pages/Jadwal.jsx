import { useEffect, useState } from "react";
import api from "../services/api";

export default function Jadwal() {
  const [jadwal, setJadwal] = useState([]);

  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [jenis, setJenis] = useState("latihan");

  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    const res = await api.get("/jadwal");
    setJadwal(res.data);
  };

  const resetForm = () => {
    setTanggal("");
    setWaktu("");
    setLokasi("");
    setJenis("latihan");
    setEditId(null);
  };

  const addJadwal = async () => {
    if (!tanggal || !waktu || !lokasi) return;

    await api.post("/jadwal", {
      tanggal,
      waktu,
      lokasi,
      jenis,
    });

    resetForm();
    loadData();
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setTanggal(item.tanggal);
    setWaktu(item.waktu);
    setLokasi(item.lokasi);
    setJenis(item.jenis);
  };

  const updateJadwal = async () => {
    await api.put(`/jadwal/${editId}`, {
      tanggal,
      waktu,
      lokasi,
      jenis,
    });

    resetForm();
    loadData();
  };

  const deleteJadwal = async (id) => {
    if (!confirm("Hapus jadwal ini?")) return;
    await api.delete(`/jadwal/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Jadwal Kegiatan</h1>

      {/* FORM */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="border rounded px-4 py-2"
        />

        <input
          type="time"
          value={waktu}
          onChange={(e) => setWaktu(e.target.value)}
          className="border rounded px-4 py-2"
        />

        <input
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          placeholder="Lokasi"
          className="border rounded px-4 py-2"
        />

        <select
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="latihan">Latihan</option>
          <option value="turnamen">Turnamen</option>
        </select>

        {editId ? (
          <div className="flex gap-2 col-span-full">
            <button
              onClick={updateJadwal}
              className="bg-green-600 text-white px-5 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-5 py-2 rounded"
            >
              Batal
            </button>
          </div>
        ) : (
          <button
            onClick={addJadwal}
            className="bg-blue-600 text-white px-5 py-2 rounded col-span-full"
          >
            Tambah Jadwal
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Waktu</th>
              <th className="px-4 py-3">Lokasi</th>
              <th className="px-4 py-3">Jenis</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {jadwal.map((item) => (
              <tr key={item.id} className="border-t text-center">
                <td className="px-4 py-2">{item.tanggal}</td>
                <td className="px-4 py-2">{item.waktu}</td>
                <td className="px-4 py-2">{item.lokasi}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.jenis === "latihan"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {item.jenis}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteJadwal(item.id)}
                    className="text-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {jadwal.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-gray-400">
                  Belum ada jadwal
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
