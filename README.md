
#  YessPhone Store

Aplikasi web E-Commerce full-stack untuk penjualan smartphone, dibangun dengan **Node.js**, **React**, dan **MySQL**.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Fitur

- 🔐 **Autentikasi User** (Login/Register dengan JWT)
- ️ **Role-based Access** (Admin & User)
- 📱 **CRUD Produk** (Tambah, Lihat, Edit, Hapus HP)
- ️ **Upload Gambar** produk dengan preview
- 🔍 **Protected Routes** (Halaman admin hanya untuk login)
-  **Dashboard Admin** untuk manajemen produk
- 📱 **Responsive Design** (Mobile & Desktop)

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express** - Framework web
- **MySQL** - Database
- **mysql2** - Driver database
- **JWT** (jsonwebtoken) - Autentikasi
- **bcrypt** - Hashing password
- **Multer** - Upload file
- **dotenv** - Environment variables
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool
- **React Router DOM** - Routing (SPA)
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling (opsional, sesuaikan)

---

## 📁 Struktur Folder

```
yessphone-project/
├── backend/
│   ├── config/          # Konfigurasi database
│   ├── controllers/     # Logika bisnis
│   ├── middleware/      # Auth & Upload middleware
│   ├── models/          # Query database
│   ├── routes/          # API endpoints
│   ├── uploads/         # Folder simpan gambar (auto-created)
│   ├── .env             # Environment variables (JANGAN di-commit!)
│   └── server.js        # Entry point backend
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/         # Konfigurasi Axios
│   │   ├── components/  # Komponen reusable
│   │   ├── context/     # React Context (Auth)
│   │   ├── pages/       # Halaman aplikasi
│   │   ── App.jsx      # Entry point frontend
│   └── package.json
│
└── README.md
```

---

## ⚙️ Prerequisites

Pastikan sudah terinstall di PC:

- **Node.js** versi 18 atau lebih baru → [Download](https://nodejs.org/)
- **MySQL Server** (bisa pakai XAMPP, WAMP, atau install langsung) → [Download](https://dev.mysql.com/downloads/)
- **Git** → [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) → [Download](https://code.visualstudio.com/)

---

## 🚀 Setup & Instalasi

### 1. Clone Repository

git clone https://github.com/USERNAME-KAMU/yessphone-project.git
cd yessphone-project


### 2. Setup Database MySQL

Buka MySQL Workbench / phpMyAdmin / terminal MySQL, lalu jalankan:

CREATE DATABASE yessphone_db;
USE yessphone_db;

-- Buat tabel users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel phones
CREATE TABLE phones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    description TEXT,
    image_url VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert user admin default
-- Username: admin
-- Password: admin123
INSERT INTO users (username, password, role) VALUES
('admin', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin');
```

### 3. Setup Backend

# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Buat file .env (copy dari contoh)
# Isi dengan konfigurasi database PC kamu
```

Buat file **`backend/.env`** dengan isi:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=yessphone_db
DB_PORT=3306
SERVER_PORT=5000
JWT_SECRET=yessphone_secret_key_2026_ganti_dengan_random_string
JWT_EXPIRE=1d
```

> ⚠️ **PENTING:** Sesuaikan `DB_PASSWORD` dengan password MySQL di PC kamu. Ganti `JWT_SECRET` dengan string random yang aman.

### 4. Setup Frontend

```bash
# Kembali ke root project
cd ..

# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install
```

### 5. Jalankan Aplikasi

Buka **2 terminal terpisah**:

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```
Backend akan berjalan di: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend akan berjalan di: `http://localhost:5173`

---

## 🔑 Default Credentials

| Role  | Username | Password   |
|-------|----------|------------|
| Admin | admin    | admin123   |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint              | Deskripsi          | Auth |
|--------|-----------------------|--------------------|------|
| POST   | `/api/auth/login`     | Login user         | ❌   |
| POST   | `/api/auth/register`  | Register user baru | ❌   |
| GET    | `/api/auth/profile`   | Ambil profil user  | ✅   |

### Phones
| Method | Endpoint            | Deskripsi              | Auth     |
|--------|---------------------|------------------------|----------|
| GET    | `/api/phones`       | Ambil semua HP         | ❌       |
| GET    | `/api/phones/:id`   | Ambil detail HP        | ❌       |
| POST   | `/api/phones`       | Tambah HP baru         | ✅ Admin |
| PUT    | `/api/phones/:id`   | Update HP              | ✅ Admin |
| DELETE | `/api/phones/:id`   | Hapus HP               | ✅ Admin |

---

## 📝 Catatan Penting

- Folder `backend/uploads/` akan otomatis dibuat saat pertama kali upload gambar.
- File `.env` **JANGAN** di-commit ke GitHub (sudah ada di `.gitignore`).
- Gambar produk disimpan di `backend/uploads/` dengan path relatif di database.
- Password admin sudah di-hash dengan bcrypt, **jangan** disimpan sebagai plain text.

---

##  Future Improvements

- [ ] Fitur pencarian & filter produk
- [ ] Keranjang belanja (Shopping Cart)
- [ ] Sistem checkout & pembayaran
- [ ] Upload gambar ke Cloud Storage (AWS S3 / Cloudinary)
- [ ] Unit testing & integration testing
- [ ] Deploy ke production (Vercel + Railway)

---

## 👨‍ Author

Dibuat dengan ❤️ oleh **[Nama Kamu]**

---

##  License

Project ini dilisensikan di bawah [MIT License](LICENSE).
```

---

## 📄 FILE: `.gitignore` (PENTING!)

Pastikan di root folder `yessphone-project/` ada file `.gitignore` agar file sensitif tidak ter-push ke GitHub:

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Uploads folder (file gambar)
backend/uploads/*
!backend/uploads/.gitkeep

# Build output
dist/
build/
.vite/

# OS files
.DS_Store
Thumbs.db
desktop.ini

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
logs
*.log
```

Buat juga file kosong `backend/uploads/.gitkeep` agar folder uploads tetap ada di repo (tapi isinya tidak):

```bash
# Di terminal
touch backend/uploads/.gitkeep
```

---

## 🖥️ PANDUAN SETUP DI PC BARU

Setelah kamu clone repo di PC baru, ikuti langkah ini:

### Step 1: Clone Repository
```bash
git clone https://github.com/USERNAME-KAMU/yessphone-project.git
cd yessphone-project
```

### Step 2: Install MySQL & Buat Database
- Install MySQL di PC baru (atau pakai XAMPP)
- Buka MySQL Workbench / terminal
- Jalankan script SQL dari README bagian **"2. Setup Database MySQL"**

### Step 3: Setup Backend
```bash
cd backend
npm install
```

Lalu **buat file `.env`** di folder `backend/` dengan konfigurasi sesuai PC baru:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_mysql_pc_baru  # ← GANTI INI!
DB_NAME=yessphone_db
DB_PORT=3306
SERVER_PORT=5000
JWT_SECRET=rahasia_baru_untuk_pc_ini_12345  # ← GANTI INI JUGA!
JWT_EXPIRE=1d
```

### Step 4: Setup Frontend
```bash
cd ..
cd frontend
npm install
```

### Step 5: Jalankan
Terminal 1:
```bash
cd backend
node server.js
```

Terminal 2:
```bash
cd frontend
npm run dev
```

Buka browser: `http://localhost:5173`

Login dengan:
- Username: `admin`
- Password: `admin123`

---

## 📌 Checklist Sebelum Push ke GitHub

Sebelum push README ini, pastikan:

- [ ] File `.gitignore` sudah ada di root project
- [ ] File `backend/.env` **TIDAK** ter-commit (cek dengan `git status`)
- [ ] Folder `backend/uploads/` ada file `.gitkeep`
- [ ] README.md sudah di root folder
- [ ] Test di PC baru berhasil

Push update:
```bash
git add .
git commit -m "Add README.md and .gitignore"
git push origin main
```

---

**Sekarang project kamu sudah siap untuk:**
1. ✅ Dilihat orang lain di GitHub dengan dokumentasi lengkap
2. ✅ Di-setup di PC manapun dengan mudah
3. ✅ Dikembangkan lebih lanjut tanpa bingung

Selamat! Project YessPhone kamu sudah benar-benar profesional! 🚀
