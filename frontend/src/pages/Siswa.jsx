import { useEffect, useState } from "react";
import api from "../services/api";

export default function Siswa() {
  const [siswa, setSiswa] = useState([]);
  const [ssbList, setSSBList] = useState([]);

  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [posisi, setPosisi] = useState("");
  const [ssbId, setSsbId] = useState("");
  const [status, setStatus] = useState("aktif");

  const [foto, setFoto] = useState(null);
  const [oldFoto, setOldFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    const resSiswa = await api.get("/siswa");
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
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Data Siswa</h1>

      {/* FORM */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-7 gap-4">
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama siswa"
          className="border rounded px-4 py-2"
        />

        <input
          type="number"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
          placeholder="Umur"
          className="border rounded px-4 py-2"
        />

        <input
          value={posisi}
          onChange={(e) => setPosisi(e.target.value)}
          placeholder="Posisi"
          className="border rounded px-4 py-2"
        />

        <select
          value={ssbId}
          onChange={(e) => setSsbId(e.target.value)}
          className="border rounded px-4 py-2"
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
          className="border rounded px-4 py-2"
        >
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setFoto(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        {preview && (
          <img
            src={preview}
            className="w-14 h-14 object-cover rounded border"
          />
        )}

        {editId ? (
          <div className="col-span-full flex gap-2">
            <button
              onClick={updateSiswa}
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
            onClick={addSiswa}
            className="bg-blue-600 text-white px-5 py-2 rounded col-span-full"
          >
            Tambah Siswa
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Umur</th>
              <th className="px-4 py-3">Posisi</th>
              <th className="px-4 py-3">SSB</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {siswa.map((item) => (
              <tr key={item.id} className="border-t text-center">
                <td className="px-4 py-2">
                  {item.foto && (
                    <img
                      src={`http://localhost:3000/uploads/${item.foto}`}
                      className="w-10 h-10 rounded-full mx-auto object-cover"
                    />
                  )}
                </td>
                <td>{item.nama}</td>
                <td>{item.umur}</td>
                <td>{item.posisi}</td>
                <td>{item.ssb_nama}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.status === "aktif"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
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
                    onClick={() => deleteSiswa(item.id)}
                    className="text-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {siswa.length === 0 && (
              <tr>
                <td colSpan="7" className="py-6 text-gray-400">
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
