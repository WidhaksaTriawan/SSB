import express from "express";
import {
  fetchSiswa,
  fetchSiswaDetail,
  addSiswa,
  editSiswa,
  removeSiswa,
} from "./siswa.controller.js";
import { upload } from "../../middlewares/upload.js";

const router = express.Router();

router.get("/", fetchSiswa);
router.get("/:id", fetchSiswaDetail);

router.post("/", upload.single("foto"), addSiswa);

router.put("/:id", upload.single("foto"), editSiswa);

router.delete("/:id", removeSiswa);

export default router;
