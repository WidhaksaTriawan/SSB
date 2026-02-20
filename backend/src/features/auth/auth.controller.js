import { findUserByEmail } from "./auth.model.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password wajib diisi" });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // sementara plain text dulu (nanti bisa bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ message: "Password salah" });
    }

    res.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
