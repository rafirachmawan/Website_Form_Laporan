"use client";

import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { FaRegEdit, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import Link from "next/link";

const subOptions: Record<string, string[]> = {
  "Aplikasi Mandiri Pencatatan Stock Gudang - 10 Juli 2025": [
    "Fitur Generate per Prinsipal",
    "Implementasi ke gudang",
  ],
  "Langganan SPBU Kalangan - Mayangkara Group - 10 Juli 2025": ["None"],
  "Implementasi Klikpeta Sebagai SFA - 1 Juli 2025 - 5 Juli 2025": [
    "Master Database (L, M, S) - 26 Juni 2025",
    "Implementasi Kunjungan - 3 Juli 2025",
    "Master Discon - 10 Juli 2025",
    "Implementasi Order - 15 Juli 2025",
    "Import Data Order ke APOS - 21 Juli 2025",
    "Implementasi All Sales - 5 Agustus 2025",
    "Implementasi sales trenggalek - 5 Agustus",
  ],
  "Print Gabungan Faktur Beda Prinsipal - 1 juli 2025": ["None"],
  "Penetrasi EC, OA Area Ngunut 1 Juli 2025 - 1 Agustus 2025": ["None"],
  "Perbaikan Sistem Klaim - 20 Juli 2025": [
    "Memperbaiki folder klaim - 28 Juni 2025",
    "Closing FPN dan UDI - 28 Juni 2025",
    "Validasi program klaim - 20 Juli 2025",
  ],
  "Pengganti Kanvas - 20 Juli 2025": ["None"],
  "Penjualan Barang PCS + Gimmick - 25 juni 2025 - 15 Juli 2025": ["None"],
  "Stock Opname Awal TLG 1 Juli 2025 - 5 Juli 2025": ["None"],
  "Posisi Admin Pajak - 5 Juli 2025": ["None"],
  "Implementasi Aplikasi Gudang - 30 Juli 2025": ["None"],
};

export default function LaporanMingguanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    deadline: "",
    pic: "",
    cpic: "",
    project: "",
    sub: "",
    status: "",
    progress: "",
    pencapaian: "",
    tantanganSolusi: "",
    rencanaMingguDepan: "",
    kebutuhanResource: "",
    kesimpulan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "project") {
      setForm((f) => ({ ...f, sub: "" }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 top-0 left-0 h-full w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex flex-col`}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-700">
            SPARTA
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 md:hidden"
          >
            <HiOutlineX size={24} />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            href="/harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaRegEdit className="text-blue-600" /> Form Laporan Harian
          </Link>
          <Link
            href="/mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaCalendarAlt className="text-green-600" /> Form Laporan Mingguan
          </Link>
          <Link
            href="/hasil-harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaClipboardList className="text-purple-600" /> Laporan Harian
          </Link>
          <Link
            href="/hasil-mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaClipboardList className="text-indigo-600" /> Laporan Mingguan
          </Link>
        </nav>
        <div className="p-4 text-xs text-gray-400 mt-auto">
          © {new Date().getFullYear()} AstroGroup
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Form Laporan Mingguan
        </h1>

        <form className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
          {[
            ["nama", "Nama"],
            ["deadline", "Deadline", "date"],
            ["pic", "P-PIC"],
            ["cpic", "C-PIC"],
          ].map(([name, label, type = "text"]) => (
            <div key={name}>
              <label className="block mb-1 text-gray-700 font-medium">
                {label}
              </label>
              <input
                name={name}
                type={type}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 text-base font-medium"
              />
            </div>
          ))}

          {/* Project */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Project
            </label>
            <select
              name="project"
              value={form.project}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-800 text-base font-medium"
            >
              <option value="">-- PILIH --</option>
              {Object.keys(subOptions).map((proj) => (
                <option key={proj} value={proj}>
                  {proj}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Project */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Sub Project
            </label>
            <select
              name="sub"
              value={form.sub}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-800 text-base font-medium"
            >
              <option value="">-- PILIH SUB --</option>
              {(subOptions[form.project] || []).map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-800 text-base font-medium"
            >
              <option value="">-- PILIH STATUS --</option>
              <option>Hijau (Lancar Sesuai Rencana)</option>
              <option>Kuning (Ada Kendala Kecil)</option>
              <option>Oranye (Perhatian Serius)</option>
              <option>Merah (Krisis, Butuh Intervensi)</option>
            </select>
          </div>

          {[
            ["progress", "Progress Keseluruhan"],
            ["pencapaian", "Pencapaian Utama"],
            ["tantanganSolusi", "Tantangan dan Solusi"],
            ["rencanaMingguDepan", "Rencana Minggu Depan"],
            ["kebutuhanResource", "Kebutuhan Resource"],
            ["kesimpulan", "Kesimpulan"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block mb-1 text-gray-700 font-medium">
                {label}
              </label>
              <textarea
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 text-base font-medium"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            KIRIM
          </button>
        </form>
      </main>
    </div>
  );
}
