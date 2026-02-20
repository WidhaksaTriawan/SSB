import express from "express";
import {
  fetchJadwal,
  fetchJadwalDetail,
  addJadwal,
  editJadwal,
  removeJadwal,
} from "./jadwal.controller.js";

const router = express.Router();

router.get("/", fetchJadwal);
router.get("/:id", fetchJadwalDetail);
router.post("/", addJadwal);
router.put("/:id", editJadwal);
router.delete("/:id", removeJadwal);

export default router;
