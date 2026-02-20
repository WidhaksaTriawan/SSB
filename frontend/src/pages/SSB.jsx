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

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setNama("");
    setAlamat("");
    setEditId(null);
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

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Data SSB</h1>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama SSB"
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          placeholder="Alamat"
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="flex gap-3">
          {editId ? (
            <>
              <button
                onClick={updateSSB}
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
              onClick={addSSB}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition w-full md:w-auto"
            >
              Tambah SSB
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Nama SSB</th>
              <th className="p-4 text-left">Alamat</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {ssb.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{item.nama}</td>
                <td className="p-4 text-gray-600">{item.alamat}</td>
                <td className="p-4 text-right space-x-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSSB(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {ssb.length === 0 && (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-400">
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
