import { db } from "../../config/db.js";

export const getAllJadwal = async (filters = {}) => {
  let query = `
    SELECT jadwal.*, ssb.nama AS ssb_nama
    FROM jadwal
    LEFT JOIN ssb ON jadwal.ssb_id = ssb.id
    WHERE 1=1
  `;
  const params = [];

  if (filters.jenis) {
    query += " AND jenis = ?";
    params.push(filters.jenis);
  }

  if (filters.ssb) {
    query += " AND ssb_id = ?";
    params.push(filters.ssb);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

export const getJadwalById = async (id) => {
  const [rows] = await db.query("SELECT * FROM jadwal WHERE id = ?", [id]);
  return rows[0];
};

export const createJadwal = async (data) => {
  const { judul, tanggal, jenis, ssb_id } = data;

  await db.query(
    `INSERT INTO jadwal (judul, tanggal, jenis, ssb_id)
     VALUES (?, ?, ?, ?)`,
    [judul, tanggal, jenis, ssb_id],
  );
};

export const updateJadwal = async (id, data) => {
  const { judul, tanggal, jenis, ssb_id } = data;

  await db.query(
    `UPDATE jadwal
     SET judul=?, tanggal=?, jenis=?, ssb_id=?
     WHERE id=?`,
    [judul, tanggal, jenis, ssb_id, id],
  );
};

export const deleteJadwal = async (id) => {
  await db.query("DELETE FROM jadwal WHERE id = ?", [id]);
};
