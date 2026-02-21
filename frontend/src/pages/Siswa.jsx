import { useEffect, useState } from "react";
import api from "../services/api";

export default function Siswa() {
  const [siswa, setSiswa] = useState([]);
  const [ssbList, setSSBList] = useState([]);

  // Form state
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [posisi, setPosisi] = useState("");
  const [ssbId, setSsbId] = useState("");
  const [status, setStatus] = useState("aktif");

  const [foto, setFoto] = useState(null);
  const [oldFoto, setOldFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [editId, setEditId] = useState(null);

  // Filter state
  const [filterSSB, setFilterSSB] = useState("");
  const [filterUmur, setFilterUmur] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const loadData = async () => {
    const params = {};

    if (filterSSB) params.ssb_id = filterSSB;
    if (filterUmur) params.umur = filterUmur;
    if (filterStatus) params.status = filterStatus;

    const resSiswa = await api.get("/siswa", { params });
    const resSSB = await api.get("/ssb");

    setSiswa(resSiswa.data);
    setSSBList(resSSB.data);
  };

  const resetForm = () => {
    setNama("");
    setUmur("");
    setPosisi("");
    setSsbId("");
    setStatus("aktif");
    setEditId(null);
    setFoto(null);
    setOldFoto(null);
    setPreview(null);
  };

  const addSiswa = async () => {
    if (!nama || !umur || !posisi || !ssbId) return;

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("umur", umur);
    formData.append("posisi", posisi);
    formData.append("ssb_id", ssbId);
    formData.append("status", status);

    if (foto) formData.append("foto", foto);

    await api.post("/siswa", formData);
    resetForm();
    loadData();
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setNama(item.nama);
    setUmur(item.umur);
    setPosisi(item.posisi);
    setSsbId(item.ssb_id);
    setStatus(item.status);
    setOldFoto(item.foto);
    setPreview(item.foto ? `http://localhost:3000/uploads/${item.foto}` : null);
  };

  const updateSiswa = async () => {
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("umur", umur);
    formData.append("posisi", posisi);
    formData.append("ssb_id", ssbId);
    formData.append("status", status);

    if (foto) {
      formData.append("foto", foto);
    } else {
      formData.append("old_foto", oldFoto);
    }

    await api.put(`/siswa/${editId}`, formData);
    resetForm();
    loadData();
  };

  const deleteSiswa = async (id) => {
    if (!confirm("Hapus data siswa ini?")) return;
    await api.delete(`/siswa/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [filterSSB, filterUmur, filterStatus]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Data Siswa</h1>

      {/* FILTER */}
      <div className="bg-white rounded-2xl shadow p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={filterSSB}
          onChange={(e) => setFilterSSB(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Semua SSB</option>
          {ssbList.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nama}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Filter umur"
          value={filterUmur}
          onChange={(e) => setFilterUmur(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>

        <button
          onClick={loadData}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 transition"
        >
          Refresh
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-6 gap-4">
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama siswa"
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="number"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
          placeholder="Umur"
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          value={posisi}
          onChange={(e) => setPosisi(e.target.value)}
          placeholder="Posisi"
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
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>

        <div className="flex items-center gap-3">
          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm">
            Upload Foto
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFoto(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>

          {preview && (
            <img
              src={preview}
              className="w-12 h-12 rounded-full object-cover border"
            />
          )}
        </div>

        <div className="col-span-full flex gap-3">
          {editId ? (
            <>
              <button
                onClick={updateSiswa}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Update
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg"
              >
                Batal
              </button>
            </>
          ) : (
            <button
              onClick={addSiswa}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Tambah Siswa
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
                Foto
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-xs uppercase tracking-wider"
              >
                Nama
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-xs uppercase tracking-wider"
              >
                Umur
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-xs uppercase tracking-wider"
              >
                Posisi
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-xs uppercase tracking-wider"
              >
                SSB
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-center"
              >
                Status
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
            {siswa.map((item) => (
              <tr
                key={item.id}
                // Di HP jadi block (kartu), di desktop jadi baris tabel
                className="block sm:table-row hover:bg-gray-50 transition-colors duration-200 p-4 sm:p-0"
              >
                {/* FOTO */}
                <td className="flex justify-between items-center sm:table-cell py-2 sm:px-6 sm:py-4">
                  {/* Label khusus HP */}
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    Foto
                  </span>
                  {item.foto ? (
                    <img
                      src={`http://localhost:3000/uploads/${item.foto}`}
                      alt={`Foto ${item.nama}`}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                      <span className="text-xs font-medium uppercase">
                        {item.nama.charAt(0)}
                      </span>
                    </div>
                  )}
                </td>

                {/* INFO SISWA */}
                <td className="flex justify-between items-center sm:table-cell py-2 sm:px-6 sm:py-4 font-medium text-gray-900">
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    Nama
                  </span>
                  <span>{item.nama}</span>
                </td>

                <td className="flex justify-between items-center sm:table-cell py-2 sm:px-6 sm:py-4 text-gray-500">
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    Umur
                  </span>
                  <span>{item.umur} Thn</span>
                </td>

                <td className="flex justify-between items-center sm:table-cell py-2 sm:px-6 sm:py-4 text-gray-500 capitalize">
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    Posisi
                  </span>
                  <span>{item.posisi}</span>
                </td>

                <td className="flex justify-between items-center sm:table-cell py-2 sm:px-6 sm:py-4 text-gray-500">
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    SSB
                  </span>
                  <span>{item.ssb_nama}</span>
                </td>

                {/* STATUS BADGE */}
                <td className="flex justify-between items-center sm:table-cell py-2 sm:px-6 sm:py-4 sm:text-center">
                  <span className="sm:hidden font-semibold text-xs text-gray-500 uppercase">
                    Status
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      item.status === "aktif"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
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
                      onClick={() => deleteSiswa(item.id)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors focus:ring-2 focus:ring-red-300 outline-none"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {siswa.length === 0 && (
              <tr className="block sm:table-row">
                <td
                  colSpan="7"
                  className="block sm:table-cell px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-1">
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="text-gray-500 font-medium">
                      Belum ada data siswa
                    </span>
                    <span className="text-gray-400 text-xs">
                      Siswa yang terdaftar akan ditampilkan di tabel ini.
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
