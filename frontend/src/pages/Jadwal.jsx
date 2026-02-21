import { useEffect, useState } from "react";
import api from "../services/api";

export default function Jadwal() {
  const [jadwal, setJadwal] = useState([]);
  const [ssbList, setSSBList] = useState([]);

  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jenis, setJenis] = useState("latihan");
  const [ssbId, setSsbId] = useState("");

  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    const resJadwal = await api.get("/jadwal");
    const resSSB = await api.get("/ssb");

    setJadwal(resJadwal.data);
    setSSBList(resSSB.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setJudul("");
    setTanggal("");
    setJenis("latihan");
    setSsbId("");
    setEditId(null);
  };

  const addJadwal = async () => {
    if (!judul || !tanggal || !ssbId) return;

    await api.post("/jadwal", {
      judul,
      tanggal,
      jenis,
      ssb_id: ssbId,
    });

    resetForm();
    loadData();
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setJudul(item.judul);
    setTanggal(
      item.tanggal.includes("T") ? item.tanggal.split("T")[0] : item.tanggal,
    );
    setJenis(item.jenis);
    setSsbId(item.ssb_id);
  };

  const updateJadwal = async () => {
    await api.put(`/jadwal/${editId}`, {
      judul,
      tanggal,
      jenis,
      ssb_id: ssbId,
    });

    resetForm();
    loadData();
  };

  const deleteJadwal = async (id) => {
    if (!confirm("Hapus jadwal ini?")) return;
    await api.delete(`/jadwal/${id}`);
    loadData();
  };

  const formatTanggal = (value) => {
    if (!value) return "-";

    // ambil hanya bagian tanggal
    const datePart = value.includes("T") ? value.split("T")[0] : value;

    const [year, month, day] = datePart.split("-");

    const namaBulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return `${day} ${namaBulan[month - 1]} ${year}`;
  };
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Jadwal Kegiatan</h1>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Judul kegiatan"
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={ssbId}
          onChange={(e) => setSsbId(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Pilih SSB</option>
          {ssbList.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nama}
            </option>
          ))}
        </select>

        <select
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="latihan">Latihan</option>
          <option value="turnamen">Turnamen</option>
        </select>

        <div className="flex gap-3">
          {editId ? (
            <>
              <button
                onClick={updateJadwal}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
              >
                Update
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition"
              >
                Batal
              </button>
            </>
          ) : (
            <button
              onClick={addJadwal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition w-full md:w-auto"
            >
              Tambah Jadwal
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Judul</th>
              <th className="p-4 text-left">Tanggal</th>
              <th className="p-4 text-left">SSB</th>
              <th className="p-4 text-left">Jenis</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {jadwal.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{item.judul}</td>
                <td className="p-4">{formatTanggal(item.tanggal)}</td>
                <td className="p-4">{item.ssb_nama || "-"}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.jenis === "latihan"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {item.jenis}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteJadwal(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {jadwal.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  Belum ada jadwal kegiatan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
