"use client";

import { useEffect, useState } from "react";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import {
  FaRegEdit,
  FaClipboardList,
  FaCalendarAlt,
  FaPlusCircle,
} from "react-icons/fa";

interface LaporanHarianData {
  tanggal: string;
  nama: string;
  peran: string;
  project: string;
  sub: string;
  deadline: string;
  status: string;
  kegiatan: string;
  prioritas: string;
  bantuan: string;
}

export default function LaporanHarianPage() {
  const [dataList, setDataList] = useState<LaporanHarianData[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbz_juFhtVjhImaRmx7zdR8uB5aSsOav2rcVLlJOFcc5Sr3R-wE70K6KEFCwuwU5LgLnmg/exec"
        );
        const data = await res.json();
        setDataList(data);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
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

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link
            href="/harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition"
          >
            <FaRegEdit className="text-blue-600" />
            Form Laporan Harian
          </Link>

          {/* ✅ Tambah Project Harian */}
          <Link
            href="/tambah-project-harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-yellow-50 text-gray-700 font-medium transition"
          >
            <FaPlusCircle className="text-yellow-500" />
            Tambah Project Harian
          </Link>

          <Link
            href="/mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700 font-medium transition"
          >
            <FaCalendarAlt className="text-green-600" />
            Form Laporan Mingguan
          </Link>

          {/* ✅ Tambah Project Mingguan */}
          <Link
            href="/tambah-project-mingguan"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-yellow-50 text-gray-700 font-medium transition"
          >
            <FaPlusCircle className="text-yellow-500" />
            Tambah Project Mingguan
          </Link>

          <Link
            href="/hasil-harian"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 bg-blue-100 text-gray-700 font-medium transition"
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

      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-x-auto">
        <header className="md:hidden bg-white px-4 py-4 flex items-center justify-between shadow-sm border-b">
          <h1 className="text-lg font-bold text-blue-700">
            Laporan Harian Project
          </h1>
          <button onClick={() => setSidebarOpen(true)}>
            <HiMenu size={24} className="text-gray-600" />
          </button>
        </header>

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6 mt-4 md:mt-0">
          Laporan Harian
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm">
            <thead>
              <tr className="bg-blue-100 text-gray-700 text-left">
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">Peran</th>
                <th className="px-4 py-2 border">Project</th>
                <th className="px-4 py-2 border">Sub Project</th>
                <th className="px-4 py-2 border">Deadline</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Kegiatan</th>
                <th className="px-4 py-2 border">Prioritas</th>
                <th className="px-4 py-2 border">Bantuan</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 text-gray-800">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{item.tanggal}</td>
                  <td className="px-4 py-2 border">{item.nama}</td>
                  <td className="px-4 py-2 border">{item.peran}</td>
                  <td className="px-4 py-2 border">{item.project}</td>
                  <td className="px-4 py-2 border">{item.sub}</td>
                  <td className="px-4 py-2 border">{item.deadline}</td>
                  <td className="px-4 py-2 border">{item.status}</td>
                  <td className="px-4 py-2 border">{item.kegiatan}</td>
                  <td className="px-4 py-2 border">{item.prioritas}</td>
                  <td className="px-4 py-2 border">{item.bantuan}</td>
                </tr>
              ))}
              {dataList.length === 0 && (
                <tr>
                  <td
                    colSpan={11}
                    className="text-center text-gray-500 py-4 border"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
