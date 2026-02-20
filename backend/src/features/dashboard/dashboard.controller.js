import { getDashboardStats } from "./dashboard.model.js";

export const fetchDashboard = async (req, res) => {
  const stats = await getDashboardStats();
  res.json(stats);
};
