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

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* RESPONSIVE WRAPPER */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            {/* TABLE HEADER */}
            <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-semibold text-xs uppercase tracking-wider"
                >
                  Nama SSB
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-semibold text-xs uppercase tracking-wider"
                >
                  Alamat
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
            <tbody className="divide-y divide-gray-100">
              {ssb.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {item.alamat}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors focus:ring-2 focus:ring-blue-300 outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSSB(item.id)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors focus:ring-2 focus:ring-red-300 outline-none"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}

              {/* EMPTY STATE */}
              {ssb.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-16 text-center">
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
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      <span className="text-gray-500 font-medium">
                        Belum ada data SSB
                      </span>
                      <span className="text-gray-400 text-xs">
                        Data yang Anda tambahkan akan muncul di sini.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
