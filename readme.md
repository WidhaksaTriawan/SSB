# 📊 Sistem Manajemen SSB (Sekolah Sepak Bola)

Aplikasi berbasis web untuk mengelola data siswa/pemain SSB, data klub (SSB), serta jadwal latihan menggunakan REST API.  
Project ini dibuat sebagai tugas seleksi/magang Web Developer.

---

## 🛠 Tools yang Digunakan

### Frontend

- React (Vite)
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MySQL
- Multer (upload gambar)
- CORS
- dotenv

### Database

- MySQL (phpMyAdmin)

### Version Control

- Git & GitHub

---

## 🤖 Bagian yang Dibantu AI

Dalam pengerjaan project ini, AI (ChatGPT) digunakan sebagai asisten untuk:

- Membantu perancangan struktur folder backend Express
- Contoh pembuatan REST API CRUD
- Integrasi frontend React dengan backend API
- Implementasi upload gambar (Multer)
- Pembuatan fitur filter data (SSB, umur, status)
- Debugging error dan optimasi query SQL

AI digunakan sebagai referensi dan pembimbing, sedangkan implementasi serta pemahaman dilakukan secara mandiri.

---

## ⚠️ Kendala yang Dihadapi & Cara Mengatasinya

### 1. Upload gambar tidak tampil di frontend

**Masalah:**  
File berhasil tersimpan di server, tetapi tidak bisa ditampilkan di React.

**Solusi:**  
Menambahkan static folder di Express:

```js
app.use("/uploads", express.static("uploads"));
```

### 2. Filter data siswa tidak berjalan

**Masalah:**
Parameter filter dari frontend tidak terbaca di backend.

**Solusi:**
Menyesuaikan query SQL menggunakan req.query seperti:
ssb_id
umur
status

### 3. Gambar hilang saat update data

**Masalah:**
Field foto terhapus saat update tanpa upload baru.

**Solusi:**
Menyimpan foto lama (old_foto) dan menggunakannya jika tidak ada file baru.

### 4. Error database (Data truncated)

**Masalah:**
Format data tidak sesuai tipe kolom MySQL.

**Solusi:**
Menyesuaikan struktur tabel dan validasi input.

### Fitur yang Berhasil Dibuat

- Login admin
- CRUD Siswa + upload foto
- CRUD SSB
- CRUD Jadwal latihan
- Filter data siswa:
  -Berdasarkan SSB
  -Umur
  -Status aktif/nonaktif
- Dashboard terintegrasi API
