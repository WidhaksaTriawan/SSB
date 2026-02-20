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

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Foto</th>
              <th className="p-4 text-left">Nama</th>
              <th className="p-4 text-left">Umur</th>
              <th className="p-4 text-left">Posisi</th>
              <th className="p-4 text-left">SSB</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {siswa.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  {item.foto && (
                    <img
                      src={`http://localhost:3000/uploads/${item.foto}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </td>
                <td className="p-4 font-medium">{item.nama}</td>
                <td className="p-4">{item.umur}</td>
                <td className="p-4">{item.posisi}</td>
                <td className="p-4">{item.ssb_nama}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "aktif"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4 space-x-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSiswa(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {siswa.length === 0 && (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-400">
                  Belum ada data siswa
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
