import {
  getAllSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} from "./siswa.model.js";

export const fetchSiswa = async (req, res) => {
  const data = await getAllSiswa(req.query);
  res.json(data);
};

export const fetchSiswaDetail = async (req, res) => {
  const data = await getSiswaById(req.params.id);

  if (!data) {
    return res.status(404).json({ message: "Siswa tidak ditemukan" });
  }

  res.json(data);
};

export const addSiswa = async (req, res) => {
  const data = {
    ...req.body,
    foto: req.file ? req.file.filename : null,
  };

  await createSiswa(data);

  res.json({ message: "Siswa berhasil ditambahkan" });
};

export const editSiswa = async (req, res) => {
  const { old_foto, ...rest } = req.body;

  const data = {
    ...rest,
    foto: req.file ? req.file.filename : old_foto || null,
  };

  await updateSiswa(req.params.id, data);

  res.json({ message: "Siswa berhasil diperbarui" });
};

export const removeSiswa = async (req, res) => {
  await deleteSiswa(req.params.id);
  res.json({ message: "Siswa berhasil dihapus" });
};
