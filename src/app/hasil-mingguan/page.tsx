"use client";

import { useEffect, useState } from "react";

interface LaporanHarianData {
  nama: string;
  status: string;
  catatan: string;
}
import { FaRegEdit, FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { HiMenu, HiOutlineX, HiOutlineHome } from "react-icons/hi";

export default function LaporanHarianPage() {
  const [dataList, setDataList] = useState<LaporanHarianData[]>([]);

  useEffect(() => {
    const dummyData: LaporanHarianData[] = [
      { nama: "Budi", status: "Selesai", catatan: "Tugas selesai tepat waktu" },
      { nama: "Sari", status: "Proses", catatan: "Masih mengerjakan laporan" },
      { nama: "Andi", status: "Tertunda", catatan: "Menunggu approval" },
    ];
    setDataList(dummyData);
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-x-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Laporan Mingguan
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm">
            <thead>
              <tr className="bg-blue-100 text-gray-700 text-left">
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 text-gray-800">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{item.nama}</td>
                  <td className="px-4 py-2 border">{item.status}</td>
                  <td className="px-4 py-2 border">{item.catatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
