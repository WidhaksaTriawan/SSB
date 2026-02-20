import { db } from "../../config/db.js";

export const getAllSSB = async () => {
  const [rows] = await db.query("SELECT * FROM ssb");
  return rows;
};

export const getSSBById = async (id) => {
  const [rows] = await db.query("SELECT * FROM ssb WHERE id = ?", [id]);
  return rows[0];
};

export const createSSB = async (nama, alamat) => {
  await db.query("INSERT INTO ssb (nama, alamat) VALUES (?, ?)", [
    nama,
    alamat,
  ]);
};

export const updateSSB = async (id, nama, alamat) => {
  await db.query("UPDATE ssb SET nama = ?, alamat = ? WHERE id = ?", [
    nama,
    alamat,
    id,
  ]);
};

export const deleteSSB = async (id) => {
  await db.query("DELETE FROM ssb WHERE id = ?", [id]);
};
