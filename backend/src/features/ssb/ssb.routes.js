import express from "express";
import {
  fetchSSB,
  addSSB,
  editSSB,
  removeSSB,
  fetchSSBDetail,
} from "./ssb.controller.js";

const router = express.Router();

router.get("/", fetchSSB);
router.post("/", addSSB);
router.put("/:id", editSSB);
router.delete("/:id", removeSSB);
router.get("/:id", fetchSSBDetail);

export default router;
