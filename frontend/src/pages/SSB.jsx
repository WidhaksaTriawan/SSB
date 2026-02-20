import { useEffect, useState } from "react";
import api from "../services/api";

export default function SSB() {
  const [ssb, setSSB] = useState([]);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");

  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    const res = await api.get("/ssb");
    setSSB(res.data);
  };

  const addSSB = async () => {
    if (!nama || !alamat) return;

    await api.post("/ssb", { nama, alamat });
    resetForm();
    loadData();
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setNama(item.nama);
    setAlamat(item.alamat);
  };

  const updateSSB = async () => {
    await api.put(`/ssb/${editId}`, { nama, alamat });
    resetForm();
    loadData();
  };

  const deleteSSB = async (id) => {
    if (!confirm("Hapus SSB ini?")) return;
    await api.delete(`/ssb/${id}`);
    loadData();
  };

  const resetForm = () => {
    setNama("");
    setAlamat("");
    setEditId(null);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Data SSB</h1>

      {/* Form */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama SSB"
          className="border rounded px-4 py-2 flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          placeholder="Alamat"
          className="border rounded px-4 py-2 flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {editId ? (
          <div className="flex gap-2">
            <button
              onClick={updateSSB}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
            >
              Batal
            </button>
          </div>
        ) : (
          <button
            onClick={addSSB}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Tambah
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Nama SSB</th>
              <th className="text-left px-4 py-3">Alamat</th>
              <th className="text-right px-4 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {ssb.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.nama}</td>
                <td className="px-4 py-3 text-gray-600">{item.alamat}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSSB(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {ssb.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  Belum ada data SSB
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
