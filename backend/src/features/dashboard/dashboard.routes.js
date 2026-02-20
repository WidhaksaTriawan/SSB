import express from "express";
import { fetchDashboard } from "./dashboard.controller.js";

const router = express.Router();

router.get("/", fetchDashboard);

export default router;
