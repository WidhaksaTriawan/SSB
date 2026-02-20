import { db } from "../../config/db.js";

export const getAllSiswa = async (filters = {}) => {
  let query = `
    SELECT siswa.*, ssb.nama AS ssb_nama 
    FROM siswa 
    LEFT JOIN ssb ON siswa.ssb_id = ssb.id
    WHERE 1=1
  `;
  const params = [];

  if (filters.ssb) {
    query += " AND ssb_id = ?";
    params.push(filters.ssb);
  }

  if (filters.umur) {
    query += " AND umur = ?";
    params.push(filters.umur);
  }

  if (filters.status) {
    query += " AND status = ?";
    params.push(filters.status);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

export const getSiswaById = async (id) => {
  const [rows] = await db.query("SELECT * FROM siswa WHERE id = ?", [id]);
  return rows[0];
};

export const createSiswa = async (data) => {
  const { nama, umur, posisi, foto, status, ssb_id } = data;

  await db.query(
    `INSERT INTO siswa (nama, umur, posisi, foto, status, ssb_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nama, umur, posisi, foto, status, ssb_id],
  );
};

export const updateSiswa = async (id, data) => {
  const { nama, umur, posisi, foto, status, ssb_id } = data;

  await db.query(
    `UPDATE siswa 
     SET nama=?, umur=?, posisi=?, foto=?, status=?, ssb_id=?
     WHERE id=?`,
    [nama, umur, posisi, foto, status, ssb_id, id],
  );
};

export const deleteSiswa = async (id) => {
  await db.query("DELETE FROM siswa WHERE id = ?", [id]);
};
