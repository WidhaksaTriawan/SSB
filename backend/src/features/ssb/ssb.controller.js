import { getAllSSB, createSSB, updateSSB, deleteSSB } from "./ssb.model.js";

export const fetchSSB = async (req, res) => {
  const data = await getAllSSB();
  res.json(data);
};

import { getSSBById } from "./ssb.model.js";

export const fetchSSBDetail = async (req, res) => {
  const { id } = req.params;
  const data = await getSSBById(id);

  if (!data) {
    return res.status(404).json({ message: "SSB tidak ditemukan" });
  }

  res.json(data);
};

export const addSSB = async (req, res) => {
  const { nama, alamat } = req.body;
  await createSSB(nama, alamat);
  res.json({ message: "SSB berhasil ditambahkan" });
};

export const editSSB = async (req, res) => {
  const { id } = req.params;
  const { nama, alamat } = req.body;
  await updateSSB(id, nama, alamat);
  res.json({ message: "SSB berhasil diperbarui" });
};

export const removeSSB = async (req, res) => {
  const { id } = req.params;
  await deleteSSB(id);
  res.json({ message: "SSB berhasil dihapus" });
};
