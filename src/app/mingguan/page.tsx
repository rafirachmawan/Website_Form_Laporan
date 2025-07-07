"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { FaRegEdit, FaClipboardList, FaCalendarAlt } from "react-icons/fa";

export default function LaporanMingguanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState("");
  const [rencana, setRencana] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Nama: ${nama}\nStatus: ${status}\nRencana: ${rencana}`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 bg-blue-100 text-blue-700 font-semibold"
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
        {/* Header mobile */}
        <header className="md:hidden bg-white px-4 py-4 flex items-center justify-between shadow-sm border-b">
          <h1 className="text-lg font-bold text-blue-700">
            Form Laporan Mingguan
          </h1>
          <button onClick={() => setSidebarOpen(true)}>
            <HiMenu size={24} className="text-gray-600" />
          </button>
        </header>

        <main className="flex-1 flex items-center justify-center bg-gray-50 px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-white rounded-lg shadow p-6 space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Form Laporan Mingguan
            </h1>

            {/* Dropdown Nama */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pilih Nama
              </label>
              <select
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">-- Pilih Nama --</option>
                <option value="Budi">Budi</option>
                <option value="Sari">Sari</option>
                <option value="Andi">Andi</option>
              </select>
            </div>

            {/* Dropdown Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status Mingguan
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">-- Pilih Status --</option>
                <option value="Selesai">Selesai</option>
                <option value="Proses">Proses</option>
                <option value="Tertunda">Tertunda</option>
              </select>
            </div>

            {/* Textarea Rencana */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Rencana Minggu Depan
              </label>
              <textarea
                value={rencana}
                onChange={(e) => setRencana(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Tuliskan rencana..."
                required
              />
            </div>

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
