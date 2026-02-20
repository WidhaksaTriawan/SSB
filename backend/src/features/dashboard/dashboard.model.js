import { db } from "../../config/db.js";

export const getDashboardStats = async () => {
  const [[siswa]] = await db.query("SELECT COUNT(*) as total FROM siswa");
  const [[ssb]] = await db.query("SELECT COUNT(*) as total FROM ssb");
  const [[latihan]] = await db.query(
    "SELECT COUNT(*) as total FROM jadwal WHERE jenis = 'latihan'",
  );
  const [[turnamen]] = await db.query(
    "SELECT COUNT(*) as total FROM jadwal WHERE jenis = 'turnamen'",
  );

  return {
    total_siswa: siswa.total,
    total_ssb: ssb.total,
    total_latihan: latihan.total,
    total_turnamen: turnamen.total,
  };
};
