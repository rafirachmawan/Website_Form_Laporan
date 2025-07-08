"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { FaRegEdit, FaClipboardList, FaCalendarAlt } from "react-icons/fa";

const projectList = [
  "Aplikasi Mandiri Pencatatan Stock Gudang - 10 Juli 2025",
  "Langganan SPBU Kalangan - Mayangkara Group - 10 Juli 2025",
  "Implementasi Klikpeta Sebagai SFA - 1 Juli 2025 - 5 Juli 2025",
  "Print Gabungan Faktur Beda Prinsipal - 1 juli 2025",
  "Penetrasi EC, OA Area Ngunut 1 Juli 2025 - 1 Agustus 2025",
  "Perbaikan Sistem Klaim - 20 Juli 2025",
  "Pengganti Kanvas - 20 Juli 2025",
  "Penjualan Barang PCS + Gimmick - 25 juni 2025 - 15 Juli 2025",
  "Stock Opname Awal TLG 1 Juli 2025 - 5 Juli 2025",
  "Posisi Admin Pajak - 5 Juli 2025",
  "Implementasi Aplikasi Gudang - 30 Juli 2025",
];

const subProjectMap: Record<string, string[]> = {
  "Aplikasi Mandiri Pencatatan Stock Gudang - 10 Juli 2025": [
    "Fitur Generate per Prinsipal",
    "Implementasi ke gudang",
  ],
  "Langganan SPBU Kalangan - Mayangkara Group - 10 Juli 2025": ["None"],
  "Implementasi Klikpeta Sebagai SFA - 1 Juli 2025 - 5 Juli 2025": [
    "Master Database (L, M, S)",
    "Implementasi Kunjungan",
    "Master Discon",
    "Implementasi Order",
    "Import Data Order ke APOS",
    "Implementasi All Sales",
    "Implementasi sales trenggalek",
  ],
  "Print Gabungan Faktur Beda Prinsipal - 1 juli 2025": ["None"],
  "Penetrasi EC, OA Area Ngunut 1 Juli 2025 - 1 Agustus 2025": ["None"],
  "Perbaikan Sistem Klaim - 20 Juli 2025": [
    "Memperbaiki folder klaim",
    "Closing FPN dan UDI",
    "Validasi program klaim",
  ],
  "Pengganti Kanvas - 20 Juli 2025": ["None"],
  "Penjualan Barang PCS + Gimmick - 25 juni 2025 - 15 Juli 2025": ["None"],
  "Stock Opname Awal TLG 1 Juli 2025 - 5 Juli 2025": ["None"],
  "Posisi Admin Pajak - 5 Juli 2025": ["None"],
  "Implementasi Aplikasi Gudang - 30 Juli 2025": ["None"],
};

export default function LaporanHarianPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [project, setProject] = useState("");
  const [nama, setNama] = useState("");
  const [peran, setPeran] = useState("");
  const [sub, setSub] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [kegiatan, setKegiatan] = useState("");
  const [prioritas, setPrioritas] = useState("");
  const [bantuan, setBantuan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      project,
      nama,
      peran,
      sub,
      deadline,
      status,
      kegiatan,
      prioritas,
      bantuan,
    };
    alert("✅ Data berhasil dikirim:\n" + JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    setSub("");
  }, [project]);

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
            <FaRegEdit className="text-blue-600" />
            Form Laporan Harian
          </Link>
          <Link
            href="/mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaCalendarAlt className="text-green-600" />
            Form Laporan Mingguan
          </Link>
          <Link
            href="/hasil-harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaClipboardList className="text-purple-600" />
            Laporan Harian
          </Link>
          <Link
            href="/hasil-mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaClipboardList className="text-indigo-600" />
            Laporan Mingguan
          </Link>
        </nav>
        <div className="p-4 text-xs text-gray-400 mt-auto">
          © {new Date().getFullYear()} AstroGroup
        </div>
      </aside>

      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        <header className="md:hidden bg-white px-4 py-4 flex items-center justify-between shadow-sm border-b">
          <h1 className="text-lg font-bold text-blue-700">
            Form Laporan Harian
          </h1>
          <button onClick={() => setSidebarOpen(true)}>
            <HiMenu size={24} className="text-gray-600" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto bg-white rounded-lg shadow p-6 space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Form Laporan Harian Project
            </h1>

            {/* Project */}
            <div>
              <label className="block text-[16px] font-medium text-gray-900 mb-1">
                Pilih Project
              </label>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-[16px] text-gray-900 bg-white"
                required
              >
                <option value="">-- Pilih Project --</option>
                {projectList.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Project */}
            {project && (
              <div>
                <label className="block text-[16px] font-medium text-gray-900 mb-1">
                  Sub Project
                </label>
                <select
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[16px] text-gray-900 bg-white"
                  required
                >
                  <option value="">-- Pilih Sub Project --</option>
                  {(subProjectMap[project] || []).map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Dynamic Fields */}
            {(
              [
                ["Nama", nama, setNama],
                ["Peran", peran, setPeran, ["P-PIC", "C-PIC", "StakeHolder"]],
                ["Deadline", deadline, setDeadline, "date"],
                [
                  "Status Kesehatan Project",
                  status,
                  setStatus,
                  [
                    "Hijau (Lancar Sesuai Rencana)",
                    "Kuning (Ada Kendala Kecil)",
                    "Oranye (Perlu Perhatian Serius)",
                    "Merah (Krisis, Butuh Intervensi)",
                  ],
                ],
                ["Kegiatan Hari Ini", kegiatan, setKegiatan],
                ["Prioritas Besok", prioritas, setPrioritas],
                ["Butuh Bantuan?", bantuan, setBantuan],
              ] as [
                string,
                string,
                React.Dispatch<React.SetStateAction<string>>,
                any?
              ][]
            ).map(([label, value, setValue, extra], i) => (
              <div key={i}>
                <label className="block text-[16px] font-medium text-gray-900 mb-1">
                  {label}
                </label>
                {Array.isArray(extra) ? (
                  <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[16px] text-gray-900 bg-white"
                    required
                  >
                    <option value="">-- Pilih --</option>
                    {extra.map((opt, j) => (
                      <option key={j} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={extra === "date" ? "date" : "text"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[16px] text-gray-900 bg-white"
                    required
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold transition"
            >
              Simpan Laporan
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
