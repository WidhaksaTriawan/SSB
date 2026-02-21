import {
  getAllJadwal,
  getJadwalById,
  createJadwal,
  updateJadwal,
  deleteJadwal,
} from "./jadwal.model.js";

export const fetchJadwal = async (req, res) => {
  const data = await getAllJadwal(req.query);
  res.json(data);
};

export const fetchJadwalDetail = async (req, res) => {
  const data = await getJadwalById(req.params.id);

  if (!data) {
    return res.status(404).json({ message: "Jadwal tidak ditemukan" });
  }

  res.json(data);
};

export const addJadwal = async (req, res) => {
  const { tanggal, ...rest } = req.body;

  const formattedTanggal = tanggal
    ? new Date(tanggal).toISOString().split("T")[0]
    : null;

  await createJadwal({
    ...rest,
    tanggal: formattedTanggal,
  });

  res.json({ message: "Jadwal berhasil ditambahkan" });
};

export const editJadwal = async (req, res) => {
  const { tanggal, ...rest } = req.body;

  const formattedTanggal = tanggal
    ? new Date(tanggal).toISOString().split("T")[0]
    : null;

  await updateJadwal(req.params.id, {
    ...rest,
    tanggal: formattedTanggal,
  });

  res.json({ message: "Jadwal berhasil diperbarui" });
};

export const removeJadwal = async (req, res) => {
  await deleteJadwal(req.params.id);
  res.json({ message: "Jadwal berhasil dihapus" });
};
