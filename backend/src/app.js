import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./features/auth/auth.routes.js";
import ssbRoutes from "./features/ssb/ssb.routes.js";
import siswaRoutes from "./features/siswa/siswa.routes.js";
import jadwalRoutes from "./features/jadwal/jadwal.routes.js";
import dashboardRoutes from "./features/dashboard/dashboard.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ssb", ssbRoutes);
app.use("/api/siswa", siswaRoutes);
app.use("/api/jadwal", jadwalRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
