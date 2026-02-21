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

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Hapus overflow-x-auto agar tidak ada scroll samping */}
        <table className="w-full text-sm text-left sm:whitespace-nowrap">
          {/* TABLE HEADER - Sembunyikan di HP, tampilkan di layar besar (sm ke atas) */}
          <thead className="hidden sm:table-header-group bg-gray-50/80 border-b border-gray-200 text-gray-500">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-xs uppercase tracking-wider"
              >
                Judul
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-xs uppercase tracking-wider"
              >
                Tanggal
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-xs uppercase tracking-wider"
              >
                SSB
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-xs uppercase tracking-wider"
              >
                Jenis
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right"
              >
                Aksi
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="block sm:table-row-group divide-y divide-gray-100">
            {jadwal.map((item) => (
              <tr
                key={item.id}
                // Di HP jadi block (kartu), di desktop jadi baris tabel
                className="block sm:table-row hover:bg-gray-50 transition-colors duration-200 p-4 sm:p-0 group"
              >
                {/* JUDUL */}
                <td className="flex justify-between items-center sm:table-cell py-2 sm:px-6 sm:py-4 font-medium text-gray-900">
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    Judul
                  </span>
                  <span>{item.judul}</span>
                </td>

                {/* TANGGAL */}
                <td className="flex justify-between items-center sm:table-cell py-2 sm:px-6 sm:py-4 text-gray-500">
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    Tanggal
                  </span>
                  <span>{formatTanggal(item.tanggal)}</span>
                </td>

                {/* SSB */}
                <td className="flex justify-between items-center sm:table-cell py-2 sm:px-6 sm:py-4 text-gray-500">
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    SSB
                  </span>
                  <span>{item.ssb_nama || "-"}</span>
                </td>

                {/* JENIS BADGE */}
                <td className="flex justify-between items-center sm:table-cell py-2 sm:px-6 sm:py-4">
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    Jenis
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                      item.jenis === "latihan"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-purple-50 text-purple-700 border-purple-200"
                    }`}
                  >
                    {item.jenis}
                  </span>
                </td>

                {/* AKSI */}
                <td className="flex justify-between items-center sm:table-cell py-3 sm:py-4 sm:px-6 sm:text-right mt-2 sm:mt-0 border-t border-gray-100 sm:border-none">
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    Aksi
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors focus:ring-2 focus:ring-blue-300 outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteJadwal(item.id)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors focus:ring-2 focus:ring-red-300 outline-none"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {jadwal.length === 0 && (
              <tr className="block sm:table-row">
                <td
                  colSpan="5"
                  className="block sm:table-cell px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-1">
                    {/* Ikon Kalender untuk Jadwal */}
                    <svg
                      className="w-10 h-10 text-gray-300 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-500 font-medium">
                      Belum ada jadwal kegiatan
                    </span>
                    <span className="text-gray-400 text-xs">
                      Jadwal latihan atau pertandingan akan muncul di sini.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
